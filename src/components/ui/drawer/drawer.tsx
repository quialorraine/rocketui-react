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

interface DrawerContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DrawerContext = createContext<DrawerContextValue | null>(null);

function useDrawerContext(component: string): DrawerContextValue {
  const context = useContext(DrawerContext);
  if (!context) {
    throw new Error(`<${component}> must be used within <Drawer>.`);
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface DrawerProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  /** Called whenever the open state should change. */
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

/**
 * A panel that slides in from an edge of the screen when its trigger is pressed.
 * Great for side navigation, filters, details and settings.
 */
export function Drawer({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DrawerProps) {
  const reactId = useId();
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <DrawerContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        titleId: `drawer-title-${reactId}`,
        descriptionId: `drawer-description-${reactId}`,
      }}
    >
      {children}
    </DrawerContext.Provider>
  );
}
Drawer.displayName = "Drawer";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface DrawerTriggerProps extends ComponentPropsWithoutRef<"button"> {
  /** Merge props onto the single child element instead of rendering a button. */
  asChild?: boolean;
}

export function DrawerTrigger({
  asChild = false,
  onClick,
  children,
  ...props
}: DrawerTriggerProps) {
  const { setOpen, open } = useDrawerContext("DrawerTrigger");

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
DrawerTrigger.displayName = "DrawerTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

const drawerContentVariants = cva(
  "pointer-events-auto fixed flex flex-col bg-card text-card-foreground shadow-2xl outline-none transition-transform duration-300 ease-out motion-reduce:transition-none",
  {
    variants: {
      side: {
        right: "inset-y-0 right-0 h-full border-l border-border rounded-l-3xl",
        left: "inset-y-0 left-0 h-full border-r border-border rounded-r-3xl",
        top: "inset-x-0 top-0 w-full border-b border-border rounded-b-3xl",
        bottom: "inset-x-0 bottom-0 w-full border-t border-border rounded-t-3xl",
      },
    },
    defaultVariants: { side: "right" },
  },
);

type Side = "right" | "left" | "top" | "bottom";
type Size = "sm" | "md" | "lg";

const horizontalSize: Record<Size, string> = {
  sm: "w-full max-w-sm",
  md: "w-full max-w-md",
  lg: "w-full max-w-lg",
};

const verticalSize: Record<Size, string> = {
  sm: "h-full max-h-[35vh]",
  md: "h-full max-h-[55vh]",
  lg: "h-full max-h-[80vh]",
};

/** Off-screen transform used while the drawer is hidden, per side. */
const hiddenTransform: Record<Side, string> = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

export interface DrawerContentProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role">,
    VariantProps<typeof drawerContentVariants> {
  /** Edge the panel slides in from. */
  side?: Side;
  /** Panel width (left/right) or height (top/bottom). */
  size?: Size;
  /** Hide the built-in top-right close button. */
  hideClose?: boolean;
  /** Close when the overlay behind the panel is clicked. */
  closeOnOverlayClick?: boolean;
  /** Close when Escape is pressed. */
  closeOnEscape?: boolean;
  closeLabel?: string;
}

export function DrawerContent({
  side = "right",
  size = "md",
  hideClose = false,
  closeOnOverlayClick = true,
  closeOnEscape = true,
  closeLabel = "Close",
  className,
  children,
  ...props
}: DrawerContentProps) {
  const { open, setOpen, titleId, descriptionId } = useDrawerContext("DrawerContent");
  const panelRef = useRef<HTMLDivElement>(null);
  const { mounted, visible } = useEnterExit(open, 300);
  const close = useCallback(() => setOpen(false), [setOpen]);

  // A modal surface: lock background scroll, trap focus, dismiss on Escape.
  // Outside pointer presses are handled by the overlay element below.
  useScrollLock(open);
  useFocusTrap(panelRef, { active: open && mounted, trap: true, restoreFocus: true });
  useDismiss(panelRef, {
    active: open,
    onDismiss: close,
    escape: closeOnEscape,
    outsidePointer: false,
  });

  if (!mounted) return null;

  const isHorizontal = side === "left" || side === "right";
  const sizeClass = isHorizontal ? horizontalSize[size] : verticalSize[size];

  return (
    <Portal>
      <div className="fixed inset-0 z-50">
        <div
          aria-hidden="true"
          onClick={() => closeOnOverlayClick && setOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/50 transition-opacity duration-300 ease-out motion-reduce:transition-none",
            visible ? "opacity-100" : "opacity-0",
          )}
        />
        <div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={titleId}
          aria-describedby={descriptionId}
          tabIndex={-1}
          className={cn(
            drawerContentVariants({ side }),
            sizeClass,
            visible ? "translate-x-0 translate-y-0" : hiddenTransform[side],
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
                "absolute right-4 top-4 grid place-items-center rounded-md text-muted-foreground transition-colors hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card",
              )}
            >
              <X className="size-[22px]" />
            </button>
          )}
        </div>
      </div>
    </Portal>
  );
}
DrawerContent.displayName = "DrawerContent";

/* -------------------------------------------------------------------------- */
/*                              Structural parts                               */
/* -------------------------------------------------------------------------- */

export type DrawerHeaderProps = ComponentPropsWithoutRef<"div">;

/** Header: title + description, with room for the close button. */
export function DrawerHeader({ className, children, ...props }: DrawerHeaderProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col gap-1.5 px-5 py-4 pe-12",
        // Divider inset from both sides (never edge-to-edge).
        "after:pointer-events-none after:absolute after:inset-x-5 after:bottom-0 after:border-b after:border-border after:content-['']",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DrawerHeader.displayName = "DrawerHeader";

export type DrawerTitleProps = ComponentPropsWithoutRef<"h2">;

export function DrawerTitle({ className, ...props }: DrawerTitleProps) {
  const { titleId } = useDrawerContext("DrawerTitle");
  return (
    <h2
      id={titleId}
      className={cn("text-lg font-medium text-foreground", className)}
      {...props}
    />
  );
}
DrawerTitle.displayName = "DrawerTitle";

export type DrawerDescriptionProps = ComponentPropsWithoutRef<"p">;

export function DrawerDescription({ className, ...props }: DrawerDescriptionProps) {
  const { descriptionId } = useDrawerContext("DrawerDescription");
  return (
    <p
      id={descriptionId}
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}
DrawerDescription.displayName = "DrawerDescription";

export type DrawerBodyProps = ComponentPropsWithoutRef<"div">;

/** Scrollable content region that grows to fill the space between header/footer. */
export function DrawerBody({ className, ...props }: DrawerBodyProps) {
  return (
    <div
      className={cn("min-h-0 flex-1 overflow-y-auto px-5 py-4", className)}
      {...props}
    />
  );
}
DrawerBody.displayName = "DrawerBody";

export type DrawerFooterProps = ComponentPropsWithoutRef<"div">;

export function DrawerFooter({ className, ...props }: DrawerFooterProps) {
  return (
    <div
      className={cn(
        "relative flex shrink-0 flex-col-reverse gap-3 px-5 py-4 sm:flex-row sm:justify-end",
        // Divider inset from both sides (never edge-to-edge).
        "before:pointer-events-none before:absolute before:inset-x-5 before:top-0 before:border-t before:border-border before:content-['']",
        className,
      )}
      {...props}
    />
  );
}
DrawerFooter.displayName = "DrawerFooter";

export interface DrawerCloseProps extends ComponentPropsWithoutRef<"button"> {
  /** Merge props onto the single child element instead of rendering a button. */
  asChild?: boolean;
}

/** Closes the drawer. Wrap your own control (e.g. a Cancel button) with it. */
export function DrawerClose({
  asChild = false,
  onClick,
  children,
  ...props
}: DrawerCloseProps) {
  const { setOpen } = useDrawerContext("DrawerClose");

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
DrawerClose.displayName = "DrawerClose";
