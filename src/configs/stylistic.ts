import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides, StylisticConfig } from '../types.ts'

import { pluginStylistic } from '../plugins.ts'

export const StylisticConfigDefaults: StylisticConfig = {
  indent: 'tab',
  printWidth: 100,
  tabWidth: 4,
}

export function stylistic(options: OptionsOverrides = {}): OxlintConfig {
  const { overrides = {} } = options

  return {
    jsPlugins: [pluginStylistic],
    rules: {
      'style/jsx-function-call-newline': ['error', 'multiline'],
      'style/lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
      'style/padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          next: '*',
          prev: ['block-like', 'directive', 'export', 'function', 'interface', 'type'],
        },
        {
          blankLine: 'always',
          next: ['block-like', 'directive', 'export', 'function', 'interface', 'type'],
          prev: '*',
        },
        {
          blankLine: 'any',
          next: ['break', 'continue', 'return', 'throw'],
          prev: 'block-like',
        },
        {
          blankLine: 'any',
          next: '*',
          prev: ['case', 'default'],
        },
        {
          blankLine: 'never',
          next: 'directive',
          prev: 'directive',
        },
        {
          blankLine: 'any',
          next: 'export',
          prev: 'export',
        },
        {
          blankLine: 'never',
          next: ['function', 'function-overload'],
          prev: 'function-overload',
        },
        {
          blankLine: 'any',
          next: 'interface',
          prev: 'interface',
        },
        {
          blankLine: 'any',
          next: 'type',
          prev: 'type',
        },
      ],
      'style/spaced-comment': [
        'error',
        'always',
        {
          block: { balanced: true, exceptions: ['*'], markers: ['!'] },
          line: { exceptions: ['/', '#'], markers: ['/'] },
        },
      ],

      ...overrides,
    },
  }
}
