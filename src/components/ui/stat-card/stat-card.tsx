import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { ArrowDown, ArrowUp } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { Chip } from "../chip";

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */

export interface StatCardTrend {
  /** The delta label, e.g. "10.5%". */
  value: ReactNode;
  /** Arrow direction. Defaults to "up". */
  direction?: "up" | "down";
  /**
   * Chip colour. Defaults to success for "up" and destructive for "down".
   * Override it when a rise is bad (e.g. churn) or a drop is good.
   */
  color?: "neutral" | "primary" | "success" | "warning" | "destructive" | "info";
}

export interface StatCardProps extends ComponentPropsWithoutRef<"div"> {
  /** Metric name shown at the top. */
  label: ReactNode;
  /** The headline value, e.g. a number or currency. */
  value: ReactNode;
  /** Leading icon shown top-right. */
  icon?: ReactNode;
  /** Supporting caption under the value. */
  description?: ReactNode;
  /** Trend chip beside the value. */
  trend?: StatCardTrend;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

/** A compact KPI tile: label, headline value, optional trend chip and caption. */
export function StatCard({
  label,
  value,
  icon,
  description,
  trend,
  className,
  ...props
}: StatCardProps) {
  const direction = trend?.direction ?? "up";
  const color = trend?.color ?? (direction === "down" ? "destructive" : "success");
  const TrendIcon = direction === "down" ? ArrowDown : ArrowUp;

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-5",
        className,
      )}
      {...props}
    >
      <div className="flex items-center justify-between gap-3">
        <h3 className="text-base font-semibold text-foreground">{label}</h3>
        {icon && (
          <span className="grid shrink-0 place-items-center text-muted-foreground [&_svg]:size-[22px]">
            {icon}
          </span>
        )}
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-3">
        <p className="text-3xl font-semibold leading-none text-foreground">
          {value}
        </p>
        {trend && (
          <Chip
            color={color}
            variant="soft"
            size="sm"
            startIcon={<TrendIcon className="size-3.5" />}
          >
            {trend.value}
          </Chip>
        )}
      </div>

      {description && (
        <p className="mt-3 text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
}
StatCard.displayName = "StatCard";
