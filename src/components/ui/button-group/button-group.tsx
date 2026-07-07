import {
  Children,
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { cn } from "@/lib/cn";
import type { ButtonProps } from "../button";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

/* Attached layout: flatten the inner corners of the children, keep the outer
 * ones rounded, lift the active segment so its focus ring is never clipped by a
 * neighbour, and draw an inset hairline divider (a centred ::before that spans
 * ~60% of the segment, matching the design) between adjacent segments. */
const ORIENTATION: Record<"horizontal" | "vertical", string> = {
  horizontal: [
    "flex-row",
    "[&>*]:rounded-none",
    "[&>*:first-child]:rounded-l-full",
    "[&>*:last-child]:rounded-r-full",
    "[&>*:not(:first-child)]:before:absolute [&>*:not(:first-child)]:before:left-0 [&>*:not(:first-child)]:before:top-1/2 [&>*:not(:first-child)]:before:h-[60%] [&>*:not(:first-child)]:before:w-px [&>*:not(:first-child)]:before:-translate-y-1/2 [&>*:not(:first-child)]:before:bg-accent [&>*:not(:first-child)]:before:content-['']",
  ].join(" "),
  vertical: [
    "flex-col",
    "[&>*]:rounded-none",
    "[&>*:first-child]:rounded-t-2xl",
    "[&>*:last-child]:rounded-b-2xl",
    "[&>*:not(:first-child)]:before:absolute [&>*:not(:first-child)]:before:top-0 [&>*:not(:first-child)]:before:left-1/2 [&>*:not(:first-child)]:before:h-px [&>*:not(:first-child)]:before:w-[60%] [&>*:not(:first-child)]:before:-translate-x-1/2 [&>*:not(:first-child)]:before:bg-accent [&>*:not(:first-child)]:before:content-['']",
  ].join(" "),
};

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

export interface ButtonGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "color"> {
  /** Stacking direction of the grouped buttons. */
  orientation?: "horizontal" | "vertical";
  /** Applied to any child button that doesn't set its own `variant`. */
  variant?: ButtonProps["variant"];
  /** Applied to any child button that doesn't set its own `color`. */
  color?: ButtonProps["color"];
  /** Applied to any child button that doesn't set its own `size`. */
  size?: ButtonProps["size"];
}

export function ButtonGroup({
  orientation = "horizontal",
  variant,
  color,
  size,
  className,
  children,
  ...props
}: ButtonGroupProps) {
  /* Inject shared styling onto each button so callers configure the group once
   * instead of repeating props on every segment; a child's own props win. */
  const items = Children.toArray(children).map((child) => {
    if (!isValidElement(child)) return child;
    const button = child as ReactElement<ButtonProps>;
    return cloneElement(button, {
      variant: button.props.variant ?? variant,
      color: button.props.color ?? color,
      size: button.props.size ?? size,
    });
  });

  return (
    <div
      role="group"
      className={cn(
        // Segments must not individually shrink on press, the scale would open
        // gaps at the seams and reveal the surface behind as white lines.
        "isolate inline-flex w-fit [&>*]:relative [&>*]:active:!scale-100 [&>*:hover]:z-10 [&>*:focus-visible]:z-10",
        ORIENTATION[orientation],
        className,
      )}
      {...props}
    >
      {items}
    </div>
  );
}
ButtonGroup.displayName = "ButtonGroup";
