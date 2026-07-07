import {
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const chipVariants = cva(
  [
    "inline-flex shrink-0 select-none items-center whitespace-nowrap rounded-full font-medium",
    "outline-none transition-[color,background-color,border-color,filter]",
    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
  ],
  {
    variants: {
      variant: { solid: "", soft: "", outline: "border" },
      color: {
        neutral: "",
        primary: "",
        success: "",
        warning: "",
        destructive: "",
        info: "",
      },
      size: {
        sm: "h-7 gap-1 px-2.5 text-xs [&_svg]:size-3.5",
        md: "h-8 gap-1.5 px-3 text-sm [&_svg]:size-4",
        lg: "h-9 gap-1.5 px-3.5 text-sm [&_svg]:size-[18px]",
      },
      interactive: { true: "cursor-pointer hover:brightness-95 dark:hover:brightness-110", false: "" },
      disabled: { true: "pointer-events-none opacity-50", false: "" },
    },
    compoundVariants: [
      /* solid */
      { variant: "solid", color: "neutral", className: "bg-secondary text-secondary-foreground" },
      { variant: "solid", color: "primary", className: "bg-primary text-primary-foreground" },
      { variant: "solid", color: "success", className: "bg-success text-success-foreground" },
      { variant: "solid", color: "warning", className: "bg-warning text-warning-foreground" },
      { variant: "solid", color: "destructive", className: "bg-destructive text-destructive-foreground" },
      { variant: "solid", color: "info", className: "bg-info text-info-foreground" },
      /* soft */
      { variant: "soft", color: "neutral", className: "bg-muted text-foreground" },
      { variant: "soft", color: "primary", className: "bg-primary/15 text-primary" },
      { variant: "soft", color: "success", className: "bg-success/15 text-success" },
      { variant: "soft", color: "warning", className: "bg-warning/20 text-warning" },
      { variant: "soft", color: "destructive", className: "bg-destructive/15 text-destructive" },
      { variant: "soft", color: "info", className: "bg-info/15 text-info" },
      /* outline */
      { variant: "outline", color: "neutral", className: "border-border text-foreground" },
      { variant: "outline", color: "primary", className: "border-primary/40 text-primary" },
      { variant: "outline", color: "success", className: "border-success/40 text-success" },
      { variant: "outline", color: "warning", className: "border-warning/50 text-warning" },
      { variant: "outline", color: "destructive", className: "border-destructive/40 text-destructive" },
      { variant: "outline", color: "info", className: "border-info/40 text-info" },
    ],
    defaultVariants: {
      variant: "solid",
      color: "neutral",
      size: "md",
      interactive: false,
      disabled: false,
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

type ChipVariantProps = Omit<VariantProps<typeof chipVariants>, "disabled">;

export interface ChipProps
  extends Omit<ComponentPropsWithoutRef<"span">, "color">,
    ChipVariantProps {
  /** Icon rendered before the label. */
  startIcon?: ReactNode;
  /** Show a trailing remove button and fire this when it's pressed. */
  onRemove?: () => void;
  /** Accessible label for the remove button. */
  removeLabel?: string;
  disabled?: boolean;
}

export function Chip({
  variant,
  color,
  size,
  interactive,
  startIcon,
  onRemove,
  removeLabel = "Remove",
  disabled = false,
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: ChipProps) {
  const clickable = Boolean(interactive || onClick);

  return (
    <span
      className={cn(
        chipVariants({ variant, color, size, interactive, disabled }),
        className,
      )}
      role={clickable ? "button" : undefined}
      tabIndex={clickable && !disabled ? 0 : undefined}
      aria-disabled={disabled || undefined}
      onClick={disabled ? undefined : onClick}
      onKeyDown={(e: KeyboardEvent<HTMLSpanElement>) => {
        onKeyDown?.(e);
        if (clickable && !disabled && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          (e.currentTarget as HTMLSpanElement).click();
        }
      }}
      {...props}
    >
      {startIcon}
      {children}
      {onRemove && (
        <button
          type="button"
          aria-label={removeLabel}
          disabled={disabled}
          onClick={(e: MouseEvent) => {
            e.stopPropagation();
            onRemove();
          }}
          className="-mr-1 ml-0.5 inline-flex items-center justify-center rounded-full p-0.5 outline-none transition-colors hover:bg-current/20 focus-visible:ring-2 focus-visible:ring-ring [&_svg]:size-3.5"
        >
          <X weight="bold" />
        </button>
      )}
    </span>
  );
}
Chip.displayName = "Chip";

export { chipVariants };
