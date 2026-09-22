import { beforeEach, describe, expect, it } from "bun:test";

import { localStorageMock } from "@/mocks";

import {
  getTheme,
  readStoredTheme,
  themeStorageKey,
  toggleTheme,
  writeStoredTheme,
} from "@/utils/theme";

const storage = localStorageMock() as Storage;

globalThis.localStorage = storage;

describe("theme", () => {
  beforeEach(() => {
    storage.clear();
    delete (globalThis as { window?: unknown }).window;
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
    expect(storage.getItem(themeStorageKey)).toBe(`{"mode":"dark"}`);
  });

  it("tolerates malformed stored values", () => {
    storage.setItem(themeStorageKey, "not json");

    expect(readStoredTheme()).toBeNull();
  });

  it("rejects stored values with an unknown mode", () => {
    storage.setItem(themeStorageKey, `{"mode":"blue"}`);

    expect(readStoredTheme()).toBeNull();
  });

  it("falls back to the default mode", () => {
    expect(getTheme().mode).toBe("light");
  });

  it("toggles the mode and persists it", () => {
    const next = toggleTheme();

    expect(next.mode).toBe("dark");
    expect(readStoredTheme()).toEqual({ mode: "dark" });
    expect(toggleTheme().mode).toBe("light");
  });
});
