import { type ReactNode } from "react";
import { createPortal } from "react-dom";

export interface PortalProps {
  children: ReactNode;
  /** Target node to render into. Defaults to document.body. */
  container?: Element | null;
}

/**
 * Renders children into `container` (default document.body) so overlays escape
 * parent `overflow`/`transform`/stacking contexts. Renders synchronously on the
 * client and nothing on the server (no `document`), which keeps focus and
 * measurement working in the same commit the panel mounts.
 */
export function Portal({ children, container }: PortalProps) {
  const target =
    container ?? (typeof document !== "undefined" ? document.body : null);
  if (!target) return null;
  return createPortal(children, target);
}
Portal.displayName = "Portal";
