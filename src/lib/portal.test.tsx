import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Portal } from "@/lib/portal";

describe("Portal", () => {
  it("renders its children into document.body", () => {
    render(
      <div data-testid="host">
        <Portal>
          <span data-testid="teleported">hi</span>
        </Portal>
      </div>,
    );
    const teleported = screen.getByTestId("teleported");
    expect(teleported.parentElement).toBe(document.body);
    expect(screen.getByTestId("host")).not.toContainElement(teleported);
  });
});
