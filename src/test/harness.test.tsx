import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { axe } from "vitest-axe";

// Confirms the harness wiring: render, jest-dom matchers, and axe are all live.
describe("test harness", () => {
  it("renders and exposes jest-dom matchers", () => {
    render(<button type="button">Go</button>);
    expect(screen.getByRole("button", { name: "Go" })).toBeInTheDocument();
  });

  it("runs axe with no violations on accessible markup", async () => {
    const { container } = render(
      <main>
        <h1>Title</h1>
        <button type="button">Action</button>
      </main>,
    );
    expect(await axe(container)).toHaveNoViolations();
  });
});
