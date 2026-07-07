import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
} from "react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface ScrollShadowProps extends ComponentPropsWithoutRef<"div"> {
  /** Scroll axis the shadow reacts to. */
  orientation?: "vertical" | "horizontal";
  /** Length of the fade in pixels. */
  size?: number;
  /** Pixels of slack before an edge shadow appears. */
  offset?: number;
  /** Toggle the fade effect without changing the scroll container. */
  isEnabled?: boolean;
  /** Visually hide the native scrollbar. */
  hideScrollBar?: boolean;
}

/* -------------------------------------------------------------------------- */
/*                                   Helpers                                   */
/* -------------------------------------------------------------------------- */

function buildMask(
  start: boolean,
  end: boolean,
  size: number,
  vertical: boolean,
): string {
  const dir = vertical ? "180deg" : "90deg";
  const startColor = start ? "transparent" : "#000";
  const endColor = end ? "transparent" : "#000";
  return `linear-gradient(${dir}, ${startColor} 0, #000 ${size}px, #000 calc(100% - ${size}px), ${endColor} 100%)`;
}

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export function ScrollShadow({
  orientation = "vertical",
  size = 40,
  offset = 0,
  isEnabled = true,
  hideScrollBar = false,
  className,
  style,
  children,
  ...props
}: ScrollShadowProps) {
  const ref = useRef<HTMLDivElement>(null);
  const vertical = orientation === "vertical";
  const [edges, setEdges] = useState({ start: false, end: false });

  const update = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    if (vertical) {
      const { scrollTop, scrollHeight, clientHeight } = el;
      setEdges({
        start: scrollTop > offset,
        end: scrollTop + clientHeight < scrollHeight - offset,
      });
    } else {
      const { scrollLeft, scrollWidth, clientWidth } = el;
      setEdges({
        start: scrollLeft > offset,
        end: scrollLeft + clientWidth < scrollWidth - offset,
      });
    }
  }, [vertical, offset]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    update();
    el.addEventListener("scroll", update, { passive: true });
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", update);
      ro.disconnect();
    };
  }, [update]);

  const mask =
    isEnabled && (edges.start || edges.end)
      ? buildMask(edges.start, edges.end, size, vertical)
      : undefined;

  return (
    <div
      ref={ref}
      data-orientation={orientation}
      className={cn(
        vertical
          ? "overflow-y-auto overflow-x-hidden"
          : "overflow-x-auto overflow-y-hidden",
        hideScrollBar &&
          "[-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden",
        className,
      )}
      style={{
        ...(mask
          ? { WebkitMaskImage: mask, maskImage: mask }
          : undefined),
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
ScrollShadow.displayName = "ScrollShadow";
