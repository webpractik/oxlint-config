import type { OxlintConfig } from 'oxlint'

export interface OptionsOverrides {
  overrides?: OxlintConfig['rules']
}

export interface OptionsFiles {
  files?: string[]
}

export interface OptionsIsInEditor {
  isInEditor?: boolean
}

export interface OptionsProjectType {
  type?: 'app' | 'lib'
}

export interface StylisticConfig {
  /**
   * Indentation level
   *
   * @default 'tab'
   */
  indent?: 'tab' | number
  /**
   * Print width
   *
   * @default 100
   */
  printWidth?: number
  /**
   * Tab width
   *
   * @default 4
   */
  tabWidth?: number
}

export interface OptionsStylistic {
  stylistic?: boolean | StylisticConfig
}

export interface OptionsTailwindCSS extends OptionsOverrides {
  entryPoint: string
}

export interface OptionsAntislop extends OptionsOverrides {
  cwd?: string
  inspection?:
    | 'full'
    | 'recent-changes'
    | 'uncommitted'
    | { mode: 'full' | 'uncommitted' }
    | { mode: 'recent-changes'; tracebackCommits?: number }
}

export interface OptionsTypeScriptWithTypes {
  /** Override type aware rules. */
  overridesTypeAware?: OxlintConfig['rules']

  /**
   * When this options is provided, type aware rules will be enabled.
   *
   * @see https://typescript-eslint.io/linting/typed-linting/
   */
  tsconfigPath?: string
}

export interface OptionsTypeScriptParserOptions {
  /**
   * Glob patterns for files that should be type aware.
   *
   * @default ['**\/*.{ts,tsx}']
   */
  filesTypeAware?: string[]

  /**
   * Glob patterns for files that should not be type aware.
   *
   * @default [ ]
   */
  ignoresTypeAware?: string[]
}

export type OptionsTypescript =
  | (OptionsOverrides & OptionsTypeScriptParserOptions)
  | (OptionsOverrides & OptionsTypeScriptWithTypes)

export interface OptionsConfig extends OptionsProjectType {
  /**
   * Enable rules from `eslint-plugin-slop`.
   *
   * Requires installing: - `eslint-plugin-slop`
   *
   * Passing an object enables the rules and forwards it to the plugin via `settings.slop`,
   * controlling the working directory and inspection mode.
   *
   * @default false
   * @see https://github.com/antfu/eslint-plugin-slop
   */
  antislop?: boolean | OptionsAntislop

  /**
   * Enable eslint-plugin-de-morgan
   *
   * @default true
   */
  deMoragn?: boolean

  /**
   * Extend the global ignores.
   *
   * Passing an array to extends the ignores. Passing a function to modify the default ignores.
   *
   * @default [ ]
   */
  ignores?: ((originals: string[]) => string[]) | string[]

  /**
   * Options for plugin import.
   *
   * @default true
   */
  imports?: boolean | OptionsOverrides

  /**
   * Control to disable some rules in editors.
   *
   * @default auto-detect based on the process.env
   */
  isInEditor?: boolean

  /** Core rules. Can't be disabled. */
  javascript?: OptionsOverrides

  /**
   * Enable JSDoc rules
   *
   * @default true
   */
  jsdoc?: boolean

  /**
   * Enable JSX accessibility rules.
   *
   * Can be a boolean or an object for custom options and overrides.
   *
   * @default false
   */
  jsxA11y?: boolean | OptionsOverrides

  /**
   * Enable nextjs rules.
   *
   * @default auto-detect based on the dependencies
   */
  nextjs?: boolean | OptionsOverrides

  /**
   * Enable Node.js rules
   *
   * @default true
   */
  node?: boolean

  /**
   * Options for plugin oxc.
   *
   * @default true
   */
  oxc?: boolean | OptionsOverrides

  /**
   * Options for eslint-plugin-perfectionist.
   *
   * @default true
   */
  perfectionist?: boolean | OptionsOverrides

  /**
   * Enable plugin promise rules
   *
   * @default true
   */
  promise?: boolean

  /**
   * Enable react rules.
   *
   * @default auto-detect based on the dependencies
   */
  react?: boolean | OptionsOverrides

  /**
   * Enable regexp rules.
   *
   * @default true
   * @see https://ota-meshi.github.io/eslint-plugin-regexp/
   */
  regexp?: boolean | OptionsOverrides

  /**
   * Enable eslint-plugin-sonarjs
   *
   * @default true
   */
  sonarjs?: boolean | OptionsOverrides

  /**
   * Enable storybook rules.
   *
   * Requires installing: - `eslint-plugin-storybook`
   *
   * @default auto-detect based on the dependencies
   */
  storybook?: boolean | OptionsOverrides

  /**
   * Enable stylistic rules.
   *
   * @default true
   * @see https://eslint.style/
   */
  stylistic?: boolean | (OptionsOverrides & StylisticConfig)

  /**
   * Enable tailwindcss rules.
   *
   * Requires installing: - `eslint-plugin-better-tailwindcss`
   *
   * @default false
   */
  tailwindcss?: OptionsTailwindCSS | false

  /**
   * Enable test support.
   *
   * @default true
   */
  test?: boolean | OptionsOverrides

  /**
   * Enable TypeScript support.
   *
   * Passing an object to enable TypeScript Language Server support.
   *
   * @default auto-detect based on the dependencies
   */
  typescript?: boolean | OptionsTypescript

  /**
   * Options for eslint-plugin-unicorn.
   *
   * @default true
   */
  unicorn?: boolean | OptionsOverrides
}
