import type { OxlintConfig } from 'oxlint'

import type { OptionsOverrides } from '../types.ts'

import { GLOB_SRC_EXT } from '../globs.ts'
import { pluginStorybook } from '../plugins.ts'

export function storybook(options: OptionsOverrides = {}): OxlintConfig {
  const { overrides = {} } = options

  return {
    overrides: [
      {
        files: [`**/*.stories.${GLOB_SRC_EXT}`],
        jsPlugins: [pluginStorybook],
        rules: {
          'storybook/await-interactions': 'error',
          'storybook/context-in-play-function': 'error',
          'storybook/default-exports': 'error',
          'storybook/hierarchy-separator': 'warn',
          'storybook/no-redundant-story-name': 'warn',
          'storybook/no-renderer-packages': 'error',
          'storybook/prefer-pascal-case': 'warn',
          'storybook/story-exports': 'error',
          'storybook/use-storybook-expect': 'error',
          'storybook/use-storybook-testing-library': 'error',
          'storybook/meta-satisfies-type': 'error',
          'storybook/no-uninstalled-addons': 'error',

          ...overrides,
        },
      },
    ],
  }
}
