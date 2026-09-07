import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides } from '../types.ts'

import { GLOB_SRC } from '../globs.ts'
import { pluginSonarJs } from '../plugins.ts'

export function sonarJs(options: OptionsOverrides = {}): OxlintConfig {
  const { overrides = {} } = options

  return {
    jsPlugins: [pluginSonarJs],
    overrides: [
      {
        files: [GLOB_SRC],
        rules: {
          'sonarjs/cognitive-complexity': 'error',
          'sonarjs/no-all-duplicated-branches': 'error',
          'sonarjs/no-collapsible-if': 'error',
          'sonarjs/no-commented-code': 'error',
          'sonarjs/no-dead-store': 'error',
          'sonarjs/no-duplicated-branches': 'error',
          'sonarjs/no-element-overwrite': 'error',
          'sonarjs/no-empty-collection': 'error',
          'sonarjs/no-gratuitous-expressions': 'error',
          'sonarjs/no-identical-conditions': 'error',
          'sonarjs/no-identical-expressions': 'error',
          'sonarjs/no-identical-functions': 'error',
          'sonarjs/no-invariant-returns': 'error',
          'sonarjs/no-inverted-boolean-check': 'error',
          'sonarjs/no-redundant-boolean': 'error',
          'sonarjs/no-redundant-jump': 'error',
          'sonarjs/no-unused-collection': 'error',
          'sonarjs/no-use-of-empty-return-value': 'error',
          'sonarjs/prefer-single-boolean-return': 'error',

          ...overrides,
        },
      },
    ],
  }
}
