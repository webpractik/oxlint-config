export const GLOB_SRC_EXT = '{js,cjs,mjs,jsx,ts,cts,mts,tsx}'
export const GLOB_SRC = '**/*.{js,cjs,mjs,jsx,ts,cts,mts,tsx}'

export const GLOB_JS = '**/*.{js,cjs,mjs}'
export const GLOB_JSX = '**/*.jsx'

export const GLOB_TS = '**/*.{ts,cts,mts}'
export const GLOB_TSX = '**/*.tsx'

export const GLOB_TESTS = [
  `**/__tests__/**/*.${GLOB_SRC_EXT}`,
  `**/*.spec.${GLOB_SRC_EXT}`,
  `**/*.test.${GLOB_SRC_EXT}`,
  `**/*.bench.${GLOB_SRC_EXT}`,
  `**/*.benchmark.${GLOB_SRC_EXT}`,
]

export const GLOB_EXCLUDE = [
  '**/node_modules',
  '**/dist',

  '**/output',
  '**/coverage',
  '**/temp',
  '**/.temp',
  '**/tmp',
  '**/.tmp',
  '**/.history',
  '**/.vitepress/cache',
  '**/.nuxt',
  '**/.next',
  '**/.svelte-kit',
  '**/.vercel',
  '**/.changeset',
  '**/.idea',
  '**/.cache',
  '**/.output',
  '**/.vite-inspect',
  '**/.yarn',

  '**/*.min.*',
  '**/__snapshots__',

  // Tools temp files
  '**/vite.config.*.timestamp-*',
  '**/auto-imports.d.ts',
  '**/auto-import.d.ts',
  '**/components.d.ts',

  // AI related
  '**/.context',
  '**/.claude',
  '**/.agents',
  '**/.*/skills',
]
