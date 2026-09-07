import type { OxlintConfig } from 'oxlint'

import type { OptionsConfig } from './types.ts'

import {
  antislop,
  deMorgan,
  disables,
  ignores,
  imports,
  javascript,
  jsdoc,
  jsxA11y,
  nextjs,
  node,
  oxc,
  perfectionist,
  promise,
  react,
  regexp,
  sonarJs,
  storybook,
  stylistic,
  tailwindcss,
  test,
  typescript,
  unicorn,
} from './configs/index.ts'
import { hasNextJs, hasReact, hasStorybook, hasTypeScript, isInEditorEnv } from './env.ts'
import { combine } from './utils.ts'

const configProps = [
  'env',
  'globals',
  'jsPlugins',
  'options',
  'overrides',
  'plugins',
  'rules',
  'settings',
] satisfies (keyof OxlintConfig)[]

// oxlint-disable-next-line sonarjs/cognitive-complexity
export function defineOxlintConfig(
  options: Omit<OxlintConfig, 'categories' | 'extends' | 'ignorePatterns'> & OptionsConfig = {},
  ...userConfigs: OxlintConfig[]
): OxlintConfig {
  const {
    antislop: enableAntislop = false,
    deMoragn: enableDeMorgan = true,
    ignores: userIgnores = [],
    imports: enableImports = true,
    jsdoc: enableJsdoc = true,
    jsxA11y: enablejsxA11y = false,
    nextjs: enableNextjs = hasNextJs(),
    node: enableNode = true,
    oxc: enableOxc = true,
    perfectionist: enablePerfectionist = true,
    promise: enablePromise = true,
    react: enableReact = hasReact(),
    regexp: enableRegexp = true,
    sonarjs: enableSonarJs = true,
    storybook: enableStorybook = hasStorybook(),
    tailwindcss: enableTailwindcss = false,
    test: enableTest = true,
    type: appType = 'app',
    typescript: enableTypeScript = hasTypeScript(),
    unicorn: enableUnicorn = true,
  } = options

  let { isInEditor } = options

  if (isInEditor == null) {
    isInEditor = isInEditorEnv()

    if (isInEditor) {
      // oxlint-disable-next-line no-console
      console.log('[@repo/oxlint-config] Detected running in editor, some rules are disabled.')
    }
  }

  const stylisticOptions =
    options.stylistic === false
      ? false
      : // oxlint-disable-next-line unicorn/no-nested-ternary
        typeof options.stylistic === 'object'
        ? options.stylistic
        : {}

  const configs: OxlintConfig[] = [
    ignores(userIgnores, !enableTypeScript),
    javascript({ ...options.javascript, isInEditor }),
  ]

  const typescriptOptions = resolveSubOptions(options, 'typescript')
  const tsconfigPath =
    'tsconfigPath' in typescriptOptions ? typescriptOptions.tsconfigPath : undefined

  if (enablePerfectionist) {
    configs.push(perfectionist(resolveSubOptions(options, 'perfectionist')))
  }

  if (enableNode) {
    configs.push(node())
  }

  if (enableJsdoc) {
    configs.push(jsdoc())
  }

  if (enableImports) {
    configs.push(
      imports({
        stylistic: stylisticOptions,
        ...resolveSubOptions(options, 'imports'),
      }),
    )
  }

  if (enableUnicorn) {
    configs.push(
      unicorn({
        ...typescriptOptions,
        ...resolveSubOptions(options, 'unicorn'),
        tsconfigPath,
      }),
    )
  }

  if (enableOxc) {
    configs.push(oxc(resolveSubOptions(options, 'oxc')))
  }

  if (enablePromise) {
    configs.push(promise())
  }

  if (enableDeMorgan) {
    configs.push(deMorgan())
  }

  if (enablejsxA11y) {
    configs.push(jsxA11y(resolveSubOptions(options, 'jsxA11y')))
  }

  if (enableTypeScript) {
    configs.push(
      typescript({
        ...typescriptOptions,
        type: appType,
      }),
    )
  }

  if (enableAntislop) {
    configs.push(antislop(resolveSubOptions(options, 'antislop')))
  }

  if (enableSonarJs) {
    configs.push(sonarJs(resolveSubOptions(options, 'sonarjs')))
  }

  if (stylisticOptions) {
    configs.push(stylistic(resolveSubOptions(options, 'stylistic')))
  }

  if (enableRegexp) {
    configs.push(regexp(resolveSubOptions(options, 'regexp')))
  }

  if (enableTest) {
    configs.push(test(resolveSubOptions(options, 'test')))
  }

  if (enableReact) {
    configs.push(react(resolveSubOptions(options, 'react')))
  }

  if (enableNextjs) {
    configs.push(nextjs(resolveSubOptions(options, 'nextjs')))
  }

  if (enableTailwindcss) {
    configs.push(
      tailwindcss({
        stylistic: stylisticOptions,
        ...resolveSubOptions(options, 'tailwindcss'),
        tsconfigPath,
      }),
    )
  }

  if (enableStorybook) {
    configs.push(storybook(resolveSubOptions(options, 'storybook')))
  }

  configs.push(disables())

  // User can optionally pass a flat config item to the first argument
  // We pick the known keys as Oxlint would do schema validation
  const fusedConfig: OxlintConfig = {}

  for (const key of configProps) {
    if (key in options) {
      fusedConfig[key] = options[key] as any
    }
  }

  if (Object.keys(fusedConfig).length > 0) {
    configs.push(fusedConfig)
  }

  const merged = combine(...configs, ...userConfigs)

  return merged
}

export type ResolvedOptions<T> = T extends boolean ? never : NonNullable<T>

export function resolveSubOptions<K extends keyof OptionsConfig>(
  options: OptionsConfig,
  key: K,
): ResolvedOptions<OptionsConfig[K]> {
  return typeof options[key] === 'boolean' ? ({} as any) : options[key] || ({} as any)
}
