"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect } from "react";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

type Tariff = {
  id: string;
  name: string;
  price: string;
  detailTitle: string;
  detailBody: string;
};

type EducationTariffDetailModalProps = {
  open: boolean;
  onClose: () => void;
  onRequestQuote: () => void;
  tariff: Tariff | null;
  bonusesBlockTitle: string;
  bonusesBlockBody: string;
  ctaRequest: string;
};

export function EducationTariffDetailModal({
  open,
  onClose,
  onRequestQuote,
  tariff,
  bonusesBlockTitle,
  bonusesBlockBody,
  ctaRequest
}: EducationTariffDetailModalProps) {
  const { t } = useI18n();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && tariff ? (
        <motion.div
          className="fixed inset-0 z-[190] flex items-center justify-center p-4 sm:p-6"
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
            aria-labelledby="education-tariff-detail-title"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[min(88vh,720px)] w-full max-w-2xl overflow-y-auto rounded-3xl border border-border/20 bg-bg/[0.94] p-6 shadow-[0_24px_80px_rgb(0_0_0/0.55)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-text/55">{tariff.name}</p>
            <h2
              id="education-tariff-detail-title"
              className="font-display mt-2 text-lg font-bold leading-snug text-text sm:text-xl"
            >
              {tariff.detailTitle}
            </h2>
            <p className="mt-1 text-2xl font-black tabular-nums tracking-tight text-accent sm:text-3xl">{tariff.price}</p>

            <div className="mt-6 space-y-4">
              <p className="whitespace-pre-line text-sm leading-relaxed text-text/88 sm:text-base">{tariff.detailBody}</p>

              <div className="rounded-2xl border border-border/12 bg-bg/30 p-4 sm:p-5">
                <h3 className="text-sm font-bold text-text/95 sm:text-base">{bonusesBlockTitle}</h3>
                <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-text/80 sm:text-base">
                  {bonusesBlockBody}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:justify-end">
              <Button
                type="button"
                variant="primary"
                className="min-h-[48px] w-full px-6 text-base sm:min-w-[200px] sm:flex-1"
                onClick={onRequestQuote}
              >
                {ctaRequest}
              </Button>
              <Button type="button" variant="ghost" className="min-h-[48px] w-full sm:w-auto" onClick={onClose}>
                {t("contactChoice.close")}
              </Button>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
