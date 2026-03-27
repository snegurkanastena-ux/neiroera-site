"use client";

/**
 * Заявка: основной сценарий — почта; Telegram — дополнительно (тексты в src/lib/messages.ts).
 */

import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-border/14 bg-surface/[0.04] transition-colors duration-300 ${compact ? "" : "p-5 sm:p-6"}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-text/75">{t("leadForm.badge")}</div>
          <div className="text-lg font-bold leading-tight">{t("leadForm.title")}</div>
        </div>
        <div className="hidden max-w-[12rem] text-right text-xs text-text/60 sm:block">{t("leadForm.hint")}</div>
      </div>

      <p className="text-sm leading-relaxed text-text/85">{t("leadForm.intro")}</p>

      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
        <Button href={siteLinks.email} variant="primary" className="min-h-[48px] w-full px-6 text-base sm:w-auto">
          {t("leadForm.ctaEmail")}
        </Button>
        <a
          href={siteLinks.telegramBot}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-sm font-semibold text-accent/90 underline-offset-4 hover:text-accent hover:underline sm:text-left"
        >
          {t("leadForm.ctaTelegram")}
        </a>
      </div>

      <p className="mt-4 text-xs text-text/50">{t("leadForm.consent")}</p>
    </div>
  );
}
