"use client";

/**
 * Главная страница: контент + связка с переводами и калькулятором услуг.
 * Тексты — централизованно в src/lib/messages.ts; ссылки — в src/lib/links.ts.
 */

import { useCallback, useMemo, useState } from "react";
import { siteLinks } from "../lib/links";
import { CALCULATOR_ROW_CONFIG, SERVICE_IDS, type ServiceId } from "../lib/servicesCatalog";
import { useI18n } from "../providers/SiteProviders";
import { LeadForm } from "./LeadForm";
import { Portrait } from "./Portrait";
import { Reveal } from "./Reveal";
import { ServiceCalculator, type CalcLine } from "./ServiceCalculator";
import { Button } from "./ui/Button";

function SectionTitle({ kickerKey, titleKey }: { kickerKey: string; titleKey: string }) {
  const { t } = useI18n();
  return (
    <div className="mb-8">
      <div className="text-xs sm:text-sm text-text/65 uppercase tracking-widest">{t(kickerKey)}</div>
      <h2 className="mt-2 text-2xl sm:text-3xl font-extrabold leading-tight">
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent2 to-warm">{t(titleKey)}</span>
      </h2>
    </div>
  );
}

function SocialGlyph({ label }: { label: "Telegram" | "VK" | "Instagram" | "Mail" }) {
  if (label === "Telegram")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M22 3L2 10.5L9 13L21 5.5L11.2 15.8L10.4 21L13.7 17.7L17.8 20.4L22 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  if (label === "VK")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6.5C4 6.5 4 7.7 4 9.2C4 14.2 7 17 10.5 17H12V14.8H10.8C9.6 14.8 8.5 13.8 8.5 12.7V11.8H10.3C11.4 11.8 12 10.6 12 9.7V6.5H8.5V8.7C8.5 9.1 8.2 9.4 7.8 9.4H7.4C7.1 9.4 6.8 9.2 6.7 8.9C6.5 8.6 6.5 8.2 6.5 7.9V6.5H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M20 17C18.1 17 16.5 15.4 16.5 13.5V6.5H13.8V13.4C13.8 16 16 18.2 18.6 18.2H20V17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  if (label === "Mail")
    return (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      </svg>
    );
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.3 8.7H15.3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

export function HomePageContent() {
  const { t, messages } = useI18n();

  const systemItems = useMemo(() => {
    try {
      return JSON.parse(t("hero.systemItems")) as string[];
    } catch {
      return [];
    }
  }, [t]);

  const [calcLines, setCalcLines] = useState<CalcLine[]>([]);

  const addToCalc = useCallback((id: ServiceId) => {
    setCalcLines((prev) => {
      const max = CALCULATOR_ROW_CONFIG.find((c) => c.id === id)?.maxQty ?? 50;
      const i = prev.findIndex((l) => l.id === id);
      if (i >= 0) {
        const next = [...prev];
        next[i] = { ...next[i], qty: Math.min(max, next[i].qty + 1) };
        return next;
      }
      return [...prev, { id, qty: 1 }];
    });
  }, []);

  const onQtyChange = useCallback((index: number, qty: number) => {
    setCalcLines((prev) => {
      const next = [...prev];
      if (!next[index]) return prev;
      const id = next[index].id;
      const max = CALCULATOR_ROW_CONFIG.find((c) => c.id === id)?.maxQty ?? 50;
      next[index] = { id, qty: Math.min(max, Math.max(1, qty)) };
      return next;
    });
  }, []);

  const onRemoveLine = useCallback((index: number) => {
    setCalcLines((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const pillars = messages.about.pillars as { title: string; desc: string }[];
  const audienceItems = messages.audience.items;
  const caseItems = messages.cases.items;
  const processSteps = messages.process.steps;
  const reviewItems = messages.reviews.items;

  return (
    <div id="top" className="pt-10 sm:pt-16 pb-14">
      {/* HERO */}
      <section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <Reveal>
              <div className="inline-flex items-center gap-2 rounded-2xl border border-border/12 bg-transparent px-4 py-2 text-xs text-text/70 sm:text-sm">
                <span className="h-2 w-2 rounded-full bg-accent shadow-glow" />
                {t("hero.badge")}
              </div>
            </Reveal>

            <Reveal delayMs={80}>
              <h1 className="mt-5 text-3xl font-black leading-[1.05] sm:text-4xl lg:text-5xl">{t("hero.title")}</h1>
            </Reveal>

            <Reveal delayMs={140}>
              <p className="mt-4 max-w-xl text-lg text-text/85 sm:text-xl">{t("hero.subtitle")}</p>
            </Reveal>

            <Reveal delayMs={200}>
              <div className="mt-6 grid gap-3">
                <div className="rounded-3xl border border-border/12 bg-bg/20 p-4">
                  <div className="text-sm text-text/70">{t("hero.systemLabel")}</div>
                  <div className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
                    {systemItems.map((item) => (
                      <div
                        key={item}
                        className="flex items-center gap-2 rounded-2xl border border-border/12 bg-transparent px-3 py-2 text-sm text-text/85"
                      >
                        <span className="grid h-6 w-6 place-items-center rounded-xl border border-accent/30 bg-accent/15 text-accent">
                          <span className="text-xs font-black">+</span>
                        </span>
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </Reveal>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Reveal>
                <Button href="#consultation" variant="primary" className="w-full sm:w-auto">
                  {t("hero.ctaConsult")}
                </Button>
              </Reveal>
              <Reveal delayMs={100}>
                <Button href={siteLinks.telegramChannel} variant="secondary" className="w-full sm:w-auto">
                  {t("hero.ctaTg")}
                </Button>
              </Reveal>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                { value: t("hero.stat1"), label: t("hero.stat1Label") },
                { value: t("hero.stat2"), label: t("hero.stat2Label") },
                { value: t("hero.stat3"), label: t("hero.stat3Label") }
              ].map((item, idx) => (
                <Reveal key={item.label} delayMs={220 + idx * 80}>
                  <div className="rounded-3xl border border-border/12 bg-transparent p-4 transition-colors duration-300 hover:border-accent/25">
                    <div className="font-black text-accent">{item.value}</div>
                    <div className="mt-1 text-sm text-text/70">{item.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          <Reveal className="relative">
            <Portrait />
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mt-20">
        <SectionTitle kickerKey="about.kicker" titleKey="about.title" />
        <div className="grid items-start gap-8 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-3xl border border-border/12 bg-transparent p-6">
              <p className="leading-relaxed text-text/85">{t("about.p1")}</p>
              <p className="mt-4 leading-relaxed text-text/85">{t("about.p2")}</p>
            </div>
          </Reveal>

          <Reveal delayMs={80}>
            <div className="space-y-3">
              {pillars.map((x, idx) => (
                <div key={x.title} className="rounded-3xl border border-border/12 bg-bg/20 p-5 transition-all duration-300 hover:border-accent/20">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <div className="font-bold">{x.title}</div>
                      <div className="mt-1 text-sm text-text/70">{x.desc}</div>
                    </div>
                    <div className="grid h-10 w-10 place-items-center rounded-2xl border border-accent/30 bg-accent/15">
                      <span className="font-black text-accent">{idx + 1}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* SERVICES — карточки + связь с калькулятором */}
      <section id="services" className="mt-20">
        <SectionTitle kickerKey="servicesSection.kicker" titleKey="servicesSection.title" />
        <p className="mb-8 max-w-2xl text-sm text-text/70">{t("servicesSection.intro")}</p>
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {SERVICE_IDS.map((id, idx) => (
            <Reveal key={id} delayMs={idx * 50}>
              <article className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-border/12 bg-transparent p-6 transition-all duration-300 hover:border-accent/30 hover:shadow-[0_0_0_1px_rgba(55,230,255,0.12)]">
                <div aria-hidden="true" className="animated-gradient absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-15 transition-opacity duration-300 group-hover:opacity-25" />
                <div className="relative flex flex-1 flex-col">
                  <h3 className="text-lg font-black">{t(`serviceItems.${id}.title`)}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-text/70">{t(`serviceItems.${id}.desc`)}</p>
                  <div className="mt-5">
                    <Button type="button" variant="secondary" className="w-full sm:w-auto !py-2.5 !text-sm" onClick={() => addToCalc(id)}>
                      {t(`serviceItems.${id}.action`)}
                    </Button>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section id="calculator" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="calculatorSection.kicker" titleKey="calculatorSection.title" />
        <ServiceCalculator
          lines={calcLines}
          onQtyChange={onQtyChange}
          onRemove={onRemoveLine}
          onAddService={addToCalc}
        />
      </section>

      {/* AUDIENCE */}
      <section id="audience" className="mt-20">
        <SectionTitle kickerKey="audience.kicker" titleKey="audience.title" />
        <div className="grid gap-4 md:grid-cols-2">
          {audienceItems.map((x, idx) => (
            <Reveal key={x.title} delayMs={idx * 80}>
              <div className="rounded-3xl border border-border/12 bg-bg/20 p-6 transition-all duration-300 hover:border-accent/15">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-lg font-black">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-text/70">{x.desc}</div>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 bg-transparent">
                    <span className="font-black text-accent">{idx + 1}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="mt-20">
        <SectionTitle kickerKey="cases.kicker" titleKey="cases.title" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caseItems.map((c, idx) => (
            <Reveal key={idx} delayMs={idx * 70}>
              <div className="rounded-3xl border border-border/12 bg-transparent p-6 transition-colors duration-300 hover:border-border/20">
                <div className="text-sm text-text/65">{t("cases.task")}</div>
                <div className="mt-2 font-bold leading-relaxed">{c.task}</div>
                <div className="mt-5 text-sm text-text/65">{t("cases.solution")}</div>
                <div className="mt-2 text-sm leading-relaxed text-text/70">{c.solution}</div>
                <div className="mt-5 text-sm text-text/65">{t("cases.result")}</div>
                <div className="mt-2 text-sm leading-relaxed text-text/80">{c.result}</div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mt-20">
        <SectionTitle kickerKey="process.kicker" titleKey="process.title" />
        <div className="grid gap-4 md:grid-cols-2">
          {processSteps.map((x, idx) => (
            <Reveal key={x.step} delayMs={idx * 90}>
              <div className="rounded-3xl border border-border/12 bg-bg/20 p-6 transition-all duration-300 hover:border-accent/20">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-text/70">
                      {messages.process.stepPrefix} {x.step}
                    </div>
                    <div className="mt-1 text-lg font-black">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-text/70">{x.desc}</div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-3xl border border-accent/30 bg-accent/15 shadow-glow">
                    <span className="font-black text-accent">{x.step}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mt-20">
        <SectionTitle kickerKey="reviews.kicker" titleKey="reviews.title" />
        <div className="grid gap-4 md:grid-cols-3">
          {reviewItems.map((r, idx) => (
            <Reveal key={r.name} delayMs={idx * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-border/12 bg-transparent p-6">
                <div className="text-sm text-text/65">{t("reviews.label")}</div>
                <div className="mt-3 flex-1 text-sm leading-relaxed text-text/80">{r.text}</div>
                <div className="mt-auto pt-5">
                  <div className="font-bold">{r.name}</div>
                  <div className="text-sm text-text/60">{r.role}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* СОЦСЕТИ, КОНТАКТЫ, РЕФЕРАЛЫ */}
      <section id="socials" className="mt-20">
        <SectionTitle kickerKey="socials.kicker" titleKey="socials.title" />
        <div className="rounded-[32px] border border-border/12 bg-bg/20 p-5 sm:p-6">
          <p className="text-sm leading-relaxed text-text/70">{t("socials.intro")}</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Telegram-канал — акцент */}
            <div className="relative overflow-hidden rounded-3xl border border-accent/35 bg-accent/10 p-6 lg:col-span-2">
              <div aria-hidden="true" className="gradient-orb absolute -left-24 -top-24 h-64 w-64 opacity-90" />
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm text-text/70">{t("socials.tgChannelTitle")}</div>
                  <div className="mt-1 text-lg font-black">{t("socials.tgChannelSubtitle")}</div>
                  <p className="mt-2 max-w-xl text-sm text-text/80">{t("socials.tgChannelText")}</p>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-3xl border border-border/12 bg-bg/30 text-accent shadow-glow">
                  <SocialGlyph label="Telegram" />
                </div>
              </div>
              <div className="relative mt-5">
                <Button href={siteLinks.telegramChannel} variant="primary" className="w-full sm:w-auto">
                  {t("socials.tgCta")}
                </Button>
              </div>
            </div>

            {/* Бот */}
            <a
              href={siteLinks.telegramBot}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl border border-border/12 bg-transparent p-6 transition-all duration-300 hover:border-accent/25 hover:bg-surface/5"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-text/70">{t("socials.tgBotTitle")}</div>
                  <p className="mt-1 text-sm text-text/75">{t("socials.tgBotText")}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 text-accent transition-colors group-hover:border-accent/30">
                  <SocialGlyph label="Telegram" />
                </span>
              </div>
              <span className="mt-4 text-sm font-semibold text-accent">{t("socials.write")} →</span>
            </a>

            {/* VK страница */}
            <a
              href={siteLinks.vkPage}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl border border-border/12 bg-transparent p-6 transition-all duration-300 hover:border-accent/25"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-text/70">{t("socials.vkPageTitle")}</div>
                  <p className="mt-1 text-sm text-text/75">{t("socials.vkPageText")}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 text-accent">
                  <SocialGlyph label="VK" />
                </span>
              </div>
              <span className="mt-4 text-sm font-semibold text-accent">{t("socials.open")} →</span>
            </a>

            {/* VK канал */}
            <a
              href={siteLinks.vkChannel}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl border border-border/12 bg-transparent p-6 transition-all duration-300 hover:border-accent/25"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-text/70">{t("socials.vkChannelTitle")}</div>
                  <p className="mt-1 text-sm text-text/75">{t("socials.vkChannelText")}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 text-accent">
                  <SocialGlyph label="VK" />
                </span>
              </div>
              <span className="mt-4 text-sm font-semibold text-accent">{t("socials.open")} →</span>
            </a>

            {/* Email */}
            <a
              href={siteLinks.email}
              className="group flex flex-col rounded-3xl border border-border/12 bg-transparent p-6 transition-all duration-300 hover:border-accent/25"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-text/70">{t("socials.emailTitle")}</div>
                  <p className="mt-1 text-sm text-text/75">{t("socials.emailText")}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 text-accent2">
                  <SocialGlyph label="Mail" />
                </span>
              </div>
              <span className="mt-4 truncate text-sm font-semibold text-accent">neuroera@yandex.com</span>
            </a>

            {/* Instagram */}
            <a
              href={siteLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex flex-col rounded-3xl border border-border/12 bg-transparent p-6 transition-all duration-300 hover:border-accent/25 lg:col-span-2"
            >
              <div className="flex items-center justify-between gap-3">
                <div>
                  <div className="text-sm text-text/70">{t("socials.instagramTitle")}</div>
                  <p className="mt-1 text-sm text-text/75">{t("socials.instagramText")}</p>
                </div>
                <span className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 text-accent2">
                  <SocialGlyph label="Instagram" />
                </span>
              </div>
              <span className="mt-4 text-sm font-semibold text-accent">{t("socials.open")} →</span>
            </a>
          </div>

          {/* Реферальные ссылки */}
          <div className="mt-10 border-t border-border/10 pt-8">
            <div className="text-xs uppercase tracking-widest text-text/55">{t("referralSection.kicker")}</div>
            <h3 className="mt-2 text-xl font-black">{t("referralSection.title")}</h3>
            <p className="mt-2 max-w-2xl text-sm text-text/65">{t("referralSection.intro")}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {(
                [
                  { key: "syntx" as const, href: siteLinks.referrals.syntxBot },
                  { key: "suno" as const, href: siteLinks.referrals.suno },
                  { key: "vezarys" as const, href: siteLinks.referrals.vezarysVpn }
                ] as const
              ).map((item) => {
                const block = messages.referrals[item.key];
                return (
                  <a
                    key={item.key}
                    href={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="rounded-2xl border border-border/12 bg-surface/5 p-5 transition-all duration-300 hover:border-accent2/30 hover:bg-surface/8"
                  >
                    <div className="font-bold">{block.title}</div>
                    <p className="mt-2 text-sm text-text/65">{block.desc}</p>
                    <span className="mt-3 inline-block text-sm font-semibold text-accent2">{block.cta} →</span>
                  </a>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-xs text-text/50">{t("socials.note")}</p>
        </div>
      </section>

      {/* ФИНАЛ + ФОРМА */}
      <section id="consultation" className="mt-20 scroll-mt-24">
        <div className="relative overflow-hidden rounded-[32px] border border-border/12 bg-transparent p-6 sm:p-8">
          <div aria-hidden="true" className="animated-gradient absolute inset-0 opacity-20" />
          <div aria-hidden="true" className="gradient-orb purple absolute -right-24 -top-24 h-64 w-64 opacity-70" />
          <div className="relative">
            <div className="grid items-start gap-8 lg:grid-cols-2">
              <div>
                <Reveal>
                  <SectionTitle kickerKey="final.kicker" titleKey="final.title" />
                </Reveal>
                <div className="flex flex-col gap-3 sm:flex-row sm:gap-4">
                  <Reveal>
                    <Button href="#consultation" variant="primary" className="w-full sm:w-auto">
                      {t("final.ctaConsult")}
                    </Button>
                  </Reveal>
                  <Reveal delayMs={120}>
                    <Button href={siteLinks.telegramBot} variant="secondary" className="w-full sm:w-auto">
                      {t("final.ctaTg")}
                    </Button>
                  </Reveal>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-text/70">{t("final.note")}</p>
              </div>
              <Reveal delayMs={80}>
                <LeadForm />
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
