import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

/* The bordered control surface shared by Input and Textarea. `focus-within`
 * lifts the ring so it works regardless of which inner element is focused. */
export const controlSurface = cva(
  [
    "flex w-full rounded-xl border bg-card text-card-foreground shadow-sm outline-none",
    "transition-[color,box-shadow,border-color]",
    "focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-background",
    "data-[disabled=true]:cursor-not-allowed data-[disabled=true]:opacity-50",
  ],
  {
    variants: {
      status: {
        default: "border-input focus-within:ring-ring",
        success: "border-success focus-within:ring-success/40",
        error: "border-destructive focus-within:ring-destructive/40",
      },
    },
    defaultVariants: { status: "default" },
  },
);

const inputSurface = cva("items-center gap-2", {
  variants: {
    size: {
      sm: "h-9 px-3 text-sm [&_svg]:size-4",
      md: "h-11 px-3.5 text-sm [&_svg]:size-[18px]",
      lg: "h-12 px-4 text-base [&_svg]:size-5",
    },
  },
  defaultVariants: { size: "md" },
});

export type FieldStatus = NonNullable<VariantProps<typeof controlSurface>["status"]>;
export type FieldSize = NonNullable<VariantProps<typeof inputSurface>["size"]>;

/* -------------------------------------------------------------------------- */
/*                              Shared field parts                             */
/* -------------------------------------------------------------------------- */

const LABEL_COLOR: Record<FieldStatus, string> = {
  default: "text-foreground",
  success: "text-success",
  error: "text-destructive",
};

export function resolveStatus(
  error: ReactNode,
  invalid?: boolean,
  success?: boolean,
): FieldStatus {
  if (error || invalid) return "error";
  if (success) return "success";
  return "default";
}

export function FieldLabel({
  htmlFor,
  status,
  required,
  children,
}: {
  htmlFor: string;
  status: FieldStatus;
  required?: boolean;
  children: ReactNode;
}) {
  return (
    <label
      htmlFor={htmlFor}
      className={cn("text-sm font-medium leading-none", LABEL_COLOR[status])}
    >
      {children}
      {required && (
        <span className={cn("ml-0.5", status === "default" && "text-destructive")}>
          *
        </span>
      )}
    </label>
  );
}

export function FieldMessage({
  id,
  status,
  children,
}: {
  id: string;
  status: FieldStatus;
  children: ReactNode;
}) {
  return (
    <p
      id={id}
      className={cn(
        "text-xs leading-relaxed",
        status === "error" ? "text-destructive" : "text-muted-foreground",
      )}
    >
      {children}
    </p>
  );
}

/* -------------------------------------------------------------------------- */
/*                                   Input                                     */
/* -------------------------------------------------------------------------- */

export interface InputProps
  extends Omit<ComponentPropsWithoutRef<"input">, "size">,
    VariantProps<typeof inputSurface> {
  /** Field label rendered above the control. */
  label?: ReactNode;
  /** Marks the field as required (adds a red asterisk to the label). */
  required?: boolean;
  /** Helper text rendered below the control. */
  description?: ReactNode;
  /** Error message — sets the error style and replaces the description. */
  error?: ReactNode;
  /** Force the error style without a message. */
  invalid?: boolean;
  /** Apply the success (valid) style. */
  success?: boolean;
  /** Content rendered before the input (icon, prefix, addon). */
  startContent?: ReactNode;
  /** Content rendered after the input (icon, action, addon). */
  endContent?: ReactNode;
  /** Class applied to the outer field wrapper. */
  className?: string;
  /** Class applied to the `<input>` element. */
  inputClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    size,
    label,
    required,
    description,
    error,
    invalid,
    success,
    startContent,
    endContent,
    disabled,
    id,
    className,
    inputClassName,
    ...props
  },
  ref,
) {
  const reactId = useId();
  const inputId = id ?? reactId;
  const messageId = `${inputId}-message`;
  const status = resolveStatus(error, invalid, success);
  const message = error ?? description;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <FieldLabel htmlFor={inputId} status={status} required={required}>
          {label}
        </FieldLabel>
      )}

      <div
        data-disabled={disabled || undefined}
        className={cn(controlSurface({ status }), inputSurface({ size }), "flex")}
      >
        {startContent && (
          <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
            {startContent}
          </span>
        )}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={status === "error" || undefined}
          aria-describedby={message ? messageId : undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
            inputClassName,
          )}
          {...props}
        />
        {endContent && (
          <span className="flex shrink-0 items-center gap-2 text-muted-foreground">
            {endContent}
          </span>
        )}
      </div>

      {message && (
        <FieldMessage id={messageId} status={status}>
          {message}
        </FieldMessage>
      )}
    </div>
  );
});
Input.displayName = "Input";
