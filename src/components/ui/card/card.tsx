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

const cardVariants = cva(
  "relative flex flex-col gap-4 rounded-3xl text-card-foreground outline-none",
  {
    variants: {
      variant: {
        elevated: "border bg-card shadow-sm",
        outline: "border bg-card",
        ghost: "bg-transparent",
      },
      padding: {
        none: "p-0",
        sm: "p-4",
        md: "p-5",
        lg: "p-6",
      },
      interactive: { true: "transition-shadow", false: "" },
    },
    compoundVariants: [
      {
        interactive: true,
        variant: "elevated",
        className:
          "cursor-pointer hover:shadow-md focus-visible:ring-2 focus-visible:ring-ring",
      },
      {
        interactive: true,
        variant: "outline",
        className:
          "cursor-pointer hover:border-foreground/20 focus-visible:ring-2 focus-visible:ring-ring",
      },
      {
        interactive: true,
        variant: "ghost",
        className:
          "cursor-pointer hover:bg-muted focus-visible:ring-2 focus-visible:ring-ring",
      },
    ],
    defaultVariants: {
      variant: "elevated",
      padding: "md",
      interactive: false,
    },
  },
);

/* -------------------------------------------------------------------------- */
/*                                    Card                                     */
/* -------------------------------------------------------------------------- */

export interface CardProps
  extends ComponentPropsWithoutRef<"div">,
    VariantProps<typeof cardVariants> {
  /** Render the surface onto a custom child (e.g. an `<a>` or `<button>`). */
  asChild?: boolean;
}

export function Card({
  variant,
  padding,
  interactive,
  asChild = false,
  className,
  children,
  ...props
}: CardProps) {
  const classes = cn(
    cardVariants({ variant, padding, interactive }),
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
Card.displayName = "Card";

/* -------------------------------------------------------------------------- */
/*                                   Header                                    */
/* -------------------------------------------------------------------------- */

export function CardHeader({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex flex-col gap-1.5", className)} {...props} />
  );
}
CardHeader.displayName = "CardHeader";

export function CardTitle({
  className,
  ...props
}: ComponentPropsWithoutRef<"h3">) {
  return (
    <h3
      className={cn(
        "text-lg leading-snug font-medium text-foreground",
        className,
      )}
      {...props}
    />
  );
}
CardTitle.displayName = "CardTitle";

export function CardDescription({
  className,
  ...props
}: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
CardDescription.displayName = "CardDescription";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

export function CardContent({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={cn("text-sm", className)} {...props} />;
}
CardContent.displayName = "CardContent";

/* -------------------------------------------------------------------------- */
/*                                   Footer                                    */
/* -------------------------------------------------------------------------- */

export function CardFooter({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div className={cn("flex items-center gap-3", className)} {...props} />
  );
}
CardFooter.displayName = "CardFooter";

/* -------------------------------------------------------------------------- */
/*                                    Media                                    */
/* -------------------------------------------------------------------------- */

/** Rounded media slot — wrap an <img>, video, gradient, or icon frame. */
export function CardMedia({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      className={cn(
        // The media is positioned so its intrinsic size never drives the card's
        // height — it fills whatever box the layout gives it (e.g. self-stretch
        // to match the content column).
        "relative shrink-0 overflow-hidden rounded-xl bg-muted [&>img]:absolute [&>img]:inset-0 [&>img]:size-full [&>img]:object-cover",
        className,
      )}
      {...props}
    />
  );
}
CardMedia.displayName = "CardMedia";
