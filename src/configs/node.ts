import type { OxlintConfig } from 'oxlint'

import { GLOB_SRC } from '../globs.ts'

export function node(): OxlintConfig {
  return {
    plugins: ['node'],
    overrides: [
      {
        files: [GLOB_SRC],
        rules: {
          'node/callback-return': 'off',
          'node/exports-style': 'off',
          'node/global-require': 'off',
          'node/handle-callback-err': ['error', '^(err|error)$'],
          'node/no-exports-assign': 'error',
          'node/no-mixed-requires': 'off',
          'node/no-new-require': 'error',
          'node/no-path-concat': 'error',
          'node/no-process-env': 'off',
          'node/no-sync': 'off',
          'node/no-top-level-await': 'off',
        },
      },
    ],
  }
}
