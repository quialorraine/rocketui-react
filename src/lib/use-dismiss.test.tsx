import { describe, it, expect, vi } from "vitest";
import { useRef } from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { useDismiss, type DismissOptions } from "@/lib/use-dismiss";

function Dismissable({ onDismiss, escape, outsidePointer }: Partial<DismissOptions> & { onDismiss: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  useDismiss(ref, { active: true, onDismiss, escape, outsidePointer });
  return (
    <div>
      <div ref={ref}>
        <button type="button">inside</button>
      </div>
      <button type="button">outside</button>
    </div>
  );
}

describe("useDismiss", () => {
  it("dismisses on Escape", () => {
    const onDismiss = vi.fn();
    render(<Dismissable onDismiss={onDismiss} />);
    fireEvent.keyDown(document, { key: "Escape" });
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("dismisses on an outside pointer press but not an inside one", () => {
    const onDismiss = vi.fn();
    render(<Dismissable onDismiss={onDismiss} />);

    fireEvent.pointerDown(screen.getByRole("button", { name: "inside" }));
    expect(onDismiss).not.toHaveBeenCalled();

    fireEvent.pointerDown(screen.getByRole("button", { name: "outside" }));
    expect(onDismiss).toHaveBeenCalledTimes(1);
  });

  it("respects escape:false and outsidePointer:false", () => {
    const onDismiss = vi.fn();
    render(<Dismissable onDismiss={onDismiss} escape={false} outsidePointer={false} />);

    fireEvent.keyDown(document, { key: "Escape" });
    fireEvent.pointerDown(screen.getByRole("button", { name: "outside" }));
    expect(onDismiss).not.toHaveBeenCalled();
  });
});
