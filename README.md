# lezer-template-json

[![npm](https://img.shields.io/npm/v/lezer-template-json)](https://www.npmjs.com/package/lezer-template-json/v/latest) [![npm bundle size](https://img.shields.io/bundlephobia/minzip/lezer-template-json)](https://www.npmjs.com/package/lezer-template-json/v/latest) [![jsDelivr hits](https://img.shields.io/jsdelivr/npm/hm/lezer-template-json?color=%23ff5627)](https://cdn.jsdelivr.net/npm/lezer-template-json@latest/)

A [Lezer](https://lezer.codemirror.net/) grammar for parsing template JSON (JSON with `{{variable}}` holes) with incremental parsing support and TypeScript definitions.

## Install

```bash
npm i lezer-template-json
```

## Features

- Supports parsing template JSON with `{{variable}}` syntax

## Usage

### Basic

```ts
import { parser } from "lezer-template-json";

const tree = parser.parse(`{
  "name": {{name}},
  "age": {{age}},
  "nested": {
    "value": {{value}}
  }
}`);
console.log(tree.toString());
```

### With CodeMirror

```ts
import { parser, templateJsonHighlighting } from "lezer-template-json";
import { LRLanguage } from "@codemirror/language";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";

const templateJsonLanguage = LRLanguage.define({
  parser,
  languageData: { name: "template-json" },
});

const highlightStyle = HighlightStyle.define([templateJsonHighlighting]);
const extensions = [templateJsonLanguage, syntaxHighlighting(highlightStyle)];
```

### Tree Navigation

```ts
import { parser } from "lezer-template-json";
import * as terms from "lezer-template-json";

const tree = parser.parse(`{
  "name": {{name}},
  "age": {{age}}
}`);
const cursor = tree.cursor();
while (cursor.next()) {
  if (cursor.type.id === terms.Variable) {
    console.log(`Found variable: ${cursor.node.name}`);
  }
}
```

### Error Handling

```ts
import { parser } from "lezer-template-json";

function parseWithErrors(pattern: string) {
  const tree = parser.parse(pattern);
  const errors: any[] = [];

  tree.cursor().iterate((node) => {
    if (node.type.isError) {
      errors.push({
        from: node.from,
        to: node.to,
        message: `Syntax error at ${node.from}-${node.to}`,
      });
    }
  });

  return { tree, errors };
}
```

## API

### Exports

- `parser` - Lezer parser instance
- `templateJsonHighlighting` - CodeMirror syntax highlighting
- Grammar terms - Node type constants for tree navigation

### Types

```ts
parser.parse(input: string, fragments?: TreeFragment[], ranges?: {from: number, to: number}[]): Tree
```

## Development

```bash
git clone https://github.com/Sec-ant/lezer-template-json
cd lezer-template-json
pnpm install
pnpm build
pnpm test
```

Commands:

- `pnpm test:run` - Run all tests
- `pnpm test:ui` - Interactive test UI

## Contributing

1. Fork the repository
2. Create a feature branch
3. Add tests in `tests/fixtures/`
4. Ensure tests pass
5. Submit a pull request

## License

MIT
