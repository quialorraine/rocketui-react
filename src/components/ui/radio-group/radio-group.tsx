import {
  createContext,
  useContext,
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Check } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Sizing                                    */
/* -------------------------------------------------------------------------- */

export type RadioSize = "sm" | "md" | "lg";

const SIZE: Record<RadioSize, { control: string; dot: string; label: string }> = {
  sm: { control: "size-4", dot: "size-1.5", label: "text-sm" },
  md: { control: "size-5", dot: "size-2", label: "text-base" },
  lg: { control: "size-6", dot: "size-2.5", label: "text-base" },
};

/* -------------------------------------------------------------------------- */
/*                                  Context                                    */
/* -------------------------------------------------------------------------- */

interface RadioGroupContextValue {
  value: string | undefined;
  setValue: (value: string) => void;
  name: string;
  disabled: boolean;
  size: RadioSize;
}

const RadioGroupContext = createContext<RadioGroupContextValue | null>(null);

function useRadioGroupContext(component: string): RadioGroupContextValue {
  const ctx = useContext(RadioGroupContext);
  if (!ctx) throw new Error(`<${component}> must be used within <RadioGroup>.`);
  return ctx;
}

/* -------------------------------------------------------------------------- */
/*                                   Group                                     */
/* -------------------------------------------------------------------------- */

export interface RadioGroupProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  /** Selected value (controlled). */
  value?: string;
  /** Initial selected value (uncontrolled). */
  defaultValue?: string;
  /** Fired with the newly selected value. */
  onValueChange?: (value: string) => void;
  /** Shared form field name; auto-generated if omitted. */
  name?: string;
  /** Disable every option in the group. */
  disabled?: boolean;
  size?: RadioSize;
  /** Layout direction of the options. */
  orientation?: "vertical" | "horizontal";
}

export function RadioGroup({
  value,
  defaultValue,
  onValueChange,
  name,
  disabled = false,
  size = "md",
  orientation = "vertical",
  className,
  children,
  ...props
}: RadioGroupProps) {
  const reactId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue);
  const current = isControlled ? value : internal;

  const setValue = (next: string) => {
    if (!isControlled) setInternal(next);
    onValueChange?.(next);
  };

  return (
    <RadioGroupContext.Provider
      value={{
        value: current,
        setValue,
        name: name ?? `radio-group-${reactId}`,
        disabled,
        size,
      }}
    >
      <div
        role="radiogroup"
        className={cn(
          "flex gap-x-5 gap-y-4",
          orientation === "vertical" ? "flex-col" : "flex-row flex-wrap items-start",
          className,
        )}
        {...props}
      >
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
}
RadioGroup.displayName = "RadioGroup";

/* -------------------------------------------------------------------------- */
/*                                    Radio                                    */
/* -------------------------------------------------------------------------- */

export interface RadioProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "size" | "onChange" | "checked" | "defaultChecked" | "value"
  > {
  /** The value this option represents in the group. */
  value: string;
  label?: ReactNode;
  description?: ReactNode;
}

export function Radio({
  value,
  label,
  description,
  disabled: itemDisabled,
  id,
  className,
  ...props
}: RadioProps) {
  const ctx = useRadioGroupContext("Radio");
  const reactId = useId();
  const inputId = id ?? reactId;
  const s = SIZE[ctx.size];

  const checked = ctx.value === value;
  const disabled = ctx.disabled || itemDisabled;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex gap-2",
        description ? "items-start" : "items-center",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
    >
      <span className={cn("relative flex", description && "mt-0.5")}>
        <input
          id={inputId}
          type="radio"
          className="peer sr-only"
          name={ctx.name}
          value={value}
          checked={checked}
          disabled={disabled}
          onChange={() => ctx.setValue(value)}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center rounded-full border-2 transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            s.control,
            checked
              ? "border-primary bg-primary"
              : "border-input bg-transparent group-hover:border-primary/60",
          )}
        >
          {checked && (
            <span className={cn("rounded-full bg-primary-foreground", s.dot)} />
          )}
        </span>
      </span>

      {(label != null || description != null) && (
        <span className="flex flex-col gap-0.5">
          {label != null && (
            <span className={cn("font-medium leading-snug text-foreground", s.label)}>
              {label}
            </span>
          )}
          {description != null && (
            <span className="text-sm leading-relaxed text-muted-foreground">
              {description}
            </span>
          )}
        </span>
      )}
    </label>
  );
}
Radio.displayName = "Radio";

/* -------------------------------------------------------------------------- */
/*                                  RadioCard                                  */
/* -------------------------------------------------------------------------- */

export interface RadioCardProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "size" | "onChange" | "checked" | "defaultChecked" | "value"
  > {
  value: string;
  label?: ReactNode;
  description?: ReactNode;
  /** Leading icon or media. */
  icon?: ReactNode;
  className?: string;
}

export function RadioCard({
  value,
  label,
  description,
  icon,
  disabled: itemDisabled,
  id,
  className,
  ...props
}: RadioCardProps) {
  const ctx = useRadioGroupContext("RadioCard");
  const reactId = useId();
  const inputId = id ?? reactId;

  const checked = ctx.value === value;
  const disabled = ctx.disabled || itemDisabled;

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group relative flex items-center gap-3 rounded-3xl border bg-card p-4 text-card-foreground transition-colors",
        "has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[:focus-visible]:ring-offset-background",
        disabled
          ? "cursor-not-allowed opacity-60"
          : "cursor-pointer hover:border-primary/40",
        checked ? "border-primary" : "border-input",
        className,
      )}
    >
      <input
        id={inputId}
        type="radio"
        className="sr-only"
        name={ctx.name}
        value={value}
        checked={checked}
        disabled={disabled}
        onChange={() => ctx.setValue(value)}
        {...props}
      />

      {icon && (
        <span className="flex size-8 shrink-0 items-center justify-center [&_svg]:size-8">
          {icon}
        </span>
      )}

      <span className="flex min-w-0 flex-1 flex-col gap-0.5">
        {label != null && (
          <span className="font-medium leading-snug text-foreground">{label}</span>
        )}
        {description != null && (
          <span className="truncate text-sm leading-relaxed text-muted-foreground">
            {description}
          </span>
        )}
      </span>

      <span
        aria-hidden="true"
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 text-primary-foreground transition-colors [&_svg]:size-3.5",
          checked ? "border-primary bg-primary" : "border-input bg-transparent",
        )}
      >
        {checked && <Check weight="bold" />}
      </span>
    </label>
  );
}
RadioCard.displayName = "RadioCard";
