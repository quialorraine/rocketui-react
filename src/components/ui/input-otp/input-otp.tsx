import {
  useRef,
  useState,
  type ClipboardEvent,
  type KeyboardEvent,
  type ChangeEvent,
} from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                  Variants                                   */
/* -------------------------------------------------------------------------- */

const cellVariants = cva(
  [
    "flex items-center justify-center rounded-xl border bg-card text-center font-medium text-foreground shadow-sm caret-primary outline-none",
    "transition-[color,box-shadow,border-color]",
    "focus:z-10 focus:ring-2",
    "disabled:cursor-not-allowed disabled:opacity-50",
  ],
  {
    variants: {
      size: {
        sm: "size-10 text-base",
        md: "size-12 text-lg",
        lg: "size-14 text-xl",
      },
      invalid: {
        true: "border-destructive focus:border-destructive focus:ring-destructive/25",
        false: "border-input focus:border-ring focus:ring-ring/25",
      },
    },
    defaultVariants: { size: "md", invalid: false },
  },
);

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface InputOTPProps
  extends Omit<VariantProps<typeof cellVariants>, "invalid"> {
  /** Number of code cells. */
  length?: number;
  /** Controlled value. */
  value?: string;
  /** Uncontrolled initial value. */
  defaultValue?: string;
  /** Fired with the full string on every change. */
  onChange?: (value: string) => void;
  /** Fired once every cell is filled. */
  onComplete?: (value: string) => void;
  /** Accepted characters. */
  type?: "numeric" | "alphanumeric";
  /** Render entered characters as dots. */
  mask?: boolean;
  /** Apply the error style. */
  invalid?: boolean;
  disabled?: boolean;
  autoFocus?: boolean;
  /** Accessible label for the group. */
  "aria-label"?: string;
  className?: string;
}

const PATTERN = {
  numeric: /[0-9]/,
  alphanumeric: /[a-zA-Z0-9]/,
} as const;

function toCells(value: string, length: number): string[] {
  const cells = Array<string>(length).fill("");
  for (let i = 0; i < Math.min(value.length, length); i += 1) cells[i] = value[i];
  return cells;
}

/* -------------------------------------------------------------------------- */
/*                                 Component                                   */
/* -------------------------------------------------------------------------- */

export function InputOTP({
  length = 6,
  value,
  defaultValue = "",
  onChange,
  onComplete,
  type = "numeric",
  mask = false,
  size,
  invalid,
  disabled,
  autoFocus,
  className,
  "aria-label": ariaLabel = "Verification code",
}: InputOTPProps) {
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState<string[]>(() =>
    toCells(defaultValue, length),
  );
  const cells = isControlled ? toCells(value, length) : internal;
  const refs = useRef<(HTMLInputElement | null)[]>([]);
  const allowed = PATTERN[type];

  const focusCell = (index: number) => {
    const clamped = Math.max(0, Math.min(length - 1, index));
    const el = refs.current[clamped];
    el?.focus();
    el?.select();
  };

  const commit = (next: string[]) => {
    if (!isControlled) setInternal(next);
    const str = next.join("");
    onChange?.(str);
    if (next.every((c) => c !== "")) onComplete?.(str);
  };

  const handleChange = (index: number, event: ChangeEvent<HTMLInputElement>) => {
    const char = event.target.value.slice(-1);
    if (!char || !allowed.test(char)) return;
    const next = [...cells];
    next[index] = char;
    commit(next);
    focusCell(index + 1);
  };

  const handleKeyDown = (index: number, event: KeyboardEvent<HTMLInputElement>) => {
    switch (event.key) {
      case "Backspace": {
        event.preventDefault();
        const next = [...cells];
        if (next[index]) {
          next[index] = "";
          commit(next);
        } else if (index > 0) {
          next[index - 1] = "";
          commit(next);
          focusCell(index - 1);
        }
        break;
      }
      case "ArrowLeft":
        event.preventDefault();
        focusCell(index - 1);
        break;
      case "ArrowRight":
        event.preventDefault();
        focusCell(index + 1);
        break;
      case "Home":
        event.preventDefault();
        focusCell(0);
        break;
      case "End":
        event.preventDefault();
        focusCell(length - 1);
        break;
    }
  };

  const handlePaste = (index: number, event: ClipboardEvent<HTMLInputElement>) => {
    event.preventDefault();
    const pasted = event.clipboardData
      .getData("text")
      .split("")
      .filter((c) => allowed.test(c))
      .slice(0, length - index);
    if (pasted.length === 0) return;
    const next = [...cells];
    pasted.forEach((c, k) => {
      next[index + k] = c;
    });
    commit(next);
    focusCell(index + pasted.length);
  };

  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={cn("flex items-center gap-3", className)}
    >
      {cells.map((char, index) => (
        <input
          // eslint-disable-next-line react/no-array-index-key
          key={index}
          ref={(el) => {
            refs.current[index] = el;
          }}
          type={mask ? "password" : "text"}
          inputMode={type === "numeric" ? "numeric" : "text"}
          autoComplete={index === 0 ? "one-time-code" : "off"}
          maxLength={1}
          value={char}
          disabled={disabled}
          autoFocus={autoFocus && index === 0}
          aria-invalid={invalid || undefined}
          aria-label={`Digit ${index + 1}`}
          onChange={(event) => handleChange(index, event)}
          onKeyDown={(event) => handleKeyDown(index, event)}
          onPaste={(event) => handlePaste(index, event)}
          onFocus={(event) => event.target.select()}
          className={cellVariants({ size, invalid })}
        />
      ))}
    </div>
  );
}
InputOTP.displayName = "InputOTP";
