"use client";

/**
 * Упрощённый калькулятор: чекбоксы и ориентир по бюджету (синхронно с карточками услуг).
 */

import { useMemo, useState } from "react";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

/** Минимальные ориентиры из секции «Выберите, что вам нужно» */
const MIN_RUB = {
  site: 20_000,
  automation: 15_000,
  visual: 5_000,
  creative: 3_000
} as const;

function formatAmountRub(n: number): string {
  return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
}

export function ServiceCalculator({ onOpenLeadForm }: { onOpenLeadForm: () => void }) {
  const { messages } = useI18n();
  const c = messages.simpleCalculator;

  const [site, setSite] = useState(false);
  const [automation, setAutomation] = useState(false);
  const [visual, setVisual] = useState(false);
  const [creative, setCreative] = useState(false);

  const anyChecked = site || automation || visual || creative;

  const totalMin = useMemo(() => {
    let s = 0;
    if (site) s += MIN_RUB.site;
    if (automation) s += MIN_RUB.automation;
    if (visual) s += MIN_RUB.visual;
    if (creative) s += MIN_RUB.creative;
    return s;
  }, [site, automation, visual, creative]);

  const estimateText = useMemo(() => {
    return c.estimateFrom.replace("{amount}", formatAmountRub(totalMin));
  }, [c.estimateFrom, totalMin]);

  return (
    <div className="rounded-2xl border border-border/14 bg-bg/[0.28] p-5 sm:p-7">
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="ne-card-hover-sm flex cursor-pointer items-center gap-3 px-4 py-3.5 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <span className="ne-card-hover__inner flex w-full items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
              checked={site}
              onChange={(e) => setSite(e.target.checked)}
            />
            <span className="text-base font-semibold text-text">{c.site}</span>
          </span>
        </label>

        <label className="ne-card-hover-sm flex cursor-pointer items-center gap-3 px-4 py-3.5 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <span className="ne-card-hover__inner flex w-full items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
              checked={automation}
              onChange={(e) => setAutomation(e.target.checked)}
            />
            <span className="text-base font-semibold text-text">{c.automation}</span>
          </span>
        </label>

        <label className="ne-card-hover-sm flex cursor-pointer items-center gap-3 px-4 py-3.5 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <span className="ne-card-hover__inner flex w-full items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
              checked={visual}
              onChange={(e) => setVisual(e.target.checked)}
            />
            <span className="text-base font-semibold text-text">{c.visual}</span>
          </span>
        </label>

        <label className="ne-card-hover-sm flex cursor-pointer items-center gap-3 px-4 py-3.5 has-[:checked]:border-accent/35 has-[:checked]:bg-accent/[0.06]">
          <span className="ne-card-hover__inner flex w-full items-center gap-3">
            <input
              type="checkbox"
              className="h-5 w-5 shrink-0 rounded border-border/30 accent-accent"
              checked={creative}
              onChange={(e) => setCreative(e.target.checked)}
            />
            <span className="text-base font-semibold text-text">{c.creative}</span>
          </span>
        </label>
      </div>

      <div className="mt-8 rounded-xl border border-border/12 bg-bg/[0.35] px-4 py-4 sm:px-5">
        {anyChecked ? (
          <p className="text-lg font-bold leading-snug text-text sm:text-xl">{estimateText}</p>
        ) : (
          <p className="text-sm leading-relaxed text-text/60">{c.emptyHint}</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button variant="primary" className="min-h-[48px] min-w-[200px] px-6 text-base" onClick={onOpenLeadForm}>
          {messages.leadForm.ctaEmail}
        </Button>
      </div>
    </div>
  );
}
