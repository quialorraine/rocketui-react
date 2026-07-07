import {
  forwardRef,
  useId,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";
import {
  controlSurface,
  FieldLabel,
  FieldMessage,
  resolveStatus,
} from "./input";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const textareaSurface = cva("flex-col", {
  variants: {
    size: {
      sm: "p-3 text-sm",
      md: "p-3.5 text-sm",
      lg: "p-4 text-base",
    },
  },
  defaultVariants: { size: "md" },
});

/* -------------------------------------------------------------------------- */
/*                                  Textarea                                   */
/* -------------------------------------------------------------------------- */

export interface TextareaProps
  extends Omit<ComponentPropsWithoutRef<"textarea">, "size">,
    VariantProps<typeof textareaSurface> {
  /** Field label rendered above the control. */
  label?: ReactNode;
  /** Marks the field as required (adds a red asterisk to the label). */
  required?: boolean;
  /** Helper text rendered below the control. */
  description?: ReactNode;
  /** Error message, sets the error style and replaces the description. */
  error?: ReactNode;
  /** Force the error style without a message. */
  invalid?: boolean;
  /** Apply the success (valid) style. */
  success?: boolean;
  /** Toolbar / actions rendered inside the box below the text area. */
  footer?: ReactNode;
  /** Resize behaviour of the text area. */
  resize?: "none" | "vertical";
  /** Class applied to the outer field wrapper. */
  className?: string;
  /** Class applied to the `<textarea>` element. */
  textareaClassName?: string;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function Textarea(
    {
      size,
      label,
      required,
      description,
      error,
      invalid,
      success,
      footer,
      resize = "vertical",
      rows = 4,
      disabled,
      id,
      className,
      textareaClassName,
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
          className={cn(controlSurface({ status }), textareaSurface({ size }))}
        >
          <textarea
            ref={ref}
            id={inputId}
            rows={rows}
            disabled={disabled}
            aria-invalid={status === "error" || undefined}
            aria-describedby={message ? messageId : undefined}
            className={cn(
              "min-h-0 w-full flex-1 bg-transparent outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed",
              resize === "none" ? "resize-none" : "resize-y",
              textareaClassName,
            )}
            {...props}
          />
          {footer && <div className="flex items-center gap-2 pt-3">{footer}</div>}
        </div>

        {message && (
          <FieldMessage id={messageId} status={status}>
            {message}
          </FieldMessage>
        )}
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
