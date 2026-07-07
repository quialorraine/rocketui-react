import { useId, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const trackVariants = cva("w-full overflow-hidden rounded-full bg-secondary", {
  variants: {
    size: {
      sm: "h-1.5",
      md: "h-2.5",
      lg: "h-3.5",
    },
  },
  defaultVariants: { size: "md" },
});

const FILL_COLOR = {
  primary: "bg-primary",
  info: "bg-info",
  success: "bg-success",
  warning: "bg-warning",
  destructive: "bg-destructive",
} as const;

type MeterColor = keyof typeof FILL_COLOR;

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export interface MeterProps
  extends Omit<ComponentPropsWithoutRef<"div">, "color">,
    VariantProps<typeof trackVariants> {
  /** Current value of the meter. */
  value: number;
  /** Lower bound of the range. */
  min?: number;
  /** Upper bound of the range. */
  max?: number;
  /** Leading label shown above the track. */
  label?: ReactNode;
  /** Render the value on the right of the header (default `NN%`). */
  showValue?: boolean;
  /** Custom value formatter, receives the raw value and the 0 to 100 percentage. */
  formatValue?: (value: number, percent: number) => ReactNode;
  /** Fill color. */
  color?: MeterColor;
}

/**
 * A meter displays a scalar measurement within a known range (disk usage,
 * capacity, score). For task progress that advances over time, use a progress
 * bar instead.
 */
export function Meter({
  value,
  min = 0,
  max = 100,
  label,
  showValue = true,
  formatValue,
  color = "primary",
  size,
  className,
  "aria-label": ariaLabel,
  ...props
}: MeterProps) {
  const labelId = useId();
  const percent = max <= min ? 0 : ((clamp(value, min, max) - min) / (max - min)) * 100;
  const rounded = Math.round(percent);

  const valueText = formatValue ? formatValue(value, percent) : `${rounded}%`;
  const hasHeader = label != null || showValue;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)} {...props}>
      {hasHeader && (
        <div className="flex items-center justify-between gap-3 text-sm font-medium text-foreground">
          {label != null ? <span id={labelId}>{label}</span> : <span />}
          {showValue && (
            <span className="tabular-nums text-muted-foreground">{valueText}</span>
          )}
        </div>
      )}

      <div
        role="meter"
        aria-valuenow={value}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuetext={typeof valueText === "string" ? valueText : undefined}
        aria-label={label == null ? ariaLabel : undefined}
        aria-labelledby={label != null ? labelId : undefined}
        className={trackVariants({ size })}
      >
        <div
          className={cn("h-full rounded-full transition-[width] duration-500", FILL_COLOR[color])}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
Meter.displayName = "Meter";

export { trackVariants as meterTrackVariants };
