import { useCallback, useState } from "react";

export interface ControllableStateOptions<T> {
  /** Controlled value. When defined, the hook is in controlled mode. */
  value?: T;
  /** Initial value used only in uncontrolled mode. */
  defaultValue: T;
  /** Called with the next value on every change, in both modes. */
  onChange?: (value: T) => void;
}

/**
 * One state value that works controlled or uncontrolled. When `value` is
 * provided the component is controlled and internal state is ignored; otherwise
 * it holds its own state seeded from `defaultValue`. `onChange` always fires.
 *
 * This replaces the identical controlled/uncontrolled block that Dialog,
 * Popover, DropdownMenu and Select each hand-rolled for their open state.
 */
export function useControllableState<T>({
  value,
  defaultValue,
  onChange,
}: ControllableStateOptions<T>): readonly [T, (next: T) => void] {
  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultValue);
  const current = isControlled ? (value as T) : uncontrolled;

  const setValue = useCallback(
    (next: T) => {
      if (!isControlled) setUncontrolled(next);
      onChange?.(next);
    },
    [isControlled, onChange],
  );

  return [current, setValue] as const;
}
