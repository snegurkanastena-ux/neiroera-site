"use client";

/**
 * Провайдеры сайта: тема (data-theme + localStorage) и язык (document.lang + localStorage).
 * Логика разделена по смыслу — отдельные контексты, общая обёртка для layout.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode
} from "react";
import { messagesByLang, translate, type Lang, type Messages } from "../lib/messages";

const THEME_STORAGE = "neuroera-theme";
const LANG_STORAGE = "neuroera-lang";

export type ThemeMode = "dark" | "light";

type ThemeCtx = {
  theme: ThemeMode;
  setTheme: (t: ThemeMode) => void;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeCtx | null>(null);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_STORAGE) as ThemeMode | null;
      if (stored === "light" || stored === "dark") {
        setThemeState(stored);
      }
    } catch {
      /* localStorage недоступен — остаётся тёмная тема по умолчанию */
    }
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute("data-theme", theme);
    try {
      localStorage.setItem(THEME_STORAGE, theme);
    } catch {
      /* ignore */
    }
  }, [theme, mounted]);

  const setTheme = useCallback((t: ThemeMode) => setThemeState(t), []);
  const toggleTheme = useCallback(() => setThemeState((x) => (x === "dark" ? "light" : "dark")), []);

  const value = useMemo(() => ({ theme, setTheme, toggleTheme }), [theme, setTheme, toggleTheme]);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  const c = useContext(ThemeContext);
  if (!c) throw new Error("useTheme needs ThemeProvider");
  return c;
}

type I18nCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  messages: Messages;
};

const I18nContext = createContext<I18nCtx | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("ru");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(LANG_STORAGE) as Lang | null;
      if (stored === "en" || stored === "ru") {
        setLangState(stored);
      }
    } catch {
      /* ignore */
    }
    setMounted(true);
  }, []);

  const messages = messagesByLang[lang];

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.lang = lang === "ru" ? "ru" : "en";
    document.title = messages.meta.title;
    try {
      localStorage.setItem(LANG_STORAGE, lang);
    } catch {
      /* ignore */
    }
  }, [lang, mounted, messages.meta.title]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);

  const t = useCallback((key: string) => translate(messages, key), [messages]);

  const value = useMemo(() => ({ lang, setLang, t, messages }), [lang, setLang, t, messages]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const c = useContext(I18nContext);
  if (!c) throw new Error("useI18n needs I18nProvider");
  return c;
}

export function SiteProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  );
}
