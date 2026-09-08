import type { OxlintConfig } from 'oxlint'

import { pluginDeMorgan } from '../plugins.ts'

export function deMorgan(): OxlintConfig {
  return {
    jsPlugins: [pluginDeMorgan],
    rules: {
      'de-morgan/no-negated-conjunction': 'error',
      'de-morgan/no-negated-disjunction': 'error',
    },
  }
}
