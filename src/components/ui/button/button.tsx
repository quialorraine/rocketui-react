import {
  cloneElement,
  isValidElement,
  type ComponentPropsWithoutRef,
  type ReactElement,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { SpinnerGap } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const buttonVariants = cva(
  [
    "relative inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium",
    "outline-none transition-[color,background-color,border-color,box-shadow,transform]",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:pointer-events-none disabled:opacity-50",
    "active:scale-[0.98] motion-reduce:active:scale-100",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  {
    variants: {
      variant: {
        solid: "",
        soft: "",
        outline: "border",
        ghost: "",
        link: "",
      },
      color: {
        primary: "",
        neutral: "",
        destructive: "",
      },
      size: {
        sm: "h-9 gap-1.5 px-4 text-sm [&_svg]:size-4",
        md: "h-10 gap-2 px-5 text-sm [&_svg]:size-[18px]",
        lg: "h-11 gap-2 px-6 text-base [&_svg]:size-5",
      },
      iconOnly: { true: "px-0", false: "" },
      fullWidth: { true: "w-full", false: "" },
    },
    compoundVariants: [
      /* solid */
      {
        variant: "solid",
        color: "primary",
        className: "bg-primary text-primary-foreground hover:bg-primary/90",
      },
      {
        variant: "solid",
        color: "neutral",
        className: "bg-secondary text-secondary-foreground hover:bg-accent",
      },
      {
        variant: "solid",
        color: "destructive",
        className:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
      },
      /* soft */
      {
        variant: "soft",
        color: "primary",
        className: "bg-primary/15 text-primary hover:bg-primary/25",
      },
      {
        variant: "soft",
        color: "neutral",
        className: "bg-muted text-foreground hover:bg-accent",
      },
      {
        variant: "soft",
        color: "destructive",
        className: "bg-destructive/15 text-destructive hover:bg-destructive/25",
      },
      /* outline */
      {
        variant: "outline",
        color: "primary",
        className: "border-primary/40 text-primary hover:bg-primary/10",
      },
      {
        variant: "outline",
        color: "neutral",
        className: "border-border text-foreground hover:bg-muted",
      },
      {
        variant: "outline",
        color: "destructive",
        className:
          "border-destructive/40 text-destructive hover:bg-destructive/10",
      },
      /* ghost */
      {
        variant: "ghost",
        color: "primary",
        className: "text-primary hover:bg-primary/10",
      },
      {
        variant: "ghost",
        color: "neutral",
        className: "text-foreground hover:bg-muted",
      },
      {
        variant: "ghost",
        color: "destructive",
        className: "text-destructive hover:bg-destructive/10",
      },
      /* link */
      { variant: "link", color: "primary", className: "text-primary" },
      { variant: "link", color: "neutral", className: "text-foreground" },
      { variant: "link", color: "destructive", className: "text-destructive" },
      {
        variant: "link",
        className:
          "h-auto gap-1 rounded-none px-0 underline-offset-4 hover:bg-transparent hover:underline active:scale-100",
      },
      /* icon-only squares */
      { iconOnly: true, size: "sm", className: "size-9" },
      { iconOnly: true, size: "md", className: "size-10" },
      { iconOnly: true, size: "lg", className: "size-11" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "primary",
      size: "md",
      iconOnly: false,
      fullWidth: false,
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export interface ButtonProps
  extends Omit<ComponentPropsWithoutRef<"button">, "color">,
    VariantProps<typeof buttonVariants> {
  /** Render the button's styles onto its single child instead of a `<button>`. */
  asChild?: boolean;
  /** Show a spinner and block interaction while an async action runs. */
  loading?: boolean;
  /** Icon rendered before the label. Replaced by the spinner while loading. */
  startIcon?: ReactNode;
  /** Icon rendered after the label. */
  endIcon?: ReactNode;
}

export function Button({
  variant,
  color,
  size,
  iconOnly,
  fullWidth,
  asChild = false,
  loading = false,
  disabled,
  startIcon,
  endIcon,
  type,
  className,
  children,
  ...props
}: ButtonProps) {
  const classes = cn(
    buttonVariants({ variant, color, size, iconOnly, fullWidth }),
    className,
  );

  /* Polymorphic rendering: forward styles onto a caller-provided element. */
  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<{ className?: string }>;
    return cloneElement(child, {
      className: cn(classes, child.props.className),
      ...props,
    });
  }

  const spinner = <SpinnerGap className="animate-spin" aria-hidden="true" />;

  return (
    <button
      type={type ?? "button"}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      data-loading={loading ? "" : undefined}
      className={classes}
      {...props}
    >
      {iconOnly ? (
        loading ? spinner : children
      ) : (
        <>
          {loading ? spinner : startIcon}
          {children}
          {!loading && endIcon}
        </>
      )}
    </button>
  );
}
Button.displayName = "Button";

export { buttonVariants };
