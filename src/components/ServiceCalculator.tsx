"use client";

/**
 * Диагностический калькулятор: три вопроса и ориентир по системе + CTA в Telegram.
 */

import { useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

type Need = "leads" | "pack" | "auto";

export function ServiceCalculator() {
  const { t } = useI18n();
  const [step, setStep] = useState(0);
  const [need, setNeed] = useState<Need | null>(null);
  const [hasSite, setHasSite] = useState<boolean | null>(null);
  const [hasContent, setHasContent] = useState<boolean | null>(null);

  const reset = () => {
    setStep(0);
    setNeed(null);
    setHasSite(null);
    setHasContent(null);
  };

  const choiceBtn =
    "w-full rounded-2xl border border-border/14 bg-bg/35 px-4 py-3.5 text-left text-sm font-semibold text-text/90 transition-all duration-300 hover:border-accent/28 hover:bg-surface/[0.06] hover:shadow-[0_0_32px_rgba(94,231,255,0.08)] focus:outline-none focus:ring-2 focus:ring-accent/30";

  return (
    <div className="rounded-[28px] border border-border/14 bg-bg/[0.32] p-5 shadow-[0_24px_80px_rgba(0,0,0,0.35)] backdrop-blur-md transition-colors duration-300 sm:p-7">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-widest text-text/55">{t("diagnosticCalculator.kicker")}</div>
          <h3 className="mt-1 text-lg font-black sm:text-xl">{t("diagnosticCalculator.title")}</h3>
        </div>
        <div className="text-xs text-text/45">
          {step < 3 ? `${step + 1} / 3` : "—"}
        </div>
      </div>
      <p className="mt-4 text-sm leading-relaxed text-text/70">{t("diagnosticCalculator.intro")}</p>

      {step === 0 && (
        <div className="mt-8 space-y-3">
          <div className="text-sm font-semibold text-text/85">{t("diagnosticCalculator.q1")}</div>
          <div className="grid gap-2 sm:grid-cols-3">
            {(
              [
                { key: "leads" as const, labelKey: "diagnosticCalculator.needLeads" },
                { key: "pack" as const, labelKey: "diagnosticCalculator.needPack" },
                { key: "auto" as const, labelKey: "diagnosticCalculator.needAuto" }
              ] as const
            ).map(({ key, labelKey }) => (
              <button
                key={key}
                type="button"
                className={`${choiceBtn} ${need === key ? "border-accent/40 bg-accent/10 shadow-glow-soft" : ""}`}
                onClick={() => setNeed(key)}
              >
                {t(labelKey)}
              </button>
            ))}
          </div>
          <Button type="button" variant="primary" className="mt-4 w-full sm:w-auto" disabled={!need} onClick={() => setStep(1)}>
            {t("diagnosticCalculator.next")}
          </Button>
        </div>
      )}

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
          <div className="mt-2 text-xl font-black text-text sm:text-2xl">{t("diagnosticCalculator.resultName")}</div>
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
    </div>
  );
}
