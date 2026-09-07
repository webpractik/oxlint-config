import type { ExternalPluginEntry, OxlintConfig } from 'oxlint'

import { fileURLToPath } from 'node:url'

function isObject(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null
}

export function combine(...configs: OxlintConfig[]) {
  let mergedConfig: OxlintConfig = {}

  for (const config of configs) {
    mergedConfig = mergeConfig(mergedConfig, config)
  }

  return mergedConfig
}

export default function mergeConfig(
  baseConfig: OxlintConfig,
  extensionConfig: OxlintConfig,
): OxlintConfig {
  if (!isObject(baseConfig) || !isObject(extensionConfig)) {
    throw new TypeError('[@repo/oxlint-config] Expected config to be an object')
  }

  const result = structuredClone(baseConfig)

  for (const [key, value] of Object.entries(structuredClone(extensionConfig)) as readonly [
    keyof OxlintConfig,
    unknown,
  ][]) {
    if (value === undefined || value === null) {
      /* oxlint-disable-next-line typescript/no-dynamic-delete */
      delete result[key]
      continue
    }

    if (result[key] === undefined) {
      ;(result as any)[key] = value
      continue
    }

    if (Array.isArray(value) && Array.isArray(result[key])) {
      const values = [...new Set([...result[key], ...value])]

      ;(result as any)[key] = key === 'plugins' ? (values as readonly string[]).toSorted() : values

      continue
    }

    ;(result as any)[key] = { ...result[key], ...value }
  }

  return result
}

export function resolvePlugin(name: string, specifier: string): ExternalPluginEntry {
  let resolved = specifier

  try {
    resolved = fileURLToPath(import.meta.resolve(specifier))
  } catch {}

  return { name, specifier: resolved }
}
