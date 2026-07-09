import { describe, it, expect } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useEnterExit } from "@/lib/use-enter-exit";

describe("useEnterExit", () => {
  it("mounts and becomes visible after opening", async () => {
    const { result } = renderHook(() => useEnterExit(true, 50));
    expect(result.current.mounted).toBe(true);
    await waitFor(() => expect(result.current.visible).toBe(true));
  });

  it("stays mounted through the exit delay, then unmounts", async () => {
    const { result, rerender } = renderHook(({ open }) => useEnterExit(open, 50), {
      initialProps: { open: true },
    });
    await waitFor(() => expect(result.current.visible).toBe(true));

    rerender({ open: false });
    // Still in the tree so the exit transition can play.
    expect(result.current.mounted).toBe(true);
    expect(result.current.visible).toBe(false);

    await waitFor(() => expect(result.current.mounted).toBe(false), { timeout: 500 });
  });
});
