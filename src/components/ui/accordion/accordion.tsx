import {
  createContext,
  useCallback,
  useContext,
  useId,
  useMemo,
  useState,
  type ComponentPropsWithoutRef,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CaretDown, Minus, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

type AccordionType = "single" | "multiple";
type AccordionValue = string | string[];

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

interface AccordionContextValue {
  openValues: string[];
  toggle: (value: string) => void;
  variant: NonNullable<VariantProps<typeof accordionVariants>["variant"]>;
  size: NonNullable<VariantProps<typeof accordionVariants>["size"]>;
  indicator: "chevron" | "plus";
  disabled: boolean;
}

const AccordionContext = createContext<AccordionContextValue | null>(null);

function useAccordionContext(component: string): AccordionContextValue {
  const context = useContext(AccordionContext);
  if (!context) {
    throw new Error(`<${component}> must be used within <Accordion>.`);
  }
  return context;
}

interface AccordionItemContextValue {
  value: string;
  open: boolean;
  disabled: boolean;
  triggerId: string;
  contentId: string;
}

const AccordionItemContext = createContext<AccordionItemContextValue | null>(null);

function useAccordionItemContext(component: string): AccordionItemContextValue {
  const context = useContext(AccordionItemContext);
  if (!context) {
    throw new Error(`<${component}> must be used within <AccordionItem>.`);
  }
  return context;
}

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const accordionVariants = cva("flex flex-col", {
  variants: {
    variant: {
      surface: "rounded-2xl border bg-card text-card-foreground shadow-sm",
      plain: "",
    },
    size: {
      sm: "gap-0.5",
      md: "gap-1",
      lg: "gap-1.5",
    },
  },
  compoundVariants: [
    { variant: "surface", size: "sm", className: "p-2" },
    { variant: "surface", size: "md", className: "p-3" },
    { variant: "surface", size: "lg", className: "p-4" },
  ],
  defaultVariants: { variant: "surface", size: "md" },
});

const triggerVariants = cva(
  "group/trigger flex w-full items-center justify-between gap-3 rounded-xl text-left font-medium text-foreground outline-none transition-colors hover:bg-muted/60 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "px-2 py-2 text-sm",
        md: "px-2.5 py-2.5 text-base",
        lg: "px-3 py-3 text-lg",
      },
    },
    defaultVariants: { size: "md" },
  },
);

const contentInnerVariants = cva("text-muted-foreground", {
  variants: {
    size: {
      sm: "px-2 pb-3 pt-0.5 text-sm leading-relaxed",
      md: "px-2.5 pb-3.5 pt-0.5 text-sm leading-relaxed",
      lg: "px-3 pb-4 pt-1 text-base leading-relaxed",
    },
  },
  defaultVariants: { size: "md" },
});

const CHEVRON_SIZE = { sm: "size-4", md: "size-5", lg: "size-6" } as const;
const BOX_SIZE = { sm: "size-7", md: "size-8", lg: "size-9" } as const;
const BOX_ICON_SIZE = { sm: "size-3.5", md: "size-4", lg: "size-5" } as const;
const LEADING_ICON_SIZE = {
  sm: "[&_svg]:size-4",
  md: "[&_svg]:size-5",
  lg: "[&_svg]:size-6",
} as const;

/* -------------------------------------------------------------------------- */
/*                                    Root                                     */
/* -------------------------------------------------------------------------- */

export interface AccordionProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue">,
    VariantProps<typeof accordionVariants> {
  /** Whether one or many items can be open at once. */
  type?: AccordionType;
  /** Allow closing the open item in `single` mode. Ignored for `multiple`. */
  collapsible?: boolean;
  /** Controlled open value(s). */
  value?: AccordionValue;
  /** Uncontrolled initial open value(s). */
  defaultValue?: AccordionValue;
  /** Called whenever the open value(s) change. */
  onValueChange?: (value: AccordionValue) => void;
  /** Indicator shown on each trigger. */
  indicator?: "chevron" | "plus";
  /** Disable every item at once. */
  disabled?: boolean;
}

function toArray(value: AccordionValue | undefined): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

export function Accordion({
  type = "single",
  collapsible = true,
  value,
  defaultValue,
  onValueChange,
  variant,
  size,
  indicator = "chevron",
  disabled = false,
  className,
  children,
  ...props
}: AccordionProps) {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string[]>(() =>
    toArray(defaultValue),
  );
  const openValues = isControlled ? toArray(value) : uncontrolled;

  const setOpenValues = useCallback(
    (next: string[]) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(type === "multiple" ? next : (next[0] ?? ""));
    },
    [isControlled, onValueChange, type],
  );

  const toggle = useCallback(
    (itemValue: string) => {
      const isOpen = openValues.includes(itemValue);
      if (type === "multiple") {
        setOpenValues(
          isOpen
            ? openValues.filter((v) => v !== itemValue)
            : [...openValues, itemValue],
        );
        return;
      }
      if (isOpen) {
        setOpenValues(collapsible ? [] : openValues);
      } else {
        setOpenValues([itemValue]);
      }
    },
    [collapsible, openValues, setOpenValues, type],
  );

  const resolvedVariant = variant ?? "surface";
  const resolvedSize = size ?? "md";

  const context = useMemo<AccordionContextValue>(
    () => ({
      openValues,
      toggle,
      variant: resolvedVariant,
      size: resolvedSize,
      indicator,
      disabled,
    }),
    [openValues, toggle, resolvedVariant, resolvedSize, indicator, disabled],
  );

  return (
    <AccordionContext.Provider value={context}>
      <div
        data-accordion-root=""
        data-variant={resolvedVariant}
        className={cn(
          accordionVariants({ variant: resolvedVariant, size: resolvedSize }),
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </AccordionContext.Provider>
  );
}
Accordion.displayName = "Accordion";

/* -------------------------------------------------------------------------- */
/*                                    Item                                     */
/* -------------------------------------------------------------------------- */

export interface AccordionItemProps extends ComponentPropsWithoutRef<"div"> {
  /** Unique value identifying this item within the accordion. */
  value: string;
  disabled?: boolean;
}

export function AccordionItem({
  value,
  disabled = false,
  className,
  children,
  ...props
}: AccordionItemProps) {
  const { openValues, disabled: rootDisabled } = useAccordionContext("AccordionItem");
  const reactId = useId();
  const open = openValues.includes(value);
  const isDisabled = disabled || rootDisabled;

  const itemContext = useMemo<AccordionItemContextValue>(
    () => ({
      value,
      open,
      disabled: isDisabled,
      triggerId: `accordion-trigger-${reactId}`,
      contentId: `accordion-content-${reactId}`,
    }),
    [value, open, isDisabled, reactId],
  );

  return (
    <AccordionItemContext.Provider value={itemContext}>
      <div
        data-state={open ? "open" : "closed"}
        data-disabled={isDisabled ? "" : undefined}
        className={cn("min-w-0", className)}
        {...props}
      >
        {children}
      </div>
    </AccordionItemContext.Provider>
  );
}
AccordionItem.displayName = "AccordionItem";

/* -------------------------------------------------------------------------- */
/*                                   Trigger                                   */
/* -------------------------------------------------------------------------- */

export interface AccordionTriggerProps
  extends Omit<ComponentPropsWithoutRef<"button">, "type"> {
  /** Optional leading glyph rendered before the label. */
  icon?: ReactNode;
}

function handleTriggerKeyDown(event: KeyboardEvent<HTMLButtonElement>) {
  const navigationKeys = ["ArrowDown", "ArrowUp", "Home", "End"];
  if (!navigationKeys.includes(event.key)) return;

  const root = event.currentTarget.closest<HTMLElement>("[data-accordion-root]");
  if (!root) return;

  const triggers = Array.from(
    root.querySelectorAll<HTMLButtonElement>(
      "[data-accordion-trigger]:not([disabled])",
    ),
  );
  const currentIndex = triggers.indexOf(event.currentTarget);
  if (currentIndex === -1) return;

  event.preventDefault();
  const lastIndex = triggers.length - 1;
  let nextIndex = currentIndex;
  switch (event.key) {
    case "ArrowDown":
      nextIndex = currentIndex === lastIndex ? 0 : currentIndex + 1;
      break;
    case "ArrowUp":
      nextIndex = currentIndex === 0 ? lastIndex : currentIndex - 1;
      break;
    case "Home":
      nextIndex = 0;
      break;
    case "End":
      nextIndex = lastIndex;
      break;
  }
  triggers[nextIndex]?.focus();
}

export function AccordionTrigger({
  icon,
  className,
  children,
  onClick,
  onKeyDown,
  ...props
}: AccordionTriggerProps) {
  const { toggle, size, indicator } = useAccordionContext("AccordionTrigger");
  const { value, open, disabled, triggerId, contentId } =
    useAccordionItemContext("AccordionTrigger");

  return (
    <button
      type="button"
      id={triggerId}
      data-accordion-trigger=""
      data-state={open ? "open" : "closed"}
      aria-expanded={open}
      aria-controls={contentId}
      disabled={disabled}
      onClick={(event) => {
        onClick?.(event);
        if (!event.defaultPrevented) toggle(value);
      }}
      onKeyDown={(event) => {
        onKeyDown?.(event);
        if (!event.defaultPrevented) handleTriggerKeyDown(event);
      }}
      className={cn(triggerVariants({ size }), className)}
      {...props}
    >
      <span className="flex min-w-0 items-center gap-2.5">
        {indicator === "plus" && (
          <span
            aria-hidden="true"
            className={cn(
              "grid shrink-0 place-items-center rounded-lg bg-secondary text-secondary-foreground",
              BOX_SIZE[size],
            )}
          >
            {open ? (
              <Minus weight="bold" className={BOX_ICON_SIZE[size]} />
            ) : (
              <Plus weight="bold" className={BOX_ICON_SIZE[size]} />
            )}
          </span>
        )}
        {icon && (
          <span
            aria-hidden="true"
            className={cn(
              "shrink-0 text-muted-foreground",
              LEADING_ICON_SIZE[size],
            )}
          >
            {icon}
          </span>
        )}
        <span className="min-w-0 truncate">{children}</span>
      </span>
      {indicator === "chevron" && (
        <CaretDown
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/trigger:rotate-180",
            CHEVRON_SIZE[size],
          )}
        />
      )}
    </button>
  );
}
AccordionTrigger.displayName = "AccordionTrigger";

/* -------------------------------------------------------------------------- */
/*                                   Content                                   */
/* -------------------------------------------------------------------------- */

export type AccordionContentProps = ComponentPropsWithoutRef<"div">;

export function AccordionContent({
  className,
  children,
  ...props
}: AccordionContentProps) {
  const { size } = useAccordionContext("AccordionContent");
  const { open, triggerId, contentId } =
    useAccordionItemContext("AccordionContent");

  return (
    <div
      id={contentId}
      role="region"
      aria-labelledby={triggerId}
      data-state={open ? "open" : "closed"}
      inert={!open}
      className={cn(
        "grid overflow-hidden transition-all duration-200 ease-out motion-reduce:transition-none",
        open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
      )}
    >
      <div className="min-h-0 overflow-hidden">
        <div className={cn(contentInnerVariants({ size }), className)} {...props}>
          {children}
        </div>
      </div>
    </div>
  );
}
AccordionContent.displayName = "AccordionContent";
