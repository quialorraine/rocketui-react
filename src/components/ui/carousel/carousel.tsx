import {
  Children,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
} from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                    Item                                     */
/* -------------------------------------------------------------------------- */

export interface CarouselItemProps extends ComponentPropsWithoutRef<"div"> {}

/** A single slide. Fills its slot; give it a square child for the design look. */
export function CarouselItem({ className, children, ...props }: CarouselItemProps) {
  return (
    <div className={cn("size-full", className)} {...props}>
      {children}
    </div>
  );
}
CarouselItem.displayName = "CarouselItem";

/* -------------------------------------------------------------------------- */
/*                                  Carousel                                   */
/* -------------------------------------------------------------------------- */

export interface CarouselProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange"> {
  /** Active slide index (controlled). */
  index?: number;
  /** Initial active slide index (uncontrolled). */
  defaultIndex?: number;
  /** Fired with the new active index. */
  onIndexChange?: (index: number) => void;
  /** Width of the active (centered) slide in pixels. Slides are square. */
  slideWidth?: number;
  /** Gap between slides in pixels. */
  gap?: number;
  /** Scale applied to the non-active side slides. */
  peekScale?: number;
  /**
   * Colour the side slides fade into at their outer edge, so they blend into
   * the surrounding surface instead of ending sharply. Any CSS colour; defaults
   * to the theme background. Set it to match the surface behind the carousel.
   */
  fadeColor?: string;
  /** Wrap from the last slide back to the first. */
  loop?: boolean;
  /** Show the previous/next arrow buttons. */
  showArrows?: boolean;
  /** Show the dot indicators. */
  showDots?: boolean;
  /** Advance automatically. Pauses on hover and while dragging. */
  autoPlay?: boolean;
  /** Autoplay interval in milliseconds. */
  autoPlayInterval?: number;
  /** Accessible label for the previous button. */
  prevLabel?: string;
  /** Accessible label for the next button. */
  nextLabel?: string;
}

/**
 * A center-focused carousel: the active slide sits full size in the middle
 * while its neighbours peek in, scaled down. Navigate with the arrows, the
 * dots, arrow keys, or by dragging.
 */
export function Carousel({
  index,
  defaultIndex = 0,
  onIndexChange,
  slideWidth = 311,
  gap = 24,
  peekScale = 0.7,
  fadeColor = "var(--color-background)",
  loop = false,
  showArrows = true,
  showDots = true,
  autoPlay = false,
  autoPlayInterval = 4000,
  prevLabel = "Previous slide",
  nextLabel = "Next slide",
  className,
  children,
  ...props
}: CarouselProps) {
  const slides = useMemo(() => Children.toArray(children), [children]);
  const count = slides.length;

  const isControlled = index !== undefined;
  const [internal, setInternal] = useState(() =>
    Math.min(Math.max(defaultIndex, 0), Math.max(count - 1, 0)),
  );
  const active = Math.min(
    isControlled ? (index as number) : internal,
    Math.max(count - 1, 0),
  );

  const setActive = useCallback(
    (next: number) => {
      const bounded = loop
        ? (next + count) % count
        : Math.min(Math.max(next, 0), count - 1);
      if (!isControlled) setInternal(bounded);
      onIndexChange?.(bounded);
    },
    [count, isControlled, loop, onIndexChange],
  );

  const goPrev = useCallback(() => setActive(active - 1), [active, setActive]);
  const goNext = useCallback(() => setActive(active + 1), [active, setActive]);

  const canPrev = loop || active > 0;
  const canNext = loop || active < count - 1;

  /* Measure the viewport so the active slide can be centred. */
  const viewportRef = useRef<HTMLDivElement>(null);
  const [viewportWidth, setViewportWidth] = useState(0);

  useLayoutEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const update = () => setViewportWidth(el.clientWidth);
    update();
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // Shrink the slide on narrow viewports so peeks and edges stay visible.
  const size =
    viewportWidth > 0 ? Math.min(slideWidth, viewportWidth - 48) : slideWidth;
  const step = size + gap;
  const offset = viewportWidth / 2 - active * step - size / 2;

  /* Autoplay, paused on hover and while dragging. */
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (!autoPlay || paused || count <= 1) return;
    const id = window.setInterval(() => {
      setActive(loop ? active + 1 : active >= count - 1 ? 0 : active + 1);
    }, autoPlayInterval);
    return () => window.clearInterval(id);
  }, [autoPlay, paused, count, active, loop, autoPlayInterval, setActive]);

  /* Pointer drag / swipe. */
  const dragStart = useRef<number | null>(null);
  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragStart.current = event.clientX;
    setPaused(true);
  };
  const onPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (dragStart.current === null) return;
    const delta = event.clientX - dragStart.current;
    dragStart.current = null;
    setPaused(false);
    if (delta > 40) goPrev();
    else if (delta < -40) goNext();
  };

  return (
    <div
      className={cn("flex flex-col items-center gap-6", className)}
      role="group"
      aria-roledescription="carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onKeyDown={(event) => {
        if (event.key === "ArrowLeft") {
          event.preventDefault();
          goPrev();
        } else if (event.key === "ArrowRight") {
          event.preventDefault();
          goNext();
        }
      }}
      tabIndex={0}
      {...props}
    >
      <div
        ref={viewportRef}
        className="relative w-full touch-pan-y select-none overflow-hidden"
        style={{ height: size }}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerCancel={() => {
          dragStart.current = null;
          setPaused(false);
        }}
      >
        <div
          className={cn(
            "flex h-full items-center",
            viewportWidth > 0 && "transition-transform duration-500 ease-out",
          )}
          style={{ transform: `translateX(${offset}px)`, columnGap: gap }}
        >
          {slides.map((slide, i) => {
            const isActive = i === active;
            // Side slides fade into the surrounding surface at their outer
            // edge; the edge facing the centre stays fully visible.
            const fadeDirection = i < active ? "to right" : "to left";
            return (
              <div
                key={i}
                aria-hidden={!isActive}
                aria-roledescription="slide"
                className={cn(
                  "relative shrink-0 overflow-hidden rounded-xl transition-transform duration-500 ease-out",
                  isActive && "z-10 shadow-lg",
                )}
                style={{
                  width: size,
                  height: size,
                  transform: `scale(${isActive ? 1 : peekScale})`,
                }}
              >
                {slide}
                <div
                  aria-hidden
                  className={cn(
                    "pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out",
                    isActive ? "opacity-0" : "opacity-100",
                  )}
                  style={{
                    background: `linear-gradient(${fadeDirection}, ${fadeColor}, ${fadeColor} 12%, transparent 68%)`,
                  }}
                />
              </div>
            );
          })}
        </div>

        {showArrows && count > 1 && (
          <>
            <CarouselArrow
              side="left"
              label={prevLabel}
              disabled={!canPrev}
              onClick={goPrev}
            />
            <CarouselArrow
              side="right"
              label={nextLabel}
              disabled={!canNext}
              onClick={goNext}
            />
          </>
        )}
      </div>

      {showDots && count > 1 && (
        <div className="flex items-center gap-1.5">
          {slides.map((_, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                type="button"
                aria-label={`Go to slide ${i + 1}`}
                aria-current={isActive ? "true" : undefined}
                onClick={() => setActive(i)}
                className={cn(
                  "h-1 rounded-full transition-all duration-300",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                  isActive
                    ? "w-8 bg-muted-foreground"
                    : "w-5 bg-muted-foreground/30 hover:bg-muted-foreground/50",
                )}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}
Carousel.displayName = "Carousel";

/* -------------------------------------------------------------------------- */
/*                                   Arrow                                     */
/* -------------------------------------------------------------------------- */

function CarouselArrow({
  side,
  label,
  disabled,
  onClick,
}: {
  side: "left" | "right";
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "absolute top-1/2 z-20 grid size-10 -translate-y-1/2 place-items-center rounded-full",
        "border border-border bg-card/80 text-foreground shadow-md backdrop-blur-sm transition-colors",
        "hover:bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-0",
        side === "left" ? "left-3" : "right-3",
        "[&_svg]:size-5",
      )}
    >
      {side === "left" ? <CaretLeft weight="bold" /> : <CaretRight weight="bold" />}
    </button>
  );
}

export type CarouselSlide = ReactNode;
