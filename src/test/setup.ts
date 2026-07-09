import "@testing-library/jest-dom/vitest";
import * as axeMatchers from "vitest-axe/matchers";
import { expect } from "vitest";

// jest-dom adds DOM assertions (toBeInTheDocument, toHaveFocus, ...). vitest-axe
// ships its matchers separately: `extend-expect` is types-only, so register the
// runtime matchers (toHaveNoViolations) explicitly.
expect.extend(axeMatchers);
