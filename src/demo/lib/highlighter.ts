import { createHighlighterCore, type HighlighterCore } from "shiki/core";
import { createJavaScriptRegexEngine } from "shiki/engine/javascript";
import tsx from "shiki/langs/tsx.mjs";
import typescript from "shiki/langs/typescript.mjs";
import bash from "shiki/langs/bash.mjs";
import css from "shiki/langs/css.mjs";
import githubLight from "shiki/themes/github-light.mjs";
import githubDark from "shiki/themes/github-dark-default.mjs";

let highlighterPromise: Promise<HighlighterCore> | null = null;

const LIGHT = "github-light";
const DARK = "github-dark-default";

function getHighlighter(): Promise<HighlighterCore> {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighterCore({
      themes: [githubLight, githubDark],
      langs: [tsx, typescript, bash, css],
      engine: createJavaScriptRegexEngine(),
    });
  }
  return highlighterPromise;
}

export type CodeLang = "tsx" | "typescript" | "bash" | "css";

/** Highlight code into dual-theme HTML (light/dark via CSS variables). */
export async function highlight(code: string, lang: CodeLang = "tsx"): Promise<string> {
  const highlighter = await getHighlighter();
  return highlighter.codeToHtml(code, {
    lang,
    themes: { light: LIGHT, dark: DARK },
    defaultColor: false,
  });
}
