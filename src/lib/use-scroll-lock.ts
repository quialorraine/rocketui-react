import { useEffect } from "react";

/**
 * Freezes background scroll while `active` (modal dialogs, drawers). Restores
 * the previous `overflow` on the document body when released, and is safe to
 * stack because each activation captures and restores its own prior value.
 */
export function useScrollLock(active: boolean): void {
  useEffect(() => {
    if (!active) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [active]);
}
