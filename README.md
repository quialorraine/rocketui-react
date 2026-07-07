# RocketUI

[![npm version](https://img.shields.io/npm/v/@rocketui-react/core.svg)](https://www.npmjs.com/package/@rocketui-react/core)
[![license](https://img.shields.io/npm/l/@rocketui-react/core.svg)](./LICENSE)

A production-ready React + TypeScript component library and design system,
styled with Tailwind CSS v4 and driven entirely by semantic design tokens.

- 35+ accessible, composable components
- Token-based theming with built-in light/dark mode
- Small, consistent prop language (`size`, `variant`, `disabled`, `loading`, `className`)
- Ships an AI-readable manifest so agents can generate UIs from the real API

## Installation

```bash
npm install @rocketui-react/core
```

Import the stylesheet once at the root of your app:

```tsx
import "@rocketui-react/core/styles.css";
```

## Usage

```tsx
import { Card, Button, Badge } from "@rocketui-react/core";

export function Example() {
  return (
    <Card className="p-6">
      <Badge color="success">New</Badge>
      <Button variant="solid">Get started</Button>
    </Card>
  );
}
```

## Theming

Theming is CSS-variable based. Override the tokens on `:root` and toggle a
`.dark` class on `<html>` to switch modes:

```css
:root {
  --primary: #3873ff;
  --background: #f4f4f5;
  --foreground: #18181b;
}

.dark {
  --primary: #4c82ff;
  --background: #09090b;
  --foreground: #fafafa;
}
```

Always style with the semantic token utilities (`bg-card`, `text-foreground`,
`text-muted-foreground`, `border-border`, `bg-primary`, and so on) rather than
hardcoded colours, so themes keep working.

## Using with AI agents

The package ships two generated files that describe the entire component API in
a machine-readable form:

- **`llms.txt`**: the full component reference (exports, props, usage) meant to
  be fed into a model's context.
- **`AGENTS.md`**: the same reference plus authoring guidelines and a
  "Choosing a component" table that routes a plain need to the right component.

The fastest setup is two commands. Install, then run `init`, which drops the
reference into your project:

```bash
npm install @rocketui-react/core
npx @rocketui-react/core init
```

`init` writes (or merges into) an `AGENTS.md` file at the root of your project.
`AGENTS.md` is the open convention that coding agents read automatically.
Existing files are merged, not overwritten, and re-running is safe.

After that, just prompt your agent, for example: *"build a mini dashboard using
RocketUI components"*. Because the agent sees the exact exports, prop types, and
which component fits each need, it composes UIs against the real API instead of
guessing.

Both files are generated from a single source of truth
(`src/demo/docs-registry.ts`), which is also intended to back a future MCP
server. Regenerate them with:

```bash
npm run generate:manifest
```

### CLI

The package ships a small CLI, handy for inspecting the library or piping the
manifest into an agent:

```bash
npx @rocketui-react/core init     # add the reference to ./AGENTS.md
npx @rocketui-react/core list     # list all components
npx @rocketui-react/core llms     # print llms.txt (pipe into an agent)
npx @rocketui-react/core agents   # print AGENTS.md
```

## Development

```bash
npm run dev            # run the docs site
npm run typecheck      # type-check the project
npm run build:lib      # build the publishable package into dist/
npm run generate:manifest  # regenerate llms.txt and AGENTS.md
```

## License

MIT
