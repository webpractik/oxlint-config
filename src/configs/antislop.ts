import type { OxlintConfig } from 'oxlint'

import type { OptionsAntislop } from '../types.ts'

import { GLOB_SRC } from '../globs.ts'
import { pluginSlop } from '../plugins.ts'

export function antislop(options: OptionsAntislop = {}): OxlintConfig {
  const { cwd, inspection, overrides = {} } = options

  return {
    jsPlugins: [pluginSlop],
    settings: {
      slop: {
        cwd,
        inspection,
      },
    },
    overrides: [
      {
        files: [GLOB_SRC],
        rules: {
          'slop/max-comment-length': 'error',
          'slop/no-chained-type-assertions': 'error',
          'slop/no-em-dash': 'error',
          'slop/no-jargon': 'error',
          'slop/no-trivial-functions': 'error',
          'slop/no-trivial-type-aliases': 'error',
          'slop/prefer-jsdoc': 'error',

          ...overrides,
        },
      },
    ],
  }
}
