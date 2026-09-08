import { defineConfig } from 'taze'

export default defineConfig({
  maturityPeriod: 3,
  packageMode: {
    '@types/node': 'minor',
  },
})
