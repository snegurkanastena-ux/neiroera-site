"use client";

/**
 * Заявка: основной сценарий — переход в Telegram-бот (тексты в src/lib/messages.ts).
 */

import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

export function LeadForm({ compact = false }: { compact?: boolean }) {
  const { t } = useI18n();

  return (
    <div
      className={`overflow-hidden rounded-3xl border border-border/12 bg-surface/[0.04] backdrop-blur-sm transition-colors duration-300 ${compact ? "" : "p-5 sm:p-6"}`}
    >
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <div className="text-sm text-text/70">{t("leadForm.badge")}</div>
          <div className="text-lg font-bold leading-tight">{t("leadForm.title")}</div>
        </div>
        <div className="hidden max-w-[12rem] text-right text-xs text-text/60 sm:block">{t("leadForm.hint")}</div>
      </div>

      <p className="text-sm leading-relaxed text-text/80">{t("leadForm.intro")}</p>

      <div className="mt-5">
        <Button
          href={siteLinks.telegramBot}
          variant="primary"
          className="w-full sm:w-auto"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t("leadForm.ctaTelegram")}
        </Button>
      </div>

      <p className="mt-4 text-xs text-text/55">{t("leadForm.consent")}</p>
    </div>
  );
}
