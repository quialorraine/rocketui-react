import {
  forwardRef,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { MagnifyingGlass, X } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import { Input, type InputProps } from "@/components/ui/input";

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface SearchFieldProps
  extends Omit<
    InputProps,
    "type" | "value" | "defaultValue" | "onChange" | "startContent" | "endContent"
  > {
  /** Current query (controlled). */
  value?: string;
  /** Initial query (uncontrolled). */
  defaultValue?: string;
  /** Fired with the new query on every change (and on clear). */
  onValueChange?: (value: string) => void;
  /** Fired when the query is cleared via the button or Escape. */
  onClear?: () => void;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  function SearchField(
    {
      value,
      defaultValue = "",
      onValueChange,
      onClear,
      placeholder = "Search",
      disabled,
      onKeyDown,
      ...props
    },
    ref,
  ) {
    const innerRef = useRef<HTMLInputElement>(null);
    const setRefs = (node: HTMLInputElement | null) => {
      innerRef.current = node;
      if (typeof ref === "function") ref(node);
      else if (ref) ref.current = node;
    };

    const isControlled = value !== undefined;
    const [internal, setInternal] = useState(defaultValue);
    const current = isControlled ? value : internal;
    const hasValue = current.length > 0;

    const setValue = (next: string) => {
      if (!isControlled) setInternal(next);
      onValueChange?.(next);
    };

    const clear = () => {
      setValue("");
      onClear?.();
      innerRef.current?.focus();
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape" && hasValue) {
        e.preventDefault();
        clear();
      }
      onKeyDown?.(e);
    };

    return (
      <Input
        ref={setRefs}
        type="search"
        role="searchbox"
        placeholder={placeholder}
        disabled={disabled}
        value={current}
        onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        startContent={<MagnifyingGlass weight="bold" />}
        inputClassName="[&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
        endContent={
          hasValue && !disabled ? (
            <button
              type="button"
              aria-label="Clear search"
              onClick={clear}
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-colors",
                "hover:bg-muted-foreground/20 hover:text-foreground",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                "[&_svg]:size-3",
              )}
            >
              <X weight="bold" />
            </button>
          ) : undefined
        }
        {...props}
      />
    );
  },
);
SearchField.displayName = "SearchField";
