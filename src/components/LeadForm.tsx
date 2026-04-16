"use client";

/**
 * Единая заявка: модалка с полями → POST /api/send-order; альтернатива — ссылка в Telegram.
 */

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";

type FormStatus = "idle" | "loading" | "success";

const inputClass =
  "mt-1.5 w-full rounded-2xl border border-border/18 bg-bg/[0.35] px-3.5 py-2.5 text-sm text-text placeholder:text-text/45 shadow-inner shadow-black/20 outline-none transition focus:border-accent/40 focus:ring-2 focus:ring-accent/25";

export type LeadFormProps = {
  open: boolean;
  onClose: () => void;
};

export function LeadForm({ open, onClose }: LeadFormProps) {
  const { t } = useI18n();
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!open) return;
    setName("");
    setContact("");
    setMessage("");
    setStatus("idle");
    setErrorMsg("");
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && status !== "loading") onClose();
    };
    document.addEventListener("keydown", onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
    };
  }, [open, onClose, status]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    const n = name.trim();
    const c = contact.trim();
    const m = message.trim();
    if (!n || !c || !m) {
      setErrorMsg(t("contactChoice.errorValidation"));
      return;
    }

    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: n, contact: c, message: m })
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };

      if (!res.ok || !data.ok) {
        if (data.error === "validation") {
          setErrorMsg(t("contactChoice.errorValidation"));
        } else {
          setErrorMsg(t("contactChoice.error"));
        }
        setStatus("idle");
        return;
      }
      setStatus("success");
    } catch {
      setErrorMsg(t("contactChoice.error"));
      setStatus("idle");
    }
  }

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
            disabled={status === "loading"}
            onClick={() => (status === "loading" ? undefined : onClose())}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="lead-form-heading"
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 max-h-[min(90vh,640px)] w-full max-w-md overflow-y-auto rounded-3xl border border-border/20 bg-bg/[0.94] p-6 shadow-[0_24px_80px_rgb(0_0_0/0.55)] ring-1 ring-white/[0.06] backdrop-blur-xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-text/55">{t("leadForm.badge")}</p>
            <h2
              id="lead-form-heading"
              className="font-display mt-1 text-lg font-bold tracking-tight text-text sm:text-xl"
            >
              {t("leadForm.title")}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-text/75">{t("leadForm.intro")}</p>

            {status === "success" ? (
              <div className="mt-8 space-y-6">
                <p className="text-base leading-relaxed text-text/90">{t("contactChoice.success")}</p>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/18 bg-gradient-to-br from-accent via-accent to-accent2/95 px-5 py-3 text-base font-semibold text-onAccent shadow-glow transition hover:brightness-[1.06] focus:outline-none focus:ring-2 focus:ring-accent/45"
                >
                  {t("contactChoice.close")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                {errorMsg ? (
                  <p
                    className="rounded-xl border border-red-500/35 bg-red-500/10 px-3 py-2 text-sm text-red-200/95"
                    role="alert"
                  >
                    {errorMsg}
                  </p>
                ) : null}

                <div>
                  <label htmlFor="lead-form-name" className="text-xs font-semibold uppercase tracking-wide text-text/60">
                    {t("contactChoice.nameLabel")}
                  </label>
                  <input
                    id="lead-form-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={t("contactChoice.namePh")}
                    disabled={status === "loading"}
                    className={inputClass}
                    maxLength={120}
                  />
                </div>

                <div>
                  <label htmlFor="lead-form-contact" className="text-xs font-semibold uppercase tracking-wide text-text/60">
                    {t("contactChoice.contactLabel")}
                  </label>
                  <p className="mt-1 text-xs leading-snug text-text/55">{t("contactChoice.contactHint")}</p>
                  <input
                    id="lead-form-contact"
                    name="contact"
                    type="text"
                    value={contact}
                    onChange={(e) => setContact(e.target.value)}
                    placeholder={t("contactChoice.contactPh")}
                    disabled={status === "loading"}
                    className={inputClass}
                    maxLength={200}
                  />
                </div>

                <div>
                  <label htmlFor="lead-form-message" className="text-xs font-semibold uppercase tracking-wide text-text/60">
                    {t("contactChoice.messageLabel")}
                  </label>
                  <textarea
                    id="lead-form-message"
                    name="message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder={t("contactChoice.messagePh")}
                    disabled={status === "loading"}
                    className={`${inputClass} resize-y min-h-[100px]`}
                    maxLength={4000}
                  />
                </div>

                <div className="flex flex-col gap-3 pt-1">
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="inline-flex min-h-[52px] w-full items-center justify-center rounded-2xl border border-white/18 bg-gradient-to-br from-accent via-accent to-accent2/95 px-5 py-3 text-base font-semibold text-onAccent shadow-glow transition hover:brightness-[1.06] focus:outline-none focus:ring-2 focus:ring-accent/45 disabled:pointer-events-none disabled:opacity-55"
                  >
                    {status === "loading" ? t("contactChoice.sending") : t("contactChoice.submit")}
                  </button>

                  <a
                    href={siteLinks.telegramBot}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-[48px] w-full items-center justify-center rounded-2xl border border-border/18 bg-bg/[0.35] px-5 py-3 text-base font-semibold text-text shadow-[0_0_22px_rgba(0,255,200,0.12)] transition hover:border-accent/35 hover:bg-surface/10 focus:outline-none focus:ring-2 focus:ring-accent/35"
                  >
                    {t("contactChoice.telegram")}
                  </a>
                </div>

                <button
                  type="button"
                  onClick={onClose}
                  disabled={status === "loading"}
                  className="w-full rounded-xl py-2.5 text-sm font-medium text-text/65 transition hover:text-text disabled:opacity-45"
                >
                  {t("contactChoice.close")}
                </button>

                <p className="text-xs text-text/50">{t("leadForm.consent")}</p>
              </form>
            )}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
