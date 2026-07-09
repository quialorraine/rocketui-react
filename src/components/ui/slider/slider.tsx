import {
  useCallback,
  useId,
  useRef,
  useState,
  type KeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export type SliderValue = number | number[];

export interface SliderProps {
  min?: number;
  max?: number;
  step?: number;
  value?: SliderValue;
  defaultValue?: SliderValue;
  onValueChange?: (value: SliderValue) => void;
  /** Fired once when a drag/keyboard interaction settles. */
  onValueCommit?: (value: SliderValue) => void;
  orientation?: "horizontal" | "vertical";
  disabled?: boolean;
  /** Label rendered above the track. */
  label?: ReactNode;
  /** Show the current value(s). Pass a function to format each value. */
  showValue?: boolean;
  formatValue?: (value: number) => ReactNode;
  /** Minimum gap (in steps) enforced between two thumbs. */
  minStepsBetweenThumbs?: number;
  name?: string;
  "aria-label"?: string;
  "aria-labelledby"?: string;
  className?: string;
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                   */
/* -------------------------------------------------------------------------- */

const toArray = (value: SliderValue | undefined, fallback: number[]): number[] => {
  if (value == null) return fallback;
  return Array.isArray(value) ? value : [value];
};

const decimalsOf = (step: number) => (String(step).split(".")[1] ?? "").length;

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export function Slider({
  min = 0,
  max = 100,
  step = 1,
  value,
  defaultValue,
  onValueChange,
  onValueCommit,
  orientation = "horizontal",
  disabled = false,
  label,
  showValue = false,
  formatValue = (v) => v,
  minStepsBetweenThumbs = 0,
  name,
  className,
  ...aria
}: SliderProps) {
  const reactId = useId();
  const baseId = aria["aria-labelledby"] ?? (label ? `${reactId}-label` : undefined);
  const vertical = orientation === "vertical";
  const decimals = decimalsOf(step);

  const isControlled = value !== undefined;
  const [uncontrolled, setUncontrolled] = useState<number[]>(() =>
    toArray(defaultValue, [min]),
  );
  const values = isControlled ? toArray(value, [min]) : uncontrolled;
  const isRange = values.length > 1;

  const trackRef = useRef<HTMLDivElement>(null);
  const thumbRefs = useRef<(HTMLDivElement | null)[]>([]);
  const draggingRef = useRef<number | null>(null);

  const roundToStep = useCallback(
    (v: number) => {
      const snapped = Math.round((v - min) / step) * step + min;
      return Number(Math.min(max, Math.max(min, snapped)).toFixed(decimals));
    },
    [min, max, step, decimals],
  );

  const percent = (v: number) => ((v - min) / (max - min)) * 100;

  const emit = useCallback(
    (next: number[], commit = false) => {
      const out: SliderValue = next.length > 1 ? next : next[0];
      if (!isControlled) setUncontrolled(next);
      onValueChange?.(out);
      if (commit) onValueCommit?.(out);
    },
    [isControlled, onValueChange, onValueCommit],
  );

  const setThumb = useCallback(
    (index: number, raw: number, commit = false) => {
      const gap = minStepsBetweenThumbs * step;
      const next = [...values];
      const lower = index > 0 ? next[index - 1] + gap : min;
      const upper = index < next.length - 1 ? next[index + 1] - gap : max;
      next[index] = Math.min(upper, Math.max(lower, roundToStep(raw)));
      emit(next, commit);
    },
    [values, minStepsBetweenThumbs, step, min, max, roundToStep, emit],
  );

  const valueFromPointer = useCallback(
    (clientX: number, clientY: number) => {
      const el = trackRef.current;
      if (!el) return min;
      const rect = el.getBoundingClientRect();
      const ratio = vertical
        ? (rect.bottom - clientY) / rect.height
        : (clientX - rect.left) / rect.width;
      return min + Math.min(1, Math.max(0, ratio)) * (max - min);
    },
    [vertical, min, max],
  );

  const nearestThumb = (val: number) => {
    if (!isRange) return 0;
    return Math.abs(val - values[0]) <= Math.abs(val - values[1]) ? 0 : 1;
  };

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (disabled) return;
    event.preventDefault();
    const val = valueFromPointer(event.clientX, event.clientY);
    const index = nearestThumb(val);
    draggingRef.current = index;
    setThumb(index, val);
    thumbRefs.current[index]?.focus();

    const onMove = (e: PointerEvent) => {
      if (draggingRef.current == null) return;
      setThumb(draggingRef.current, valueFromPointer(e.clientX, e.clientY));
    };
    const onUp = (e: PointerEvent) => {
      if (draggingRef.current != null) {
        setThumb(draggingRef.current, valueFromPointer(e.clientX, e.clientY), true);
      }
      draggingRef.current = null;
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  };

  const onKeyDown = (index: number) => (event: KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    const big = step * 10;
    let next: number | null = null;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowUp":
        next = values[index] + step;
        break;
      case "ArrowLeft":
      case "ArrowDown":
        next = values[index] - step;
        break;
      case "PageUp":
        next = values[index] + big;
        break;
      case "PageDown":
        next = values[index] - big;
        break;
      case "Home":
        next = min;
        break;
      case "End":
        next = max;
        break;
      default:
        return;
    }
    event.preventDefault();
    setThumb(index, next, true);
  };

  const fillStart = isRange ? percent(values[0]) : 0;
  const fillEnd = percent(values[isRange ? 1 : 0]);
  const fillSize = fillEnd - fillStart;

  return (
    <div className={cn("flex w-full flex-col gap-3", vertical && "h-full w-auto", className)}>
      {(label || showValue) && (
        <div className="flex items-center justify-between gap-4">
          {label && (
            <span id={baseId} className="text-sm font-medium text-foreground">
              {label}
            </span>
          )}
          {showValue && (
            <span className="text-sm font-medium text-foreground tabular-nums">
              {values.map((v, i) => (
                <span key={i}>
                  {i > 0 && <span className="mx-1 text-muted-foreground">to</span>}
                  {formatValue(v)}
                </span>
              ))}
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative flex touch-none select-none",
          vertical ? "h-full min-h-40 w-3.5 justify-center" : "h-3.5 w-full items-center",
          disabled && "pointer-events-none opacity-50",
        )}
      >
        {/* Track */}
        <div
          ref={trackRef}
          onPointerDown={onPointerDown}
          className={cn(
            "relative cursor-pointer rounded-full bg-accent",
            vertical ? "h-full w-3.5" : "h-3.5 w-full",
          )}
        >
          {/* Fill */}
          <div
            className="absolute rounded-full bg-primary"
            style={
              vertical
                ? { bottom: `${fillStart}%`, height: `${fillSize}%`, left: 0, right: 0 }
                : { left: `${fillStart}%`, width: `${fillSize}%`, top: 0, bottom: 0 }
            }
          />

          {/* Thumbs */}
          {values.map((v, i) => (
            <div
              key={i}
              ref={(el) => {
                thumbRefs.current[i] = el;
              }}
              role="slider"
              tabIndex={disabled ? -1 : 0}
              aria-orientation={orientation}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-valuenow={v}
              aria-label={aria["aria-label"]}
              aria-labelledby={!aria["aria-label"] ? baseId : undefined}
              aria-disabled={disabled || undefined}
              onKeyDown={onKeyDown(i)}
              className={cn(
                "absolute rounded-full bg-white ring-1 ring-black/10 outline-none",
                "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                vertical ? "h-5 w-3" : "h-3 w-5",
              )}
              style={
                vertical
                  ? { bottom: `${percent(v)}%`, left: "50%", transform: "translate(-50%, 50%)" }
                  : { left: `${percent(v)}%`, top: "50%", transform: "translate(-50%, -50%)" }
              }
            />
          ))}
        </div>
      </div>

      {name &&
        values.map((v, i) => (
          <input key={i} type="hidden" name={isRange ? `${name}[]` : name} value={v} />
        ))}
    </div>
  );
}
Slider.displayName = "Slider";
