import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

/* A low-level themed container. Card composes richer content on top of the same
 * surface language; use Surface directly when you just need a styled box. */
const surfaceVariants = cva("text-card-foreground", {
  variants: {
    variant: {
      elevated: "border border-border bg-card",
      outline: "border border-border bg-transparent",
      filled: "bg-muted",
      ghost: "bg-transparent",
    },
    radius: {
      none: "rounded-none",
      md: "rounded-xl",
      lg: "rounded-2xl",
      xl: "rounded-3xl",
      full: "rounded-full",
    },
    padding: {
      none: "p-0",
      sm: "p-4",
      md: "p-5",
      lg: "p-6",
    },
    interactive: { true: "transition-colors outline-none", false: "" },
  },
  compoundVariants: [
    {
      interactive: true,
      className:
        "cursor-pointer focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    },
    { interactive: true, variant: "elevated", className: "hover:border-foreground/20" },
    { interactive: true, variant: "outline", className: "hover:border-foreground/20" },
    { interactive: true, variant: "filled", className: "hover:bg-muted/70" },
    { interactive: true, variant: "ghost", className: "hover:bg-muted" },
  ],
  defaultVariants: {
    variant: "elevated",
    radius: "xl",
    padding: "lg",
    interactive: false,
  },
});

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export interface SurfaceProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof surfaceVariants> {
  /** Render the surface styling onto a custom child (e.g. an `<a>`). */
  asChild?: boolean;
}

export function Surface({
  variant,
  radius,
  padding,
  interactive,
  asChild = false,
  className,
  children,
  ...props
}: SurfaceProps) {
  const classes = cn(
    surfaceVariants({ variant, radius, padding, interactive }),
    className,
  );

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
      ...props,
    });
  }

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
Surface.displayName = "Surface";
