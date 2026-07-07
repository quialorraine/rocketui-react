import type { ComponentPropsWithoutRef, CSSProperties } from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface SkeletonProps extends ComponentPropsWithoutRef<"div"> {
  /** Shape preset: a rounded block, a circle, or a thin text line. */
  variant?: "rect" | "circle" | "text";
  /** Explicit width (number → px). */
  width?: number | string;
  /** Explicit height (number → px). */
  height?: number | string;
  /** Disable the shimmer animation. */
  animated?: boolean;
}

const VARIANT: Record<NonNullable<SkeletonProps["variant"]>, string> = {
  rect: "rounded-lg",
  circle: "aspect-square rounded-full",
  text: "h-2.5 w-full rounded-full",
};

const toSize = (value: number | string | undefined) =>
  typeof value === "number" ? `${value}px` : value;

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export function Skeleton({
  variant = "rect",
  width,
  height,
  animated = true,
  className,
  style,
  ...props
}: SkeletonProps) {
  const sizeStyle: CSSProperties = {
    width: toSize(width),
    height: toSize(height),
    ...style,
  };

  return (
    <div
      aria-hidden="true"
      data-slot="skeleton"
      className={cn(
        "bg-accent",
        animated && "animate-pulse",
        VARIANT[variant],
        className,
      )}
      style={sizeStyle}
      {...props}
    />
  );
}
Skeleton.displayName = "Skeleton";
