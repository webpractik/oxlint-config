import type { OxlintConfig } from 'oxlint'

export function promise(): OxlintConfig {
  return {
    plugins: ['promise'],
    rules: {
      'promise/always-return': ['error', { ignoreLastCallback: true }],
      'promise/avoid-new': 'off',
      'promise/catch-or-return': 'error',
      'promise/no-callback-in-promise': 'warn',
      'promise/no-multiple-resolved': 'error',
      'promise/no-nesting': 'warn',
      'promise/no-new-statics': 'error',
      'promise/no-promise-in-callback': 'warn',
      'promise/no-return-in-finally': 'warn',
      'promise/no-return-wrap': ['error', { allowReject: true }],
      'promise/param-names': 'error',
      'promise/prefer-await-to-callbacks': 'off',
      'promise/prefer-await-to-then': 'off', // TBD
      'promise/prefer-catch': 'warn',
      'promise/spec-only': 'error',
      'promise/valid-params': 'error',
    },
  }
}
