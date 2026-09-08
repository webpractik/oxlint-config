import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides } from '../types.ts'

import { configs } from 'eslint-plugin-regexp'

import { pluginRegexp } from '../plugins.ts'

export function regexp(options: OptionsOverrides = {}): OxlintConfig {
  const { overrides = {} } = options

  return {
    jsPlugins: [pluginRegexp],
    rules: {
      ...configs['flat/recommended'].rules,
      ...overrides,
    },
    settings: {
      regexp: {
        allowedCharacterRanges: ['alphanumeric', 'а-я', 'А-Я'],
      },
    },
  }
}
