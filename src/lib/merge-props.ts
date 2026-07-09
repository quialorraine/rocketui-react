import { cn } from "@/lib/cn";

type UnknownProps = Record<string, unknown>;

const isEventHandler = (key: string, value: unknown): value is (...args: unknown[]) => void =>
  typeof value === "function" && /^on[A-Z]/.test(key);

/**
 * Merge own props onto a child element's props for the `asChild` pattern.
 *
 * - Event handlers present on both are composed: the child's runs first, then
 *   ours, so the child can call preventDefault to opt out of our behaviour.
 * - `className` values are combined with `cn` (ours wins on conflicts).
 * - `style` objects are shallow-merged (ours wins).
 * - Any other own prop overrides the child's.
 *
 * Replaces the bespoke cloneElement/onClick-merging blocks the overlay
 * triggers and close buttons each carried.
 */
export function mergeProps(childProps: UnknownProps, ownProps: UnknownProps): UnknownProps {
  const merged: UnknownProps = { ...childProps, ...ownProps };

  for (const key of Object.keys(ownProps)) {
    const ownValue = ownProps[key];
    const childValue = childProps[key];
    if (isEventHandler(key, ownValue) && isEventHandler(key, childValue)) {
      merged[key] = (...args: unknown[]) => {
        childValue(...args);
        ownValue(...args);
      };
    }
  }

  if (childProps.className || ownProps.className) {
    merged.className = cn(childProps.className as string, ownProps.className as string);
  }
  if (childProps.style || ownProps.style) {
    merged.style = {
      ...(childProps.style as object),
      ...(ownProps.style as object),
    };
  }

  return merged;
}
