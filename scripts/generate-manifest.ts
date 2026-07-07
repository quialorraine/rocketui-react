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
import { DOCS, PKG, type ComponentDoc } from "../src/demo/docs-registry";

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
        const def = (p.default ?? "—").replace(/\|/g, "\\|");
        lines.push(`| \`${p.name}\` | \`${type}\` | \`${def}\` | ${p.description} |`);
      }
    }
    lines.push("");
  }
  return lines.join("\n");
}

function componentSection(id: string, doc: ComponentDoc): string {
  const parts: string[] = [];
  parts.push(`### ${titleFromId(id)}`);
  parts.push("");
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

## Available components

${componentList}.`;

const llms = `# RocketUI

${INTRO}

## Components

${reference}
`;

const agents = `# RocketUI — Agent Guide

${INTRO}

${RULES}

## Component reference

${reference}
`;

writeFileSync(resolve(ROOT, "llms.txt"), llms, "utf8");
writeFileSync(resolve(ROOT, "AGENTS.md"), agents, "utf8");

console.log(
  `Generated llms.txt and AGENTS.md for ${ids.length} components:\n  ${componentList}`,
);
