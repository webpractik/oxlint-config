import type { Plugin, Rule } from '@oxlint/plugins'

import { createRequire } from 'node:module'

import { definePlugin } from '@oxlint/plugins'

const require = createRequire(import.meta.url)

/**
 * Map of exposed rule name -> SonarJS RSPEC key (the `cjs/<key>` directory).
 *
 * Only pure-AST rules are listed here. The `eslint-plugin-sonarjs` `cjs/plugin.js` entry pulls in
 * `cjs/plugin-rules.js`, a barrel that eagerly `require()`s every rule module, including a handful
 * that import `ts-api-utils`. Under `typescript@7` (the native port, which has no JS type API yet)
 * `ts-api-utils` throws at module load (`TypeFlags.Intrinsic` is `undefined`), taking the whole
 * plugin down with it.
 *
 * Every rule below reports `requiresTypeChecking: false` and never touches the type checker or
 * `ts-api-utils`, so loading each `cjs/<key>/index.js` directly sidesteps the barrel and the crash.
 * Keep this list in sync with `src/configs/sonarjs.ts`.
 */
const RULE_KEYS: Record<string, string> = {
  'cognitive-complexity': 'S3776',
  'no-all-duplicated-branches': 'S3923',
  'no-collapsible-if': 'S1066',
  'no-commented-code': 'S125',
  'no-dead-store': 'S1854',
  'no-duplicated-branches': 'S1871',
  'no-element-overwrite': 'S4143',
  'no-empty-collection': 'S4158',
  'no-gratuitous-expressions': 'S2589',
  'no-identical-conditions': 'S1862',
  'no-identical-expressions': 'S1764',
  'no-identical-functions': 'S4144',
  'no-invariant-returns': 'S3516',
  'no-inverted-boolean-check': 'S1940',
  'no-redundant-boolean': 'S1125',
  'no-redundant-jump': 'S3626',
  'no-unused-collection': 'S4030',
  'no-use-of-empty-return-value': 'S3699',
  'prefer-single-boolean-return': 'S1126',
}

function loadRule(sonarKey: string): Rule {
  return (require(`eslint-plugin-sonarjs/cjs/${sonarKey}/index.js`) as { rule: Rule }).rule
}

const rules: Record<string, Rule> = {}

for (const [name, sonarKey] of Object.entries(RULE_KEYS)) {
  rules[name] = loadRule(sonarKey)
}

const plugin: Plugin = definePlugin({
  meta: { name: 'sonarjs' },
  rules,
})

export default plugin
