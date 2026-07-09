import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { Button } from "../button";
import { cn } from "@/lib/cn";

/* -------------------------------------------------------------------------- */
/*                                 Date utils                                  */
/* -------------------------------------------------------------------------- */

const isSameDay = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() &&
  a.getMonth() === b.getMonth() &&
  a.getDate() === b.getDate();

const isSameMonth = (a: Date, b: Date) =>
  a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth();

const startOfMonth = (d: Date) => new Date(d.getFullYear(), d.getMonth(), 1);
const addMonths = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth() + n, 1);
const addDays = (d: Date, n: number) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate() + n);
const clampToDay = (d: Date) =>
  new Date(d.getFullYear(), d.getMonth(), d.getDate());

/* -------------------------------------------------------------------------- */
/*                                   Sizing                                    */
/* -------------------------------------------------------------------------- */

type CalendarSize = "sm" | "md" | "lg";

const SIZE: Record<
  CalendarSize,
  { cell: string; text: string; head: string; label: string; gap: string }
> = {
  sm: { cell: "size-9", text: "text-sm", head: "text-[0.6875rem]", label: "text-sm", gap: "gap-0.5" },
  md: { cell: "size-11", text: "text-base", head: "text-xs", label: "text-base", gap: "gap-1" },
  lg: { cell: "size-12", text: "text-lg", head: "text-sm", label: "text-lg", gap: "gap-1" },
};

/* -------------------------------------------------------------------------- */
/*                                    Types                                    */
/* -------------------------------------------------------------------------- */

export interface CalendarProps
  extends Omit<ComponentPropsWithoutRef<"div">, "onChange" | "defaultValue"> {
  /** Selected date (controlled). */
  value?: Date | null;
  /** Selected date for the uncontrolled case. */
  defaultValue?: Date | null;
  /** Fired when a day is picked. */
  onChange?: (date: Date) => void;
  /** Visible month (controlled). */
  month?: Date;
  /** Initial visible month for the uncontrolled case. */
  defaultMonth?: Date;
  /** Fired when the visible month changes. */
  onMonthChange?: (month: Date) => void;
  /** Earliest selectable day (inclusive). */
  minDate?: Date;
  /** Latest selectable day (inclusive). */
  maxDate?: Date;
  /** Disable arbitrary days (holidays, booked slots). */
  isDateDisabled?: (date: Date) => boolean;
  /** First column of the week: 0 = Sunday (default) to 6 = Saturday. */
  weekStartsOn?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
  /** Render days from the adjacent months to fill the grid. */
  showOutsideDays?: boolean;
  /** Locale used for month and weekday names. */
  locale?: string;
  size?: CalendarSize;
  /** Footer content, helper text, or a ButtonGroup of actions. */
  children?: ReactNode;
}

type View = "days" | "months" | "years";

/* -------------------------------------------------------------------------- */
/*                                  Component                                  */
/* -------------------------------------------------------------------------- */

export function Calendar({
  value,
  defaultValue = null,
  onChange,
  month,
  defaultMonth,
  onMonthChange,
  minDate,
  maxDate,
  isDateDisabled,
  weekStartsOn = 0,
  showOutsideDays = true,
  locale,
  size = "md",
  className,
  children,
  ...props
}: CalendarProps) {
  const s = SIZE[size];

  /* -------- selection (controlled / uncontrolled) -------- */
  const [internalValue, setInternalValue] = useState<Date | null>(defaultValue);
  const selected = value !== undefined ? value : internalValue;

  /* -------- visible month (controlled / uncontrolled) -------- */
  const [internalMonth, setInternalMonth] = useState<Date>(
    startOfMonth(defaultMonth ?? selected ?? new Date()),
  );
  const viewMonth = month !== undefined ? startOfMonth(month) : internalMonth;

  const setViewMonth = useCallback(
    (next: Date) => {
      const normalized = startOfMonth(next);
      if (month === undefined) setInternalMonth(normalized);
      onMonthChange?.(normalized);
    },
    [month, onMonthChange],
  );

  /* -------- header view (day grid / month picker / year picker) -------- */
  const [view, setView] = useState<View>("days");

  /* -------- keyboard focus target within the day grid -------- */
  const [focusedDate, setFocusedDate] = useState<Date>(
    selected && isSameMonth(selected, viewMonth)
      ? clampToDay(selected)
      : startOfMonth(viewMonth),
  );
  const gridRef = useRef<HTMLDivElement>(null);
  const shouldFocusRef = useRef(false);

  useEffect(() => {
    if (!shouldFocusRef.current) return;
    shouldFocusRef.current = false;
    const el = gridRef.current?.querySelector<HTMLButtonElement>(
      `[data-day="${focusedDate.toDateString()}"]`,
    );
    el?.focus();
  }, [focusedDate]);

  const today = useMemo(() => clampToDay(new Date()), []);

  const isDisabled = useCallback(
    (date: Date) => {
      if (minDate && clampToDay(date) < clampToDay(minDate)) return true;
      if (maxDate && clampToDay(date) > clampToDay(maxDate)) return true;
      return isDateDisabled?.(date) ?? false;
    },
    [minDate, maxDate, isDateDisabled],
  );

  /* -------- localized names -------- */
  const weekdayNames = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(locale, { weekday: "short" });
    // 2023-01-01 is a Sunday, a stable anchor for weekday labels.
    return Array.from({ length: 7 }, (_, i) =>
      fmt.format(new Date(2023, 0, 1 + ((i + weekStartsOn) % 7))),
    );
  }, [locale, weekStartsOn]);

  const monthLabel = useMemo(
    () =>
      new Intl.DateTimeFormat(locale, {
        month: "long",
        year: "numeric",
      }).format(viewMonth),
    [locale, viewMonth],
  );

  /* -------- weeks matrix -------- */
  const weeks = useMemo(() => {
    const first = startOfMonth(viewMonth);
    const lead = (first.getDay() - weekStartsOn + 7) % 7;
    const gridStart = addDays(first, -lead);
    const daysInMonth = new Date(
      viewMonth.getFullYear(),
      viewMonth.getMonth() + 1,
      0,
    ).getDate();
    const weekCount = Math.ceil((lead + daysInMonth) / 7);
    return Array.from({ length: weekCount }, (_, w) =>
      Array.from({ length: 7 }, (_, d) => addDays(gridStart, w * 7 + d)),
    );
  }, [viewMonth, weekStartsOn]);

  /* -------- handlers -------- */
  const selectDay = useCallback(
    (date: Date) => {
      if (isDisabled(date)) return;
      const day = clampToDay(date);
      if (value === undefined) setInternalValue(day);
      onChange?.(day);
      if (!isSameMonth(day, viewMonth)) setViewMonth(day);
      setFocusedDate(day);
    },
    [isDisabled, value, onChange, viewMonth, setViewMonth],
  );

  const moveFocus = useCallback(
    (next: Date) => {
      shouldFocusRef.current = true;
      setFocusedDate(clampToDay(next));
      if (!isSameMonth(next, viewMonth)) setViewMonth(next);
    },
    [viewMonth, setViewMonth],
  );

  const onGridKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      const map: Record<string, () => Date> = {
        ArrowLeft: () => addDays(focusedDate, -1),
        ArrowRight: () => addDays(focusedDate, 1),
        ArrowUp: () => addDays(focusedDate, -7),
        ArrowDown: () => addDays(focusedDate, 7),
        Home: () => addDays(focusedDate, -((focusedDate.getDay() - weekStartsOn + 7) % 7)),
        End: () => addDays(focusedDate, 6 - ((focusedDate.getDay() - weekStartsOn + 7) % 7)),
        PageUp: () => addMonths(focusedDate, -1),
        PageDown: () => addMonths(focusedDate, 1),
      };
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        selectDay(focusedDate);
        return;
      }
      const compute = map[e.key];
      if (!compute) return;
      e.preventDefault();
      const next = compute();
      // PageUp/Down keep the day-of-month; clamp to a valid day of focus col.
      moveFocus(next);
    },
    [focusedDate, weekStartsOn, selectDay, moveFocus],
  );

  /* -------- header navigation depends on active view -------- */
  const stepHeader = (dir: 1 | -1) => {
    if (view === "days") setViewMonth(addMonths(viewMonth, dir));
    else if (view === "months")
      setViewMonth(new Date(viewMonth.getFullYear() + dir, viewMonth.getMonth(), 1));
    else setViewMonth(new Date(viewMonth.getFullYear() + dir * 12, viewMonth.getMonth(), 1));
  };

  const headerLabel =
    view === "days"
      ? monthLabel
      : view === "months"
        ? String(viewMonth.getFullYear())
        : `${viewMonth.getFullYear() - 4} to ${viewMonth.getFullYear() + 7}`;

  return (
    <div
      className={cn(
        "inline-flex w-fit flex-col gap-3 rounded-3xl border bg-card p-5 text-card-foreground",
        className,
      )}
      {...props}
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          onClick={() =>
            setView((v) => (v === "days" ? "months" : v === "months" ? "years" : "days"))
          }
          className={cn(
            "rounded-md px-1 font-medium tracking-tight outline-none transition-colors hover:text-primary focus-visible:ring-2 focus-visible:ring-ring",
            s.label,
          )}
          aria-live="polite"
        >
          {headerLabel}
        </button>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            iconOnly
            aria-label="Previous"
            onClick={() => stepHeader(-1)}
          >
            <CaretLeft weight="bold" />
          </Button>
          <Button
            variant="ghost"
            color="primary"
            size="sm"
            iconOnly
            aria-label="Next"
            onClick={() => stepHeader(1)}
          >
            <CaretRight weight="bold" />
          </Button>
        </div>
      </div>

      {/* Day grid */}
      {view === "days" && (
        <div>
          <div className={cn("grid grid-cols-7", s.gap)}>
            {weekdayNames.map((name) => (
              <div
                key={name}
                className={cn(
                  "flex items-center justify-center font-medium text-muted-foreground uppercase",
                  s.cell,
                  s.head,
                )}
                aria-hidden="true"
              >
                {name}
              </div>
            ))}
          </div>

          <div
            ref={gridRef}
            role="grid"
            aria-label={monthLabel}
            onKeyDown={onGridKeyDown}
            className={cn("mt-1 grid grid-cols-7", s.gap)}
          >
            {weeks.flat().map((date) => {
              const outside = !isSameMonth(date, viewMonth);
              if (outside && !showOutsideDays) {
                return <div key={date.toDateString()} className={s.cell} role="presentation" />;
              }
              const disabled = isDisabled(date);
              const isSelected = selected != null && isSameDay(date, selected);
              const isToday = isSameDay(date, today);
              const isFocusTarget = isSameDay(date, focusedDate);
              return (
                <button
                  key={date.toDateString()}
                  type="button"
                  role="gridcell"
                  data-day={date.toDateString()}
                  aria-selected={isSelected}
                  aria-current={isToday ? "date" : undefined}
                  aria-disabled={disabled || undefined}
                  disabled={disabled}
                  tabIndex={isFocusTarget ? 0 : -1}
                  onClick={() => selectDay(date)}
                  className={cn(
                    "flex items-center justify-center rounded-full font-normal outline-none transition-colors",
                    "focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-card",
                    s.cell,
                    s.text,
                    !disabled && !isSelected && "hover:bg-muted",
                    isSelected && "bg-primary/15 font-semibold text-primary hover:bg-primary/25",
                    !isSelected && isToday && "font-semibold text-primary",
                    !isSelected && outside && "text-muted-foreground/50",
                    disabled && "text-muted-foreground/40 line-through pointer-events-none",
                  )}
                >
                  {date.getDate()}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Month picker */}
      {view === "months" && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }, (_, m) => {
            const isCurrent = m === viewMonth.getMonth();
            const name = new Intl.DateTimeFormat(locale, { month: "short" }).format(
              new Date(viewMonth.getFullYear(), m, 1),
            );
            return (
              <button
                key={m}
                type="button"
                onClick={() => {
                  setViewMonth(new Date(viewMonth.getFullYear(), m, 1));
                  setView("days");
                }}
                className={cn(
                  "flex h-11 items-center justify-center rounded-xl text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  isCurrent ? "bg-primary/15 text-primary" : "hover:bg-muted",
                )}
              >
                {name}
              </button>
            );
          })}
        </div>
      )}

      {/* Year picker */}
      {view === "years" && (
        <div className="grid grid-cols-3 gap-1">
          {Array.from({ length: 12 }, (_, i) => {
            const year = viewMonth.getFullYear() - 4 + i;
            const isCurrent = year === viewMonth.getFullYear();
            return (
              <button
                key={year}
                type="button"
                onClick={() => {
                  setViewMonth(new Date(year, viewMonth.getMonth(), 1));
                  setView("months");
                }}
                className={cn(
                  "flex h-11 items-center justify-center rounded-xl text-sm font-medium outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring",
                  isCurrent ? "bg-primary/15 text-primary" : "hover:bg-muted",
                )}
              >
                {year}
              </button>
            );
          })}
        </div>
      )}

      {children && (
        <div className="border-t border-border pt-3 text-sm text-muted-foreground">
          {children}
        </div>
      )}
    </div>
  );
}
Calendar.displayName = "Calendar";
