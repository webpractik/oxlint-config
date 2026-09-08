import type { ESTree } from '@oxlint/plugins'

import { defineRule, eslintCompatPlugin } from '@oxlint/plugins'

const DEFAULT_MAXIMUM_STATEMENTS = 1

interface Options {
  maximumStatements?: number
}

function isLonelyIfStatement(
  statement: ESTree.Directive | ESTree.Statement,
): statement is ESTree.IfStatement {
  return statement.type === 'IfStatement' && statement.alternate == null
}

const rule = defineRule({
  meta: {
    type: 'suggestion',
    docs: {
      description:
        'Prefer early returns over full-body conditional wrapping in function declarations.',
      recommended: false,
      url: 'https://github.com/Shopify/web-configs/blob/main/packages/eslint-plugin/docs/rules/prefer-early-return.md',
    },
    schema: [
      {
        type: 'object',
        properties: {
          maximumStatements: { type: 'integer', minimum: 0 },
        },
        additionalProperties: false,
      },
    ],
    defaultOptions: [{ maximumStatements: DEFAULT_MAXIMUM_STATEMENTS }],
    messages: {
      preferEarlyReturn: 'Prefer an early return to a conditionally-wrapped function body',
    },
  },
  createOnce(context) {
    let maxStatements = DEFAULT_MAXIMUM_STATEMENTS

    function isOffendingConsequent(consequent: ESTree.Statement): boolean {
      return (
        (consequent.type === 'ExpressionStatement' && maxStatements === 0) ||
        (consequent.type === 'BlockStatement' && consequent.body.length > maxStatements)
      )
    }

    function isOffendingIfStatement(statement: ESTree.Directive | ESTree.Statement): boolean {
      return isLonelyIfStatement(statement) && isOffendingConsequent(statement.consequent)
    }

    function checkFunctionBody({ body }: ESTree.ArrowFunctionExpression | ESTree.Function): void {
      if (
        body != null &&
        body.type === 'BlockStatement' &&
        body.body.length === 1 &&
        isOffendingIfStatement(body.body[0]!)
      ) {
        context.report({ node: body, messageId: 'preferEarlyReturn' })
      }
    }

    return {
      before() {
        const options = (context.options[0] ?? {}) as Options
        maxStatements = options.maximumStatements ?? DEFAULT_MAXIMUM_STATEMENTS
      },
      FunctionDeclaration: checkFunctionBody,
      FunctionExpression: checkFunctionBody,
      ArrowFunctionExpression: checkFunctionBody,
    }
  },
})

const plugin = eslintCompatPlugin({
  meta: {
    name: 'prefer-early-return',
  },
  rules: {
    'prefer-early-return': rule,
  },
})

export default plugin
