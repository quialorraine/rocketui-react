import {
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useId,
  useRef,
  type ComponentPropsWithoutRef,
  type CSSProperties,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import { mergeProps } from "@/lib/merge-props";
import { useControllableState } from "@/lib/use-controllable-state";
import { useEnterExit } from "@/lib/use-enter-exit";
import { useFocusTrap } from "@/lib/use-focus-trap";
import { useDismiss } from "@/lib/use-dismiss";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

interface PopoverContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

const PopoverContext = createContext<PopoverContextValue | null>(null);

function usePopoverContext(component: string): PopoverContextValue {
  const ctx = useContext(PopoverContext);
  if (!ctx) throw new Error(`<${component}> must be used within <Popover>.`);
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface PopoverProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function Popover({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: PopoverProps) {
  const reactId = useId();
  const rootRef = useRef<HTMLDivElement>(null);
  const [currentOpen, setOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <PopoverContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        triggerId: `popover-trigger-${reactId}`,
        contentId: `popover-content-${reactId}`,
        rootRef,
      }}
    >
      <div ref={rootRef} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
}
Popover.displayName = "Popover";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface PopoverTriggerProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

export function PopoverTrigger({
  asChild = false,
  onClick,
  children,
  ...props
}: PopoverTriggerProps) {
  const { open, setOpen, triggerId, contentId } = usePopoverContext("PopoverTrigger");

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event as MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(!open);
  };

  const shared = {
    id: triggerId,
    "aria-haspopup": "dialog" as const,
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
    "data-state": open ? "open" : "closed",
  };

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
PopoverTrigger.displayName = "PopoverTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

export type PopoverSide = "top" | "bottom" | "left" | "right";
export type PopoverAlign = "start" | "center" | "end";

const SIDE_POSITION: Record<PopoverSide, string> = {
  top: "bottom-full",
  bottom: "top-full",
  left: "right-full",
  right: "left-full",
};

const ALIGN_POSITION: Record<PopoverSide, Record<PopoverAlign, string>> = {
  top: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  bottom: { start: "left-0", center: "left-1/2 -translate-x-1/2", end: "right-0" },
  left: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
  right: { start: "top-0", center: "top-1/2 -translate-y-1/2", end: "bottom-0" },
};

const ORIGIN: Record<PopoverSide, string> = {
  top: "origin-bottom",
  bottom: "origin-top",
  left: "origin-right",
  right: "origin-left",
};

const ARROW_SIDE: Record<PopoverSide, string> = {
  bottom: "top-0 -translate-y-1/2 border-l border-t",
  top: "bottom-0 translate-y-1/2 border-b border-r",
  left: "right-0 translate-x-1/2 border-t border-r",
  right: "left-0 -translate-x-1/2 border-b border-l",
};

const ARROW_ALIGN: Record<PopoverSide, Record<PopoverAlign, string>> = {
  top: { start: "left-5", center: "left-1/2 -translate-x-1/2", end: "right-5" },
  bottom: { start: "left-5", center: "left-1/2 -translate-x-1/2", end: "right-5" },
  left: { start: "top-5", center: "top-1/2 -translate-y-1/2", end: "bottom-5" },
  right: { start: "top-5", center: "top-1/2 -translate-y-1/2", end: "bottom-5" },
};

export interface PopoverContentProps extends ComponentPropsWithoutRef<"div"> {
  /** Side of the trigger to render on. */
  side?: PopoverSide;
  /** Alignment along the trigger's edge. */
  align?: PopoverAlign;
  /** Gap between the trigger and the panel, in pixels. */
  sideOffset?: number;
  /** Render the pointing arrow. */
  showArrow?: boolean;
  closeOnEscape?: boolean;
  closeOnInteractOutside?: boolean;
}

export function PopoverContent({
  side = "bottom",
  align = "center",
  sideOffset = 8,
  showArrow = true,
  closeOnEscape = true,
  closeOnInteractOutside = true,
  className,
  children,
  style,
  ...props
}: PopoverContentProps) {
  const { open, setOpen, triggerId, contentId, rootRef } =
    usePopoverContext("PopoverContent");
  const contentRef = useRef<HTMLDivElement>(null);
  const { mounted, visible } = useEnterExit(open, 150);

  // Non-modal: move focus into the panel and restore it on close, but do not
  // trap Tab. Dismiss on Escape / outside pointer, treating trigger + panel as
  // inside via the shared root.
  // Gate on `mounted` so focus moves in only once the panel is in the DOM.
  useFocusTrap(contentRef, { active: open && mounted, trap: false, restoreFocus: true });
  useDismiss(rootRef, {
    active: open,
    onDismiss: () => setOpen(false),
    escape: closeOnEscape,
    outsidePointer: closeOnInteractOutside,
  });

  if (!mounted) return null;

  const gap: CSSProperties =
    side === "top"
      ? { marginBottom: sideOffset }
      : side === "bottom"
        ? { marginTop: sideOffset }
        : side === "left"
          ? { marginRight: sideOffset }
          : { marginLeft: sideOffset };

  return (
    <div
      className={cn("absolute z-50", SIDE_POSITION[side], ALIGN_POSITION[side][align])}
      style={gap}
    >
      <div
        ref={contentRef}
        id={contentId}
        role="dialog"
        aria-labelledby={triggerId}
        tabIndex={-1}
        className={cn(
          "relative w-72 max-w-[calc(100vw-2rem)] rounded-3xl border bg-popover p-4 text-popover-foreground shadow-lg outline-none",
          "transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
          ORIGIN[side],
          visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
          className,
        )}
        style={style}
        {...props}
      >
        {children}
        {showArrow && (
          <span
            aria-hidden
            className={cn(
              "absolute size-2.5 rotate-45 bg-popover",
              ARROW_SIDE[side],
              ARROW_ALIGN[side][align],
            )}
          />
        )}
      </div>
    </div>
  );
}
PopoverContent.displayName = "PopoverContent";

/* -------------------------------------------------------------------------- */
/*                              Structural parts                               */
/* -------------------------------------------------------------------------- */

export function PopoverTitle({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return (
    <p
      className={cn("text-base font-medium text-foreground", className)}
      {...props}
    />
  );
}
PopoverTitle.displayName = "PopoverTitle";

export function PopoverDescription({
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
PopoverDescription.displayName = "PopoverDescription";

export interface PopoverCloseProps extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

export function PopoverClose({
  asChild = false,
  onClick,
  children,
  ...props
}: PopoverCloseProps) {
  const { setOpen } = usePopoverContext("PopoverClose");

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
PopoverClose.displayName = "PopoverClose";
