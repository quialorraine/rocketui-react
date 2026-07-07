import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Colors                                    */
/* -------------------------------------------------------------------------- */

type BadgeColor =
  | "primary"
  | "neutral"
  | "destructive"
  | "success"
  | "warning"
  | "info";

/** Solid fill (label/count) and dot color for every semantic color. */
const SOLID: Record<BadgeColor, string> = {
  primary: "bg-primary text-primary-foreground",
  neutral: "bg-secondary text-secondary-foreground",
  destructive: "bg-destructive text-destructive-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  info: "bg-info text-info-foreground",
};

const DOT: Record<BadgeColor, string> = {
  primary: "bg-primary",
  neutral: "bg-muted-foreground",
  destructive: "bg-destructive",
  success: "bg-success",
  warning: "bg-warning",
  info: "bg-info",
};

const badgeVariants = cva(
  "inline-flex shrink-0 items-center justify-center whitespace-nowrap rounded-full font-medium leading-none select-none",
  {
    variants: {
      size: {
        sm: "h-4 min-w-4 text-[0.625rem]",
        md: "h-5 min-w-5 text-[0.6875rem]",
      },
    },
    defaultVariants: { size: "md" },
  },
);

/** Horizontal padding for text labels; numeric counts stay padding-free so
 * `min-w` keeps them a circle until the digits overflow. */
const LABEL_PADDING = { sm: "px-1.5", md: "px-2" } as const;

const DOT_SIZE = { sm: "size-2", md: "size-2.5" } as const;

/* -------------------------------------------------------------------------- */
/*                                    Badge                                    */
/* -------------------------------------------------------------------------- */

export interface BadgeProps
  extends Omit<ComponentPropsWithoutRef<"span">, "color">,
    VariantProps<typeof badgeVariants> {
  /** Semantic color of the fill / dot. */
  color?: BadgeColor;
  /** Render a bare status dot instead of a labelled pill. */
  dot?: boolean;
  /** When the numeric child exceeds `max`, render `max+` (e.g. 99+). */
  max?: number;
}

export function Badge({
  color = "primary",
  size = "md",
  dot = false,
  max,
  className,
  children,
  ...props
}: BadgeProps) {
  const resolvedColor: BadgeColor = color ?? "primary";
  const resolvedSize = size ?? "md";

  if (dot) {
    return (
      <span
        data-slot="badge"
        className={cn(
          "inline-block shrink-0 rounded-full",
          DOT_SIZE[resolvedSize],
          DOT[resolvedColor],
          className,
        )}
        {...props}
      />
    );
  }

  const content: ReactNode =
    typeof children === "number" && max != null && children > max
      ? `${max}+`
      : children;

  const isCount =
    (typeof content === "string" || typeof content === "number") &&
    /^\d+\+?$/.test(String(content));

  return (
    <span
      data-slot="badge"
      className={cn(
        badgeVariants({ size }),
        isCount ? "px-0.5" : LABEL_PADDING[resolvedSize],
        SOLID[resolvedColor],
        className,
      )}
      {...props}
    >
      {content}
    </span>
  );
}
Badge.displayName = "Badge";

/* -------------------------------------------------------------------------- */
/*                                BadgeWrapper                                 */
/* -------------------------------------------------------------------------- */

type BadgePlacement =
  | "top-right"
  | "top-left"
  | "bottom-right"
  | "bottom-left"
  | "top-center"
  | "bottom-center";

type BadgeOverlap = "rectangular" | "circular";

/* For rectangular anchors the badge sits on the box corner; for circular ones
 * it is inset (~14%) so it lands on the circle's edge instead of floating in
 * the empty corner. Center placements are identical for both shapes. */
const PLACEMENT: Record<BadgeOverlap, Record<BadgePlacement, string>> = {
  rectangular: {
    "top-right": "top-0 right-0 -translate-y-1/2 translate-x-1/2",
    "top-left": "top-0 left-0 -translate-y-1/2 -translate-x-1/2",
    "bottom-right": "bottom-0 right-0 translate-y-1/2 translate-x-1/2",
    "bottom-left": "bottom-0 left-0 translate-y-1/2 -translate-x-1/2",
    "top-center": "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  },
  circular: {
    "top-right": "top-[14%] right-[14%] -translate-y-1/2 translate-x-1/2",
    "top-left": "top-[14%] left-[14%] -translate-y-1/2 -translate-x-1/2",
    "bottom-right": "bottom-[14%] right-[14%] translate-y-1/2 translate-x-1/2",
    "bottom-left": "bottom-[14%] left-[14%] translate-y-1/2 -translate-x-1/2",
    "top-center": "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
    "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  },
};

export interface BadgeWrapperProps extends ComponentPropsWithoutRef<"span"> {
  /** The badge (or any node) overlaid on the corner of the children. */
  badge: ReactNode;
  /** Where the badge is anchored relative to the children. */
  placement?: BadgePlacement;
  /** Shape of the wrapped element — circular insets the badge onto the edge. */
  overlap?: BadgeOverlap;
  /** Hide the overlay while keeping layout stable (e.g. zero notifications). */
  hidden?: boolean;
}

export function BadgeWrapper({
  badge,
  placement = "top-right",
  overlap = "rectangular",
  hidden = false,
  className,
  children,
  ...props
}: BadgeWrapperProps) {
  return (
    <span
      data-slot="badge-wrapper"
      className={cn("relative inline-flex w-fit", className)}
      {...props}
    >
      {children}
      {!hidden && (
        <span
          className={cn(
            "pointer-events-none absolute z-10 flex",
            PLACEMENT[overlap][placement],
          )}
        >
          {badge}
        </span>
      )}
    </span>
  );
}
BadgeWrapper.displayName = "BadgeWrapper";
