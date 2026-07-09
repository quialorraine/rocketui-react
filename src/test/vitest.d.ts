import type { AxeMatchers } from "vitest-axe/matchers";

// vitest-axe ships its matcher augmentation against the legacy `Vi` namespace,
// which Vitest 2 no longer merges. Re-declare it against the `vitest` module,
// the same way @testing-library/jest-dom does.
declare module "vitest" {
  interface Assertion extends AxeMatchers {}
  interface AsymmetricMatchersContaining extends AxeMatchers {}
}
