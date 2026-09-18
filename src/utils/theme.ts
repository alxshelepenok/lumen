import { getDefaultColorMode } from "@/utils/get-default-color-mode";

type ThemeMode = "dark" | "light";

interface Theme {
  mode: ThemeMode;
}

const themeStorageKey = "diesel:theme-atom";

const isThemeMode = (value: unknown): value is ThemeMode =>
  value === "dark" || value === "light";

const readStoredTheme = (): Theme | null => {
  try {
    const stored = window.localStorage.getItem(themeStorageKey);

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
    window.localStorage.setItem(themeStorageKey, JSON.stringify(theme));
  } catch {
    // storage can be unavailable (private mode); the media query fallback still applies
  }
};

const getTheme = (): Theme =>
  readStoredTheme() ?? { mode: getDefaultColorMode() };

const applyTheme = (theme: Theme): void => {
  document.documentElement.className = theme.mode;
};

const toggleTheme = (): Theme => {
  const current = getTheme();
  const next: Theme = { mode: current.mode === "dark" ? "light" : "dark" };

  writeStoredTheme(next);
  applyTheme(next);

  return next;
};

export { applyTheme, getTheme, readStoredTheme, themeStorageKey, toggleTheme, writeStoredTheme };
export type { Theme, ThemeMode };
