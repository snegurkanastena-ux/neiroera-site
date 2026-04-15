"use client";

/**
 * Шапка: компактная навигация, переключатель языка (RU/EN), CTA «Оплата» и Telegram.
 */

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";
import { Container } from "./Container";
import { LanguageSwitch } from "./LanguageSwitch";

/** Якоря главной — через `/#…`, чтобы работало со всех страниц */
const NAV_HASH = [
  { labelKey: "nav.about", href: "/#about" },
  { labelKey: "nav.services", href: "/#services" },
  { labelKey: "nav.cases", href: "/#cases" },
  { labelKey: "nav.reviews", href: "/#reviews" }
] as const;

const menuList = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.055, delayChildren: 0.02 }
  }
};

const menuItem = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as const } }
};

const navLinkClass =
  "rounded-xl px-2.5 py-2 text-sm text-text/78 transition-colors duration-300 hover:bg-surface/[0.07] hover:text-text xl:px-3";

export default function Header() {
  const [open, setOpen] = useState(false);
  const [dense, setDense] = useState(false);
  const { t } = useI18n();
  const telegramHref = useMemo(() => siteLinks.telegramBot, []);

  useEffect(() => {
    const onScroll = () => setDense(window.scrollY > 14);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const closeMenu = () => setOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-2xl backdrop-saturate-150 transition-[background-color,box-shadow,border-color] duration-300 supports-[backdrop-filter]:backdrop-blur-2xl ${
        dense
          ? "border-border/14 bg-bg/[0.92] shadow-[0_12px_40px_rgb(0_0_0/0.28)] supports-[backdrop-filter]:bg-bg/[0.82]"
          : "border-border/10 bg-bg/[0.82] supports-[backdrop-filter]:bg-bg/[0.62]"
      }`}
    >
      <Container className={`flex items-center justify-between transition-[padding] duration-300 ${dense ? "py-2" : "py-3"}`}>
        <Link href="/" className="group inline-flex shrink-0 items-center gap-2.5" onClick={closeMenu}>
          <span className="relative grid h-9 w-9 place-items-center overflow-hidden rounded-2xl border border-accent/40 bg-gradient-to-br from-accent/20 to-accent2/15 shadow-glow">
            <span className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" aria-hidden>
              <span className="absolute inset-0 bg-gradient-to-tr from-accent/25 to-transparent" />
            </span>
            <span className="font-display relative text-xs font-bold tracking-tight text-accent">AI</span>
          </span>
          <span className="hidden sm:block">
            <span className="block text-sm font-semibold leading-3 tracking-tight">{t("footer.tag")}</span>
            <span className="block text-xs leading-3 text-text/65">{t("footer.name")}</span>
          </span>
        </Link>

        <nav
          className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 lg:flex xl:gap-1"
          aria-label={t("nav.ariaLabel")}
        >
          {NAV_HASH.map((item) => (
            <a key={item.href} href={item.href} className={navLinkClass}>
              {t(item.labelKey)}
            </a>
          ))}
          <Link href="/contacts" className={navLinkClass}>
            {t("nav.contacts")}
          </Link>
          <div className="ml-1 flex shrink-0 items-center gap-1.5 pl-1 xl:ml-2 xl:gap-2">
            <Button href="/payment" variant="primary" className="!px-3 !py-2 text-sm">
              {t("nav.payment")}
            </Button>
            <LanguageSwitch />
            <Button href={telegramHref} variant="primary" className="!px-3.5 !py-2 text-sm" target="_blank" rel="noopener noreferrer">
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
              <motion.div className="flex flex-col gap-2" initial="hidden" animate="show" variants={menuList}>
                {NAV_HASH.map((item) => (
                  <motion.a
                    key={item.href}
                    variants={menuItem}
                    href={item.href}
                    onClick={closeMenu}
                    className="rounded-2xl border border-border/12 bg-transparent px-4 py-3 text-sm transition-colors duration-300 hover:bg-surface/8"
                  >
                    {t(item.labelKey)}
                  </motion.a>
                ))}
                <motion.div variants={menuItem}>
                  <Link
                    href="/contacts"
                    onClick={closeMenu}
                    className="block rounded-2xl border border-border/12 bg-transparent px-4 py-3 text-sm transition-colors duration-300 hover:bg-surface/8"
                  >
                    {t("nav.contacts")}
                  </Link>
                </motion.div>
                <motion.div variants={menuItem}>
                  <Button href="/payment" variant="primary" className="w-full" onClick={closeMenu}>
                    {t("nav.payment")}
                  </Button>
                </motion.div>
                <motion.div variants={menuItem} className="pt-1">
                  <Button
                    href={telegramHref}
                    variant="primary"
                    className="w-full"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={closeMenu}
                  >
                    {t("nav.toTelegram")}
                  </Button>
                </motion.div>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
