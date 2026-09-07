import type { OxlintConfig } from 'oxlint'

import type { OptionsFiles, OptionsOverrides } from '../types.ts'

import { hasNextJs, hasVite } from '../env.ts'
import { GLOB_SRC } from '../globs.ts'

export function react(options: OptionsFiles & OptionsOverrides = {}): OxlintConfig {
  const { files = [GLOB_SRC], overrides = {} } = options

  const isAllowConstantExport = hasVite()
  const isUsingNext = hasNextJs()

  return {
    plugins: ['react'],
    overrides: [
      {
        files,
        rules: {
          'react/button-has-type': 'error',
          'react/checked-requires-onchange-or-readonly': 'error',
          'react/display-name': ['error', { checkContextObjects: true }],
          'react/forbid-component-props': 'off',
          'react/forbid-dom-props': 'off',
          'react/forbid-elements': 'off',
          'react/forward-ref-uses-ref': 'error',
          'react/function-component-definition': [
            'error',
            {
              namedComponents: 'function-declaration',
              unnamedComponents: 'arrow-function',
            },
          ],
          'react/hook-use-state': 'off',
          'react/iframe-missing-sandbox': 'warn',
          'react/jsx-boolean-value': 'error',
          'react/jsx-curly-brace-presence': [
            'error',
            {
              children: 'never',
              propElementValues: 'always',
              props: 'never',
            },
          ],
          'react/jsx-filename-extension': ['error', { extensions: ['.jsx', '.tsx'] }],
          'react/jsx-fragments': 'error',
          'react/jsx-handler-names': 'error',
          'react/jsx-key': 'error',
          'react/jsx-max-depth': 'off',
          'react/jsx-no-comment-textnodes': 'error',
          'react/jsx-no-constructed-context-values': 'error',
          'react/jsx-no-duplicate-props': 'error',
          'react/jsx-no-literals': 'off',
          'react/jsx-no-script-url': 'error',
          'react/jsx-no-target-blank': ['error', { warnOnSpreadAttributes: true }],
          'react/jsx-no-undef': 'error',
          'react/jsx-no-useless-fragment': 'error',
          'react/jsx-pascal-case': ['error', { allowAllCaps: true }],
          'react/jsx-props-no-spread-multi': 'error',
          'react/jsx-props-no-spreading': 'off',
          'react/no-array-index-key': 'warn',
          'react/no-children-prop': 'error',
          'react/no-clone-element': 'warn',
          'react/no-danger-with-children': 'error',
          'react/no-danger': 'error',
          'react/no-did-mount-set-state': 'off',
          'react/no-did-update-set-state': 'off',
          'react/no-direct-mutation-state': 'off',
          'react/no-find-dom-node': 'off',
          'react/no-is-mounted': 'off',
          'react/no-multi-comp': 'off',
          'react/no-namespace': 'error',
          'react/no-object-type-as-default-prop': 'error',
          'react/no-react-children': 'warn',
          'react/no-redundant-should-component-update': 'off',
          'react/no-render-return-value': 'off',
          'react/no-set-state': 'off',
          'react/no-string-refs': 'off',
          'react/no-this-in-sfc': 'off',
          'react/no-unescaped-entities': 'error',
          'react/no-unknown-property': ['error', { requireDataLowercase: true }],
          'react/no-unsafe': 'off',
          'react/no-unstable-nested-components': 'warn',
          'react/no-will-update-set-state': 'off',
          'react/prefer-es6-class': 'off',
          'react/prefer-function-component': 'off',
          'react/react-in-jsx-scope': 'off',
          'react/require-render-return': 'off',
          'react/self-closing-comp': 'error',
          'react/state-in-constructor': 'off',
          'react/style-prop-object': 'error',
          'react/void-dom-elements-no-children': 'error',

          /* React hooks */
          'react/exhaustive-deps': 'error',
          'react/rules-of-hooks': 'error',

          /* React compiler */
          'react/capitalized-calls': 'off',
          'react/error-boundaries': 'error',
          'react/exhaustive-effect-dependencies': 'off',
          'react/globals': 'error',
          'react/hooks': 'off',
          'react/immutability': 'error',
          'react/incompatible-library': 'warn',
          'react/invariant': 'off',
          'react/memo-dependencies': 'off',
          'react/no-deriving-state-in-effects': 'off',
          'react/preserve-manual-memoization': 'error',
          'react/purity': 'error',
          'react/refs': 'error',
          'react/rule-suppression': 'off',
          'react/set-state-in-effect': 'error',
          'react/set-state-in-render': 'error',
          'react/static-components': 'error',
          'react/syntax': 'off',
          'react/todo': 'off',
          'react/unsupported-syntax': 'error',
          'react/use-memo': 'error',
          'react/void-use-memo': 'error',

          /* React refresh */
          'react/only-export-components': [
            'error',
            {
              allowConstantExport: isAllowConstantExport,
              allowExportNames: isUsingNext
                ? [
                    'experimental_ppr',
                    'dynamic',
                    'dynamicParams',
                    'revalidate',
                    'fetchCache',
                    'runtime',
                    'preferredRegion',
                    'maxDuration',
                    'metadata',
                    'generateMetadata',
                    'viewport',
                    'generateViewport',
                    'generateImageMetadata',
                    'generateSitemaps',
                    'generateStaticParams',
                    'instant',
                  ]
                : [],
            },
          ],

          ...overrides,
        },
      },
    ],
  }
}
