import {
  useEffect,
  useId,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { Check, Minus } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Sizing                                    */
/* -------------------------------------------------------------------------- */

type CheckboxSize = "sm" | "md" | "lg";

const SIZE: Record<
  CheckboxSize,
  { box: string; icon: string; label: string }
> = {
  sm: { box: "size-4 rounded-[5px]", icon: "[&>svg]:size-3", label: "text-sm" },
  md: { box: "size-5 rounded-[6px]", icon: "[&>svg]:size-3.5", label: "text-base" },
  lg: { box: "size-6 rounded-[7px]", icon: "[&>svg]:size-4", label: "text-base" },
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface CheckboxProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "size" | "onChange" | "checked" | "defaultChecked"
  > {
  /** Checked state (controlled). */
  checked?: boolean;
  /** Initial checked state (uncontrolled). */
  defaultChecked?: boolean;
  /** Mixed state — visually a dash, `aria-checked="mixed"`. */
  indeterminate?: boolean;
  /** Fired with the next checked value on toggle. */
  onCheckedChange?: (checked: boolean) => void;
  size?: CheckboxSize;
  /** Inline label rendered next to the box. */
  label?: ReactNode;
  /** Helper text rendered under the label. */
  description?: ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export function Checkbox({
  checked,
  defaultChecked = false,
  indeterminate = false,
  onCheckedChange,
  size = "md",
  label,
  description,
  disabled,
  id,
  className,
  ...props
}: CheckboxProps) {
  const s = SIZE[size];
  const inputRef = useRef<HTMLInputElement>(null);
  const reactId = useId();
  const inputId = id ?? reactId;

  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internal;

  // `indeterminate` is a property, not an attribute — set it imperatively.
  useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate, isChecked]);

  const active = isChecked || indeterminate;
  const hasText = label != null || description != null;

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
          ref={inputRef}
          id={inputId}
          type="checkbox"
          className="peer sr-only"
          checked={isChecked}
          disabled={disabled}
          aria-checked={indeterminate ? "mixed" : isChecked}
          onChange={(e) => {
            if (!isControlled) setInternal(e.target.checked);
            onCheckedChange?.(e.target.checked);
          }}
          {...props}
        />
        <span
          aria-hidden="true"
          className={cn(
            "flex shrink-0 items-center justify-center border-2 text-primary-foreground transition-colors",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
            s.box,
            s.icon,
            active
              ? "border-primary bg-primary"
              : "border-input bg-transparent group-hover:border-primary/60",
          )}
        >
          {indeterminate ? (
            <Minus weight="bold" />
          ) : isChecked ? (
            <Check weight="bold" />
          ) : null}
        </span>
      </span>

      {hasText && (
        <span className="flex flex-col gap-0.5">
          {label != null && (
            <span
              className={cn(
                "leading-snug font-medium text-foreground",
                s.label,
              )}
            >
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
Checkbox.displayName = "Checkbox";
