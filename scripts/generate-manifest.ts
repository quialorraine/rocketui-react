/**
 * Generates the AI-readable manifest for RocketUI from the docs registry
 * (the single source of truth). Produces two files at the repo root:
 *
 *   - llms.txt   Full component reference (props + usage) for LLM context.
 *   - AGENTS.md  The same reference plus authoring guidelines for agents.
 *
 * Run with: npm run generate:manifest
 * The same registry is intended to back a future MCP server.
 */
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import {
  DOCS,
  GUIDE,
  PICKER,
  PKG,
  type ComponentDoc,
} from "../src/demo/docs-registry";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function titleFromId(id: string): string {
  return id
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

function propsTable(doc: ComponentDoc): string {
  const lines: string[] = [];
  for (const group of doc.api) {
    lines.push(`#### ${group.title}`);
    if (group.description) lines.push("", group.description);
    if (group.props.length > 0) {
      lines.push("", "| Prop | Type | Default | Description |");
      lines.push("| --- | --- | --- | --- |");
      for (const p of group.props) {
        const type = p.type.replace(/\|/g, "\\|");
        const def = (p.default ?? "-").replace(/\|/g, "\\|");
        lines.push(`| \`${p.name}\` | \`${type}\` | \`${def}\` | ${p.description} |`);
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}

function componentSection(id: string, doc: ComponentDoc): string {
  const guide = GUIDE[id];
  const parts: string[] = [];
  parts.push(`### ${titleFromId(id)}`);
  parts.push("");
  if (guide) {
    parts.push(guide.summary);
    parts.push("");
    parts.push(`Use for: ${guide.keywords.join(", ")}.`);
    parts.push("");
  }
  parts.push(`Exports: ${doc.imports.map((n) => `\`${n}\``).join(", ")}`);
  parts.push("");
  parts.push("```tsx");
  parts.push(`import { ${doc.imports.join(", ")} } from "${PKG}";`);
  parts.push("```");
  parts.push("");
  if (doc.api.length > 0) {
    parts.push(propsTable(doc).trimEnd());
    parts.push("");
  }
  parts.push("Usage:");
  parts.push("");
  parts.push("```tsx");
  parts.push(doc.usage.trim());
  parts.push("```");
  return parts.join("\n");
}

const ids = Object.keys(DOCS).sort();
const componentList = ids.map(titleFromId).join(", ");
const reference = ids.map((id) => componentSection(id, DOCS[id])).join("\n\n---\n\n");

/**
 * The selection layer: a task-to-component table plus a one-line summary of
 * every component. Read this before the full reference to route a plain need to
 * the right component instead of rebuilding it from primitives.
 */
function pickerSection(): string {
  const lines: string[] = [];
  lines.push("## Choosing a component");
  lines.push("");
  lines.push(
    "Scan this first. Match the outcome you want to a component before you compose one from primitives; a dedicated component almost always exists.",
  );
  lines.push("");
  lines.push("| Need | Use | Avoid |");
  lines.push("| --- | --- | --- |");
  for (const row of PICKER) {
    lines.push(`| ${row.need} | \`${row.use}\` | ${row.avoid ?? ""} |`);
  }
  lines.push("");
  lines.push("### What each component is for");
  lines.push("");
  for (const id of ids) {
    const guide = GUIDE[id];
    if (guide) lines.push(`- **${titleFromId(id)}**: ${guide.summary}`);
  }
  return lines.join("\n");
}

const PICKER_SECTION = pickerSection();

const INTRO = `RocketUI is a production-ready React + TypeScript component library and
design system, styled with Tailwind CSS v4 and semantic design tokens.

- Package: \`${PKG}\`
- Install: \`npm install ${PKG}\`
- Import the stylesheet once at your app root: \`import "${PKG}/styles.css";\`
- Theming is token-driven: toggle a \`.dark\` class on \`<html>\` for dark mode.

Every component accepts \`className\` (merged via \`cn\`) and forwards native HTML
attributes. Interactive components share the same prop language where relevant:
\`size\`, \`variant\`, \`disabled\`, \`loading\`.`;

const RULES = `## Guidelines for generating UI with RocketUI

1. Only use components exported from \`${PKG}\`. Do not invent components or props
   that are not listed in the reference below.
2. Import components from \`${PKG}\` and import \`${PKG}/styles.css\` once at the
   app root.
3. Never hardcode colours. Use semantic Tailwind token classes (\`bg-background\`,
   \`bg-card\`, \`text-foreground\`, \`text-muted-foreground\`, \`border-border\`,
   \`bg-primary\`, \`text-primary-foreground\`, \`bg-muted\`, \`bg-accent\`,
   \`text-destructive\`, \`text-success\`, \`text-warning\`) so light/dark theming
   keeps working.
4. Compose layouts with utility classes; prefer the \`Card\` and \`Surface\`
   components as containers.
5. Respect each component's documented prop types and defaults exactly.
6. Before composing a pattern from primitives, check "Choosing a component"
   below. A dedicated component usually already exists. For example, use
   \`SearchField\` for a search box rather than a \`Button\` or bare \`Input\`.
7. For status labels, use \`Chip\` with a semantic color (\`success\`, \`warning\`,
   \`destructive\`, \`info\`) so states read as distinct. Do not map every status
   to the neutral gray color.

## Styling & layout (important)

\`${PKG}/styles.css\` is precompiled and ships a curated safelist of layout
utilities, so you can build screens **without setting up Tailwind**. Available
out of the box (including \`sm:\`/\`md:\`/\`lg:\` variants for the layout ones):

- Display & flex: \`flex\`, \`grid\`, \`hidden\`, \`flex-row\`, \`flex-col\`,
  \`flex-wrap\`, \`items-*\`, \`justify-*\`, \`self-*\`, \`place-*\`
- Grid: \`grid-cols-1\` to \`grid-cols-12\`, \`col-span-*\`, \`grid-rows-*\`, \`row-span-*\`
- Spacing: \`gap-*\`, \`p*-*\`, \`m*-*\`, \`space-x-*\`, \`space-y-*\`
- Sizing: \`w-full\`, \`w-1/2\`, \`h-full\`, \`h-screen\`, \`min-h-screen\`, \`size-*\`,
  \`max-w-xs\` to \`max-w-7xl\`
- Typography: \`text-xs\` to \`text-6xl\`, \`font-medium/semibold/bold\`,
  \`text-left/center/right\`, \`leading-*\`, \`tracking-*\`, \`truncate\`
- Position/effects: \`relative\`, \`absolute\`, \`sticky\`, \`inset-0\`, \`z-*\`,
  \`overflow-*\`, \`rounded-*\`, \`border*\`, \`shadow-*\`
- Token colours: \`bg-*\`, \`text-*\`, \`border-*\` for every semantic token.

Rules:
- Stick to these standard utilities. **Arbitrary values** like
  \`grid-cols-[220px_1fr]\`, \`w-[240px]\`, \`text-[13px]\`, \`p-[18px]\` are NOT in the
  precompiled CSS and will silently do nothing in zero-config mode.

### Two ways to use

**Mode A — zero-config (default).** Import the precompiled stylesheet once and
you are done. Best for quick prototypes and AI-generated screens:

\`\`\`ts
import "${PKG}/styles.css";
\`\`\`

You get every component style, the design tokens, and the layout safelist above.

**Mode B — Tailwind project (full power).** If the app already uses Tailwind
CSS v4 (or you need arbitrary values), do NOT import \`styles.css\`. Instead pull
the tokens into your own Tailwind entry and let Tailwind scan the package:

\`\`\`css
@import "tailwindcss";
@import "${PKG}/theme.css";
@source "../node_modules/${PKG}/dist";
\`\`\`

Now the full Tailwind utility set (including arbitrary values) works, the
semantic token colours resolve, and only the classes you actually use are
generated.

## Available components

${componentList}.`;

const llms = `# RocketUI

${INTRO}

${PICKER_SECTION}

## Components

${reference}
`;

const agents = `# RocketUI Agent Guide

${INTRO}

${RULES}

${PICKER_SECTION}

## Component reference

${reference}
`;

writeFileSync(resolve(ROOT, "llms.txt"), llms, "utf8");
writeFileSync(resolve(ROOT, "AGENTS.md"), agents, "utf8");

console.log(
  `Generated llms.txt and AGENTS.md for ${ids.length} components:\n  ${componentList}`,
);
