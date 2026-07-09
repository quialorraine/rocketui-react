import { useEffect, type RefObject } from "react";

export interface DismissOptions {
  /** Listen for dismissal only while true. */
  active: boolean;
  /** Called when the user asks to dismiss (Escape or outside pointer). */
  onDismiss: () => void;
  /** Dismiss on the Escape key. */
  escape?: boolean;
  /** Dismiss on a pointer press outside `ref`. */
  outsidePointer?: boolean;
}

/**
 * Close-on-Escape and close-on-outside-press for overlays. `ref` is the region
 * treated as "inside" (a press within it never dismisses). Escape stops
 * propagation so nested overlays close one layer at a time.
 */
export function useDismiss(
  ref: RefObject<HTMLElement | null>,
  { active, onDismiss, escape = true, outsidePointer = true }: DismissOptions,
): void {
  useEffect(() => {
    if (!active) return;

    const onPointerDown = (event: PointerEvent) => {
      if (!ref.current?.contains(event.target as Node)) onDismiss();
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (escape && event.key === "Escape") {
        event.stopPropagation();
        onDismiss();
      }
    };

    if (outsidePointer) document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [active, onDismiss, escape, outsidePointer, ref]);
}
