import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useControllableState } from "@/lib/use-controllable-state";

describe("useControllableState", () => {
  it("holds its own state when uncontrolled and reports changes", () => {
    const onChange = vi.fn();
    const { result } = renderHook(() =>
      useControllableState({ defaultValue: false, onChange }),
    );

    expect(result.current[0]).toBe(false);
    act(() => result.current[1](true));

    expect(result.current[0]).toBe(true);
    expect(onChange).toHaveBeenCalledWith(true);
  });

  it("ignores internal writes when controlled but still reports them", () => {
    const onChange = vi.fn();
    const { result, rerender } = renderHook(
      ({ value }) => useControllableState({ value, defaultValue: false, onChange }),
      { initialProps: { value: false } },
    );

    act(() => result.current[1](true));
    // Value stays put until the controlling parent passes the new prop.
    expect(result.current[0]).toBe(false);
    expect(onChange).toHaveBeenCalledWith(true);

    rerender({ value: true });
    expect(result.current[0]).toBe(true);
  });
});
