#!/usr/bin/env node
/**
 * RocketUI CLI.
 *
 * Prints component info and the AI manifest so you can pipe it straight into an
 * agent. Runs from the published package with no extra dependencies.
 *
 *   npx @rocketui-react/core list
 *   npx @rocketui-react/core llms | pbcopy
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (file) => {
  try {
    return readFileSync(join(root, file), "utf8");
  } catch {
    return null;
  }
};

const pkg = JSON.parse(read("package.json") || "{}");
const cmd = (process.argv[2] || "help").toLowerCase();

function listComponents() {
  const txt = read("llms.txt") || "";
  const names = [];
  let inComponents = false;
  for (const line of txt.split("\n")) {
    if (line.startsWith("## Components")) {
      inComponents = true;
      continue;
    }
    if (inComponents && line.startsWith("### ")) names.push(line.slice(4).trim());
  }
  return names;
}

function help() {
  console.log(`${pkg.name} v${pkg.version}
RocketUI — React component library & design system.

Usage:
  npx ${pkg.name} <command>

Commands:
  list, components   List all available components
  llms               Print the AI manifest (llms.txt) — pipe into an agent
  agents             Print the agent guide (AGENTS.md)
  version            Print the package version
  help               Show this help

Install:
  npm install ${pkg.name}
  import "${pkg.name}/styles.css";
`);
}

switch (cmd) {
  case "list":
  case "components": {
    const names = listComponents();
    console.log(`${pkg.name} — ${names.length} components:\n`);
    for (const n of names) console.log("  \u2022 " + n);
    console.log(`\nImport: import { Button } from "${pkg.name}";`);
    break;
  }
  case "llms":
    process.stdout.write(read("llms.txt") || "llms.txt not found\n");
    break;
  case "agents":
    process.stdout.write(read("AGENTS.md") || "AGENTS.md not found\n");
    break;
  case "version":
  case "--version":
  case "-v":
    console.log(pkg.version);
    break;
  default:
    help();
}
