import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";
import {
  MenuContext,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
} from "../dropdown-menu/dropdown-menu";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

interface ContextMenuState {
  point: { x: number; y: number };
  openAt: (x: number, y: number) => void;
}

const ContextMenuStateContext = createContext<ContextMenuState | null>(null);

function useContextMenuState(component: string): ContextMenuState {
  const ctx = useContext(ContextMenuStateContext);
  if (!ctx) throw new Error(`<${component}> must be used within <ContextMenu>.`);
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface ContextMenuProps {
  /** Controlled open state. */
  open?: boolean;
  /** Uncontrolled initial open state. */
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: ReactNode;
}

export function ContextMenu({
  open,
  defaultOpen = false,
  onOpenChange,
  children,
}: ContextMenuProps) {
  const isControlled = open !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultOpen);
  const currentOpen = isControlled ? open : uncontrolled;
  const [point, setPoint] = useState({ x: 0, y: 0 });
  const reactId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  const setOpen = useCallback(
    (next: boolean) => {
      if (!isControlled) setUncontrolled(next);
      onOpenChange?.(next);
    },
    [isControlled, onOpenChange],
  );

  const openAt = useCallback(
    (x: number, y: number) => {
      setPoint({ x, y });
      setOpen(true);
    },
    [setOpen],
  );

  return (
    <MenuContext.Provider
      value={{
        open: currentOpen,
        setOpen,
        triggerId: `context-trigger-${reactId}`,
        contentId: `context-content-${reactId}`,
        rootRef,
      }}
    >
      <ContextMenuStateContext.Provider value={{ point, openAt }}>
        <div ref={rootRef} className="contents">
          {children}
        </div>
      </ContextMenuStateContext.Provider>
    </MenuContext.Provider>
  );
}
ContextMenu.displayName = "ContextMenu";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface ContextMenuTriggerProps
  extends ComponentPropsWithoutRef<"div"> {
  /** Merge the trigger behaviour onto the single child element. */
  asChild?: boolean;
  /** Disable opening the menu. */
  disabled?: boolean;
}

export function ContextMenuTrigger({
  asChild = false,
  disabled = false,
  onContextMenu,
  className,
  children,
  ...props
}: ContextMenuTriggerProps) {
  const { openAt } = useContextMenuState("ContextMenuTrigger");

  const handleContextMenu = (event: MouseEvent<HTMLElement>) => {
    onContextMenu?.(event as MouseEvent<HTMLDivElement>);
    if (disabled || event.defaultPrevented) return;
    event.preventDefault();
    openAt(event.clientX, event.clientY);
  };

  if (asChild && isValidElement(children)) {
    const child = children as ReactElement<Record<string, unknown>>;
    return cloneElement(child, {
      "data-context-menu-trigger": "",
      onContextMenu: (event: MouseEvent<HTMLElement>) => {
        (
          child.props.onContextMenu as
            | ((e: MouseEvent<HTMLElement>) => void)
            | undefined
        )?.(event);
        handleContextMenu(event);
      },
    });
  }

  return (
    <div
      data-context-menu-trigger=""
      onContextMenu={handleContextMenu}
      className={className}
      {...props}
    >
      {children}
    </div>
  );
}
ContextMenuTrigger.displayName = "ContextMenuTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

function menuItems(container: HTMLElement | null): HTMLElement[] {
  if (!container) return [];
  return Array.from(
    container.querySelectorAll<HTMLElement>('[role="menuitem"]:not(:disabled)'),
  ).filter((el) => el.closest("[data-sub-content]") == null);
}

export interface ContextMenuContentProps
  extends Omit<ComponentPropsWithoutRef<"div">, "role"> {
  closeOnEscape?: boolean;
}

export function ContextMenuContent({
  closeOnEscape = true,
  className,
  children,
  ...props
}: ContextMenuContentProps) {
  const menu = useContext(MenuContext);
  if (!menu)
    throw new Error("<ContextMenuContent> must be used within <ContextMenu>.");
  const { open, setOpen, contentId, triggerId } = menu;
  const { point } = useContextMenuState("ContextMenuContent");

  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);
  const [pos, setPos] = useState(point);

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

  // Position at the pointer, clamped inside the viewport, once the menu is
  // mounted. `mounted` is a dependency so this re-runs after the element
  // actually renders (the ref is null on the render that opens the menu).
  useLayoutEffect(() => {
    if (!open || !mounted) return;
    const el = contentRef.current;
    if (!el) {
      setPos(point);
      return;
    }
    const rect = el.getBoundingClientRect();
    const pad = 8;
    const x = Math.max(
      pad,
      Math.min(point.x, window.innerWidth - rect.width - pad),
    );
    const y = Math.max(
      pad,
      Math.min(point.y, window.innerHeight - rect.height - pad),
    );
    setPos({ x, y });
  }, [open, mounted, point.x, point.y]);

  // Focus the first item once open.
  useEffect(() => {
    if (!open) return;
    const frame = requestAnimationFrame(() =>
      menuItems(contentRef.current)[0]?.focus(),
    );
    return () => cancelAnimationFrame(frame);
  }, [open]);

  // Close on outside pointer, Escape, scroll and resize.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!contentRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === "Escape" && closeOnEscape) {
        event.stopPropagation();
        setOpen(false);
      }
    };
    const onScrollOrResize = () => setOpen(false);
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    window.addEventListener("scroll", onScrollOrResize, true);
    window.addEventListener("resize", onScrollOrResize);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("scroll", onScrollOrResize, true);
      window.removeEventListener("resize", onScrollOrResize);
    };
  }, [open, closeOnEscape, setOpen]);

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
      style={{ left: pos.x, top: pos.y }}
      className={cn(
        "fixed z-50 min-w-[12rem] origin-top-left rounded-3xl border bg-popover p-2 text-popover-foreground outline-none",
        "transition-[opacity,transform] duration-150 ease-out motion-reduce:transition-none",
        visible ? "scale-100 opacity-100" : "scale-95 opacity-0",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
ContextMenuContent.displayName = "ContextMenuContent";

/* -------------------------------------------------------------------------- */
/*                          Reused menu parts (aliases)                        */
/* -------------------------------------------------------------------------- */

export {
  DropdownMenuItem as ContextMenuItem,
  DropdownMenuLabel as ContextMenuLabel,
  DropdownMenuSeparator as ContextMenuSeparator,
  DropdownMenuGroup as ContextMenuGroup,
  DropdownMenuSub as ContextMenuSub,
  DropdownMenuSubTrigger as ContextMenuSubTrigger,
  DropdownMenuSubContent as ContextMenuSubContent,
};

export type {
  DropdownMenuItemProps as ContextMenuItemProps,
  DropdownMenuSubTriggerProps as ContextMenuSubTriggerProps,
  DropdownMenuSubContentProps as ContextMenuSubContentProps,
} from "../dropdown-menu/dropdown-menu";
