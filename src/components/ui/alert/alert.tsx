import {
  forwardRef,
  type ComponentPropsWithoutRef,
  type ElementType,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import {
  CheckCircle,
  Info,
  Warning,
  WarningCircle,
  X,
  type Icon as PhosphorIcon,
} from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const alertVariants = cva(
  "relative flex w-full border bg-card text-card-foreground",
  {
    variants: {
      size: {
        sm: "gap-1 rounded-2xl p-3",
        md: "gap-1.5 rounded-3xl p-4",
        lg: "gap-2 rounded-3xl p-5",
      },
    },
    defaultVariants: { size: "md" },
  },
);

type AlertVariant = "default" | "info" | "success" | "warning" | "destructive";
type AlertSize = NonNullable<VariantProps<typeof alertVariants>["size"]>;

interface VariantMeta {
  color: string;
  Icon: PhosphorIcon;
  role: "status" | "alert";
}

const VARIANT_META: Record<AlertVariant, VariantMeta> = {
  default: { color: "text-foreground", Icon: Info, role: "status" },
  info: { color: "text-info", Icon: Info, role: "status" },
  success: { color: "text-success", Icon: CheckCircle, role: "status" },
  warning: { color: "text-warning", Icon: Warning, role: "alert" },
  destructive: { color: "text-destructive", Icon: WarningCircle, role: "alert" },
};

const HEADER_GAP: Record<AlertSize, string> = {
  sm: "gap-2.5",
  md: "gap-3",
  lg: "gap-3.5",
};

const ICON_WRAP: Record<AlertSize, string> = {
  sm: "[&_svg]:size-6",
  md: "[&_svg]:size-8",
  lg: "[&_svg]:size-9",
};

const TITLE_TEXT: Record<AlertSize, string> = {
  sm: "text-sm",
  md: "text-base",
  lg: "text-lg",
};

const DESC_TEXT: Record<AlertSize, string> = {
  sm: "text-[13px]",
  md: "text-sm",
  lg: "text-base",
};

const CLOSE_ICON: Record<AlertSize, string> = {
  sm: "size-5",
  md: "size-[22px]",
  lg: "size-6",
};

/* -------------------------------------------------------------------------- */
/*                                   Alert                                     */
/* -------------------------------------------------------------------------- */

export interface AlertProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** Status style: drives the default icon and its color. */
  variant?: AlertVariant;
  size?: AlertSize;
  /** Heading line of the alert. */
  title?: ReactNode;
  /**
   * Leading media. Defaults to a status icon derived from `variant`.
   * Pass a custom node (icon, avatar, thumbnail) to override, or `null` to hide.
   */
  icon?: ReactNode;
  /** Trailing inline action shown before the dismiss button (e.g. "Undo"). */
  action?: ReactNode;
  /** When provided, a dismiss button is rendered and invokes this callback. */
  onClose?: () => void;
  /** Accessible label for the dismiss button. */
  closeLabel?: string;
  /** Body content: description text and/or footer actions. */
  children?: ReactNode;
}

export const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  {
    variant = "default",
    size = "md",
    title,
    icon,
    action,
    onClose,
    closeLabel = "Dismiss",
    role,
    className,
    children,
    ...props
  },
  ref,
) {
  const meta = VARIANT_META[variant];
  const StatusIcon = meta.Icon;
  const showIcon = icon !== null;
  const hasBody = children != null;

  return (
    <div
      ref={ref}
      role={role ?? meta.role}
      className={cn(
        alertVariants({ size }),
        HEADER_GAP[size],
        hasBody ? "items-start" : "items-center",
        className,
      )}
      {...props}
    >
      {showIcon && (
        <span
          aria-hidden={icon ? undefined : true}
          className={cn(
            "flex shrink-0 items-center justify-center",
            meta.color,
            ICON_WRAP[size],
          )}
        >
          {icon ?? <StatusIcon weight="fill" />}
        </span>
      )}

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div className="flex items-center gap-3">
          <div className="min-w-0 flex-1">
            {title && (
              <p
                className={cn("truncate font-medium text-foreground", TITLE_TEXT[size])}
              >
                {title}
              </p>
            )}
          </div>

          {(action || onClose) && (
            <div className="flex shrink-0 items-center gap-3">
              {action}
              {onClose && (
                <button
                  type="button"
                  onClick={onClose}
                  aria-label={closeLabel}
                  className={cn(
                    "grid shrink-0 place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
                  )}
                >
                  <X className={CLOSE_ICON[size]} />
                </button>
              )}
            </div>
          )}
        </div>

        {hasBody && (
          <div className={cn("flex flex-col gap-3 text-muted-foreground", DESC_TEXT[size])}>
            {children}
          </div>
        )}
      </div>
    </div>
  );
});
Alert.displayName = "Alert";

/* -------------------------------------------------------------------------- */
/*                              Alert building blocks                          */
/* -------------------------------------------------------------------------- */

export type AlertDescriptionProps = ComponentPropsWithoutRef<"p">;

/** Description text with the correct leading for alert bodies. */
export function AlertDescription({ className, ...props }: AlertDescriptionProps) {
  return <p className={cn("leading-relaxed", className)} {...props} />;
}
AlertDescription.displayName = "AlertDescription";

const alertLinkVariants = cva(
  "inline-flex w-fit items-center rounded-sm font-medium underline-offset-2 outline-none transition-colors hover:underline focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
  {
    variants: {
      tone: {
        info: "text-info",
        muted: "text-muted-foreground hover:text-foreground",
      },
    },
    defaultVariants: { tone: "info" },
  },
);

export interface AlertLinkProps
  extends ComponentPropsWithoutRef<"a">,
    VariantProps<typeof alertLinkVariants> {
  /** Render as another element (e.g. a `button` for non-navigation actions). */
  as?: ElementType;
}

/** Text-link action used inside alerts ("See what's changed", "Undo"). */
export function AlertLink({
  as: Component = "a",
  tone,
  className,
  ...props
}: AlertLinkProps) {
  return <Component className={cn(alertLinkVariants({ tone }), className)} {...props} />;
}
AlertLink.displayName = "AlertLink";
