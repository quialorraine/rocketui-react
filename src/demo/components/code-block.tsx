import { useEffect, useState } from "react";
import { Check, Copy } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { highlight, type CodeLang } from "../lib/highlighter";

export interface CodeBlockProps {
  code: string;
  lang?: CodeLang;
  className?: string;
  /** Show a "1." line-number gutter, matching the docs code boxes. */
  numbered?: boolean;
  /** Hide the copy-to-clipboard button (e.g. for locked premium code). */
  hideCopy?: boolean;
}

export function CodeBlock({ code, lang = "tsx", className, numbered = false, hideCopy = false }: CodeBlockProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    let active = true;
    highlight(code, lang).then((result) => {
      if (active) setHtml(result);
    });
    return () => {
      active = false;
    };
  }, [code, lang]);

  const copy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className={cn("group relative", numbered && "code-numbered", className)}>
      {!hideCopy && (
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Copied" : "Copy code"}
          className={cn(
            "absolute right-2.5 top-2.5 z-10 grid size-[34px] place-items-center rounded-full bg-card text-muted-foreground shadow-sm transition-colors",
            "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
          )}
        >
          {copied ? (
            <Check className="size-[18px] text-success" weight="bold" />
          ) : (
            <Copy className="size-[18px]" />
          )}
        </button>
      )}
      {html ? (
        <div
          className="code-block overflow-x-auto rounded-xl bg-muted p-4 text-sm [&_pre]:!bg-transparent [&_pre]:!outline-none"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      ) : (
        <pre className="code-block overflow-x-auto rounded-xl bg-muted p-4 text-sm text-muted-foreground">
          <code>{code}</code>
        </pre>
      )}
    </div>
  );
}
CodeBlock.displayName = "CodeBlock";
