import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides, OptionsStylistic } from '../types.ts'

export function imports(options: OptionsOverrides & OptionsStylistic = {}): OxlintConfig {
  const { overrides = {}, stylistic = true } = options

  return {
    plugins: ['import'],
    rules: {
      'import/consistent-type-specifier-style': ['error', 'prefer-top-level'],
      'import/default': 'error',
      'import/export': 'error',
      'import/exports-last': 'off', // TBA
      'import/extensions': 'off',
      'import/first': 'error',
      'import/group-exports': 'off',
      'import/max-dependencies': 'off',
      'import/named': 'error',
      'import/namespace': 'error',
      'import/no-absolute-path': 'error',
      'import/no-amd': 'error',
      'import/no-anonymous-default-export': 'error',
      'import/no-commonjs': ['error', { allowConditionalRequire: false }],
      'import/no-cycle': 'error',
      'import/no-default-export': 'off',
      'import/no-duplicates': 'error',
      'import/no-dynamic-require': 'off',
      'import/no-empty-named-blocks': 'error',
      'import/no-mutable-exports': 'error',
      'import/no-named-as-default': 'warn',
      'import/no-named-as-default-member': 'warn',
      'import/no-named-default': 'error',
      'import/no-named-export': 'off',
      'import/no-namespace': 'off',
      'import/no-nodejs-modules': 'off',
      'import/no-relative-parent-imports': 'off',
      'import/no-self-import': 'error',
      'import/no-unassigned-import': [
        'error',
        {
          allow: ['server-only', 'client-only', '**/*.css', '**/*.scss', '**/*.sass', '**/*.less'],
        },
      ],
      'import/no-webpack-loader-syntax': 'off',
      'import/prefer-default-export': 'off',
      'import/unambiguous': 'warn',

      ...(stylistic
        ? {
            'import/newline-after-import': 'error',
          }
        : {}),

      ...overrides,
    },
  }
}
