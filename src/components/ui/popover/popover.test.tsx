import { describe, it, expect } from "vitest";
import { render, screen, fireEvent, waitForElementToBeRemoved } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverTitle,
  PopoverDescription,
  PopoverClose,
} from "./popover";

function Example() {
  return (
    <div>
      <Popover>
        <PopoverTrigger>Details</PopoverTrigger>
        <PopoverContent>
          <PopoverTitle>Heads up</PopoverTitle>
          <PopoverDescription>Some detail.</PopoverDescription>
          <PopoverClose>Close</PopoverClose>
        </PopoverContent>
      </Popover>
      <button type="button">outside</button>
    </div>
  );
}

describe("Popover", () => {
  it("reflects open state on the trigger and toggles the panel", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Details" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    expect(screen.getByRole("dialog").contains(document.activeElement)).toBe(true);
  });

  it("closes on Escape and restores focus to the trigger", async () => {
    const user = userEvent.setup();
    render(<Example />);
    const trigger = screen.getByRole("button", { name: "Details" });
    await user.click(trigger);

    await user.keyboard("{Escape}");
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
    expect(trigger).toHaveFocus();
  });

  it("closes on an outside pointer press", async () => {
    const user = userEvent.setup();
    render(<Example />);
    await user.click(screen.getByRole("button", { name: "Details" }));

    fireEvent.pointerDown(screen.getByRole("button", { name: "outside" }));
    await waitForElementToBeRemoved(() => screen.queryByRole("dialog"));
  });
});
