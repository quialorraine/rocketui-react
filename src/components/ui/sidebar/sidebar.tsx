import {
  cloneElement,
  createContext,
  isValidElement,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type MouseEvent,
  type ReactElement,
  type ReactNode,
} from "react";
import { cva } from "class-variance-authority";
import { CaretDown } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { useControllableState } from "@/lib/use-controllable-state";

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

interface SidebarContextValue {
  /** The value of the currently selected item, if any. */
  value: string | undefined;
  /** Select an item by value. */
  select: (value: string) => void;
}

const SidebarContext = createContext<SidebarContextValue | null>(null);

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                   */
/* -------------------------------------------------------------------------- */

/** Merge our computed classes/props onto a caller-provided element. */
function renderAsChild(
  children: ReactNode,
  className: string,
  props: Record<string, unknown>,
  inner: ReactNode,
): ReactElement {
  const child = children as ReactElement<{
    className?: string;
    children?: ReactNode;
  }>;
  return cloneElement(
    child,
    { className: cn(className, child.props.className), ...props },
    inner,
    child.props.children,
  );
}

/* -------------------------------------------------------------------------- */
/*                                 Containers                                  */
/* -------------------------------------------------------------------------- */

export interface SidebarProps extends ComponentPropsWithoutRef<"nav"> {
  /** Value of the selected item (controlled). */
  value?: string;
  /** Value of the initially selected item (uncontrolled). */
  defaultValue?: string;
  /** Fired with the value of the item that was selected. */
  onValueChange?: (value: string) => void;
}

/**
 * The sidebar shell: a bordered, padded card that stacks its sections. It also
 * tracks the selected item — give items a `value` and they become active on
 * click, no wiring required.
 */
export function Sidebar({
  value,
  defaultValue,
  onValueChange,
  className,
  children,
  ...props
}: SidebarProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const selected = isControlled ? value : internal;

  const select = useCallback(
    (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const context = useMemo<SidebarContextValue>(
    () => ({ value: selected, select }),
    [selected, select],
  );

  return (
    <SidebarContext.Provider value={context}>
      <nav
        className={cn(
          "flex w-64 flex-col rounded-2xl border border-border bg-card p-3",
          className,
        )}
        {...props}
      >
        {children}
      </nav>
    </SidebarContext.Provider>
  );
}
Sidebar.displayName = "Sidebar";

export interface SidebarHeaderProps extends ComponentPropsWithoutRef<"div"> {}

/** Brand area at the top of the sidebar (logo + product name). */
export function SidebarHeader({
  className,
  children,
  ...props
}: SidebarHeaderProps) {
  return (
    <div
      className={cn("flex items-center gap-2.5 px-2 py-1.5", className)}
      {...props}
    >
      {children}
    </div>
  );
}
SidebarHeader.displayName = "SidebarHeader";

export interface SidebarSectionProps extends ComponentPropsWithoutRef<"div"> {}

/** A vertical group of items with tight spacing. */
export function SidebarSection({
  className,
  children,
  ...props
}: SidebarSectionProps) {
  return (
    <div className={cn("flex flex-col gap-0.5", className)} {...props}>
      {children}
    </div>
  );
}
SidebarSection.displayName = "SidebarSection";

export interface SidebarFooterProps extends ComponentPropsWithoutRef<"div"> {}

/** A group pinned to the bottom when the sidebar has a fixed height. */
export function SidebarFooter({
  className,
  children,
  ...props
}: SidebarFooterProps) {
  return (
    <div
      className={cn("mt-auto flex flex-col gap-0.5 pt-3", className)}
      {...props}
    >
      {children}
    </div>
  );
}
SidebarFooter.displayName = "SidebarFooter";

export interface SidebarSeparatorProps extends ComponentPropsWithoutRef<"div"> {}

/** A hairline divider between sidebar sections. */
export function SidebarSeparator({ className, ...props }: SidebarSeparatorProps) {
  return (
    <div
      role="separator"
      className={cn("my-3 h-px shrink-0 bg-border", className)}
      {...props}
    />
  );
}
SidebarSeparator.displayName = "SidebarSeparator";

/* -------------------------------------------------------------------------- */
/*                                    Item                                     */
/* -------------------------------------------------------------------------- */

const itemVariants = cva(
  [
    "relative flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm outline-none transition-colors",
    "focus-visible:ring-2 focus-visible:ring-ring",
    "disabled:pointer-events-none disabled:opacity-50",
    "[&_svg]:shrink-0",
  ],
  {
    variants: {
      active: {
        true: "bg-primary/10 font-medium text-primary before:absolute before:-left-3 before:top-1/2 before:h-5 before:w-0.5 before:-translate-y-1/2 before:rounded-full before:bg-primary before:content-['']",
        false: "text-foreground hover:bg-muted",
      },
    },
    defaultVariants: { active: false },
  },
);

export interface SidebarItemProps
  extends ComponentPropsWithoutRef<"button"> {
  /** Leading icon element. */
  icon?: ReactNode;
  /** Identifier used for selection. Selected on click and matched against the Sidebar value. */
  value?: string;
  /** Force the active state. Overrides selection derived from `value`. */
  active?: boolean;
  /** Trailing content, e.g. a badge or count. */
  trailing?: ReactNode;
  /** Render styles onto the child element (e.g. an `<a>` or router link). */
  asChild?: boolean;
}

/** A primary navigation row. Renders a `<button>`, or the child via `asChild`. */
export function SidebarItem({
  icon,
  value,
  active,
  trailing,
  asChild = false,
  className,
  children,
  type,
  onClick,
  ...props
}: SidebarItemProps) {
  const context = useContext(SidebarContext);
  const isActive =
    active ?? (value !== undefined && context?.value === value);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (value !== undefined) context?.select(value);
    onClick?.(event);
  };

  const classes = cn(itemVariants({ active: isActive }), className);
  const iconNode = icon && (
    <span className="grid shrink-0 place-items-center [&_svg]:size-[18px]">
      {icon}
    </span>
  );

  if (asChild && isValidElement(children)) {
    return renderAsChild(
      children,
      classes,
      {
        "aria-current": isActive ? "page" : undefined,
        onClick: handleClick,
        ...props,
      },
      iconNode,
    );
  }

  return (
    <button
      type={type ?? "button"}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
      className={classes}
      {...props}
    >
      {iconNode}
      <span className="flex-1 truncate">{children}</span>
      {trailing}
    </button>
  );
}
SidebarItem.displayName = "SidebarItem";

/* -------------------------------------------------------------------------- */
/*                              Collapsible group                              */
/* -------------------------------------------------------------------------- */

export interface SidebarGroupProps {
  /** Leading icon for the group trigger. */
  icon?: ReactNode;
  /** The group label shown on the trigger. */
  label: ReactNode;
  /** Open state (controlled). */
  open?: boolean;
  /** Initial open state (uncontrolled). */
  defaultOpen?: boolean;
  /** Fired when the open state changes. */
  onOpenChange?: (open: boolean) => void;
  /** The sub-items, typically `SidebarSubItem`s. */
  children: ReactNode;
  className?: string;
}

/** A labelled group that expands and collapses a tree of sub-items. */
export function SidebarGroup({
  icon,
  label,
  open,
  defaultOpen = false,
  onOpenChange,
  children,
  className,
}: SidebarGroupProps) {
  const [isOpen, setIsOpen] = useControllableState({
    value: open,
    defaultValue: defaultOpen,
    onChange: onOpenChange,
  });

  return (
    <div className={cn("flex flex-col", className)}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          itemVariants({ active: false }),
          "text-muted-foreground hover:text-foreground",
        )}
      >
        {icon && (
          <span className="grid shrink-0 place-items-center [&_svg]:size-[18px]">
            {icon}
          </span>
        )}
        <span className="flex-1 truncate">{label}</span>
        <CaretDown
          aria-hidden="true"
          className={cn(
            "size-4 transition-transform duration-300",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <div
        className={cn(
          "grid transition-all duration-300 ease-out",
          isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
        )}
      >
        <div className="overflow-hidden">
          <div className="relative ml-[22px] mt-0.5 flex flex-col">
            <span className="absolute bottom-2 left-0 top-2 w-px bg-border" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
SidebarGroup.displayName = "SidebarGroup";

export interface SidebarSubItemProps
  extends ComponentPropsWithoutRef<"button"> {
  /** Identifier used for selection. Selected on click and matched against the Sidebar value. */
  value?: string;
  /** Force the active state. Overrides selection derived from `value`. */
  active?: boolean;
  /** Render styles onto the child element (e.g. an `<a>` or router link). */
  asChild?: boolean;
}

/** A nested link inside a `SidebarGroup`, drawn with a tree connector. */
export function SidebarSubItem({
  value,
  active,
  asChild = false,
  className,
  children,
  type,
  onClick,
  ...props
}: SidebarSubItemProps) {
  const context = useContext(SidebarContext);
  const isActive =
    active ?? (value !== undefined && context?.value === value);

  const handleClick = (event: MouseEvent<HTMLButtonElement>) => {
    if (value !== undefined) context?.select(value);
    onClick?.(event);
  };

  const classes = cn(
    "relative flex items-center py-1.5 pl-5 text-left text-sm outline-none transition-colors",
    "focus-visible:text-foreground",
    isActive
      ? "font-medium text-foreground"
      : "text-muted-foreground hover:text-foreground",
    className,
  );
  const connector = (
    <span className="absolute left-0 top-1/2 h-px w-3 -translate-y-1/2 bg-border" />
  );

  if (asChild && isValidElement(children)) {
    return renderAsChild(
      children,
      classes,
      {
        "aria-current": isActive ? "page" : undefined,
        onClick: handleClick,
        ...props,
      },
      connector,
    );
  }

  return (
    <button
      type={type ?? "button"}
      aria-current={isActive ? "page" : undefined}
      onClick={handleClick}
      className={classes}
      {...props}
    >
      {connector}
      {children}
    </button>
  );
}
SidebarSubItem.displayName = "SidebarSubItem";
