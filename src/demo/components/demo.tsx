import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import { CaretDown, Sparkle } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { CodeBlock } from "./code-block";
import type { CodeLang } from "../lib/highlighter";

export interface DemoProps {
  children: ReactNode;
  /** Source code shown under the preview. */
  code?: string;
  lang?: CodeLang;
  /** Small caption shown above the preview. */
  label?: string;
  /** @deprecated Previews are always centred to match the docs design. */
  align?: "center" | "start";
  /** Extra classes for the preview surface. */
  className?: string;
  /** Lock the code behind a "Get Premium" call to action (paid content). */
  premium?: boolean;
}

/**
 * A single example: a live preview on a muted surface with the collapsible
 * source code underneath — mirrors the docs design (preview → divider →
 * "Expand code").
 */
export function Demo({
  children,
  code,
  lang = "tsx",
  label,
  className,
  premium = false,
}: DemoProps) {
  const [expanded, setExpanded] = useState(false);
  const [collapsible, setCollapsible] = useState(false);
  // Until we've measured the snippet, render collapsed with no transition so
  // tall examples never flash open and animate closed on first paint.
  const [measured, setMeasured] = useState(false);
  const codeRef = useRef<HTMLDivElement>(null);

  // Collapsed peek height (≈ 3 lines). Matches the design's gradient fade.
  const COLLAPSED = 104;

  // Only collapse when the snippet is actually taller than the peek — short,
  // single-line examples show in full without an "Expand code" control.
  useLayoutEffect(() => {
    const el = codeRef.current;
    if (el) setCollapsible(el.scrollHeight > COLLAPSED + 8);
    setMeasured(true);
  }, [code]);

  // Premium content stays locked: never expands, always shows the peek + CTA.
  const isCollapsed = premium || !measured || (collapsible && !expanded);

  return (
    <div className="rounded-xl bg-muted">
      {label && (
        <span className="block px-4 pt-3 text-xs font-medium text-muted-foreground">
          {label}
        </span>
      )}

      {/* overflow-visible so open dropdowns/popovers aren't clipped by the card */}
      <div
        className={cn(
          "flex min-h-[9rem] flex-wrap items-center justify-center gap-4 p-8",
          className,
        )}
      >
        {children}
      </div>

      {code && (
        <div className="relative border-t border-border/70">
          {/* Clipping wrapper: rounds the card's bottom and hides collapsed code. */}
          <div
            ref={codeRef}
            className={cn(
              "relative overflow-hidden rounded-b-xl",
              measured && "transition-[max-height] duration-300 ease-out",
            )}
            style={{
              maxHeight: isCollapsed
                ? COLLAPSED
                : (codeRef.current?.scrollHeight ?? 2000),
            }}
          >
            <CodeBlock
              code={code}
              lang={lang}
              numbered
              hideCopy={premium}
              className="[&_.code-block]:rounded-none [&_.code-block]:bg-transparent"
            />
            {isCollapsed && (
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-muted via-muted/80 to-transparent" />
            )}
          </div>

          {/* Premium content is locked behind a paid call to action. */}
          {premium ? (
            <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
              <button
                type="button"
                className="pointer-events-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0px_4px_10px_rgba(0,0,0,0.12)] transition-colors hover:bg-primary/90"
              >
                <Sparkle weight="fill" className="size-[18px]" />
                Get Premium
              </button>
            </div>
          ) : (
            collapsible &&
            !expanded && (
              <div className="pointer-events-none absolute inset-x-0 bottom-4 flex justify-center">
                <button
                  type="button"
                  onClick={() => setExpanded(true)}
                  className="pointer-events-auto inline-flex h-10 items-center gap-1.5 rounded-full bg-card px-4 text-sm font-medium text-foreground shadow-[0px_4px_10px_rgba(0,0,0,0.08)] transition-colors hover:bg-muted"
                >
                  <CaretDown weight="bold" className="size-5" />
                  Expand code
                </button>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
}
Demo.displayName = "Demo";

/**
 * One example per row, full width — the docs design shows a single stacked
 * column of example cards (never a multi-column grid). The `cols` prop is kept
 * for backwards compatibility but no longer splits examples into columns.
 */
export function DemoGrid({ children }: { children: ReactNode; cols?: 1 | 2 | 3 }) {
  return <div className="flex flex-col gap-[30px]">{children}</div>;
}
DemoGrid.displayName = "DemoGrid";
