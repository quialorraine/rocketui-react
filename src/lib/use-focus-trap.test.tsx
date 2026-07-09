import { describe, it, expect } from "vitest";
import { useRef } from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFocusTrap, type FocusTrapOptions } from "@/lib/use-focus-trap";

function Trapped(opts: Omit<FocusTrapOptions, "active"> & { active: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  useFocusTrap(ref, opts);
  return (
    <div ref={ref} tabIndex={-1} data-testid="panel">
      <button type="button">first</button>
      <button type="button">last</button>
    </div>
  );
}

describe("useFocusTrap", () => {
  it("moves focus to the first focusable when activated", () => {
    render(<Trapped active />);
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();
  });

  it("wraps Tab and Shift+Tab within the container", async () => {
    const user = userEvent.setup();
    render(<Trapped active />);
    const first = screen.getByRole("button", { name: "first" });
    const last = screen.getByRole("button", { name: "last" });

    last.focus();
    await user.tab();
    expect(first).toHaveFocus();

    await user.tab({ shift: true });
    expect(last).toHaveFocus();
  });

  it("restores focus to the previously focused element on deactivate", () => {
    const outside = document.createElement("button");
    document.body.appendChild(outside);
    outside.focus();

    const { rerender } = render(<Trapped active />);
    expect(screen.getByRole("button", { name: "first" })).toHaveFocus();

    rerender(<Trapped active={false} />);
    expect(outside).toHaveFocus();
    outside.remove();
  });

  it("does not restore when focus intentionally moved outside", () => {
    const start = document.createElement("button");
    const elsewhere = document.createElement("button");
    document.body.append(start, elsewhere);
    start.focus();

    const { rerender } = render(<Trapped active />);
    elsewhere.focus();

    rerender(<Trapped active={false} />);
    expect(elsewhere).toHaveFocus();
    start.remove();
    elsewhere.remove();
  });
});
