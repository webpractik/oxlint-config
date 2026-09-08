import type { OxlintConfig } from 'oxlint'

import { GLOB_SRC, GLOB_SRC_EXT, GLOB_TESTS, GLOB_TS, GLOB_TSX } from '../globs.ts'

export function disables(): OxlintConfig {
  return {
    overrides: [
      {
        files: [`**/scripts/${GLOB_SRC}`],
        rules: {
          'no-console': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
      },
      {
        files: [`**/cli/${GLOB_SRC}`, `**/cli.${GLOB_SRC_EXT}`],
        rules: {
          'no-console': 'off',
        },
      },
      {
        files: ['**/*.d.{ts,cts,mts}'],
        rules: {
          'no-unused-vars': 'off',
          'typescript/consistent-indexed-object-style': 'off',
          'import/no-unassigned-import': 'off',
          'import/unambiguous': 'off',
        },
      },
      {
        files: ['**/*.{js,cjs}'],
        rules: {
          'typescript/no-require-imports': 'off',
          'import/no-commonjs': 'off',
          'import/unambiguous': 'off',
        },
      },
      {
        files: [`**/*.config.${GLOB_SRC_EXT}`, `**/*.config.*.${GLOB_SRC_EXT}`],
        rules: {
          'no-console': 'off',
          'typescript/explicit-function-return-type': 'off',
        },
      },
      {
        files: [GLOB_TS, GLOB_TSX],
        rules: {
          'import/export': 'off',
          'import/default': 'off',
          'import/namespace': 'off',
          'import/named': 'off',
        },
      },
      {
        files: GLOB_TESTS,
        rules: {
          'no-unused-expressions': 'off',
          'typescript/explicit-function-return-type': 'off',
          'typescript/only-throw-error': 'off',
          'typescript/strict-void-return': 'off',
          'oxc/no-accumulating-spread': 'off',
          'oxc/no-map-spread': 'off',
          'unicorn/consistent-function-scoping': 'off',
        },
      },
      {
        files: [`**/*.stories.${GLOB_SRC_EXT}`],
        rules: {
          'unicorn/consistent-function-scoping': 'off',
        },
      },
    ],
  }
}
