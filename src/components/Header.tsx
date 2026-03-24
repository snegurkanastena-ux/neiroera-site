"use client";

/**
 * Шапка: навигация (якоря), переключатель языка (RU/EN), CTA в Telegram.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";
import { Container } from "./Container";
import { LanguageSwitch } from "./LanguageSwitch";

const NAV_KEYS = [
  { labelKey: "nav.about", href: "#about" },
  { labelKey: "nav.portfolio", href: "#portfolio" },
  { labelKey: "nav.services", href: "#services" },
  { labelKey: "nav.calculator", href: "#calculator" },
  { labelKey: "nav.audience", href: "#audience" },
  { labelKey: "nav.cases", href: "#cases" },
  { labelKey: "nav.process", href: "#process" },
  { labelKey: "nav.reviews", href: "#reviews" },
  { labelKey: "nav.socials", href: "#socials" }
] as const;

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18n();
  const telegramHref = useMemo(() => siteLinks.telegramChannel, []);

  return (
    <header className="sticky top-0 z-50 border-b border-border/8 bg-bg/75 backdrop-blur-xl transition-colors duration-300">
      <Container className="flex items-center justify-between py-3">
        <a href="#top" className="group inline-flex items-center gap-2">
          <span className="grid h-9 w-9 place-items-center rounded-2xl border border-accent/35 bg-accent/15 shadow-glow">
            <span className="text-sm font-black text-accent">AI</span>
          </span>
          <span className="hidden sm:block">
            <span className="block font-semibold leading-3">{t("footer.tag")}</span>
            <span className="block text-xs leading-3 text-text/70">{t("footer.name")}</span>
          </span>
        </a>

        <nav className="hidden items-center gap-1 lg:flex">
          {NAV_KEYS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-xl px-3 py-2 text-sm text-text/80 transition-colors duration-300 hover:bg-surface/8 hover:text-text"
            >
              {t(item.labelKey)}
            </a>
          ))}
          <div className="ml-2 flex items-center gap-2">
            <LanguageSwitch />
            <Button href={telegramHref} variant="primary" className="!px-4" target="_blank" rel="noopener noreferrer">
              {t("nav.toTelegram")}
            </Button>
          </div>
        </nav>

        <div className="flex items-center gap-2 lg:hidden">
          <LanguageSwitch />
          <Button href={telegramHref} variant="ghost" className="!px-3 !py-2" target="_blank" rel="noopener noreferrer">
            TG
          </Button>

          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 bg-transparent transition-colors duration-300 hover:bg-surface/8"
            aria-label={t("nav.openMenu")}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="relative block h-4 w-5">
              <span className={`absolute left-0 right-0 top-0 h-0.5 rounded bg-text ${open ? "opacity-0" : "opacity-100"}`} />
              <span
                className={`absolute left-0 right-0 top-2 h-0.5 rounded bg-text transition-transform ${open ? "top-2 rotate-45" : "rotate-0"}`}
              />
              <span
                className={`absolute left-0 right-0 top-2.5 h-0.5 rounded bg-text transition-transform ${open ? "top-2 -rotate-45" : "rotate-0"}`}
              />
            </span>
          </button>
        </div>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/8 lg:hidden"
          >
            <Container className="py-3">
              <div className="flex flex-col gap-2">
                {NAV_KEYS.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-2xl border border-border/12 bg-transparent px-4 py-3 text-sm transition-colors duration-300 hover:bg-surface/8"
                  >
                    {t(item.labelKey)}
                  </a>
                ))}
                <Button
                  href={telegramHref}
                  variant="primary"
                  className="w-full"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setOpen(false)}
                >
                  {t("hero.ctaTg")}
                </Button>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
