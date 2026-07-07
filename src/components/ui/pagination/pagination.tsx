import { useCallback, useMemo, useState, type ReactNode } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                Range logic                                  */
/* -------------------------------------------------------------------------- */

const DOTS = "dots" as const;
type PageItem = number | typeof DOTS;

const range = (start: number, end: number): number[] =>
  Array.from({ length: Math.max(end - start + 1, 0) }, (_, i) => start + i);

/**
 * Build the list of page tokens with ellipsis, keeping the first/last
 * `boundaries` pages and `siblings` pages on each side of the current page.
 */
export function getPaginationRange({
  total,
  page,
  siblings = 1,
  boundaries = 1,
}: {
  total: number;
  page: number;
  siblings?: number;
  boundaries?: number;
}): PageItem[] {
  const totalShown = siblings * 2 + 3 + boundaries * 2;
  if (totalShown >= total) return range(1, total);

  const leftSibling = Math.max(page - siblings, boundaries);
  const rightSibling = Math.min(page + siblings, total - boundaries + 1);

  const showLeftDots = leftSibling > boundaries + 2;
  const showRightDots = rightSibling < total - (boundaries + 1);

  if (!showLeftDots && showRightDots) {
    const leftCount = siblings * 2 + boundaries + 2;
    return [...range(1, leftCount), DOTS, ...range(total - boundaries + 1, total)];
  }
  if (showLeftDots && !showRightDots) {
    const rightCount = boundaries + siblings * 2 + 2;
    return [...range(1, boundaries), DOTS, ...range(total - rightCount + 1, total)];
  }
  return [
    ...range(1, boundaries),
    DOTS,
    ...range(leftSibling, rightSibling),
    DOTS,
    ...range(total - boundaries + 1, total),
  ];
}

/* -------------------------------------------------------------------------- */
/*                                  Sizing                                     */
/* -------------------------------------------------------------------------- */

export type PaginationSize = "sm" | "md" | "lg";

const SIZE: Record<
  PaginationSize,
  { item: string; control: string; icon: string }
> = {
  sm: { item: "size-8 text-xs", control: "h-8 gap-1 px-2 text-xs", icon: "size-4" },
  md: { item: "size-9 text-sm", control: "h-9 gap-1.5 px-2.5 text-sm", icon: "size-[18px]" },
  lg: { item: "size-10 text-base", control: "h-10 gap-2 px-3 text-base", icon: "size-5" },
};

/* -------------------------------------------------------------------------- */
/*                                Pagination                                   */
/* -------------------------------------------------------------------------- */

export interface PaginationProps {
  /** Total number of pages. */
  total: number;
  /** Controlled current page (1-based). */
  page?: number;
  /** Uncontrolled initial page (1-based). */
  defaultPage?: number;
  /** Fires with the next page when a control or page link is activated. */
  onPageChange?: (page: number) => void;
  /** Pages shown on each side of the current page. */
  siblings?: number;
  /** Pages pinned at the start and end. */
  boundaries?: number;
  /** Render the Previous / Next controls. */
  showControls?: boolean;
  /** Render the numbered page links. */
  showPages?: boolean;
  size?: PaginationSize;
  disabled?: boolean;
  prevLabel?: ReactNode;
  nextLabel?: ReactNode;
  className?: string;
  "aria-label"?: string;
}

export function Pagination({
  total,
  page,
  defaultPage = 1,
  onPageChange,
  siblings = 1,
  boundaries = 1,
  showControls = true,
  showPages = true,
  size = "md",
  disabled = false,
  prevLabel = "Previous",
  nextLabel = "Next",
  className,
  "aria-label": ariaLabel = "Pagination",
}: PaginationProps) {
  const isControlled = page !== undefined;
  const [internal, setInternal] = useState(defaultPage);
  const current = Math.min(Math.max(isControlled ? page : internal, 1), total);

  const setPage = useCallback(
    (next: number) => {
      const clamped = Math.min(Math.max(next, 1), total);
      if (clamped === current) return;
      if (!isControlled) setInternal(clamped);
      onPageChange?.(clamped);
    },
    [current, isControlled, onPageChange, total],
  );

  const items = useMemo(
    () => getPaginationRange({ total, page: current, siblings, boundaries }),
    [total, current, siblings, boundaries],
  );

  const s = SIZE[size];
  const atStart = current <= 1;
  const atEnd = current >= total;

  return (
    <nav
      aria-label={ariaLabel}
      className={cn("flex items-center gap-1", className)}
    >
      {showControls && (
        <PaginationControl
          direction="prev"
          size={size}
          disabled={disabled || atStart}
          onClick={() => setPage(current - 1)}
        >
          {prevLabel}
        </PaginationControl>
      )}

      {showPages && (
        <ul className="flex items-center gap-1">
          {items.map((item, index) =>
            item === DOTS ? (
              <li key={`dots-${index}`}>
                <span
                  aria-hidden
                  className={cn(
                    "inline-flex items-center justify-center text-muted-foreground",
                    s.item,
                  )}
                >
                  &hellip;
                </span>
                <span className="sr-only">More pages</span>
              </li>
            ) : (
              <li key={item}>
                <button
                  type="button"
                  aria-label={`Page ${item}`}
                  aria-current={item === current ? "page" : undefined}
                  disabled={disabled}
                  onClick={() => setPage(item)}
                  className={cn(
                    "inline-flex items-center justify-center rounded-full font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
                    "disabled:pointer-events-none disabled:opacity-50",
                    s.item,
                    item === current
                      ? "bg-secondary text-secondary-foreground"
                      : "text-foreground hover:bg-muted",
                  )}
                >
                  {item}
                </button>
              </li>
            ),
          )}
        </ul>
      )}

      {showControls && (
        <PaginationControl
          direction="next"
          size={size}
          disabled={disabled || atEnd}
          onClick={() => setPage(current + 1)}
        >
          {nextLabel}
        </PaginationControl>
      )}
    </nav>
  );
}
Pagination.displayName = "Pagination";

/* -------------------------------------------------------------------------- */
/*                              Prev / Next control                           */
/* -------------------------------------------------------------------------- */

function PaginationControl({
  direction,
  size,
  disabled,
  onClick,
  children,
}: {
  direction: "prev" | "next";
  size: PaginationSize;
  disabled?: boolean;
  onClick?: () => void;
  children: ReactNode;
}) {
  const s = SIZE[size];
  const Icon = direction === "prev" ? CaretLeft : CaretRight;
  const label = direction === "prev" ? "Previous page" : "Next page";
  return (
    <button
      type="button"
      aria-label={label}
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "inline-flex items-center rounded-full font-medium text-muted-foreground transition-colors",
        "hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "disabled:pointer-events-none disabled:opacity-50",
        s.control,
      )}
    >
      {direction === "prev" && <Icon weight="bold" className={s.icon} />}
      {children}
      {direction === "next" && <Icon weight="bold" className={s.icon} />}
    </button>
  );
}
