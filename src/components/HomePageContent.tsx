"use client";

/**
 * Главная страница: контент + связка с переводами и калькулятором услуг.
 * Тексты — централизованно в src/lib/messages.ts; ссылки — в src/lib/links.ts.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Portrait } from "./Portrait";
import { Reveal } from "./Reveal";
import { ServiceCalculator } from "./ServiceCalculator";
import { Button } from "./ui/Button";

/** Треки в `public/portfolio/music` (имена файлов из репозитория). */
const PORTFOLIO_MUSIC_TRACKS = [
  "/portfolio/music/ai-track-01.mp3.mp3",
  "/portfolio/music/ai-track-02.mp3.mp3",
  "/portfolio/music/ai-track-03.mp3.mp3",
  "/portfolio/music/ai-track-04.mp3.mp3",
  "/portfolio/music/ai-track-05.mp3.mp3"
] as const;

const PORTFOLIO_PHOTOS = [
  "/portfolio/photos/photo-01.jpg.png",
  "/portfolio/photos/photo-02.jpg.png",
  "/portfolio/photos/photo-03.jpg.png",
  "/portfolio/photos/photo-04.jpg.png"
] as const;

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
  const reduceMotion = useReducedMotion();

  const aboutListItems = useMemo(() => {
    try {
      return JSON.parse(t("about.listItems")) as string[];
    } catch {
      return [];
    }
  }, [t]);

  const audienceItems = messages.audience.items;
  const caseItems = messages.cases.items;
  const processSteps = messages.process.steps;
  const reviewItems = messages.reviews.items;
  const portfolioItems = messages.portfolio.items;
  const productItems = messages.productsSection.items;
  const painCards = messages.pain.cards;
  const solutionBullets = messages.solution.bullets;

  return (
    <div id="top" className="pt-10 sm:pt-16 pb-14">
      {/* HERO */}
      <section className="relative">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-1/2 z-0 h-[min(94vh,900px)] w-full -translate-y-1/2 rounded-[44px] opacity-100"
        >
          <div className="hero-gradient-layer absolute inset-0 rounded-[44px]" />
          <div className="hero-ambient-shift absolute inset-0 rounded-[44px] opacity-[0.55]" />
          <div className="animated-gradient absolute inset-0 rounded-[44px] opacity-[0.36]" />
        </div>

        <div className="relative z-10 grid items-center gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:gap-8 lg:items-center">
          <div>
            <Reveal>
              <h1 className="whitespace-pre-line text-3xl font-black leading-[1.08] sm:text-4xl lg:text-[2.7rem] lg:leading-[1.05]">
                {t("hero.title")}
              </h1>
            </Reveal>

            <Reveal delayMs={90}>
              <p className="mt-4 max-w-xl whitespace-pre-line text-lg leading-snug text-text/88 sm:text-xl">{t("hero.subtitle")}</p>
            </Reveal>

            <Reveal delayMs={160}>
              <div className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 rounded-2xl border border-border/10 bg-bg/[0.22] px-4 py-3 text-sm text-text/78 backdrop-blur-sm">
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-accent shadow-glow" aria-hidden />
                  {t("hero.trust1")}
                </span>
                <span className="hidden text-text/35 sm:inline" aria-hidden>
                  ·
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-accent2/90" aria-hidden />
                  {t("hero.trust2")}
                </span>
                <span className="hidden text-text/35 sm:inline" aria-hidden>
                  ·
                </span>
                <span className="inline-flex items-center gap-2">
                  <span className="h-1 w-1 shrink-0 rounded-full bg-accent shadow-glow" aria-hidden />
                  {t("hero.trust3")}
                </span>
              </div>
            </Reveal>

            <div className="mt-7">
              <Reveal delayMs={220}>
                <Button
                  href={siteLinks.telegramBot}
                  variant="primary"
                  className="w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("hero.ctaConsult")}
                </Button>
              </Reveal>
            </div>
          </div>

          <Reveal className="relative lg:justify-self-end">
            <Portrait />
          </Reveal>
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="about.kicker" titleKey="about.title" />
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal>
            <div className="overflow-hidden rounded-2xl border border-white/[0.1] shadow-[0_28px_80px_rgba(0,0,0,0.5),0_0_40px_rgba(94,231,255,0.05)] ring-1 ring-white/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/anastasia-about.png"
                alt={t("footer.name")}
                className="aspect-[4/3] w-full object-cover sm:aspect-[5/4] lg:aspect-[4/5] lg:min-h-[400px]"
              />
            </div>
          </Reveal>

          <div className="space-y-6">
            <Reveal delayMs={60}>
              <div className="rounded-3xl border border-border/12 bg-transparent p-6">
                <p className="whitespace-pre-line leading-relaxed text-text/88">{t("about.p1")}</p>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-text/88">{t("about.p2")}</p>
                <p className="mt-6 text-sm font-semibold text-text/90">{t("about.listLabel")}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text/80">
                  {aboutListItems.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent shadow-glow" aria-hidden />
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-8 whitespace-pre-line border-t border-border/10 pt-6 text-base font-bold leading-snug text-text">
                  {t("about.thesis")}
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* БОЛИ */}
      <section id="pain" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="pain.kicker" titleKey="pain.title" />
        <div className="grid gap-3 md:grid-cols-2">
          {painCards.map((card, idx) => (
            <Reveal key={card} delayMs={idx * 70}>
              <div className="h-full rounded-3xl border border-border/12 bg-bg/[0.18] p-5 transition-all duration-300 hover:border-accent/22 hover:shadow-[0_0_40px_rgba(155,125,255,0.12)] sm:p-6">
                <div className="text-sm font-bold leading-snug text-text/90 sm:text-base">{card}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={320}>
          <p className="mt-10 max-w-2xl whitespace-pre-line text-base font-semibold leading-relaxed text-text/85 sm:text-lg">
            {messages.pain.closing}
          </p>
        </Reveal>
      </section>

      {/* РЕШЕНИЕ */}
      <section id="solution" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="solution.kicker" titleKey="solution.title" />
        <Reveal>
          <div className="rounded-3xl border border-border/14 bg-bg/[0.22] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.25)] backdrop-blur-sm sm:p-8">
            <div className="text-center text-sm font-semibold tracking-wide text-accent sm:text-base">{messages.solution.flow}</div>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-sm leading-relaxed text-text/78 sm:text-[0.95rem]">
              {solutionBullets.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent2 shadow-glow-soft" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Button href={siteLinks.telegramBot} variant="primary" target="_blank" rel="noopener noreferrer">
                {messages.solution.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="portfolio.kicker" titleKey="portfolio.title" />
        <p className="mb-8 max-w-2xl text-sm leading-relaxed text-text/72">{t("portfolio.intro")}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <Reveal key={item.title} delayMs={idx * 70}>
              <a
                href={`#${item.anchor}`}
                className="group relative block h-full cursor-pointer overflow-hidden rounded-3xl border border-border/12 bg-surface/[0.03] p-6 no-underline outline-none transition-all duration-500 ease-out will-change-transform hover:scale-[1.03] hover:border-accent/35 hover:shadow-[0_0_56px_rgba(94,231,255,0.2)] focus-visible:ring-2 focus-visible:ring-accent/40"
              >
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-accent/12 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                />
                <article className="relative flex h-full flex-col">
                  <h3 className="text-lg font-black text-text">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text/72">{item.desc}</p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent/90">↓</span>
                </article>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-16 space-y-16">
          {portfolioItems.map((item, idx) => (
            <div key={item.anchor} id={item.anchor} className="scroll-mt-28">
              <Reveal delayMs={idx * 40}>
                <div className="rounded-3xl border border-border/12 bg-bg/[0.15] p-6 sm:p-8">
                  <h3 className="text-xl font-black">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text/75">{item.desc}</p>

                  {item.anchor === "portfolio-photos" ? (
                    <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
                      {PORTFOLIO_PHOTOS.map((src) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={src}
                          src={src}
                          alt=""
                          className="aspect-[3/4] w-full rounded-2xl border border-border/12 object-cover shadow-[0_16px_40px_rgba(0,0,0,0.35)]"
                        />
                      ))}
                    </div>
                  ) : null}

                  {item.anchor === "portfolio-video" && item.casesCta ? (
                    <div className="mt-6">
                      <Button
                        href={siteLinks.telegramPortfolioCases}
                        variant="primary"
                        className="w-full sm:w-auto"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {item.casesCta}
                      </Button>
                      {item.casesNote ? (
                        <p className="mt-3 max-w-xl text-xs leading-relaxed text-text/55">{item.casesNote}</p>
                      ) : null}
                    </div>
                  ) : null}

                  {item.anchor === "portfolio-music" ? (
                    <div className="mt-6 space-y-3">
                      {PORTFOLIO_MUSIC_TRACKS.map((src) => (
                        <audio
                          key={src}
                          controls
                          preload="metadata"
                          className="h-10 w-full max-w-xl rounded-lg accent-accent"
                        >
                          <source src={src} type="audio/mpeg" />
                        </audio>
                      ))}
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* ПРОДУКТЫ */}
      <section id="services" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="productsSection.kicker" titleKey="productsSection.title" />
        <p className="mb-8 max-w-2xl text-sm text-text/70">{t("servicesSection.intro")}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {productItems.map((item, idx) => (
            <Reveal key={item.title} delayMs={idx * 70}>
              <article className="flex h-full flex-col rounded-3xl border border-border/12 bg-bg/[0.14] p-6 transition-all duration-300 hover:border-accent/24 hover:shadow-[0_0_40px_rgba(155,125,255,0.1)]">
                <h3 className="text-lg font-black">{item.title}</h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text/74">{item.desc}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* КАЛЬКУЛЯТОР / ДИАГНОСТИКА */}
      <section id="calculator" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="calculatorSection.kicker" titleKey="calculatorSection.title" />
        <ServiceCalculator />
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
      <section id="reviews" className="mt-20 scroll-mt-24">
        <SectionTitle kickerKey="reviews.kicker" titleKey="reviews.title" />
        <div className="grid gap-4 md:grid-cols-3">
          {reviewItems.map((r, idx) => (
            <Reveal key={r.name} delayMs={idx * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-border/12 bg-bg/[0.12] p-6">
                <div className="flex items-start gap-3">
                  {r.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={r.photo}
                      alt=""
                      className="h-12 w-12 shrink-0 rounded-2xl border border-border/12 object-cover"
                    />
                  ) : (
                    <div
                      className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/15 to-accent2/15 text-sm font-black text-accent"
                      aria-hidden
                    >
                      {r.name.replace(/[^A-ZА-ЯЁ]/gi, "").slice(0, 1) || "—"}
                    </div>
                  )}
                  <div className="min-w-0">
                    <div className="font-bold">{r.name}</div>
                    <div className="mt-0.5 text-xs font-medium uppercase tracking-wide text-accent/85">{r.niche}</div>
                  </div>
                </div>
                <div className="mt-3 text-sm text-text/65">{t("reviews.label")}</div>
                <div className="mt-2 flex-1 text-sm leading-relaxed text-text/82">{r.text}</div>
                <div className="mt-4 rounded-2xl border border-border/10 bg-surface/[0.04] px-3 py-2.5 text-xs font-semibold leading-snug text-text/80">
                  {r.outcome}
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

      {/* ФИНАЛ */}
      <section id="consultation" className="mt-20 scroll-mt-24">
        <div className="relative rounded-[32px] border border-border/14 bg-bg/[0.18]">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[32px]"
          >
            <div className="animated-gradient absolute inset-0 opacity-[0.22]" />
            <div className="gradient-orb purple absolute -right-24 -top-24 h-64 w-64 opacity-75" />
          </div>
          <div className="relative z-10 p-6 pb-14 sm:p-10 sm:pb-12">
            <div className="min-w-0 max-w-3xl">
              <Reveal>
                <SectionTitle kickerKey="final.kicker" titleKey="final.title" />
              </Reveal>
              <Reveal delayMs={100}>
                <Button
                  href={siteLinks.telegramBot}
                  variant="primary"
                  className="mt-6 w-full sm:w-auto"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {t("final.cta")}
                </Button>
              </Reveal>
              <Reveal delayMs={160}>
                <p className="mt-5 text-sm leading-relaxed text-text/72">{t("final.subtitle")}</p>
              </Reveal>
            </div>
            <motion.div
              aria-hidden
              className="pointer-events-auto absolute bottom-0 right-0 z-20 w-max translate-x-[12%] translate-y-[18%] sm:translate-x-[18%] sm:translate-y-[24%]"
              initial={reduceMotion ? { opacity: 0.55, y: 0, scale: 1 } : { opacity: 0, y: 6, scale: 0.96 }}
              whileInView={{ opacity: 0.55, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={reduceMotion ? { duration: 0 } : { duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              whileHover={reduceMotion ? undefined : { scale: 1.08, y: -2 }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/chipmunk.png"
                alt=""
                width={48}
                height={48}
                className="h-11 w-11 object-contain drop-shadow-[0_6px_20px_rgba(0,0,0,0.28)] sm:h-12 sm:w-12"
              />
            </motion.div>
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}
