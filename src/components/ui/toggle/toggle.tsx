import {
  useId,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Sizing                                    */
/* -------------------------------------------------------------------------- */

type ToggleSize = "sm" | "md" | "lg";

const SIZE: Record<
  ToggleSize,
  { track: string; thumb: string; on: string; label: string }
> = {
  sm: { track: "h-5 w-9", thumb: "size-4", on: "translate-x-4", label: "text-sm" },
  md: { track: "h-6 w-11", thumb: "size-5", on: "translate-x-5", label: "text-base" },
  lg: { track: "h-7 w-[52px]", thumb: "size-6", on: "translate-x-6", label: "text-base" },
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface ToggleProps
  extends Omit<
    ComponentPropsWithoutRef<"input">,
    "type" | "size" | "onChange" | "checked" | "defaultChecked"
  > {
  /** On/off state (controlled). */
  checked?: boolean;
  /** Initial state (uncontrolled). */
  defaultChecked?: boolean;
  /** Fired with the next state on toggle. */
  onCheckedChange?: (checked: boolean) => void;
  size?: ToggleSize;
  /** Inline label rendered next to the switch. */
  label?: ReactNode;
  /** Helper text rendered under the label. */
  description?: ReactNode;
  /** Place the label before the switch instead of after. */
  labelPosition?: "start" | "end";
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export function Toggle({
  checked,
  defaultChecked = false,
  onCheckedChange,
  size = "md",
  label,
  description,
  labelPosition = "end",
  disabled,
  id,
  className,
  ...props
}: ToggleProps) {
  const s = SIZE[size];
  const reactId = useId();
  const inputId = id ?? reactId;

  const isControlled = checked !== undefined;
  const [internal, setInternal] = useState(defaultChecked);
  const isChecked = isControlled ? checked : internal;

  const hasText = label != null || description != null;

  const control = (
    <span className={cn("relative flex", description && "mt-0.5")}>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className="peer sr-only"
        checked={isChecked}
        disabled={disabled}
        aria-checked={isChecked}
        onChange={(e) => {
          if (!isControlled) setInternal(e.target.checked);
          onCheckedChange?.(e.target.checked);
        }}
        {...props}
      />
      <span
        aria-hidden="true"
        className={cn(
          "relative shrink-0 rounded-full transition-colors",
          "peer-focus-visible:ring-2 peer-focus-visible:ring-ring peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-background",
          s.track,
          isChecked ? "bg-primary" : "bg-input",
        )}
      >
        <span
          className={cn(
            "absolute left-0.5 top-1/2 -translate-y-1/2 rounded-full bg-white shadow-sm ring-1 ring-black/5 transition-transform",
            s.thumb,
            isChecked ? s.on : "translate-x-0",
          )}
        />
      </span>
    </span>
  );

  const text = hasText && (
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
  );

  return (
    <label
      htmlFor={inputId}
      className={cn(
        "group inline-flex gap-2.5",
        description ? "items-start" : "items-center",
        disabled ? "cursor-not-allowed opacity-60" : "cursor-pointer",
        className,
      )}
    >
      {labelPosition === "start" && text}
      {control}
      {labelPosition === "end" && text}
    </label>
  );
}
Toggle.displayName = "Toggle";
