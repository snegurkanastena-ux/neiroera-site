"use client";

/**
 * Форма заявки: подписи и сообщения берутся из i18n (src/lib/messages.ts).
 */

import { useMemo, useState } from "react";
import type { FormEvent } from "react";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

type FormState = {
  name: string;
  contact: string;
  goal: string;
  message: string;
};

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  const initial = useMemo<FormState>(
    () => ({
      name: "",
      contact: "",
      goal: "",
      message: ""
    }),
    []
  );

  const [form, setForm] = useState<FormState>(initial);
  const [status, setStatus] = useState<"idle" | "loading" | "success">("idle");
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}`);
      }

      setStatus("success");
    } catch {
      setStatus("idle");
      setError(t("leadForm.error"));
    }
  }

  return (
    <form
      onSubmit={onSubmit}
      className={`overflow-hidden rounded-3xl border border-border/12 bg-transparent ${compact ? "" : "p-5 sm:p-6"}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-text/70">{t("leadForm.badge")}</div>
          <div className="text-lg font-bold leading-tight">{t("leadForm.title")}</div>
        </div>
        <div className="hidden text-xs text-text/60 sm:block">{t("leadForm.hint")}</div>
      </div>

      {status === "success" ? (
        <div className="rounded-2xl border border-accent/20 bg-accent/10 p-6">
          <div className="mb-2 font-semibold text-accent">{t("leadForm.successTitle")}</div>
          <div className="text-sm text-text/80">{t("leadForm.successText")}</div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <label className="block">
              <span className="text-sm text-text/70">{t("leadForm.name")}</span>
              <input
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="mt-1 w-full rounded-2xl border border-border/12 bg-bg/40 px-4 py-3 outline-none focus:ring-2 focus:ring-accent/30"
                placeholder={t("leadForm.namePh")}
                required
              />
            </label>

            <label className="block">
              <span className="text-sm text-text/70">{t("leadForm.contact")}</span>
              <input
                value={form.contact}
                onChange={(e) => setForm((f) => ({ ...f, contact: e.target.value }))}
                className="mt-1 w-full rounded-2xl border border-border/12 bg-bg/40 px-4 py-3 outline-none focus:ring-2 focus:ring-accent/30"
                placeholder={t("leadForm.contactPh")}
                required
              />
            </label>
          </div>

          <label className="mt-3 block">
            <span className="text-sm text-text/70">{t("leadForm.goal")}</span>
            <input
              value={form.goal}
              onChange={(e) => setForm((f) => ({ ...f, goal: e.target.value }))}
              className="mt-1 w-full rounded-2xl border border-border/12 bg-bg/40 px-4 py-3 outline-none focus:ring-2 focus:ring-accent/30"
              placeholder={t("leadForm.goalPh")}
            />
          </label>

          <label className="mt-3 block">
            <span className="text-sm text-text/70">{t("leadForm.message")}</span>
            <textarea
              value={form.message}
              onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
              rows={compact ? 3 : 4}
              className="mt-1 w-full resize-none rounded-2xl border border-border/12 bg-bg/40 px-4 py-3 outline-none focus:ring-2 focus:ring-accent/30"
              placeholder={t("leadForm.messagePh")}
            />
          </label>

          {error && <div className="mt-3 text-sm text-warm">{error}</div>}

          <div className="mt-4 flex items-center gap-3">
            <Button variant="primary" className="w-full" type="submit">
              {status === "loading" ? t("leadForm.sending") : t("leadForm.submit")}
            </Button>
          </div>

          {/* Юридическая подпись; при необходимости замените текст в messages */}
          <div className="mt-3 text-xs text-text/60">{t("leadForm.consent")}</div>
        </>
      )}
    </form>
  );
}
