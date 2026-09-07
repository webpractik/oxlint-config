import type { OxlintConfig } from 'oxlint'

import type { OptionsFiles, OptionsOverrides } from '../types.ts'

import { GLOB_TESTS } from '../globs.ts'
import { pluginNoOnlyTests } from '../plugins.ts'

export function test(options: OptionsFiles & OptionsOverrides = {}): OxlintConfig {
  const { files = GLOB_TESTS, overrides = {} } = options

  return {
    plugins: ['vitest'],
    jsPlugins: [pluginNoOnlyTests],
    overrides: [
      {
        files,
        rules: {
          'vitest/consistent-each-for': [
            'warn',
            { test: 'each', describe: 'each', it: 'each', suite: 'each' },
          ],
          'vitest/consistent-test-filename': 'off',
          'vitest/consistent-test-it': ['error', { fn: 'it', withinDescribe: 'it' }],
          'vitest/consistent-vitest-vi': 'error',
          'vitest/expect-expect': 'warn',
          'vitest/hoisted-apis-on-top': 'error',
          'vitest/max-expects': 'off',
          'vitest/max-nested-describe': 'off',
          'vitest/no-alias-methods': 'off',
          'vitest/no-commented-out-tests': 'warn',
          'vitest/no-conditional-expect': 'error',
          'vitest/no-conditional-in-test': 'off',
          'vitest/no-conditional-tests': 'off',
          'vitest/no-disabled-tests': 'warn',
          'vitest/no-duplicate-hooks': 'warn',
          'vitest/no-focused-tests': 'warn',
          'vitest/no-hooks': 'off',
          'vitest/no-identical-title': 'warn',
          'vitest/no-import-node-test': 'error',
          'vitest/no-importing-vitest-globals': 'off',
          'vitest/no-interpolation-in-snapshots': 'error',
          'vitest/no-large-snapshots': 'off',
          'vitest/no-mocks-import': 'error',
          'vitest/no-restricted-matchers': 'off',
          'vitest/no-restricted-vi-methods': 'off',
          'vitest/no-standalone-expect': 'error',
          'vitest/no-test-prefixes': 'off',
          'vitest/no-test-return-statement': 'error',
          'vitest/no-unneeded-async-expect-function': 'error',
          'vitest/padding-around-after-all-blocks': 'error',
          'vitest/padding-around-test-blocks': 'error',
          'vitest/prefer-called-exactly-once-with': 'warn',
          'vitest/prefer-called-once': 'off',
          'vitest/prefer-called-times': 'error',
          'vitest/prefer-called-with': 'off',
          'vitest/prefer-comparison-matcher': 'error',
          'vitest/prefer-describe-function-title': 'error',
          'vitest/prefer-each': 'error',
          'vitest/prefer-equality-matcher': 'error',
          'vitest/prefer-expect-assertions': 'off',
          'vitest/prefer-expect-resolves': 'error',
          'vitest/prefer-expect-type-of': 'error',
          'vitest/prefer-hooks-in-order': 'warn',
          'vitest/prefer-hooks-on-top': 'warn',
          'vitest/prefer-import-in-mock': 'off',
          'vitest/prefer-importing-vitest-globals': 'off',
          'vitest/prefer-lowercase-title': 'error',
          'vitest/prefer-mock-promise-shorthand': 'error',
          'vitest/prefer-mock-return-shorthand': 'error',
          'vitest/prefer-snapshot-hint': 'off',
          'vitest/prefer-spy-on': 'off',
          'vitest/prefer-strict-boolean-matchers': 'error',
          'vitest/prefer-strict-equal': 'error',
          'vitest/prefer-to-be': 'error',
          'vitest/prefer-to-be-object': 'error',
          'vitest/prefer-to-be-falsy': 'off',
          'vitest/prefer-to-be-truthy': 'off',
          'vitest/prefer-to-contain': 'error',
          'vitest/prefer-to-have-been-called-times': 'error',
          'vitest/prefer-to-have-length': 'error',
          'vitest/prefer-todo': 'error',
          'vitest/require-awaited-expect-poll': 'error',
          'vitest/require-hook': 'off',
          'vitest/require-local-test-context-for-concurrent-snapshots': 'error',
          'vitest/require-mock-type-parameters': 'off',
          'vitest/require-test-timeout': 'off',
          'vitest/require-to-throw-message': 'error',
          'vitest/require-top-level-describe': 'off',
          'vitest/valid-describe-callback': 'error',
          'vitest/valid-expect': 'error',
          'vitest/valid-expect-in-promise': 'error',
          'vitest/valid-title': 'error',
          'vitest/warn-todo': 'warn',

          'no-only-tests/no-only-tests': 'error',

          ...overrides,
        },
      },
    ],
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  }
}
