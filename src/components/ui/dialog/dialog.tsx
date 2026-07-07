import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

interface DialogContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = createContext<DialogContextValue | null>(null);

function useDialogContext(component: string): DialogContextValue {
  const context = useContext(DialogContext);
  if (!context) {
    throw new Error(`<${component}> must be used within <Dialog>.`);
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface DialogProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function Dialog({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DialogProps) {
  const isControlled = open !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const currentOpen = isControlled ? open : uncontrolled;
  const reactId = useId();

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <DialogContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        titleId: `dialog-title-${reactId}`,
        descriptionId: `dialog-description-${reactId}`,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}
Dialog.displayName = "Dialog";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface DialogTriggerProps extends ComponentPropsWithoutRef<"button"> {
  /** Merge props onto the single child element instead of rendering a button. */
  asChild?: boolean;
}

export function DialogTrigger({
  asChild = false,
  onClick,
  children,
  ...props
}: DialogTriggerProps) {
  const { setOpen, open } = useDialogContext("DialogTrigger");

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event as MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(true);
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      "aria-haspopup": "dialog",
      "aria-expanded": open,
      onClick: (event: MouseEvent<HTMLElement>) => {
        (child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(
          event,
        );
        handleClick(event);
      },
    });
  }

  return (
    <button
      type="button"
      aria-haspopup="dialog"
      aria-expanded={open}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
}
DialogTrigger.displayName = "DialogTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

const dialogContentVariants = cva(
  "pointer-events-auto relative w-full rounded-3xl border bg-card p-5 text-card-foreground shadow-2xl outline-none transition-all duration-200 ease-out motion-reduce:transition-none",
  {
    variants: {
      size: {
        sm: "max-w-sm",
        md: "max-w-lg",
        lg: "max-w-2xl",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const FOCUSABLE =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export interface DialogContentProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role">,
    VariantProps<typeof dialogContentVariants> {
  /** Hide the built-in top-right close button. */
  hideClose?: boolean;
  /** Close when the overlay behind the panel is clicked. */
  closeOnOverlayClick?: boolean;
  /** Close when Escape is pressed. */
  closeOnEscape?: boolean;
  /** Use "alertdialog" for flows requiring an explicit decision. */
  role?: "dialog" | "alertdialog";
  closeLabel?: string;
}

export function DialogContent({
  size,
  hideClose = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  role = "dialog",
  closeLabel = "Close",
  className,
  children,
  ...props
}: DialogContentProps) {
  const { open, setOpen, titleId, descriptionId } = useDialogContext("DialogContent");
  const panelRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  // Mount/enter/exit lifecycle without keyframes.
  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 200);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Focus management, focus trap, Escape, and scroll lock while open.
  useEffect(() => {
    if (!open) return;

    const panel = panelRef.current;
    const previouslyFocused = document.activeElement as HTMLElement | null;

    const getFocusable = () =>
      panel ? Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE)) : [];

    (getFocusable()[0] ?? panel)?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        setOpen(false);
        return;
      }
      if (event.key !== "Tab") return;

      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [open, closeOnEscape, setOpen]);

  if (!mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-50">
      <div
        aria-hidden="true"
        onClick={() => closeOnOverlayClick && setOpen(false)}
        className={cn(
          "absolute inset-0 bg-black/50 transition-opacity duration-200 ease-out motion-reduce:transition-none",
          visible ? "opacity-100" : "opacity-0",
        )}
      />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-y-auto p-4">
        <div
          ref={panelRef}
          role={role}
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            dialogContentVariants({ size }),
            visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
            className,
          )}
          {...props}
        >
          {children}
          {!hideClose && (
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={closeLabel}
              className={cn(
                "absolute right-5 top-5 grid place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
              )}
            >
              <X className="size-[22px]" />
            </button>
          )}
        </div>
      </div>
    </div>,
    document.body,
  );
}
DialogContent.displayName = "DialogContent";

/* -------------------------------------------------------------------------- */
/*                              Structural parts                               */
/* -------------------------------------------------------------------------- */

export interface DialogHeaderProps extends ComponentPropsWithoutRef<"div"> {
  /** Optional leading icon. */
  icon?: ReactNode;
  /**
   * Icon placement: `row` sits beside the title (compact), `column` stacks a
   * larger feature icon above it.
   */
  align?: "row" | "column";
}

/** Header: optional icon + a content column (title, description). */
export function DialogHeader({
  icon,
  align = "row",
  className,
  children,
  ...props
}: DialogHeaderProps) {
  const stacked = align === "column";
  return (
    <div
      className={cn(
        "flex gap-3 pe-8",
        stacked ? "flex-col gap-4" : "items-start",
        className,
      )}
      {...props}
    >
      {icon && (
        <span
          className={cn(
            "flex shrink-0 items-center justify-center",
            stacked ? "self-start [&_svg]:size-14" : "[&_svg]:size-8",
          )}
        >
          {icon}
        </span>
      )}
      <div className="flex min-w-0 flex-1 flex-col gap-1.5">{children}</div>
    </div>
  );
}
DialogHeader.displayName = "DialogHeader";

export type DialogTitleProps = ComponentPropsWithoutRef<"h2">;

export function DialogTitle({ className, ...props }: DialogTitleProps) {
  const { titleId } = useDialogContext("DialogTitle");
  return (
    <h2
      id={titleId}
      className={cn("text-lg font-medium text-foreground", className)}
      {...props}
    />
  );
}
DialogTitle.displayName = "DialogTitle";

export type DialogDescriptionProps = ComponentPropsWithoutRef<"p">;

export function DialogDescription({ className, ...props }: DialogDescriptionProps) {
  const { descriptionId } = useDialogContext("DialogDescription");
  return (
    <p
      id={descriptionId}
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
DialogDescription.displayName = "DialogDescription";

export type DialogFooterProps = ComponentPropsWithoutRef<"div">;

export function DialogFooter({ className, ...props }: DialogFooterProps) {
  return (
    <div
      className={cn(
        "mt-5 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  );
}
DialogFooter.displayName = "DialogFooter";

export interface DialogCloseProps extends ComponentPropsWithoutRef<"button"> {
  /** Merge props onto the single child element instead of rendering a button. */
  asChild?: boolean;
}

/** Closes the dialog. Wrap your own control (e.g. a Cancel button) with it. */
export function DialogClose({
  asChild = false,
  onClick,
  children,
  ...props
}: DialogCloseProps) {
  const { setOpen } = useDialogContext("DialogClose");

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event as MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(false);
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      onClick: (event: MouseEvent<HTMLElement>) => {
        (child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(
          event,
        );
        handleClick(event);
      },
    });
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
DialogClose.displayName = "DialogClose";
