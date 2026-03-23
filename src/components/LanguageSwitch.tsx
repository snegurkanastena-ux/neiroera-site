"use client";

/**
 * Переключатель RU / EN: правый верхний угол (встраивается в шапку рядом с навигацией).
 */

import { useI18n } from "../providers/SiteProviders";
import type { Lang } from "../lib/messages";

export function LanguageSwitch() {
  const { lang, setLang } = useI18n();

  const btn = (code: Lang, label: string) => (
    <button
      key={code}
      type="button"
      onClick={() => setLang(code)}
      className={`min-w-[2.5rem] rounded-xl px-2.5 py-1.5 text-xs font-bold transition-all duration-300 ${
        lang === code
          ? "bg-accent text-onAccent shadow-glow"
          : "text-text/70 hover:text-text hover:bg-surface/8 border border-transparent"
      }`}
      aria-pressed={lang === code}
    >
      {label}
    </button>
  );

  return (
    <div
      className="flex items-center gap-1 rounded-2xl border border-border/12 bg-bg/50 p-1 backdrop-blur-md"
      role="group"
      aria-label="Язык интерфейса"
    >
      {btn("ru", "RU")}
      {btn("en", "EN")}
    </div>
  );
}
