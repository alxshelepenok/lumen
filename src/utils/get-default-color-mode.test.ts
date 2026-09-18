import { describe, expect, test } from "bun:test";

import { getDefaultColorMode } from "./get-default-color-mode";

const withWindow = (matches: boolean): void => {
  (globalThis as { window?: unknown }).window = {
    matchMedia: () => ({ matches }),
  };
};

const withoutWindow = (): void => {
  delete (globalThis as { window?: unknown }).window;
};

describe("getDefaultColorMode", () => {
  test("successful return color mode", () => {
    withoutWindow();
    expect(getDefaultColorMode()).toBe("light");

    withWindow(true);
    expect(getDefaultColorMode()).toBe("dark");

    withWindow(false);
    expect(getDefaultColorMode()).toBe("light");

    withoutWindow();
  });

  test("successful return default color mode on ssr", () => {
    withoutWindow();
    expect(getDefaultColorMode()).toBe("light");

    withWindow(true);
    expect(getDefaultColorMode()).toBe("dark");

    withoutWindow();
  });
});
