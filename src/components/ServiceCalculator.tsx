"use client";

/**
 * Калькулятор услуг: несколько позиций, количество, сумма.
 * Цены берутся из SERVICE_PRICES (заглушки — см. src/lib/servicesCatalog.ts).
 */

import { useMemo } from "react";
import { siteLinks } from "../lib/links";
import {
  CALCULATOR_ROW_CONFIG,
  SERVICE_IDS,
  SERVICE_PRICES,
  type ServiceId
} from "../lib/servicesCatalog";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

export type CalcLine = { id: ServiceId; qty: number };

type Props = {
  lines: CalcLine[];
  onQtyChange: (index: number, qty: number) => void;
  onRemove: (index: number) => void;
  onAddService: (id: ServiceId) => void;
};

function qtyKind(id: ServiceId) {
  return CALCULATOR_ROW_CONFIG.find((c) => c.id === id)?.qtyLabelKind ?? "projects";
}

function maxQty(id: ServiceId) {
  return CALCULATOR_ROW_CONFIG.find((c) => c.id === id)?.maxQty ?? 50;
}

export function ServiceCalculator({ lines, onQtyChange, onRemove, onAddService }: Props) {
  const { t, lang } = useI18n();

  const formatter = useMemo(
    () =>
      new Intl.NumberFormat(lang === "ru" ? "ru-RU" : "en-US", {
        style: "currency",
        currency: "RUB",
        maximumFractionDigits: 0
      }),
    [lang]
  );

  const total = useMemo(
    () => lines.reduce((s, line) => s + SERVICE_PRICES[line.id] * line.qty, 0),
    [lines]
  );

  return (
    <div className="rounded-[28px] border border-border/12 bg-bg/25 p-5 sm:p-7 backdrop-blur-sm transition-colors duration-300">
      <p className="text-sm text-text/65 leading-relaxed">{t("calculatorSection.hint")}</p>

      <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-end">
        <label className="block flex-1">
          <span className="text-xs text-text/60">{t("calculator.lineTitle")}</span>
          <select
            className="mt-1.5 w-full rounded-2xl border border-border/12 bg-bg/40 px-4 py-3 text-sm text-text outline-none transition-colors focus:ring-2 focus:ring-accent/30"
            defaultValue=""
            onChange={(e) => {
              const v = e.target.value as ServiceId | "";
              if (v) {
                onAddService(v);
                e.target.value = "";
              }
            }}
          >
            <option value="" disabled>
              — {t("calculator.add")} —
            </option>
            {SERVICE_IDS.map((id) => (
              <option key={id} value={id}>
                {t(`serviceItems.${id}.title`)}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="mt-6 space-y-3">
        {lines.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border/20 bg-surface/5 px-4 py-8 text-center text-sm text-text/55">
            {t("calculator.empty")}
          </p>
        ) : (
          lines.map((line, index) => {
            const kind = qtyKind(line.id);
            const qMax = maxQty(line.id);
            const lineSum = SERVICE_PRICES[line.id] * line.qty;
            return (
              <div
                key={`${line.id}-${index}`}
                className="flex flex-col gap-3 rounded-2xl border border-border/10 bg-surface/5 p-4 sm:flex-row sm:items-end sm:justify-between"
              >
                <div className="min-w-0 flex-1">
                  <div className="font-bold text-text">{t(`serviceItems.${line.id}.title`)}</div>
                  <div className="mt-1 text-xs text-text/55">
                    {formatter.format(SERVICE_PRICES[line.id])} {t("calculator.perUnit")}
                  </div>
                  <label className="mt-3 block max-w-[12rem]">
                    <span className="text-xs text-text/60">{t(`calculator.qtyLabels.${kind}`)}</span>
                    <input
                      type="number"
                      min={1}
                      max={qMax}
                      value={line.qty}
                      onChange={(e) => {
                        const n = Number(e.target.value);
                        if (Number.isFinite(n)) {
                          onQtyChange(index, Math.min(qMax, Math.max(1, Math.floor(n))));
                        }
                      }}
                      className="mt-1 w-full rounded-xl border border-border/12 bg-bg/40 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-accent/25"
                    />
                  </label>
                </div>
                <div className="flex flex-wrap items-center gap-2 sm:flex-col sm:items-end">
                  <div className="text-sm font-semibold text-accent">{formatter.format(lineSum)}</div>
                  <Button type="button" variant="ghost" className="!px-3 !py-2 text-xs" onClick={() => onRemove(index)}>
                    {t("calculator.remove")}
                  </Button>
                </div>
              </div>
            );
          })
        )}
      </div>

      {lines.length > 0 && (
        <div className="mt-6 flex flex-col gap-4 border-t border-border/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-lg font-black text-text">
            {t("calculator.total")}: <span className="text-accent">{formatter.format(total)}</span>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button
              href={siteLinks.telegramBot}
              variant="secondary"
              className="w-full sm:w-auto"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("calculator.request")}
            </Button>
            <Button href={siteLinks.telegramBot} variant="primary" className="w-full sm:w-auto">
              {t("calculator.discuss")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
