# @webpractik/oxlint-config

Общий конфиг [oxlint](https://oxc.rs/docs/guide/usage/linter.html) для проектов Webpractik.

Вдохновлён [`@antfu/eslint-config`](https://github.com/antfu/eslint-config), но собран целиком на инструментах экосистемы [Oxc](https://oxc.rs/): линтинг — `oxlint`, форматирование — [`oxfmt`](https://www.npmjs.com/package/oxfmt).

## Особенности

- Одна функция-фабрика `defineOxlintConfig()` — конфиг описывается TypeScript-файлом с автодополнением и типами.
- **Автоопределение стека**: TypeScript, React, Next.js, Storybook подключаются сами, если найдены соответствующие зависимости.
- **Type-aware правила** TypeScript включаются одной опцией `tsconfigPath` (через `oxlint-tsgolint`).
- Форматирование не входит в конфиг — за него отвечает `oxfmt`, поэтому нет конфликтов «линтер против форматтера».
- Большой набор предподключённых плагинов: `typescript`, `import`, `unicorn`, `oxc`, `promise`, `node`, `regexp`, `perfectionist`, `@stylistic`, `de-morgan`, `sonarjs`, `vitest`, `no-only-tests`, `react`, `nextjs`, `jsx-a11y`, `better-tailwindcss`, `storybook`, `slop`.
- Несколько собственных плагинов oxlint: `prefer-early-return`, `prefer-template`, `sonarjs`.
- Часть шумных в редакторе правил автоматически глушится при запуске из IDE.
- Каждый блок правил можно точечно включить, выключить или переопределить.

> [!NOTE]
> Это внутренний конфиг команды. Он отражает наши договорённости по стилю кода и может меняться в мажорных версиях. Если нужен нейтральный конфиг — берите его как отправную точку и переопределяйте под себя.

## Установка

```bash
# oxlint и type-aware движок — обязательные peer-зависимости
npm i -D @webpractik/oxlint-config oxlint oxlint-tsgolint
```

Опциональные плагины ставятся только если включаете соответствующие блоки:

```bash
npm i -D eslint-plugin-storybook            # storybook: true
```

## Использование

Создайте `oxlint.config.ts` в корне проекта:

```ts
import { defineOxlintConfig } from '@webpractik/oxlint-config'

export default defineOxlintConfig()
```

С опциями:

```ts
import { defineOxlintConfig } from '@webpractik/oxlint-config'

export default defineOxlintConfig({
  type: 'app', // 'app' | 'lib'
  typescript: {
    tsconfigPath: './tsconfig.json', // включает type-aware правила
  },
  antislop: true,
})
```

Скрипты в `package.json`:

```jsonc
{
  "scripts": {
    "lint": "oxlint",
    "lint:fix": "oxlint --fix",
    "fmt": "oxfmt",
  },
}
```

### Форматирование

Форматированием занимается `oxfmt` — отдельно от линтера. Добавьте `oxfmt.config.ts`:

```ts
import { defineConfig } from 'oxfmt'

export default defineConfig({
  printWidth: 100,
  semi: false,
  singleQuote: true,
})
```

## Настройка редактора

<details>
<summary>VS Code</summary>

Установите расширение [Oxc](https://marketplace.visualstudio.com/items?itemName=oxc.oxc-vscode) и добавьте в `.vscode/settings.json`:

```jsonc
{
  "oxc.enable": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.oxc": "explicit",
  },
}
```

Форматирование `oxfmt` пока запускайте отдельным скриптом (`npm run fmt`).

</details>

<details>
<summary>Zed</summary>

`.zed/settings.json` (уже есть в этом репозитории):

```jsonc
{
  "format_on_save": "on",
  "formatter": { "language_server": { "name": "oxfmt" } },
  "languages": {
    "TypeScript": {
      "code_actions_on_format": { "source.fixAll.oxc": true },
    },
    "TSX": {
      "code_actions_on_format": { "source.fixAll.oxc": true },
    },
    "JavaScript": {
      "code_actions_on_format": { "source.fixAll.oxc": true },
    },
  },
}
```

</details>

## Опции

Все опции необязательны. Значение `по умолчанию` в скобках.

| Опция           | Тип                                                   | Описание                                                         |
| --------------- | ----------------------------------------------------- | ---------------------------------------------------------------- |
| `type`          | `'app' \| 'lib'` (`'app'`)                            | Для `lib` включает `explicit-function-return-type`.              |
| `typescript`    | `boolean \| object` (автоопределение по `typescript`) | Правила TS. Объект с `tsconfigPath` включает type-aware линтинг. |
| `react`         | `boolean \| object` (автоопределение по `react`)      | Правила React.                                                   |
| `nextjs`        | `boolean \| object` (автоопределение по `next`)       | Правила Next.js.                                                 |
| `storybook`     | `boolean \| object` (автоопределение по `storybook`)  | Требует `eslint-plugin-storybook`.                               |
| `tailwindcss`   | `boolean \| object` (`true`)                          | Правила `tailwindcss`. Рекомендуется задать `entryPoint`.        |
| `antislop`      | `boolean \| object` (`false`)                         | Правила `eslint-plugin-slop` против «AI-шума».                   |
| `jsxA11y`       | `boolean \| object` (`false`)                         | Правила доступности JSX.                                         |
| `stylistic`     | `boolean \| object` (`true`)                          | Стилистические правила `@stylistic` (не заменяют `oxfmt`).       |
| `imports`       | `boolean \| object` (`true`)                          | Плагин `import`.                                                 |
| `unicorn`       | `boolean \| object` (`true`)                          | Плагин `unicorn`.                                                |
| `perfectionist` | `boolean \| object` (`true`)                          | Сортировка объектов/импортов и т.д.                              |
| `sonarjs`       | `boolean \| object` (`true`)                          | Собственный плагин `sonarjs`.                                    |
| `regexp`        | `boolean \| object` (`true`)                          | Плагин `regexp`.                                                 |
| `promise`       | `boolean` (`true`)                                    | Плагин `promise`.                                                |
| `node`          | `boolean` (`true`)                                    | Правила Node.js.                                                 |
| `deMorgan`      | `boolean` (`true`)                                    | Плагин `de-morgan`.                                              |
| `oxc`           | `boolean \| object` (`true`)                          | Правила плагина `oxc`.                                           |
| `test`          | `boolean \| object` (`true`)                          | Правила `vitest` + `no-only-tests` для тестовых файлов.          |
| `isInEditor`    | `boolean` (автоопределение)                           | Глушит часть правил при запуске из IDE.                          |
| `ignores`       | `string[] \| (originals) => string[]` (`[]`)          | Расширить/изменить глобальные игноры.                            |

## Переопределение правил

Для конкретного блока передайте объект с ключом `overrides`:

```ts
export default defineOxlintConfig({
  typescript: {
    overrides: {
      'typescript/no-explicit-any': 'error',
    },
  },
  react: {
    overrides: {
      'react/prop-types': 'off',
    },
  },
})
```

Type-aware правила переопределяются отдельно через `overridesTypeAware`:

```ts
export default defineOxlintConfig({
  typescript: {
    tsconfigPath: './tsconfig.json',
    overridesTypeAware: {
      'typescript/no-floating-promises': 'warn',
    },
  },
})
```

Произвольные ключи конфига oxlint (`rules`, `plugins`, `settings`, `globals`, `env`, `overrides`, `jsPlugins`, `options`) можно передать прямо в первый аргумент, а дополнительные конфиги — следующими аргументами:

```ts
export default defineOxlintConfig(
  {
    rules: {
      'no-console': 'warn',
    },
  },
  {
    overrides: [{ files: ['scripts/**/*.ts'], rules: { 'no-console': 'off' } }],
  },
)
```

## Собственные плагины

Плагины публикуются как отдельные сабпаки и уже подключены фабрикой, но их можно импортировать напрямую:

```ts
import preferEarlyReturn from '@webpractik/oxlint-config/custom-plugins/prefer-early-return'
import preferTemplate from '@webpractik/oxlint-config/custom-plugins/prefer-template'
import sonarjs from '@webpractik/oxlint-config/custom-plugins/sonarjs'
```

## Требования

- Node.js с поддержкой `import.meta.resolve` (Node 20+).
- `oxlint` >= 1.80, `oxlint-tsgolint` >= 7 — для type-aware линтинга.
