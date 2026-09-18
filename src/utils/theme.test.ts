import { beforeEach, describe, expect, it } from "bun:test";

import {
  getTheme,
  readStoredTheme,
  themeStorageKey,
  toggleTheme,
  writeStoredTheme,
} from "@/utils/theme";

describe("theme", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("uses the lumen storage key", () => {
    expect(themeStorageKey).toBe("lumen:theme");
  });

  it("returns null when nothing is stored", () => {
    expect(readStoredTheme()).toBeNull();
  });

  it("round trips a stored theme", () => {
    writeStoredTheme({ mode: "dark" });

    expect(readStoredTheme()).toEqual({ mode: "dark" });
    expect(window.localStorage.getItem(themeStorageKey)).toBe(
      `{"mode":"dark"}`
    );
  });

  it("tolerates malformed stored values", () => {
    window.localStorage.setItem(themeStorageKey, "not json");

    expect(readStoredTheme()).toBeNull();
  });

  it("rejects stored values with an unknown mode", () => {
    window.localStorage.setItem(themeStorageKey, `{"mode":"blue"}`);

    expect(readStoredTheme()).toBeNull();
  });

  it("falls back to the default mode", () => {
    expect(getTheme().mode).toBe("light");
  });

  it("toggles the mode, persists it and mirrors it on html", () => {
    const next = toggleTheme();

    expect(next.mode).toBe("dark");
    expect(readStoredTheme()).toEqual({ mode: "dark" });
    expect(document.documentElement.className).toBe("dark");

    expect(toggleTheme().mode).toBe("light");
    expect(document.documentElement.className).toBe("light");
  });
});
