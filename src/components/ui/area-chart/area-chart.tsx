import {
  useId,
  useLayoutEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                   */
/* -------------------------------------------------------------------------- */

/** Build a smooth SVG path through the points using midpoint quadratics. */
function smoothPath(points: { x: number; y: number }[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const curr = points[i];
    const next = points[i + 1];
    const midX = (curr.x + next.x) / 2;
    d += ` Q ${curr.x} ${curr.y} ${midX} ${(curr.y + next.y) / 2}`;
    d += ` Q ${next.x} ${next.y} ${next.x} ${next.y}`;
  }
  return d;
}

function useMeasuredWidth<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [width, setWidth] = useState(0);
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const update = () => setWidth(el.clientWidth);
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  return [ref, width] as const;
}

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface AreaChartProps
  extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  /** Series values, plotted left to right. */
  data: number[];
  /** Optional x-axis labels, one per point. */
  labels?: (string | number)[];
  /** Chart height in pixels (excluding labels). */
  height?: number;
  /** Line/fill colour. Any CSS color; defaults to the primary token. */
  color?: string;
  /** Number of horizontal grid lines. Set 0 to hide. */
  gridLines?: number;
  /** Render tooltip contents for the active point. */
  tooltip?: (point: { index: number; value: number }) => ReactNode;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

/**
 * A dependency-free area chart. Renders a smooth line with a gradient fill,
 * optional grid lines and x-axis labels, and an interactive hover tooltip.
 */
export function AreaChart({
  data,
  labels,
  height = 180,
  color = "var(--color-primary)",
  gridLines = 4,
  tooltip,
  className,
  ...props
}: AreaChartProps) {
  const gradientId = useId();
  const [ref, width] = useMeasuredWidth<HTMLDivElement>();
  const [active, setActive] = useState<number | null>(null);

  const padTop = 8;
  const padBottom = 8;
  const chartH = height - padTop - padBottom;

  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;
  // Add a little headroom so the peak isn't glued to the top edge.
  const paddedMax = max + range * 0.15;
  const paddedMin = min - range * 0.15;
  const paddedRange = paddedMax - paddedMin || 1;

  const n = data.length;
  const points = data.map((value, i) => ({
    x: n <= 1 ? width / 2 : (i / (n - 1)) * width,
    y: padTop + (1 - (value - paddedMin) / paddedRange) * chartH,
  }));

  const linePath = smoothPath(points);
  const areaPath =
    points.length > 0
      ? `${linePath} L ${points[points.length - 1].x} ${height - padBottom} L ${points[0].x} ${height - padBottom} Z`
      : "";

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (width === 0 || n === 0) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const idx = Math.round((x / width) * (n - 1));
    setActive(Math.max(0, Math.min(n - 1, idx)));
  };

  const activePoint = active != null ? points[active] : null;

  return (
    <div className={cn("w-full", className)} {...props}>
      <div
        ref={ref}
        className="relative"
        style={{ height }}
        onMouseMove={onMove}
        onMouseLeave={() => setActive(null)}
      >
        {width > 0 && (
          <svg
            width={width}
            height={height}
            className="block overflow-visible"
            role="img"
          >
            <defs>
              <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity={0.25} />
                <stop offset="100%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>

            {gridLines > 0 &&
              Array.from({ length: gridLines }).map((_, i) => {
                const y = padTop + (chartH / (gridLines - 1)) * i;
                return (
                  <line
                    key={i}
                    x1={0}
                    y1={y}
                    x2={width}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeWidth={1}
                    strokeDasharray="3 3"
                    opacity={0.6}
                  />
                );
              })}

            <path d={areaPath} fill={`url(#${gradientId})`} />
            <path
              d={linePath}
              fill="none"
              stroke={color}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {activePoint && (
              <>
                <line
                  x1={activePoint.x}
                  y1={padTop}
                  x2={activePoint.x}
                  y2={height - padBottom}
                  stroke="var(--color-border)"
                  strokeWidth={1}
                />
                <circle
                  cx={activePoint.x}
                  cy={activePoint.y}
                  r={5}
                  fill={color}
                  stroke="var(--color-card)"
                  strokeWidth={2}
                />
              </>
            )}
          </svg>
        )}

        {activePoint && tooltip && (
          <div
            className="pointer-events-none absolute z-10 -translate-x-1/2 -translate-y-full"
            style={{ left: activePoint.x, top: activePoint.y - 12 }}
          >
            <div className="whitespace-nowrap rounded-lg border border-border bg-card px-3 py-2 text-xs shadow-md">
              {tooltip({ index: active as number, value: data[active as number] })}
            </div>
          </div>
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
AreaChart.displayName = "AreaChart";
