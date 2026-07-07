import {
  useCallback,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import { Minus, Plus } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";
import {
  controlSurface,
  FieldLabel,
  FieldMessage,
  resolveStatus,
  type FieldSize,
} from "@/components/ui/input";

/* -------------------------------------------------------------------------- */
/*                                  Sizing                                     */
/* -------------------------------------------------------------------------- */

const SIZE: Record<FieldSize, { root: string; btn: string; pad: string }> = {
  sm: { root: "h-9 text-sm", btn: "w-9 [&_svg]:size-4", pad: "px-2" },
  md: { root: "h-11 text-sm", btn: "w-11 [&_svg]:size-[18px]", pad: "px-2.5" },
  lg: { root: "h-12 text-base", btn: "w-12 [&_svg]:size-5", pad: "px-3" },
};

/* -------------------------------------------------------------------------- */
/*                                  Helpers                                    */
/* -------------------------------------------------------------------------- */

/** Trim binary float noise (e.g. 0.1 + 0.2) without hard-rounding real data. */
const clean = (n: number) => Math.round(n * 1e8) / 1e8;

/** Strip formatting (currency, grouping, units) down to a parseable number. */
function parseNumber(raw: string): number | null {
  const normalized = raw.replace(/[^\d.,-]/g, "").replace(/,/g, ".");
  if (normalized === "" || normalized === "-" || normalized === ".") return null;
  const value = Number.parseFloat(normalized);
  return Number.isNaN(value) ? null : value;
}

/* -------------------------------------------------------------------------- */
/*                                NumberField                                  */
/* -------------------------------------------------------------------------- */

export interface NumberFieldProps {
  /** Controlled value. Use `null` for an empty field. */
  value?: number | null;
  /** Uncontrolled initial value. */
  defaultValue?: number | null;
  /** Fires with the committed, clamped value (or `null` when cleared). */
  onChange?: (value: number | null) => void;
  /** Smallest allowed value. Also disables the decrement button at the bound. */
  min?: number;
  /** Largest allowed value. Also disables the increment button at the bound. */
  max?: number;
  /** Amount added or removed per step. */
  step?: number;
  size?: FieldSize;
  disabled?: boolean;
  /** Hide the increment/decrement buttons (e.g. currency inputs). */
  hideSteppers?: boolean;
  /**
   * `Intl.NumberFormat` options for the displayed value — currency, units,
   * percent, grouping, decimal places.
   */
  formatOptions?: Intl.NumberFormatOptions;
  /** Locale for formatting (defaults to the runtime locale). */
  locale?: string;
  placeholder?: string;
  /** Content rendered before the value (icon, prefix). */
  startContent?: ReactNode;
  /** Content rendered after the value (unit, addon, selector). */
  endContent?: ReactNode;
  label?: ReactNode;
  required?: boolean;
  description?: ReactNode;
  error?: ReactNode;
  invalid?: boolean;
  success?: boolean;
  id?: string;
  name?: string;
  className?: string;
  "aria-label"?: string;
}

export function NumberField({
  value,
  defaultValue = null,
  onChange,
  min,
  max,
  step = 1,
  size = "md",
  disabled = false,
  hideSteppers = false,
  formatOptions,
  locale,
  placeholder,
  startContent,
  endContent,
  label,
  required,
  description,
  error,
  invalid,
  success,
  id,
  name,
  className,
  "aria-label": ariaLabel,
}: NumberFieldProps) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const messageId = `${inputId}-message`;
  const status = resolveStatus(error, invalid, success);
  const message = error ?? description;

  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<number | null>(defaultValue);
  const current = isControlled ? value ?? null : internal;

  // Read the freshest value inside repeat timers and stepper handlers.
  const currentRef = useRef(current);
  currentRef.current = current;

  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState("");

  const formatter = useMemo(
    () => new Intl.NumberFormat(locale, formatOptions),
    // formatOptions is usually a literal; key on its shape, not identity.
    [locale, JSON.stringify(formatOptions)],
  );

  const clamp = useCallback(
    (n: number) => {
      let next = n;
      if (min !== undefined) next = Math.max(min, next);
      if (max !== undefined) next = Math.min(max, next);
      return next;
    },
    [min, max],
  );

  const commit = useCallback(
    (next: number | null) => {
      const resolved = next === null ? null : clamp(clean(next));
      if (!isControlled) setInternal(resolved);
      onChange?.(resolved);
    },
    [clamp, isControlled, onChange],
  );

  const stepBy = useCallback(
    (direction: 1 | -1) => {
      const base = currentRef.current ?? 0;
      commit(base + direction * step);
    },
    [commit, step],
  );

  const atMin = min !== undefined && current !== null && current <= min;
  const atMax = max !== undefined && current !== null && current >= max;

  /* --------------------------- press-and-hold repeat -------------------------- */

  const hold = useRef<{ timeout?: number; interval?: number }>({});
  const stopHold = useCallback(() => {
    window.clearTimeout(hold.current.timeout);
    window.clearInterval(hold.current.interval);
    hold.current = {};
  }, []);
  const startHold = useCallback(
    (direction: 1 | -1) => {
      stepBy(direction);
      hold.current.timeout = window.setTimeout(() => {
        hold.current.interval = window.setInterval(() => stepBy(direction), 60);
      }, 400);
    },
    [stepBy],
  );

  /* -------------------------------- rendering -------------------------------- */

  const displayValue = editing
    ? draft
    : current === null
      ? ""
      : formatter.format(current);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      event.preventDefault();
      stepBy(1);
    } else if (event.key === "ArrowDown") {
      event.preventDefault();
      stepBy(-1);
    } else if (event.key === "Enter") {
      commit(parseNumber(draft));
    }
  };

  const stepperButton = (direction: 1 | -1) => {
    const Icon = direction === 1 ? Plus : Minus;
    const isDisabled = disabled || (direction === 1 ? atMax : atMin);
    return (
      <button
        type="button"
        tabIndex={-1}
        aria-label={direction === 1 ? "Increment" : "Decrement"}
        disabled={isDisabled}
        onPointerDown={(event) => {
          if (event.button !== 0 || isDisabled) return;
          event.preventDefault();
          startHold(direction);
        }}
        onPointerUp={stopHold}
        onPointerLeave={stopHold}
        onPointerCancel={stopHold}
        className={cn(
          "grid shrink-0 place-items-center self-stretch text-muted-foreground transition-colors",
          "hover:text-foreground disabled:pointer-events-none disabled:opacity-40",
          SIZE[size].btn,
        )}
      >
        <Icon weight="bold" />
      </button>
    );
  };

  const divider = <span aria-hidden className="my-2 w-px shrink-0 self-stretch bg-border" />;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <FieldLabel htmlFor={inputId} status={status} required={required}>
          {label}
        </FieldLabel>
      )}

      <div
        data-disabled={disabled || undefined}
        className={cn(
          controlSurface({ status }),
          SIZE[size].root,
          "items-stretch overflow-hidden",
        )}
      >
        {!hideSteppers && (
          <>
            {stepperButton(-1)}
            {divider}
          </>
        )}

        {startContent && (
          <span
            className={cn(
              "flex shrink-0 items-center gap-2 text-muted-foreground",
              hideSteppers && SIZE[size].pad,
            )}
          >
            {startContent}
          </span>
        )}

        <input
          id={inputId}
          name={name}
          type="text"
          inputMode="decimal"
          role="spinbutton"
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          value={displayValue}
          aria-label={ariaLabel}
          aria-valuenow={current ?? undefined}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuetext={current !== null ? formatter.format(current) : undefined}
          aria-invalid={status === "error" || undefined}
          aria-describedby={message ? messageId : undefined}
          onFocus={() => {
            setDraft(current === null ? "" : String(current));
            setEditing(true);
          }}
          onChange={(event) => setDraft(event.target.value)}
          onBlur={() => {
            setEditing(false);
            commit(parseNumber(draft));
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            hideSteppers ? "text-left" : "text-center",
            !startContent && hideSteppers && SIZE[size].pad,
          )}
        />

        {endContent && (
          <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
            {endContent}
          </span>
        )}

        {!hideSteppers && (
          <>
            {divider}
            {stepperButton(1)}
          </>
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
NumberField.displayName = "NumberField";
