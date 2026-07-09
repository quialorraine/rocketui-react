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
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

export interface MenuContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  rootRef: React.RefObject<HTMLDivElement | null>;
}

/**
 * Shared by DropdownMenu and ContextMenu so both can reuse the same item,
 * label, separator, group and submenu parts.
 */
export const MenuContext = createContext<MenuContextValue | null>(null);

function useMenuContext(component: string): MenuContextValue {
  const ctx = useContext(MenuContext);
  if (!ctx) throw new Error(`<${component}> must be used within <DropdownMenu>.`);
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function DropdownMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: DropdownMenuProps) {
  const isControlled = open !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const currentOpen = isControlled ? open : uncontrolled;
  const reactId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  return (
    <MenuContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        triggerId: `menu-trigger-${reactId}`,
        contentId: `menu-content-${reactId}`,
        rootRef,
      }}
    >
      <div ref={rootRef} className="relative inline-block text-left">
        {children}
      </div>
    </MenuContext.Provider>
  );
}
DropdownMenu.displayName = "DropdownMenu";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface DropdownMenuTriggerProps
  extends ComponentPropsWithoutRef<"button"> {
  asChild?: boolean;
}

export function DropdownMenuTrigger({
  asChild = false,
  onClick,
  children,
  ...props
}: DropdownMenuTriggerProps) {
  const { open, setOpen, triggerId, contentId } = useMenuContext("DropdownMenuTrigger");

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    onClick?.(event as MouseEvent<HTMLButtonElement>);
    if (!event.defaultPrevented) setOpen(!open);
  };

  const shared = {
    id: triggerId,
    "aria-haspopup": "menu" as const,
    "aria-expanded": open,
    "aria-controls": open ? contentId : undefined,
    "data-state": open ? "open" : "closed",
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      ...shared,
      onClick: (event: MouseEvent<HTMLElement>) => {
        (child.props.onClick as ((e: MouseEvent<HTMLElement>) => void) | undefined)?.(
          event,
        );
        handleClick(event);
      },
    });
  }

  return (
    <button type="button" onClick={handleClick} {...shared} {...props}>
      {children}
    </button>
  );
}
DropdownMenuTrigger.displayName = "DropdownMenuTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

const contentVariants = cva(
  [
    "absolute z-50 min-w-[12rem] rounded-3xl border bg-popover p-2 text-popover-foreground outline-none",
    "transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
  ],
  {
    variants: {
      side: { bottom: "top-full mt-2", top: "bottom-full mb-2" },
      align: { start: "left-0", end: "right-0" },
    },
    defaultVariants: { side: "bottom", align: "start" },
  },
);

const ORIGIN: Record<string, string> = {
  "bottom-start": "origin-top-left",
  "bottom-end": "origin-top-right",
  "top-start": "origin-bottom-left",
  "top-end": "origin-bottom-right",
};

function menuItems(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)'),
  ).filter((el) => el.closest("[data-sub-content]") == null);
}

export interface DropdownMenuContentProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role">,
    VariantProps<typeof contentVariants> {
  closeOnEscape?: boolean;
}

export function DropdownMenuContent({
  side = "bottom",
  align = "start",
  closeOnEscape = true,
  className,
  children,
  ...props
}: DropdownMenuContentProps) {
  const { open, setOpen, triggerId, contentId, rootRef } =
    useMenuContext("DropdownMenuContent");
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  const focusTrigger = useCallback(
    () => document.getElementById(triggerId)?.focus(),
    [triggerId],
  );

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 150);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Focus the first item once the menu is open.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() => menuItems(contentRef.current)[0]?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Close on outside pointer + Escape.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        setOpen(false);
        focusTrigger();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [open, closeOnEscape, setOpen, focusTrigger, rootRef]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    const items = menuItems(contentRef.current);
    if (items.length === 0) return;
    const index = items.indexOf(document.activeElement as HTMLElement);

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        items[(index + 1 + items.length) % items.length]?.focus();
        break;
      case "ArrowUp":
        event.preventDefault();
        items[(index - 1 + items.length) % items.length]?.focus();
        break;
      case "Home":
        event.preventDefault();
        items[0]?.focus();
        break;
      case "End":
        event.preventDefault();
        items[items.length - 1]?.focus();
        break;
      case "Tab":
        setOpen(false);
        break;
    }
  };

  if (!mounted) return null;

  return (
    <div
      ref={contentRef}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      aria-orientation="vertical"
      tabIndex={-1}
      onKeyDown={onKeyDown}
      className={cn(
        contentVariants({ side, align }),
        ORIGIN[`${side}-${align}`],
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DropdownMenuContent.displayName = "DropdownMenuContent";

/* -------------------------------------------------------------------------- */
/*                                    Item                                     */
/* -------------------------------------------------------------------------- */

const itemVariants = cva(
  [
    "group flex w-full cursor-pointer select-none items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm outline-none",
    "transition-colors focus:bg-muted hover:bg-muted",
    "disabled:pointer-events-none disabled:opacity-50",
  ],
  {
    variants: {
      destructive: {
        true: "text-destructive focus:bg-destructive/10 hover:bg-destructive/10",
        false: "text-foreground",
      },
    },
    defaultVariants: { destructive: false },
  },
);

export interface DropdownMenuItemProps
  extends Omit<ComponentPropsWithoutRef<"button">, "onSelect"> {
  /** Leading icon. */
  icon?: ReactNode;
  /** Trailing keyboard shortcut hint (e.g. "⌘N"). */
  shortcut?: ReactNode;
  /** Secondary line beneath the label. */
  description?: ReactNode;
  /** Style as a dangerous action. */
  destructive?: boolean;
  /** Reserve icon space so labels align when the menu mixes icon/no-icon items. */
  inset?: boolean;
  /** Fired on click / Enter / Space. */
  onSelect?: () => void;
  /** Keep the menu open after selecting. */
  closeOnSelect?: boolean;
}

export function DropdownMenuItem({
  icon,
  shortcut,
  description,
  destructive = false,
  inset = false,
  onSelect,
  closeOnSelect = true,
  disabled,
  className,
  children,
  onClick,
  ...props
}: DropdownMenuItemProps) {
  const { setOpen, triggerId } = useMenuContext("DropdownMenuItem");

  return (
    <button
      type="button"
      role="menuitem"
      tabIndex={-1}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented) return;
        onSelect?.();
        if (closeOnSelect) {
          setOpen(false);
          document.getElementById(triggerId)?.focus();
        }
      }}
      className={cn(itemVariants({ destructive }), className)}
      {...props}
    >
      {icon ? (
        <span className="flex shrink-0 items-center justify-center [&_svg]:size-[22px]">
          {icon}
        </span>
      ) : (
        inset && <span aria-hidden className="w-[22px] shrink-0" />
      )}
      <span className="flex min-w-0 flex-1 flex-col">
        <span className="truncate font-medium">{children}</span>
        {description && (
          <span className="truncate text-sm font-normal text-muted-foreground">
            {description}
          </span>
        )}
      </span>
      {shortcut && (
        <span className="ml-auto shrink-0 pl-3 text-sm text-muted-foreground">
          {shortcut}
        </span>
      )}
    </button>
  );
}
DropdownMenuItem.displayName = "DropdownMenuItem";

/* -------------------------------------------------------------------------- */
/*                              Structural parts                               */
/* -------------------------------------------------------------------------- */

export function DropdownMenuLabel({
  className,
  inset = false,
  ...props
}: ComponentPropsWithoutRef<"div"> & { inset?: boolean }) {
  return (
    <div
      className={cn(
        "px-3 py-1.5 text-xs font-semibold uppercase tracking-wide text-muted-foreground",
        inset && "pl-[calc(0.75rem+22px+0.75rem)]",
        className,
      )}
      {...props}
    />
  );
}
DropdownMenuLabel.displayName = "DropdownMenuLabel";

export function DropdownMenuSeparator({
  className,
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return (
    <div
      role="separator"
      aria-orientation="horizontal"
      className={cn("my-1 h-px bg-border", className)}
      {...props}
    />
  );
}
DropdownMenuSeparator.displayName = "DropdownMenuSeparator";

export function DropdownMenuGroup(props: ComponentPropsWithoutRef<"div">) {
  return <div role="group" {...props} />;
}
DropdownMenuGroup.displayName = "DropdownMenuGroup";

/* -------------------------------------------------------------------------- */
/*                                  Submenu                                    */
/* -------------------------------------------------------------------------- */

interface SubContextValue {
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerId: string;
  contentId: string;
  openWithDelay: () => void;
  openViaKeyboard: () => void;
  closeWithDelay: () => void;
  cancelClose: () => void;
  /** Whether the submenu was last opened via the keyboard (drives autofocus). */
  keyboardRef: React.MutableRefObject<boolean>;
}

const SubContext = createContext<SubContextValue | null>(null);

function useSubContext(component: string): SubContextValue {
  const ctx = useContext(SubContext);
  if (!ctx) throw new Error(`<${component}> must be used within <DropdownMenuSub>.`);
  return ctx;
}

export function DropdownMenuSub({ children }: { children?: ReactNode }) {
  const [open, setOpen] = useState(false);
  const reactId = useId();
  const timer = useRef<number | null>(null);
  const keyboardRef = useRef(false);

  const cancelClose = useCallback(() => {
    if (timer.current) window.clearTimeout(timer.current);
    timer.current = null;
  }, []);
  const openWithDelay = useCallback(() => {
    cancelClose();
    keyboardRef.current = false;
    setOpen(true);
  }, [cancelClose]);
  const openViaKeyboard = useCallback(() => {
    cancelClose();
    keyboardRef.current = true;
    setOpen(true);
  }, [cancelClose]);
  const closeWithDelay = useCallback(() => {
    cancelClose();
    timer.current = window.setTimeout(() => setOpen(false), 120);
  }, [cancelClose]);

  useEffect(() => cancelClose, [cancelClose]);

  return (
    <SubContext.Provider
      value={{
        open,
        setOpen,
        triggerId: `submenu-trigger-${reactId}`,
        contentId: `submenu-content-${reactId}`,
        openWithDelay,
        openViaKeyboard,
        closeWithDelay,
        cancelClose,
        keyboardRef,
      }}
    >
      <div className="relative">{children}</div>
    </SubContext.Provider>
  );
}
DropdownMenuSub.displayName = "DropdownMenuSub";

export interface DropdownMenuSubTriggerProps
  extends ComponentPropsWithoutRef<"button"> {
  icon?: ReactNode;
  inset?: boolean;
}

export function DropdownMenuSubTrigger({
  icon,
  inset = false,
  className,
  children,
  disabled,
  ...props
}: DropdownMenuSubTriggerProps) {
  const {
    open,
    setOpen,
    triggerId,
    contentId,
    openWithDelay,
    openViaKeyboard,
    closeWithDelay,
    keyboardRef,
  } = useSubContext("DropdownMenuSubTrigger");

  return (
    <button
      type="button"
      role="menuitem"
      id={triggerId}
      tabIndex={-1}
      disabled={disabled}
      aria-haspopup="menu"
      aria-expanded={open}
      aria-controls={open ? contentId : undefined}
      onClick={() => {
        keyboardRef.current = false;
        setOpen(!open);
      }}
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
      onKeyDown={(event) => {
        if (event.key === "ArrowRight" || event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          openViaKeyboard();
        }
      }}
      className={cn(
        itemVariants({ destructive: false }),
        open && "bg-muted",
        className,
      )}
      {...props}
    >
      {icon ? (
        <span className="flex shrink-0 items-center justify-center [&_svg]:size-[22px]">
          {icon}
        </span>
      ) : (
        inset && <span aria-hidden className="w-[22px] shrink-0" />
      )}
      <span className="min-w-0 flex-1 truncate font-medium">{children}</span>
      <CaretRight className="ml-auto size-[18px] shrink-0 text-muted-foreground" />
    </button>
  );
}
DropdownMenuSubTrigger.displayName = "DropdownMenuSubTrigger";

export interface DropdownMenuSubContentProps
  extends ComponentPropsWithoutRef<"div"> {
  /** Horizontal gap from the parent item. */
  sideOffset?: number;
}

export function DropdownMenuSubContent({
  className,
  children,
  ...props
}: DropdownMenuSubContentProps) {
  const {
    open,
    setOpen,
    triggerId,
    contentId,
    openWithDelay,
    closeWithDelay,
    keyboardRef,
  } = useSubContext("DropdownMenuSubContent");
  const ref = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), 150);
    return () => window.clearTimeout(timer);
  }, [open]);

  // Only steal focus when the submenu was opened via the keyboard — opening on
  // hover must not leave the first item highlighted under the pointer.
  useEffect(() => {
    if (!open || !keyboardRef.current) return;
    const frame = requestAnimationFrame(() =>
      ref.current?.querySelector<HTMLElement>('[role="menuitem"]:not(:disabled)')?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [open, keyboardRef]);

  if (!mounted) return null;

  return (
    <div
      ref={ref}
      id={contentId}
      role="menu"
      aria-labelledby={triggerId}
      data-sub-content=""
      onMouseEnter={openWithDelay}
      onMouseLeave={closeWithDelay}
      onKeyDown={(event) => {
        const items = Array.from(
          ref.current?.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)') ?? [],
        );
        const index = items.indexOf(document.activeElement as HTMLElement);
        if (event.key === "ArrowDown") {
          event.preventDefault();
          items[(index + 1) % items.length]?.focus();
        } else if (event.key === "ArrowUp") {
          event.preventDefault();
          items[(index - 1 + items.length) % items.length]?.focus();
        } else if (event.key === "ArrowLeft" || event.key === "Escape") {
          event.preventDefault();
          event.stopPropagation();
          setOpen(false);
          document.getElementById(triggerId)?.focus();
        }
      }}
      className={cn(
        "absolute left-full top-0 z-50 ml-1 min-w-[11rem] rounded-3xl border bg-popover p-2 text-popover-foreground outline-none",
        "origin-top-left transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
DropdownMenuSubContent.displayName = "DropdownMenuSubContent";
