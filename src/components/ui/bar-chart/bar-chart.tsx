import {
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

export interface BarChartProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Series values, plotted left to right. */
  data: number[];
  /** Optional x-axis labels, one per bar. */
  labels?: (string | number)[];
  /** Bars area height in pixels (excluding labels). */
  height?: number;
  /** Highlight colour for the active bar. Defaults to the primary token. */
  color?: string;
  /** Bar which is highlighted by default (when not hovering). */
  activeIndex?: number;
  /** Number of horizontal grid lines. Set 0 to hide. */
  gridLines?: number;
  /** Render tooltip contents for the hovered bar. */
  tooltip?: (bar: { index: number; value: number }) => ReactNode;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(Math.max(value, min), max);

/**
 * A dependency-free bar chart. Grey bars with a single highlighted bar,
 * faint dashed grid lines and x-axis labels. The tooltip appears on hover and
 * is clamped to stay within the chart bounds.
 */
export function BarChart({
  data,
  labels,
  height = 180,
  color = "var(--color-primary)",
  activeIndex,
  gridLines = 4,
  tooltip,
  className,
  ...props
}: BarChartProps) {
  const areaRef = useRef<HTMLDivElement>(null);
  const tipRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [tip, setTip] = useState({ w: 0, h: 0 });
  const [hover, setHover] = useState<number | null>(null);

  const current = hover ?? activeIndex ?? null;
  const max = Math.max(...data) || 1;
  const n = data.length;

  useLayoutEffect(() => {
    const el = areaRef.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useLayoutEffect(() => {
    if (tipRef.current) {
      setTip({
        w: tipRef.current.offsetWidth,
        h: tipRef.current.offsetHeight,
      });
    }
  }, [hover, data]);

  // Tooltip geometry (only when hovering), clamped inside the chart bounds.
  const gap = 8;
  const pointerH = 5;
  let tipLeft = 0;
  let tipTop = 0;
  let pointerLeft = 0;
  if (hover != null && width > 0) {
    const barCenter = ((hover + 0.5) / n) * width;
    const barTop = height - (data[hover] / max) * height;
    tipTop = clamp(barTop - gap - pointerH - tip.h, 0, height);
    tipLeft = clamp(barCenter, tip.w / 2 + 2, width - tip.w / 2 - 2);
    pointerLeft = clamp(barCenter, tipLeft - tip.w / 2 + 8, tipLeft + tip.w / 2 - 8);
  }

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        ref={areaRef}
        className="relative"
        style={{ height }}
        onMouseLeave={() => setHover(null)}
      >
        {gridLines > 0 &&
          Array.from({ length: gridLines }).map((_, i) => (
            <div
              key={i}
              className="absolute inset-x-0 border-t border-dashed border-border/60"
              style={{ top: `${(100 / (gridLines - 1)) * i}%` }}
            />
          ))}

        <div className="absolute inset-0 flex items-end gap-1.5">
          {data.map((value, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${labels?.[i] ?? i + 1}: ${value}`}
              onMouseEnter={() => setHover(i)}
              onFocus={() => setHover(i)}
              onBlur={() => setHover(null)}
              className="flex-1 rounded-[3px] transition-colors focus-visible:outline-none"
              style={{
                height: `${Math.max((value / max) * 100, 2)}%`,
                background: i === current ? color : "var(--color-accent)",
              }}
            />
          ))}
        </div>

        {hover != null && tooltip && (
          <>
            <div
              ref={tipRef}
              className="pointer-events-none absolute z-10 -translate-x-1/2 whitespace-nowrap rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md"
              style={{ left: tipLeft, top: tipTop }}
            >
              {tooltip({ index: hover, value: data[hover] })}
            </div>
            <span
              className="pointer-events-none absolute z-10 size-2 -translate-x-1/2 rotate-45 border-b border-r border-border bg-card"
              style={{ left: pointerLeft, top: tipTop + tip.h - 4 }}
            />
          </>
        )}
      </div>

      {labels && (
        <div className="mt-2 flex justify-between text-xs text-muted-foreground">
          {labels.map((label, i) => (
            <span key={i}>{label}</span>
          ))}
        </div>
      )}
    </div>
  );
}
BarChart.displayName = "BarChart";
