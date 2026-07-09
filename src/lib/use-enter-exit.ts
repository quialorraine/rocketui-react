import { useEffect, useState } from "react";

export interface EnterExitState {
  /** Keep the element in the tree (true through the exit animation). */
  mounted: boolean;
  /** Drive the visible/hidden classes (false on the first enter frame). */
  visible: boolean;
}

/**
 * Mount/enter/exit lifecycle without keyframes. On open the element mounts and
 * flips to visible on the next frame (enter transition plays); on close it goes
 * hidden and unmounts after `duration` ms (exit transition plays).
 *
 * Shared by every animated overlay so the timing is defined in one place.
 */
export function useEnterExit(open: boolean, duration = 150): EnterExitState {
  const [mounted, setMounted] = useState(open);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (open) {
      setMounted(true);
      const frame = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(frame);
    }
    setVisible(false);
    const timer = window.setTimeout(() => setMounted(false), duration);
    return () => window.clearTimeout(timer);
  }, [open, duration]);

  return { mounted, visible };
}
