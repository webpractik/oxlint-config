import { defineConfig } from 'oxfmt'

export default defineConfig({
  jsdoc: true,
  printWidth: 100,
  semi: false,
  singleQuote: true,
  sortImports: {
    groups: [
      'type-import',
      ['type-parent', 'type-sibling', 'type-index', 'type-internal'],
      'value-builtin',
      'value-external',
      'value-internal',
      ['value-parent', 'value-sibling', 'value-index'],
      'side_effect',
      'unknown',
    ],
    internalPattern: ['~/', '@/', '#/'],
  },
  sortPackageJson: {
    sortScripts: true,
  },
})
