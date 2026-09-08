import { defineConfig } from 'bumpp'

export default defineConfig({
  pr: {
    base: 'master',
    body: '{oldVersion} → {version}',
    branch: 'release/v{version}',
    draft: false,
    title: 'chore: release {tag}',
  },
})
