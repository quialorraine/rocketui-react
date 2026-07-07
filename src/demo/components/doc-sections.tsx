import { useState, type ReactNode } from "react";
import { Check, Copy, GithubLogo } from "@phosphor-icons/react";
import { CodeBlock } from "./code-block";

/** Brand-coloured Figma mark (matches the multicolour logo in the design). */
function FigmaIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 38 57" fill="none" className={className} aria-hidden="true">
      <path d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z" fill="#FF7262" />
      <path d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  );
}

/* -------------------------------------------------------------------------- */
/*                                  Heading                                    */
/* -------------------------------------------------------------------------- */

export function DocSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="flex scroll-mt-24 flex-col gap-[15px]">
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
    </section>
  );
}

/* -------------------------------------------------------------------------- */
/*                                Action pills                                 */
/* -------------------------------------------------------------------------- */

const pill =
  "inline-flex h-[34px] items-center gap-1.5 rounded-full bg-muted px-4 text-sm font-medium text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-[18px]";

export function DocActions({
  figma = true,
  sourceUrl,
  importCode,
}: {
  /** Show the (non-linking) Figma button. */
  figma?: boolean;
  sourceUrl?: string;
  importCode?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    if (!importCode) return;
    await navigator.clipboard.writeText(importCode);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div className="flex flex-wrap items-center gap-2">
        {figma && (
          <button type="button" className={pill}>
            <FigmaIcon />
            Figma
          </button>
        )}
        {sourceUrl && (
          <a className={pill} href={sourceUrl} target="_blank" rel="noreferrer">
            <GithubLogo weight="fill" />
            View source
          </a>
        )}
      </div>
      {importCode && (
        <button type="button" className={pill} onClick={copy}>
          {copied ? <Check weight="bold" className="text-success" /> : <Copy />}
          {copied ? "Copied" : "Copy"}
        </button>
      )}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*                            Installation & Usage                            */
/* -------------------------------------------------------------------------- */

export function InstallationCli({ command }: { command: string }) {
  return (
    <DocSection title="Installation CLI">
      <CodeBlock lang="bash" code={command} numbered />
    </DocSection>
  );
}

export function Usage({ code }: { code: string }) {
  return (
    <DocSection title="Usage">
      <CodeBlock lang="tsx" code={code} numbered />
    </DocSection>
  );
}

/* -------------------------------------------------------------------------- */
/*                               API Reference                                */
/* -------------------------------------------------------------------------- */

export interface PropRow {
  name: string;
  type: string;
  default?: string;
  description: string;
}

export interface ApiGroup {
  title: string;
  description?: string;
  props: PropRow[];
}

function PropsTable({ props }: { props: PropRow[] }) {
  return (
    <div className="overflow-x-auto rounded-xl bg-muted">
      <table className="w-full border-collapse text-left text-sm">
        <thead>
          <tr className="text-xs uppercase tracking-wide text-muted-foreground">
            <th className="px-4 py-3 font-medium">Prop</th>
            <th className="px-4 py-3 font-medium">Type</th>
            <th className="px-4 py-3 font-medium">Default</th>
            <th className="px-4 py-3 font-medium">Description</th>
          </tr>
        </thead>
        <tbody>
          {props.map((row) => (
            <tr key={row.name} className="align-top border-t border-border/60">
              <td className="whitespace-nowrap px-4 py-3">
                <code className="rounded bg-card px-1.5 py-0.5 text-xs font-medium text-foreground">
                  {row.name}
                </code>
              </td>
              <td className="px-4 py-3">
                <code className="text-xs text-primary">{row.type}</code>
              </td>
              <td className="whitespace-nowrap px-4 py-3">
                {row.default ? (
                  <code className="text-xs text-muted-foreground">{row.default}</code>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-sm leading-relaxed text-muted-foreground">
                {row.description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function ApiReference({ groups }: { groups: ApiGroup[] }) {
  return (
    <DocSection
      title="API Reference"
      description="Props for each part of the component. All components also forward native HTML attributes and className."
    >
      <div className="flex flex-col gap-8">
        {groups.map((group) => (
          <div key={group.title} className="flex flex-col gap-2">
            <div className="flex flex-col gap-1">
              <h4 className="text-sm font-semibold text-foreground">{group.title}</h4>
              {group.description && (
                <p className="text-sm text-muted-foreground">{group.description}</p>
              )}
            </div>
            <PropsTable props={group.props} />
          </div>
        ))}
      </div>
    </DocSection>
  );
}
