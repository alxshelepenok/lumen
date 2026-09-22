import { getDefaultColorMode } from "@/utils/get-default-color-mode";

type ThemeMode = "dark" | "light";

interface Theme {
  mode: ThemeMode;
}

const themeStorageKey = "lumen:theme";

const themeColors: Record<ThemeMode, string> = {
  dark: "#1a1a1e",
  light: "#ffffff",
};

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === "dark" || value === "light";

const readStoredTheme = (): Theme | null => {
  try {
    const stored = globalThis.localStorage?.getItem(themeStorageKey);

    if (!stored) {
      return null;
    }

    const parsed: unknown = JSON.parse(stored);

    if (
      typeof parsed === "object" &&
      parsed !== null &&
      isThemeMode((parsed as { mode?: unknown }).mode)
    ) {
      return { mode: (parsed as { mode: ThemeMode }).mode };
    }

    return null;
  } catch {
    return null;
  }
};

const writeStoredTheme = (theme: Theme): void => {
  try {
    globalThis.localStorage?.setItem(themeStorageKey, JSON.stringify(theme));
  } catch {
    return;
  }
};

const getTheme = (): Theme =>
  readStoredTheme() ?? { mode: getDefaultColorMode() };

const applyTheme = (theme: Theme): void => {
  if (typeof document === "undefined") {
    return;
  }

  document.documentElement.className = theme.mode;
};

const toggleTheme = (): Theme => {
  const current = getTheme();
  const next: Theme = { mode: current.mode === "dark" ? "light" : "dark" };

  writeStoredTheme(next);
  applyTheme(next);

  return next;
};

export { applyTheme, getTheme, readStoredTheme, themeColors, themeStorageKey, toggleTheme, writeStoredTheme };
export type { Theme, ThemeMode };
