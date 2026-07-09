import { useEffect, type RefObject } from "react";

/** Elements that can receive keyboard focus, in DOM order. */
export const FOCUSABLE_SELECTOR =
  'a[href],button:not([disabled]),textarea:not([disabled]),input:not([disabled]),select:not([disabled]),[tabindex]:not([tabindex="-1"])';

export interface FocusTrapOptions {
  /** Engage the trap. Focus is moved inside on the transition to true. */
  active: boolean;
  /** Wrap Tab/Shift+Tab within the container (modal behaviour). */
  trap?: boolean;
  /** Return focus to the previously focused element on deactivate. */
  restoreFocus?: boolean;
  /** Where to place focus on activate: first focusable, or the container. */
  initialFocus?: "first" | "container";
}

/**
 * Focus management for overlays. On activate it moves focus inside `ref`; while
 * active it can trap Tab within (for modals); on deactivate it restores focus.
 *
 * Restore is skipped when focus has intentionally moved to an element outside
 * the container (for example an outside click), so dismissing a non-modal
 * popover by clicking elsewhere leaves focus where the user clicked instead of
 * snapping back to the trigger. The container should have tabIndex={-1} so it
 * can hold focus when it has no focusable children.
 */
export function useFocusTrap(
  ref: RefObject<HTMLElement | null>,
  { active, trap = true, restoreFocus = true, initialFocus = "first" }: FocusTrapOptions,
): void {
  useEffect(() => {
    if (!active) return;
    const container = ref.current;
    if (!container) return;

    const previouslyFocused = document.activeElement as HTMLElement | null;
    const getFocusable = () =>
      Array.from(container.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTOR));

    if (initialFocus === "first") {
      (getFocusable()[0] ?? container).focus();
    } else {
      container.focus();
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || !trap) return;
      const items = getFocusable();
      if (items.length === 0) {
        event.preventDefault();
        container.focus();
        return;
      }
      const first = items[0];
      const last = items[items.length - 1];
      const activeEl = document.activeElement;
      if (event.shiftKey && (activeEl === first || activeEl === container)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && activeEl === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (!restoreFocus) return;
      const activeEl = document.activeElement;
      const focusMovedOutside =
        activeEl !== null &&
        activeEl !== document.body &&
        !container.contains(activeEl);
      if (!focusMovedOutside) previouslyFocused?.focus?.();
    };
  }, [active, trap, restoreFocus, initialFocus, ref]);
}
