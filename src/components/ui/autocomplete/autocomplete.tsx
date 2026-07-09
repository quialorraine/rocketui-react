import {
  Fragment,
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
import { CaretDown, Check, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Types                                     */
/* -------------------------------------------------------------------------- */

export interface AutocompleteOption {
  /** Unique key used for selection and React keys. */
  value: string;
  /** Primary text, shown in the trigger and used for filtering. */
  label: string;
  /** Secondary line beneath the label (e.g. an email or country). */
  description?: string;
  /** Leading media (avatar, icon). Rendered in options and chips. */
  avatar?: ReactNode;
  /** Optional section heading; consecutive options share a group. */
  group?: string;
  disabled?: boolean;
}

type AutocompleteValue = string | string[] | null;

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const controlVariants = cva(
  "flex w-full cursor-pointer items-start gap-1.5 rounded-xl border border-input bg-card text-card-foreground transition-colors focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
  {
    variants: {
      size: {
        sm: "min-h-9 gap-1 px-3 py-1 text-sm",
        md: "min-h-11 px-3.5 py-2 text-sm",
        lg: "min-h-12 px-4 py-2.5 text-base",
      },
    },
    defaultVariants: { size: "md" },
  },
);

type AutocompleteSize = NonNullable<VariantProps<typeof controlVariants>["size"]>;

const CHIP_AVATAR = "[&_img]:size-4 [&>span]:size-4";
const OPTION_AVATAR = "[&_img]:size-10 [&>span]:size-10";

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

export interface AutocompleteProps
  extends VariantProps<typeof controlVariants> {
  options: AutocompleteOption[];
  value?: AutocompleteValue;
  defaultValue?: AutocompleteValue;
  onValueChange?: (value: AutocompleteValue) => void;
  /** Allow selecting more than one option (renders removable chips). */
  multiple?: boolean;
  placeholder?: string;
  disabled?: boolean;
  /** Show a clear button when there is a selection. */
  clearable?: boolean;
  /** Custom filter predicate. Defaults to case-insensitive label match. */
  filter?: (option: AutocompleteOption, query: string) => boolean;
  emptyMessage?: ReactNode;
  id?: string;
  name?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

function toArray(value: AutocompleteValue | undefined): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

const defaultFilter = (option: AutocompleteOption, query: string) =>
  option.label.toLowerCase().includes(query.trim().toLowerCase());

export function Autocomplete({
  options,
  value,
  defaultValue,
  onValueChange,
  multiple = false,
  placeholder = "Search",
  size,
  disabled = false,
  clearable = true,
  filter = defaultFilter,
  emptyMessage = "No results found",
  id,
  name,
  className,
  ...aria
}: AutocompleteProps) {
  const reactId = useId();
  const baseId = id ?? `autocomplete-${reactId}`;
  const listboxId = `${baseId}-listbox`;

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<string[]>(() =>
    toArray(defaultValue),
  );
  const selectedValues = isControlled ? toArray(value) : uncontrolled;

  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const resolvedSize: AutocompleteSize = size ?? "md";

  const optionByValue = useMemo(() => {
    const map = new Map<string, AutocompleteOption>();
    for (const option of options) map.set(option.value, option);
    return map;
  }, [options]);

  const selectedOptions = selectedValues
    .map((v) => optionByValue.get(v))
    .filter((o): o is AutocompleteOption => Boolean(o));

  const singleLabel =
    !multiple && selectedOptions[0] ? selectedOptions[0].label : "";
  const inputValue = open ? query : multiple ? "" : singleLabel;

  // While the seeded label still equals the current selection, treat it as
  // "no query" so the full list is shown. Filtering only kicks in once the
  // user actually edits the text.
  const filterQuery = !multiple && query === singleLabel ? "" : query;
  const filtered = useMemo(
    () => (filterQuery ? options.filter((o) => filter(o, filterQuery)) : options),
    [options, filterQuery, filter],
  );

  const commit = useCallback(
    (next: string[]) => {
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(multiple ? next : (next[0] ?? null));
    },
    [isControlled, multiple, onValueChange],
  );

  const openMenu = useCallback(() => {
    if (disabled) return;
    setOpen(true);
  }, [disabled]);

  const closeMenu = useCallback(() => {
    setOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, []);

  const selectOption = useCallback(
    (option: AutocompleteOption) => {
      if (option.disabled) return;
      if (multiple) {
        const exists = selectedValues.includes(option.value);
        commit(
          exists
            ? selectedValues.filter((v) => v !== option.value)
            : [...selectedValues, option.value],
        );
        setQuery("");
        inputRef.current?.focus();
      } else {
        commit([option.value]);
        setOpen(false);
        setQuery("");
        setActiveIndex(-1);
      }
    },
    [commit, multiple, selectedValues],
  );

  const removeValue = useCallback(
    (value: string) => commit(selectedValues.filter((v) => v !== value)),
    [commit, selectedValues],
  );

  const clearAll = useCallback(() => {
    commit([]);
    setQuery("");
    inputRef.current?.focus();
  }, [commit]);

  // Close on outside interaction.
  useEffect(() => {
    if (!open) return;
    const onPointerDown = (event: PointerEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) closeMenu();
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open, closeMenu]);

  // Keep the active option within the filtered range.
  useEffect(() => {
    setActiveIndex((current) =>
      filtered.length === 0 ? -1 : Math.min(current, filtered.length - 1),
    );
  }, [filtered.length]);

  // Single-select: surface the current selection in the input when the menu
  // opens so the value stays visible (and editable) instead of disappearing.
  useEffect(() => {
    if (!open || multiple) return;
    if (singleLabel && query === "") {
      setQuery(singleLabel);
      requestAnimationFrame(() => inputRef.current?.select());
    }
    // Snapshot the label/query only on the open transition.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const moveActive = (delta: number) => {
    if (filtered.length === 0) return;
    setActiveIndex((current) => {
      let next = current;
      for (let i = 0; i < filtered.length; i += 1) {
        next = (next + delta + filtered.length) % filtered.length;
        if (!filtered[next]?.disabled) return next;
      }
      return current;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
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
      case "Enter":
        if (open && activeIndex >= 0 && filtered[activeIndex]) {
          event.preventDefault();
          selectOption(filtered[activeIndex]);
        }
        break;
      case "Escape":
        if (open) {
          event.preventDefault();
          closeMenu();
        }
        break;
      case "Backspace":
        if (multiple && query === "" && selectedValues.length > 0) {
          removeValue(selectedValues[selectedValues.length - 1]);
        }
        break;
    }
  };

  const hasSelection = selectedValues.length > 0;
  const showClear = clearable && hasSelection && !disabled;
  const activeId = activeIndex >= 0 ? `${baseId}-option-${activeIndex}` : undefined;

  let lastGroup: string | undefined;

  return (
    <div ref={rootRef} className={cn("relative w-full", className)}>
      <div
        data-disabled={disabled}
        onPointerDown={(event) => {
          // Focus the input when clicking blank areas of the control.
          if (event.target === event.currentTarget) inputRef.current?.focus();
        }}
        onClick={() => {
          if (disabled) return;
          if (open) closeMenu();
          else openMenu();
        }}
        className={controlVariants({ size: resolvedSize })}
      >
        <div className="flex min-w-0 flex-1 flex-wrap items-center gap-1.5">
          {multiple &&
            selectedOptions.map((option) => (
              <span
                key={option.value}
                className={cn(
                  "inline-flex h-7 items-center gap-1 rounded-full bg-secondary/60 pe-1 ps-2 text-xs font-medium text-secondary-foreground",
                  CHIP_AVATAR,
                )}
              >
                {option.avatar && (
                  <span className="grid overflow-hidden rounded-full">
                    {option.avatar}
                  </span>
                )}
                {option.label}
                <button
                  type="button"
                  tabIndex={-1}
                  aria-label={`Remove ${option.label}`}
                  onClick={(event) => {
                    event.stopPropagation();
                    removeValue(option.value);
                  }}
                  className="grid size-4 cursor-pointer place-items-center rounded-full text-muted-foreground transition-colors hover:text-foreground"
                >
                  <X className="size-3" weight="bold" />
                </button>
              </span>
            ))}

          <input
            ref={inputRef}
            id={baseId}
            name={name}
            role="combobox"
            aria-expanded={open}
            aria-controls={listboxId}
            aria-autocomplete="list"
            aria-activedescendant={activeId}
            aria-label={aria["aria-label"]}
            aria-labelledby={aria["aria-labelledby"]}
            autoComplete="off"
            disabled={disabled}
            value={inputValue}
            placeholder={hasSelection && !multiple ? undefined : placeholder}
            onChange={(event) => {
              setQuery(event.target.value);
              if (!open) setOpen(true);
              setActiveIndex(-1);
            }}
            onKeyDown={handleKeyDown}
            className="h-7 min-w-16 flex-1 cursor-pointer! bg-transparent text-foreground outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed!"
          />
        </div>

        <div className="flex h-7 shrink-0 items-center gap-1.5">
          {showClear && (
            <button
              type="button"
              tabIndex={-1}
              aria-label="Clear selection"
              onClick={(event) => {
                event.stopPropagation();
                clearAll();
              }}
              className="grid size-[22px] shrink-0 cursor-pointer place-items-center rounded-full bg-secondary text-secondary-foreground transition-colors hover:bg-accent"
            >
              <X className="size-3.5" weight="bold" />
            </button>
          )}

          <span className="grid size-5 shrink-0 place-items-center text-muted-foreground">
            <CaretDown
              className={cn("size-4 transition-transform duration-200", open && "rotate-180")}
            />
          </span>
        </div>
      </div>

      {open && (
        <ul
          id={listboxId}
          role="listbox"
          aria-multiselectable={multiple || undefined}
          className="absolute left-0 right-0 top-full z-50 mt-2 max-h-64 overflow-auto rounded-xl border bg-popover p-2 text-popover-foreground"
        >
          {filtered.length === 0 ? (
            <li className="px-3 py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </li>
          ) : (
            filtered.map((option, index) => {
              const selected = selectedValues.includes(option.value);
              const active = index === activeIndex;
              const showGroup = option.group && option.group !== lastGroup;
              const dividerBefore = showGroup && index > 0;
              lastGroup = option.group;

              return (
                <Fragment key={option.value}>
                  {showGroup && (
                    <li
                      role="presentation"
                      className={cn(
                        "px-3 pb-1 pt-2 text-xs font-medium text-muted-foreground",
                        dividerBefore && "mt-1 border-t pt-3",
                      )}
                    >
                      {option.group}
                    </li>
                  )}
                  <li
                    id={`${baseId}-option-${index}`}
                    role="option"
                    aria-selected={selected}
                    aria-disabled={option.disabled || undefined}
                    onPointerEnter={() => setActiveIndex(index)}
                    onPointerDown={(event) => {
                      event.preventDefault();
                      selectOption(option);
                    }}
                    className={cn(
                      "flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2 text-sm",
                      option.avatar && OPTION_AVATAR,
                      active && "bg-muted",
                      option.disabled && "pointer-events-none opacity-50",
                    )}
                  >
                    {option.avatar && (
                      <span className="grid shrink-0 overflow-hidden rounded-full">
                        {option.avatar}
                      </span>
                    )}
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
                      <Check className="size-[18px] shrink-0 text-foreground" weight="bold" />
                    )}
                  </li>
                </Fragment>
              );
            })
          )}
        </ul>
      )}
    </div>
  );
}
Autocomplete.displayName = "Autocomplete";
