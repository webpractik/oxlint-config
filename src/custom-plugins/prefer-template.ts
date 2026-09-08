import { defineRule, eslintCompatPlugin } from '@oxlint/plugins'

const rule = defineRule({
  meta: { type: 'suggestion', fixable: 'code', schema: [] },
  createOnce(context) {
    return {
      JSXAttribute(node) {
        if (node.name.type !== 'JSXIdentifier' || node.name.name !== 'className') {
          return
        }

        if (
          node.value?.type === 'Literal' &&
          typeof node.value.value === 'string' &&
          node.value.value.includes('\n')
        ) {
          const raw = node.value.value

          context.report({
            node: node.value,
            message:
              'Multiline className strings can cause hydration errors.' +
              ' Use a template literal/expression instead.',
            fix(fixer) {
              const escaped = raw
                .replaceAll('\\', String.raw`\\`)
                .replaceAll('`', '\\`')
                .replaceAll('${', '\\${')
              return fixer.replaceText(node.value!, `{\`${escaped}\`}`)
            },
          })
        }
      },
    }
  },
})

const plugin = eslintCompatPlugin({
  meta: {
    name: 'prefer-template',
  },
  rules: {
    'multiline-classname': rule,
  },
})

export default plugin
