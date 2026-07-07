import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Tokens                                    */
/* -------------------------------------------------------------------------- */

type AnnouncementColor =
  | "neutral"
  | "primary"
  | "success"
  | "warning"
  | "destructive"
  | "info";

const TAG_COLOR: Record<AnnouncementColor, string> = {
  neutral: "bg-muted-foreground text-white",
  primary: "bg-primary text-primary-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  info: "bg-info text-info-foreground",
};

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

interface AnnouncementBaseProps {
  /** Leading badge label (e.g. "New feature"). */
  tag?: ReactNode;
  /** Colour of the leading badge. */
  color?: AnnouncementColor;
  /** Trailing icon. Defaults to an arrow; pass `null` to hide it. */
  icon?: ReactNode;
  children: ReactNode;
  className?: string;
}

export type AnnouncementProps = AnnouncementBaseProps &
  (
    | ({ href: string } & Omit<
        ComponentPropsWithoutRef<"a">,
        keyof AnnouncementBaseProps
      >)
    | ({ href?: undefined } & Omit<
        ComponentPropsWithoutRef<"button">,
        keyof AnnouncementBaseProps
      >)
  );

/**
 * A compact, clickable announcement pill, a coloured badge, a short message
 * and a trailing arrow. Renders an anchor when `href` is set, a button
 * otherwise.
 */
export function Announcement({
  tag,
  color = "neutral",
  icon = <ArrowRight />,
  children,
  className,
  ...props
}: AnnouncementProps) {
  const classes = cn(
    "group inline-flex items-center gap-[15px] rounded-full bg-accent py-[3px] pr-3.5 text-left transition-colors",
    tag != null ? "pl-[3px]" : "pl-4",
    "hover:bg-accent/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    "[&_svg]:size-[18px]",
    className,
  );

  const content = (
    <>
      {tag != null && (
        <span
          className={cn(
            "inline-flex h-7 shrink-0 items-center rounded-full px-2.5 text-xs font-medium",
            TAG_COLOR[color],
          )}
        >
          {tag}
        </span>
      )}
      <span className="text-sm font-medium text-foreground">{children}</span>
      {icon != null && (
        <span className="ml-auto shrink-0 text-foreground transition-transform group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (props.href !== undefined) {
    return (
      <a className={classes} {...(props as ComponentPropsWithoutRef<"a">)}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      className={classes}
      {...(props as ComponentPropsWithoutRef<"button">)}
    >
      {content}
    </button>
  );
}
Announcement.displayName = "Announcement";
