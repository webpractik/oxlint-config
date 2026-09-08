import type { OxlintConfig } from 'oxlint'

import { GLOB_EXCLUDE, GLOB_TS, GLOB_TSX } from '../globs.ts'

export function ignores(
  userIgnores: ((originals: string[]) => string[]) | string[] = [],
  ignoreTypeScript = false,
): OxlintConfig {
  let resolvedIgnores = [...GLOB_EXCLUDE]

  if (ignoreTypeScript) {
    resolvedIgnores.push(GLOB_TS, GLOB_TSX)
  }

  resolvedIgnores =
    typeof userIgnores === 'function'
      ? userIgnores(resolvedIgnores)
      : [...resolvedIgnores, ...userIgnores]

  return {
    ignorePatterns: resolvedIgnores,
  }
}
