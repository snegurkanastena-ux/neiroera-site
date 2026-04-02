"use client";

/**
 * Упрощённый калькулятор: чекбоксы и ориентир по бюджету.
 */

import { useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

export function ServiceCalculator() {
  const { messages } = useI18n();
  const c = messages.simpleCalculator;

  const [site, setSite] = useState(false);
  const [content, setContent] = useState(false);
  const [automation, setAutomation] = useState(false);
  const [training, setTraining] = useState(false);

<<<<<<< HEAD
  const anyChecked = site || content || automation || training;

  return (
    <div className="rounded-2xl border border-border/14 bg-bg/[0.28] p-5 sm:p-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/12 bg-bg/[0.2] px-4 py-3.5 transition-colors hover:border-border/20 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <input
            type="checkbox"
            className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
            checked={site}
            onChange={(e) => setSite(e.target.checked)}
          />
          <span className="text-base font-semibold text-text">{c.site}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/12 bg-bg/[0.2] px-4 py-3.5 transition-colors hover:border-border/20 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <input
            type="checkbox"
            className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
            checked={content}
            onChange={(e) => setContent(e.target.checked)}
          />
          <span className="text-base font-semibold text-text">{c.content}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/12 bg-bg/[0.2] px-4 py-3.5 transition-colors hover:border-border/20 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <input
            type="checkbox"
            className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
            checked={automation}
            onChange={(e) => setAutomation(e.target.checked)}
          />
          <span className="text-base font-semibold text-text">{c.automation}</span>
        </label>
        <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-border/12 bg-bg/[0.2] px-4 py-3.5 transition-colors hover:border-border/20 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <input
            type="checkbox"
            className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
            checked={training}
            onChange={(e) => setTraining(e.target.checked)}
          />
          <span className="text-base font-semibold text-text">{c.training}</span>
        </label>
=======
  const choiceBtn =
    "w-full rounded-2xl border border-border/14 bg-bg/35 px-4 py-3.5 text-left text-sm font-semibold text-text/90 transition-all duration-300 hover:border-accent/30 hover:bg-surface/[0.06] hover:shadow-glow-soft focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div className="rounded-[28px] border border-border/14 bg-bg/[0.32] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors duration-300 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-text/55">{t("diagnosticCalculator.kicker")}</div>
          <h3 className="font-display mt-1 text-lg font-bold sm:text-xl">{t("diagnosticCalculator.title")}</h3>
        </div>
        <div className="text-xs text-text/45">
          {step < 3 ? `${step + 1} / 3` : "—"}
        </div>
>>>>>>> 9894876 (frontend update)
      </div>

      <div className="mt-8 rounded-xl border border-border/12 bg-bg/[0.35] px-4 py-4 sm:px-5">
        {anyChecked ? (
          <p className="text-lg font-bold leading-snug text-text sm:text-xl">{c.estimate}</p>
        ) : (
          <p className="text-sm leading-relaxed text-text/60">{c.emptyHint}</p>
        )}
      </div>

<<<<<<< HEAD
      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={siteLinks.email} variant="primary" className="min-h-[48px] min-w-[200px] px-6 text-base">
          {messages.leadForm.ctaEmail}
        </Button>
      </div>
=======
      {step === 1 && (
        <div className="mt-8 space-y-3">
          <div className="text-sm font-semibold text-text/85">{t("diagnosticCalculator.q2")}</div>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              className={`${choiceBtn} ${hasSite === true ? "border-accent/40 bg-accent/10" : ""}`}
              onClick={() => setHasSite(true)}
            >
              {t("diagnosticCalculator.yes")}
            </button>
            <button
              type="button"
              className={`${choiceBtn} ${hasSite === false ? "border-accent/40 bg-accent/10" : ""}`}
              onClick={() => setHasSite(false)}
            >
              {t("diagnosticCalculator.no")}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant="ghost" className="!px-4" onClick={() => setStep(0)}>
              ←
            </Button>
            <Button type="button" variant="primary" className="flex-1 sm:flex-none" disabled={hasSite === null} onClick={() => setStep(2)}>
              {t("diagnosticCalculator.next")}
            </Button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="mt-8 space-y-3">
          <div className="text-sm font-semibold text-text/85">{t("diagnosticCalculator.q3")}</div>
          <div className="grid gap-2 sm:grid-cols-2">
            <button
              type="button"
              className={`${choiceBtn} ${hasContent === true ? "border-accent/40 bg-accent/10" : ""}`}
              onClick={() => setHasContent(true)}
            >
              {t("diagnosticCalculator.yes")}
            </button>
            <button
              type="button"
              className={`${choiceBtn} ${hasContent === false ? "border-accent/40 bg-accent/10" : ""}`}
              onClick={() => setHasContent(false)}
            >
              {t("diagnosticCalculator.no")}
            </button>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <Button type="button" variant="ghost" className="!px-4" onClick={() => setStep(1)}>
              ←
            </Button>
            <Button type="button" variant="primary" className="flex-1 sm:flex-none" disabled={hasContent === null} onClick={() => setStep(3)}>
              {t("diagnosticCalculator.next")}
            </Button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 rounded-2xl border border-accent/20 bg-accent/[0.06] p-5 sm:p-6">
          <div className="text-xs uppercase tracking-widest text-text/60">{t("diagnosticCalculator.resultLabel")}</div>
          <div className="font-display mt-2 text-xl font-bold text-text sm:text-2xl">{t("diagnosticCalculator.resultName")}</div>
          <div className="mt-2 text-sm font-semibold text-accent">{t("diagnosticCalculator.resultRange")}</div>
          <p className="mt-4 text-xs leading-relaxed text-text/55">
            {need != null && hasSite != null && hasContent != null
              ? [need === "leads" ? t("diagnosticCalculator.needLeads") : need === "pack" ? t("diagnosticCalculator.needPack") : t("diagnosticCalculator.needAuto"), hasSite ? t("diagnosticCalculator.yes") : t("diagnosticCalculator.no"), hasContent ? t("diagnosticCalculator.yes") : t("diagnosticCalculator.no")].join(" · ")
              : null}
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Button href={siteLinks.telegramBot} variant="primary" className="w-full sm:w-auto" target="_blank" rel="noopener noreferrer">
              {t("diagnosticCalculator.cta")}
            </Button>
            <Button type="button" variant="ghost" className="w-full sm:w-auto" onClick={reset}>
              {t("diagnosticCalculator.again")}
            </Button>
          </div>
        </div>
      )}
>>>>>>> 9894876 (frontend update)
    </div>
  );
}
