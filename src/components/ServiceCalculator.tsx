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
      </div>

      <div className="mt-8 rounded-xl border border-border/12 bg-bg/[0.35] px-4 py-4 sm:px-5">
        {anyChecked ? (
          <p className="text-lg font-bold leading-snug text-text sm:text-xl">{c.estimate}</p>
        ) : (
          <p className="text-sm leading-relaxed text-text/60">{c.emptyHint}</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Button href={siteLinks.email} variant="primary" className="min-h-[48px] min-w-[200px] px-6 text-base">
          {messages.leadForm.ctaEmail}
        </Button>
      </div>
    </div>
  );
}
