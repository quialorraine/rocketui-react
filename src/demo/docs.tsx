import { useEffect, useState, type ReactNode } from "react";
import { Moon, Sun } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import {
  ApiReference,
  DocActions,
  InstallationCli,
  Usage,
} from "./components/doc-sections";
import { DOCS, PKG, importCodeFor, sourceUrlFor } from "./docs-registry";

/** Top-level component entry: heading + description + docs + examples. */
export function ComponentPage({
  id,
  title,
  description,
  children,
}: {
  id: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  const doc = DOCS[id];

  return (
    <section id={id} className="flex scroll-mt-24 flex-col gap-[30px]">
      <div className="flex flex-col gap-[25px]">
        <div className="flex flex-col gap-2.5">
          <h2 className="text-[26px] font-semibold leading-[34px] tracking-tight text-foreground">
            {title}
          </h2>
          <p className="text-base leading-[22px] text-muted-foreground">
            {description}
          </p>
        </div>
        {doc && (
          <DocActions
            sourceUrl={sourceUrlFor(doc)}
            importCode={importCodeFor(doc)}
          />
        )}
      </div>

      {doc && (
        <>
          <InstallationCli command={`npm install ${PKG}`} />
          <Usage code={importCodeFor(doc)} />
        </>
      )}

      <div className="flex flex-col gap-[30px]">{children}</div>

      {doc && doc.api.length > 0 && <ApiReference groups={doc.api} />}
    </section>
  );
}

/** A labelled group of examples within a component page. */
export function Subsection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-[25px]">
      <div className="flex flex-col gap-2.5">
        <h3 className="text-[20px] font-semibold leading-[34px] tracking-tight text-foreground">
          {title}
        </h3>
        {description && (
          <p className="text-base leading-[22px] text-muted-foreground">
            {description}
          </p>
        )}
      </div>
      {children}
    </div>
  );
}

/** A single labelled example cell, used inside a Demo preview. */
export function Example({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      {children}
    </div>
  );
}

export function ThemeToggle() {
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", dark);
    root.classList.toggle("light", !dark);
  }, [dark]);

  return (
    <button
      type="button"
      onClick={() => setDark((value) => !value)}
      aria-label="Toggle color theme"
      className={cn(
        "grid size-10 place-items-center rounded-2xl bg-muted text-foreground transition-colors hover:bg-accent",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
      )}
    >
      {dark ? <Sun className="size-[18px]" /> : <Moon className="size-[18px]" />}
    </button>
  );
}
