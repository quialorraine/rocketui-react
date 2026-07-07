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
import { readFileSync, writeFileSync } from "node:fs";
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
RocketUI. React component library and design system.

Usage:
  npx ${pkg.name} <command>

Commands:
  init               Add the RocketUI reference to ./AGENTS.md so your
                     coding agent uses the real API automatically
  list, components   List all available components
  llms               Print the AI manifest (llms.txt) for piping into an agent
  agents             Print the agent guide (AGENTS.md)
  version            Print the package version
  help               Show this help

Install:
  npm install ${pkg.name}
  import "${pkg.name}/styles.css";
`);
}

const MARK_START = "<!-- rocketui:start -->";
const MARK_END = "<!-- rocketui:end -->";

switch (cmd) {
  case "init": {
    const src = read("AGENTS.md");
    if (!src) {
      console.error("AGENTS.md not found inside the package.");
      process.exit(1);
    }
    const block = `${MARK_START}\n${src.trim()}\n${MARK_END}\n`;
    const target = join(process.cwd(), "AGENTS.md");
    let existing = null;
    try {
      existing = readFileSync(target, "utf8");
    } catch {
      /* no existing file */
    }
    if (existing == null) {
      writeFileSync(target, block);
      console.log("Created AGENTS.md with the RocketUI component reference.");
    } else if (existing.includes(MARK_START) && existing.includes(MARK_END)) {
      const re = new RegExp(`${MARK_START}[\\s\\S]*?${MARK_END}\\n?`);
      writeFileSync(target, existing.replace(re, block));
      console.log("Updated the RocketUI section in AGENTS.md.");
    } else {
      writeFileSync(target, existing.trimEnd() + "\n\n" + block);
      console.log("Appended the RocketUI component reference to AGENTS.md.");
    }
    console.log(
      "Your coding agent will now read the RocketUI API from AGENTS.md automatically.",
    );
    break;
  }
  case "list":
  case "components": {
    const names = listComponents();
    console.log(`${pkg.name}: ${names.length} components:\n`);
    for (const n of names) console.log("  - " + n);
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
