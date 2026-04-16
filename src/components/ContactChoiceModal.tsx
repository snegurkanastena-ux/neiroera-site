"use client";

/**
 * Выбор канала связи перед открытием внешнего приложения (без mailto с первого клика по основной CTA).
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";

export function ContactChoiceModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          role="presentation"
        >
          <button
            type="button"
            className="absolute inset-0 bg-black/70 backdrop-blur-[2px]"
            aria-label={t("contactChoice.close")}
            onClick={onClose}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-choice-heading"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-md rounded-3xl border border-border/20 bg-bg/[0.94] p-6 shadow-[0_24px_80px_rgb(0_0_0/0.55)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="contact-choice-heading" className="font-display text-lg font-bold tracking-tight text-text sm:text-xl">
              {t("contactChoice.title")}
            </h2>
            <div className="mt-6 flex flex-col gap-3">
              <a
                href={siteLinks.telegramBot}
                target="_blank"
                rel="noopener noreferrer"
                onClick={onClose}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/18 bg-gradient-to-br from-accent via-accent to-accent2/95 px-5 py-3 text-base font-semibold text-onAccent shadow-glow transition hover:brightness-[1.06] focus:outline-none focus:ring-2 focus:ring-accent/45"
              >
                {t("contactChoice.telegram")}
              </a>
              <a
                href={siteLinks.email}
                onClick={onClose}
                className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-border/18 bg-bg/[0.35] px-5 py-3 text-base font-semibold text-text shadow-[0_0_22px_rgba(0,255,200,0.12)] transition hover:border-accent/35 hover:bg-surface/10 focus:outline-none focus:ring-2 focus:ring-accent/35"
              >
                {t("contactChoice.email")}
              </a>
            </div>
            <button
              type="button"
              onClick={onClose}
              className="mt-5 w-full rounded-xl py-2.5 text-sm font-medium text-text/65 transition hover:text-text"
            >
              {t("contactChoice.close")}
            </button>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
