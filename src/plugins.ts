import { resolvePlugin } from './utils.ts'

export const pluginPerfectionist = resolvePlugin('perfectionist', 'eslint-plugin-perfectionist')
export const pluginRegexp = resolvePlugin('regexp', 'eslint-plugin-regexp')
export const pluginStylistic = resolvePlugin('style', '@stylistic/eslint-plugin')
export const pluginNoOnlyTests = resolvePlugin('no-only-tests', 'eslint-plugin-no-only-tests')
export const pluginTailwindcss = resolvePlugin('tailwindcss', 'eslint-plugin-better-tailwindcss')
export const pluginDeMorgan = resolvePlugin('de-morgan', 'eslint-plugin-de-morgan')
export const pluginStorybook = resolvePlugin('storybook', 'eslint-plugin-storybook')
export const pluginSonarJs = resolvePlugin(
  'sonarjs',
  '@webpractik/oxlint-config/custom-plugins/sonarjs',
)
export const pluginSlop = resolvePlugin('slop', 'eslint-plugin-slop')
export const pluginPreferTemplate = resolvePlugin(
  'prefer-template',
  '@webpractik/oxlint-config/custom-plugins/prefer-template',
)
export const pluginPreferEarlyReturn = resolvePlugin(
  'prefer-early-return',
  '@webpractik/oxlint-config/custom-plugins/prefer-early-return',
)
