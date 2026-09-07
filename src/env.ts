function isPackageExists(name: string): boolean {
  try {
    import.meta.resolve(name)
    return true
  } catch {
    return false
  }
}

export const hasTypeScript = (): boolean => isPackageExists('typescript')
export const hasVite = (): boolean => isPackageExists('vite')
export const hasReact = (): boolean => isPackageExists('react')
export const hasNextJs = (): boolean => isPackageExists('next')

export function isInEditorEnv(): boolean {
  if (process.env.CI) {
    return false
  }

  if (isInGitHooksOrLintStaged()) {
    return false
  }
  return !!(
    process.env.VSCODE_PID ||
    process.env.VSCODE_CWD ||
    process.env.JETBRAINS_IDE ||
    process.env.VIM ||
    process.env.NVIM ||
    (process.env.ZED_ENVIRONMENT && !process.env.ZED_TERM)
  )
}

export function isInGitHooksOrLintStaged(): boolean {
  return !!(
    process.env.GIT_PARAMS ||
    process.env.VSCODE_GIT_COMMAND ||
    process.env.npm_lifecycle_script?.startsWith('lint-staged')
  )
}
