import type { OxlintConfig } from 'oxlint'

export function jsdoc(): OxlintConfig {
  return {
    plugins: ['jsdoc'],
    rules: {
      'jsdoc/check-access': 'warn',
      'jsdoc/check-property-names': 'warn',
      'jsdoc/check-tag-names': 'off',
      'jsdoc/empty-tags': 'warn',
      'jsdoc/implements-on-classes': 'warn',
      'jsdoc/no-blank-blocks': 'off',
      'jsdoc/no-defaults': 'warn',
      'jsdoc/require-param': 'off',
      'jsdoc/require-param-description': 'off',
      'jsdoc/require-param-name': 'warn',
      'jsdoc/require-param-type': 'off',
      'jsdoc/require-property': 'warn',
      'jsdoc/require-property-description': 'warn',
      'jsdoc/require-property-name': 'warn',
      'jsdoc/require-property-type': 'off',
      'jsdoc/require-returns': 'off',
      'jsdoc/require-returns-description': 'warn',
      'jsdoc/require-returns-type': 'off',
      'jsdoc/require-throws-description': 'off',
      'jsdoc/require-throws-type': 'off',
      'jsdoc/require-yields': 'off',
      'jsdoc/require-yields-description': 'off',
      'jsdoc/require-yields-type': 'off',
    },
  }
}
