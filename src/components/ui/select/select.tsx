import {
  useCallback,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { CaretDown, Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import {
  FieldLabel,
  FieldMessage,
  resolveStatus,
  type FieldStatus,
} from "@/components/ui/input";

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */

export interface SelectOption {
  value: string;
  label: string;
  /** Secondary line shown under the label in the list. */
  description?: string;
  /** Section heading; consecutive options share a group. */
  group?: string;
  disabled?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const trigger = cva(
  [
    "flex w-full cursor-pointer items-center gap-2 rounded-xl border bg-card text-left text-card-foreground shadow-sm outline-none",
    "transition-[color,box-shadow,border-color]",
    "focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      status: {
        default: "border-input focus-visible:ring-ring",
        success: "border-success focus-visible:ring-success/40",
        error: "border-destructive focus-visible:ring-destructive/40",
      },
      size: {
        sm: "h-9 px-3 text-sm [&_svg]:size-4",
        md: "h-11 px-3.5 text-sm [&_svg]:size-[18px]",
        lg: "h-12 px-4 text-base [&_svg]:size-5",
      },
    },
    defaultVariants: { status: "default", size: "md" },
  },
);

export type SelectSize = NonNullable<VariantProps<typeof trigger>["size"]>;

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

export interface SelectProps {
  options: SelectOption[];
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  size?: SelectSize;
  disabled?: boolean;
  /** Label rendered above the trigger. */
  label?: ReactNode;
  required?: boolean;
  /** Helper text below the trigger. */
  description?: ReactNode;
  /** Error message — sets the error style and replaces the description. */
  error?: ReactNode;
  invalid?: boolean;
  /** Message shown when there are no options. */
  emptyMessage?: ReactNode;
  id?: string;
  name?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

export function Select({
  options,
  value,
  defaultValue = null,
  onValueChange,
  placeholder = "Select an option",
  size = "md",
  disabled = false,
  label,
  required,
  description,
  error,
  invalid,
  emptyMessage = "No options",
  id,
  name,
  className,
  ...aria
}: SelectProps) {
  const reactId = useId();
  const baseId = id ?? `select-${reactId}`;
  const listboxId = `${baseId}-listbox`;
  const labelId = label ? `${baseId}-label` : undefined;
  const messageId = `${baseId}-message`;

  const status: FieldStatus = resolveStatus(error, invalid);
  const message = error ?? description;

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string | null>(defaultValue);
  const selectedValue = isControlled ? value : uncontrolled;

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const optionRefs = useRef<(HTMLLIElement | null)[]>([]);
  const typeahead = useRef({ buffer: "", timer: 0 });

  const selectedIndex = useMemo(
    () => options.findIndex((o) => o.value === selectedValue),
    [options, selectedValue],
  );
  const selectedOption = selectedIndex >= 0 ? options[selectedIndex] : undefined;

  const commit = useCallback(
    (next: string) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(next);
    },
    [isControlled, onValueChange],
  );

  const openMenu = useCallback(() => {
    if (disabled) return;
    setActiveIndex(selectedIndex >= 0 ? selectedIndex : firstEnabled(options));
    setOpen(true);
  }, [disabled, options, selectedIndex]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setActiveIndex(-1);
    triggerRef.current?.focus();
  }, []);

  const selectOption = useCallback(
    (option: SelectOption | undefined) => {
      if (!option || option.disabled) return;
      commit(option.value);
      setOpen(false);
      setActiveIndex(-1);
      triggerRef.current?.focus();
    },
    [commit],
  );

  // Close on outside interaction.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false);
        setActiveIndex(-1);
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  // Keep the active option scrolled into view.
  useEffect(() => {
    if (!open || activeIndex < 0) return;
    optionRefs.current[activeIndex]?.scrollIntoView({ block: "nearest" });
  }, [open, activeIndex]);

  const moveActive = (delta: number) => {
    setActiveIndex((current) => {
      let next = current < 0 ? (delta > 0 ? -1 : options.length) : current;
      for (let i = 0; i < options.length; i += 1) {
        next = (next + delta + options.length) % options.length;
        if (!options[next]?.disabled) return next;
      }
      return current;
    });
  };

  const moveTo = (index: number) => {
    if (index >= 0 && index < options.length && !options[index]?.disabled) {
      setActiveIndex(index);
    }
  };

  const runTypeahead = (key: string) => {
    window.clearTimeout(typeahead.current.timer);
    typeahead.current.buffer += key.toLowerCase();
    const buffer = typeahead.current.buffer;
    const match = options.findIndex(
      (o) => !o.disabled && o.label.toLowerCase().startsWith(buffer),
    );
    if (match >= 0) {
      if (open) setActiveIndex(match);
      else commit(options[match].value);
    }
    typeahead.current.timer = window.setTimeout(() => {
      typeahead.current.buffer = "";
    }, 500);
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();
        if (!open) openMenu();
        else moveActive(1);
        break;
      case "ArrowUp":
        event.preventDefault();
        if (!open) openMenu();
        else moveActive(-1);
        break;
      case "Home":
        if (open) {
          event.preventDefault();
          moveTo(firstEnabled(options));
        }
        break;
      case "End":
        if (open) {
          event.preventDefault();
          moveTo(lastEnabled(options));
        }
        break;
      case "Enter":
      case " ":
        event.preventDefault();
        if (open) selectOption(options[activeIndex]);
        else openMenu();
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          closeMenu();
        }
        break;
      case "Tab":
        if (open) {
          setOpen(false);
          setActiveIndex(-1);
        }
        break;
      default:
        if (event.key.length === 1 && !event.metaKey && !event.ctrlKey) {
          runTypeahead(event.key);
        }
    }
  };

  const activeId = activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined;
  let lastGroup: string | undefined;

  return (
    <div ref={rootRef} className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <span id={labelId}>
          <FieldLabel htmlFor={baseId} status={status} required={required}>
            {label}
          </FieldLabel>
        </span>
      )}

      <div className="relative">
      <button
        ref={triggerRef}
        id={baseId}
        type="button"
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={listboxId}
        aria-activedescendant={activeId}
        aria-labelledby={labelId ?? aria["aria-labelledby"]}
        aria-label={aria["aria-label"]}
        aria-invalid={status === "error" || undefined}
        aria-describedby={message ? messageId : undefined}
        disabled={disabled}
        onClick={() => (open ? closeMenu() : openMenu())}
        onKeyDown={handleKeyDown}
        className={trigger({ status, size })}
      >
        <span
          className={cn(
            "min-w-0 flex-1 truncate",
            selectedOption ? "text-foreground" : "text-muted-foreground",
          )}
        >
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <CaretDown
          className={cn(
            "shrink-0 text-muted-foreground transition-transform duration-200",
            open && "rotate-180",
          )}
        />
      </button>

      {name && <input type="hidden" name={name} value={selectedValue ?? ""} />}

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-labelledby={labelId ?? aria["aria-labelledby"]}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-auto rounded-xl border bg-popover p-2 text-popover-foreground shadow-lg"
        >
          {options.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          ) : (
            options.map((option, index) => {
              const selected = option.value === selectedValue;
              const active = index === activeIndex;
              const showGroup = option.group && option.group !== lastGroup;
              const dividerBefore = showGroup && index > 0;
              lastGroup = option.group;

              return (
                <li key={option.value} role="presentation">
                  {showGroup && (
                    <div
                      className={cn(
                        "px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground",
                        dividerBefore && "mt-1 border-t pt-3",
                      )}
                    >
                      {option.group}
                    </div>
                  )}
                  <div
                    id={`${baseId}-option-${index}`}
                    ref={(el) => {
                      optionRefs.current[index] = el as unknown as HTMLLIElement;
                    }}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={option.disabled || undefined}
                    onPointerEnter={() => !option.disabled && setActiveIndex(index)}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      selectOption(option);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm",
                      active && "bg-muted",
                      option.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    <span className="flex min-w-0 flex-1 flex-col">
                      <span
                        className={cn(
                          "truncate text-foreground",
                          selected ? "font-medium" : "font-normal",
                        )}
                      >
                        {option.label}
                      </span>
                      {option.description && (
                        <span className="truncate text-sm text-muted-foreground">
                          {option.description}
                        </span>
                      )}
                    </span>
                    {selected && (
                      <Check
                        className="size-[18px] shrink-0 text-foreground"
                        weight="bold"
                      />
                    )}
                  </div>
                </li>
              );
            })
          )}
        </ul>
      )}
      </div>

      {message && (
        <FieldMessage id={messageId} status={status}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
}
Select.displayName = "Select";

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                   */
/* -------------------------------------------------------------------------- */

function firstEnabled(options: SelectOption[]): number {
  const i = options.findIndex((o) => !o.disabled);
  return i;
}

function lastEnabled(options: SelectOption[]): number {
  for (let i = options.length - 1; i >= 0; i -= 1) {
    if (!options[i]?.disabled) return i;
  }
  return -1;
}
