import { useSyncExternalStore } from "react";
import type { Locale } from "@/lib/i18n";

export type Theme = "light" | "dark";

const defaultLocale: Locale = "es";

function resolveLocale(value?: string | null): Locale {
  const tag = (value ?? "").toLowerCase().slice(0, 2);
  if (tag === "ca" || tag === "en" || tag === "es") return tag;
  return defaultLocale;
}

type Preferences = {
  locale: Locale;
  theme: Theme;
};

const LOCALE_KEY = "clo-locale";
const THEME_KEY = "clo-theme";

function readStored(): Preferences {
  if (typeof window === "undefined") {
    return { locale: defaultLocale, theme: "light" };
  }
  let locale: Locale = defaultLocale;
  let theme: Theme = "light";
  try {
    locale = resolveLocale(window.localStorage.getItem(LOCALE_KEY));
    theme = window.localStorage.getItem(THEME_KEY) === "dark" ? "dark" : "light";
  } catch {
    // storage unavailable — keep defaults
  }
  return { locale, theme };
}

let current: Preferences = readStored();
const listeners = new Set<() => void>();

function apply(prefs: Preferences) {
  if (typeof document === "undefined") return;
  document.documentElement.lang = prefs.locale;
  document.documentElement.classList.toggle("dark", prefs.theme === "dark");
  document.documentElement.style.colorScheme = prefs.theme;
}

function emit() {
  apply(current);
  listeners.forEach((listener) => listener());
}

export function setLocale(locale: Locale) {
  current = { ...current, locale };
  try {
    window.localStorage.setItem(LOCALE_KEY, locale);
  } catch {
    // ignore
  }
  emit();
}

export function setTheme(theme: Theme) {
  current = { ...current, theme };
  try {
    window.localStorage.setItem(THEME_KEY, theme);
  } catch {
    // ignore
  }
  emit();
}

export function toggleTheme() {
  setTheme(current.theme === "dark" ? "light" : "dark");
}

/** Applies stored preferences once on app boot (client only). */
export function initPreferences() {
  current = readStored();
  apply(current);
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

export function usePreferences(): Preferences {
  return useSyncExternalStore(subscribe, () => current, () => current);
}
