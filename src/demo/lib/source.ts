/**
 * Extract a named region from a raw source file so demos can display the exact
 * code that renders them. Wrap the snippet in the source with:
 *
 *   // #region name
 *   ...jsx...
 *   // #endregion
 *
 * and pass `region(raw, "name")` as the demo's `code`.
 */
export function region(source: string, name: string): string {
  const lines = source.split("\n");
  const start = lines.findIndex((l) => l.trim() === `// #region ${name}`);
  if (start === -1) return "";

  const body: string[] = [];
  for (let i = start + 1; i < lines.length; i += 1) {
    const line = lines[i];
    if (line.trim() === "// #endregion" || line.trim() === `// #endregion ${name}`) {
      break;
    }
    body.push(line);
  }

  return dedent(body).join("\n").trim();
}

/** Remove the common leading whitespace shared by every non-empty line. */
function dedent(lines: string[]): string[] {
  const indents = lines
    .filter((l) => l.trim().length > 0)
    .map((l) => l.match(/^\s*/)?.[0].length ?? 0);
  const min = indents.length ? Math.min(...indents) : 0;
  return lines.map((l) => l.slice(min));
}
