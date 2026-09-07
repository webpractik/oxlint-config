import { defineConfig } from 'tsdown'

export default defineConfig({
  dts: true,
  entry: [
    'src/index.ts',
    'src/custom-plugins/prefer-template.ts',
    'src/custom-plugins/prefer-early-return.ts',
    'src/custom-plugins/sonarjs.ts',
  ],
  exports: true,
  format: ['esm'],
  shims: true,
})
