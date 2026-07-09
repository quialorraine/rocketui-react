import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { Portal } from "@/lib/portal";
import { mergeProps } from "@/lib/merge-props";
import { useControllableState } from "@/lib/use-controllable-state";
import { useEnterExit } from "@/lib/use-enter-exit";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useDismiss } from "@/lib/use-dismiss";
import { useScrollLock } from "@/lib/use-scroll-lock";

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
  const reactId = useId();
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

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

  const shared = { "aria-haspopup": "dialog" as const, "aria-expanded": open };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(
      child,
      mergeProps(child.props, { ...shared, onClick: handleClick }),
    );
  }

  return (
    <button type="button" onClick={handleClick} {...shared} {...props}>
      {children}
    </button>
  );
}
DialogTrigger.displayName = "DialogTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

const dialogContentVariants = cva(
  "pointer-events-auto relative w-full rounded-3xl border bg-card p-5 text-card-foreground outline-none transition-all duration-200 ease-out motion-reduce:transition-none",
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
  const { mounted, visible } = useEnterExit(open, 200);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // A modal: lock background scroll, trap focus, and dismiss on Escape. Outside
  // pointer presses are handled by the overlay element's click below.
  useScrollLock(open);
  // Gate the trap on `mounted` so focus moves in only once the panel is in the
  // DOM (mounting is a separate state update from opening).
  useFocusTrap(panelRef, { active: open && mounted, trap: true, restoreFocus: true });
  useDismiss(panelRef, {
    active: open,
    onDismiss: close,
    escape: closeOnEscape,
    outsidePointer: false,
  });

  if (!mounted) return null;

  return (
    <Portal>
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
      </div>
    </Portal>
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
    return cloneElement(child, mergeProps(child.props, { onClick: handleClick }));
  }

  return (
    <button type="button" onClick={handleClick} {...props}>
      {children}
    </button>
  );
}
DialogClose.displayName = "DialogClose";
