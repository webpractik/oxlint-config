import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides } from '../types.ts'

import { GLOB_SRC } from '../globs.ts'

export function oxc(options: OptionsOverrides = {}): OxlintConfig {
  const { overrides = {} } = options

  return {
    plugins: ['oxc'],
    overrides: [
      {
        files: [GLOB_SRC],
        rules: {
          'oxc/approx-constant': 'error',
          'oxc/bad-array-method-on-arguments': 'error',
          'oxc/bad-bitwise-operator': 'error',
          'oxc/bad-char-at-comparison': 'error',
          'oxc/bad-comparison-sequence': 'error',
          'oxc/bad-match-all-arg': 'error',
          'oxc/bad-min-max-func': 'error',
          'oxc/bad-object-literal-comparison': 'error',
          'oxc/bad-replace-all-arg': 'error',
          'oxc/branches-sharing-code': 'warn',
          'oxc/const-comparisons': 'error',
          'oxc/double-comparisons': 'error',
          'oxc/erasing-op': 'error',
          'oxc/misrefactored-assign-op': 'error',
          'oxc/missing-throw': 'error',
          'oxc/no-accumulating-spread': 'error',
          'oxc/no-async-await': 'off',
          'oxc/no-async-endpoint-handlers': 'off',
          'oxc/no-barrel-file': 'off', // TBD
          'oxc/no-const-enum': 'error',
          'oxc/no-map-spread': 'error',
          'oxc/no-optional-chaining': 'off',
          'oxc/no-rest-spread-properties': 'off',
          'oxc/no-this-in-exported-function': 'error',
          'oxc/number-arg-out-of-range': 'error',
          'oxc/only-used-in-recursion': 'error',
          'oxc/uninvoked-array-callback': 'error',

          ...overrides,
        },
      },
    ],
  }
}
