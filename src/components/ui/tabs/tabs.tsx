import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Context                                   */
/* -------------------------------------------------------------------------- */

type TabsSize = "sm" | "md";

interface TabsContextValue {
  value: string;
  setValue: (value: string) => void;
  size: TabsSize;
  baseId: string;
}

const TabsContext = createContext<TabsContextValue | null>(null);

function useTabs(component: string) {
  const ctx = useContext(TabsContext);
  if (!ctx) throw new Error(`${component} must be used within <Tabs>`);
  return ctx;
}

const SIZE: Record<TabsSize, { list: string; trigger: string }> = {
  sm: { list: "h-[34px] p-[3px]", trigger: "h-7 px-3 text-sm" },
  md: { list: "h-10 p-[3px]", trigger: "h-[34px] px-4 text-sm" },
};

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface TabsProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  /** Selected tab value (controlled). */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Fired with the next value when the selection changes. */
  onValueChange?: (value: string) => void;
  size?: TabsSize;
  children: ReactNode;
}

export function Tabs({
  value,
  defaultValue,
  onValueChange,
  size = "md",
  className,
  children,
  ...props
}: TabsProps) {
  const baseId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? "");
  const current = isControlled ? value : internal;

  const setValue = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <TabsContext.Provider value={{ value: current, setValue, size, baseId }}>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        {children}
      </div>
    </TabsContext.Provider>
  );
}
Tabs.displayName = "Tabs";

/* -------------------------------------------------------------------------- */
/*                                    List                                     */
/* -------------------------------------------------------------------------- */

export interface TabsListProps extends ComponentPropsWithoutRef<"div"> {
  /** Stretch triggers to fill the available width. */
  fullWidth?: boolean;
}

export function TabsList({ className, fullWidth, ...props }: TabsListProps) {
  const { size } = useTabs("TabsList");

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys = ["ArrowRight", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    const list = e.currentTarget;
    const tabs = Array.from(
      list.querySelectorAll<HTMLButtonElement>('[role="tab"]:not([disabled])'),
    );
    if (tabs.length === 0) return;
    const currentIndex = tabs.findIndex((t) => t === document.activeElement);
    e.preventDefault();

    let nextIndex = currentIndex;
    if (e.key === "ArrowRight") nextIndex = (currentIndex + 1) % tabs.length;
    else if (e.key === "ArrowLeft")
      nextIndex = (currentIndex - 1 + tabs.length) % tabs.length;
    else if (e.key === "Home") nextIndex = 0;
    else if (e.key === "End") nextIndex = tabs.length - 1;

    tabs[nextIndex]?.focus();
    tabs[nextIndex]?.click();
  };

  return (
    <div
      role="tablist"
      onKeyDown={onKeyDown}
      className={cn(
        "inline-flex items-center gap-1 rounded-full bg-accent",
        fullWidth && "flex w-full",
        SIZE[size].list,
        className,
      )}
      {...props}
    />
  );
}
TabsList.displayName = "TabsList";

/* -------------------------------------------------------------------------- */
/*                                  Trigger                                    */
/* -------------------------------------------------------------------------- */

export interface TabsTriggerProps
  extends Omit<ComponentPropsWithoutRef<"button">, "value"> {
  value: string;
}

export function TabsTrigger({
  value,
  className,
  disabled,
  ...props
}: TabsTriggerProps) {
  const { value: current, setValue, size, baseId } = useTabs("TabsTrigger");
  const selected = current === value;

  return (
    <button
      type="button"
      role="tab"
      id={`${baseId}-tab-${value}`}
      aria-selected={selected}
      aria-controls={`${baseId}-panel-${value}`}
      tabIndex={selected ? 0 : -1}
      disabled={disabled}
      onClick={() => setValue(value)}
      className={cn(
        "inline-flex flex-1 items-center justify-center gap-1.5 rounded-full font-medium whitespace-nowrap transition-colors",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
        "disabled:pointer-events-none disabled:opacity-50",
        SIZE[size].trigger,
        selected
          ? "bg-card text-foreground shadow-sm"
          : "text-muted-foreground hover:text-foreground",
        className,
      )}
      {...props}
    />
  );
}
TabsTrigger.displayName = "TabsTrigger";

/* -------------------------------------------------------------------------- */
/*                                  Content                                    */
/* -------------------------------------------------------------------------- */

export interface TabsContentProps extends ComponentPropsWithoutRef<"div"> {
  value: string;
}

export function TabsContent({
  value,
  className,
  children,
  ...props
}: TabsContentProps) {
  const { value: current, baseId } = useTabs("TabsContent");
  if (current !== value) return null;

  return (
    <div
      role="tabpanel"
      id={`${baseId}-panel-${value}`}
      aria-labelledby={`${baseId}-tab-${value}`}
      tabIndex={0}
      className={cn("focus-visible:outline-none", className)}
      {...props}
    >
      {children}
    </div>
  );
}
TabsContent.displayName = "TabsContent";
