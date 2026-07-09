import { describe, it, expect } from "vitest";
import { mergeProps } from "@/lib/merge-props";

describe("mergeProps", () => {
  it("composes shared event handlers child-first", () => {
    const calls: string[] = [];
    const merged = mergeProps(
      { onClick: () => calls.push("child") },
      { onClick: () => calls.push("own") },
    );
    (merged.onClick as () => void)();
    expect(calls).toEqual(["child", "own"]);
  });

  it("combines className and lets own props override", () => {
    const merged = mergeProps(
      { className: "text-sm", id: "child", role: "button" },
      { className: "text-lg", id: "own" },
    );
    expect(merged.className).toContain("text-lg");
    expect(merged.id).toBe("own");
    expect(merged.role).toBe("button");
  });

  it("shallow-merges style with own winning", () => {
    const merged = mergeProps(
      { style: { color: "red", margin: 0 } },
      { style: { color: "blue" } },
    );
    expect(merged.style).toEqual({ color: "blue", margin: 0 });
  });
});
