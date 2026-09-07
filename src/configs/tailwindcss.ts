import type { OxlintConfig } from 'oxlint'

import type { OptionsStylistic, OptionsTailwindCSS, OptionsTypeScriptWithTypes } from '../types.ts'

import { pluginPreferTemplate, pluginTailwindcss } from '../plugins.ts'

export function tailwindcss(
  options: OptionsStylistic & OptionsTailwindCSS & OptionsTypeScriptWithTypes,
): OxlintConfig {
  const { entryPoint, overrides = {}, stylistic = true, tsconfigPath } = options

  const {
    indent = 'tab',
    printWidth = 100,
    tabWidth = 4,
  } = typeof stylistic === 'boolean' ? {} : stylistic

  return {
    jsPlugins: [pluginPreferTemplate, pluginTailwindcss],
    rules: {
      'tailwindcss/no-concatenated-classes': 'error',
      'tailwindcss/no-unknown-classes': 'error',
      'tailwindcss/no-conflicting-classes': 'error',

      ...(stylistic
        ? {
            'tailwindcss/enforce-consistent-line-wrapping': [
              'error',
              {
                printWidth,
                indent,
                tabWidth,
                strictness: 'loose',
              },
            ],
            'prefer-template/multiline-classname': 'error',
            'tailwindcss/enforce-consistent-class-order': 'warn',
            'tailwindcss/enforce-canonical-classes': 'off',
            'tailwindcss/no-duplicate-classes': 'warn',
            'tailwindcss/no-deprecated-classes': 'warn',
            'tailwindcss/no-unnecessary-whitespace': 'warn',
          }
        : {}),

      ...overrides,
    },
    settings: {
      'better-tailwindcss': {
        entryPoint,
        tsconfig: tsconfigPath,
      },
    },
  }
}
