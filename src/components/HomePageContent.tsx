"use client";

/**
 * Главная страница: контент + связка с переводами и калькулятором услуг.
 * Тексты — централизованно в src/lib/messages.ts; ссылки — в src/lib/links.ts.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useCallback, useMemo, useRef, useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Portrait } from "./Portrait";
import { Reveal } from "./Reveal";
import { ServiceCalculator } from "./ServiceCalculator";
import { ServiceOfferGrid } from "./ServiceOfferGrid";
import { ElectricBorder } from "./ElectricBorder";
import { TextType } from "./TextType";
import { Button } from "./ui/Button";
import { NeuroPhotoGallery } from "./NeuroPhotoGallery";

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

function PortfolioMusicTracks({ tracks, listenLabel }: { tracks: readonly string[]; listenLabel: string }) {
  const [active, setActive] = useState<string | null>(null);
  const audioBySrc = useRef<Map<string, HTMLAudioElement>>(new Map());
  /** Игнорируем onPause у трека, который мы сами остановили при переключении */
  const programmaticPause = useRef<Set<string>>(new Set());

  const registerAudio = useCallback((src: string, el: HTMLAudioElement | null) => {
    if (el) audioBySrc.current.set(src, el);
    else audioBySrc.current.delete(src);
  }, []);

  const stopOthers = useCallback((exceptSrc: string) => {
    audioBySrc.current.forEach((audio, key) => {
      if (key !== exceptSrc && !audio.paused) {
        programmaticPause.current.add(key);
        audio.pause();
        queueMicrotask(() => programmaticPause.current.delete(key));
      }
    });
  }, []);

  const handlePlay = useCallback(
    (src: string) => {
      stopOthers(src);
      setActive(src);
    },
    [stopOthers]
  );

  const handlePause = useCallback((src: string) => {
    if (programmaticPause.current.has(src)) return;
    setActive((current) => (current === src ? null : current));
  }, []);

  const handleEnded = useCallback((src: string) => {
    setActive((current) => (current === src ? null : current));
  }, []);

  return (
    <div className="space-y-4">
      {tracks.map((src, idx) => {
        const isPlaying = active === src;
        return (
          <Reveal key={src} delayMs={idx * 70}>
            <ElectricBorder
              borderRadius={24}
              className="min-h-0 w-full"
              accentVariant="accent"
              speed={isPlaying ? 1.05 : 0.88}
              chaos={isPlaying ? 0.13 : 0.11}
              contentClassName="w-full"
            >
              <div
                className={`rounded-3xl bg-bg/[0.16] p-4 backdrop-blur-[1px] transition-[box-shadow,background-color] duration-300 sm:p-5 ${
                  isPlaying ? "bg-accent/[0.09] ring-1 ring-accent/40" : ""
                }`}
              >
                <div className="mb-3 text-sm font-semibold text-text">
                  {listenLabel} <span className="text-text/55">· {idx + 1}</span>
                </div>
                <audio
                  ref={(el) => registerAudio(src, el)}
                  controls
                  preload="metadata"
                  className="h-11 w-full max-w-xl rounded-lg accent-accent"
                  onPlay={() => handlePlay(src)}
                  onPause={() => handlePause(src)}
                  onEnded={() => handleEnded(src)}
                >
                  <source src={src} type="audio/mpeg" />
                </audio>
              </div>
            </ElectricBorder>
          </Reveal>
        );
      })}
    </div>
  );
}

function SectionTitle({ kickerKey, titleKey }: { kickerKey: string; titleKey: string }) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className="mb-6 sm:mb-10"
      initial={reduceMotion ? undefined : { opacity: 0, y: 14, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex items-center gap-3">
        <motion.span
          className="block h-px w-8 shrink-0 origin-left bg-gradient-to-r from-accent to-accent2 sm:w-10"
          aria-hidden
          initial={reduceMotion ? undefined : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
        />
        <div className="text-[0.7rem] sm:text-xs text-text/60 uppercase tracking-[0.22em]">{t(kickerKey)}</div>
      </div>
      <h2 className="font-display mt-3 max-w-3xl text-2xl font-bold leading-[1.12] tracking-tight sm:mt-4 sm:text-3xl md:text-[2.1rem]">
        <span className="bg-clip-text text-transparent bg-gradient-to-br from-text via-text to-text/75">{t(titleKey)}</span>
        <span className="mt-1 block h-1 w-16 rounded-full bg-gradient-to-r from-accent via-accent2 to-warm sm:w-20" aria-hidden />
      </h2>
    </motion.div>
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
  const { t, messages, lang } = useI18n();
  const reduceMotion = useReducedMotion();

  const heroList = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduceMotion ? 0 : 0.09,
        delayChildren: reduceMotion ? 0 : 0.1
      }
    }
  };

  const heroBlock = {
    hidden: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.52, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const heroBullet = {
    hidden: reduceMotion ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.44, ease: [0.22, 1, 0.36, 1] }
    }
  };

  const heroBulletList = {
    hidden: {},
    visible: {
      transition: { staggerChildren: reduceMotion ? 0 : 0.065 }
    }
  };

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
  const painCards = messages.pain.cards;
  const solutionBullets = messages.solution.bullets;

  const heroBullets = useMemo(() => {
    try {
      return JSON.parse(t("hero.bullets")) as string[];
    } catch {
      return [];
    }
  }, [t]);

  const heroTypingLines = useMemo(() => {
    try {
      const raw = t("hero.typingLines");
      const parsed = JSON.parse(raw) as unknown;
      if (Array.isArray(parsed) && parsed.length > 0 && parsed.every((x) => typeof x === "string")) {
        return parsed as string[];
      }
    } catch {
      /* fallthrough */
    }
    return [t("hero.title")];
  }, [t]);

  return (
    <div id="top" className="pb-12 pt-6 sm:pb-16 sm:pt-14">
      {/* HERO */}
      <section className="relative">
        <div className="grid grid-cols-1 items-start gap-4 sm:gap-6 lg:grid-cols-[minmax(0,1.06fr)_minmax(0,0.94fr)] lg:items-center lg:gap-10">
          <div className="order-1 flex min-w-0 flex-col gap-3 sm:gap-5 lg:order-none">
            <div>
              <div className="relative">
                <span
                  className="hero-accent-line absolute -left-1 top-1 hidden h-[min(100%,4.5rem)] w-1 rounded-full bg-gradient-to-b from-accent via-accent2 to-warm sm:block"
                  aria-hidden
                />
                <TextType
                  key={lang}
                  as="h1"
                  text={heroTypingLines}
                  typingSpeed={52}
                  pauseDuration={2400}
                  deletingSpeed={42}
                  showCursor
                  cursorCharacter="_"
                  cursorBlinkDuration={0.5}
                  cursorClassName="text-accent align-baseline"
                  loop
                  initialDelay={280}
                  className="font-display whitespace-pre-line text-[1.6rem] font-bold leading-[1.06] tracking-tight text-text sm:pl-5 sm:text-3xl md:text-4xl lg:text-[2.65rem] lg:leading-[1.04]"
                />
              </div>

              <motion.div
                className="mt-2 sm:mt-0"
                initial="hidden"
                animate="visible"
                variants={heroList}
              >
                <motion.p
                  variants={heroBlock}
                  className="mt-2 max-w-xl whitespace-pre-line text-base leading-relaxed text-text/90 sm:mt-4 sm:text-lg lg:text-xl"
                >
                  {t("hero.subtitle")}
                </motion.p>

                <motion.div variants={heroBlock} className="mt-4 sm:mt-5">
                  <p className="text-sm font-semibold text-text sm:text-base">{t("hero.whatYouGet")}</p>
                  <motion.ul
                    variants={heroBulletList}
                    className="mt-2 max-w-xl space-y-1.5 text-sm leading-relaxed text-text/88 sm:text-base"
                  >
                    {heroBullets.map((line) => (
                      <motion.li key={line} variants={heroBullet} className="flex gap-2.5">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/90" aria-hidden />
                        <span>{line}</span>
                      </motion.li>
                    ))}
                  </motion.ul>
                </motion.div>

                <motion.p
                  variants={heroBlock}
                  className="mt-4 text-xs leading-relaxed text-text/65 sm:mt-5 sm:text-sm"
                >
                  <span>{t("hero.trust1")}</span>
                  <span className="text-text/35"> · </span>
                  <span>{t("hero.trust2")}</span>
                  <span className="text-text/35"> · </span>
                  <span>{t("hero.trust3")}</span>
                </motion.p>
              </motion.div>
            </div>

            <Reveal delayMs={120} blur={false}>
              <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
                <Button
                  href="#services"
                  variant="primary"
                  className="min-h-[48px] w-full px-6 text-base sm:w-auto sm:min-w-[220px]"
                >
                  {t("hero.ctaConsult")}
                </Button>
                <Button href={siteLinks.email} variant="ghost" className="min-h-[48px] w-full border-border/18 px-6 text-base sm:w-auto">
                  {t("hero.ctaRequest")}
                </Button>
              </div>
            </Reveal>
          </div>

          <Reveal className="relative order-2 mt-2 flex w-full justify-center sm:mt-3 lg:order-none lg:mt-0 lg:justify-end">
            <Portrait />
          </Reveal>
        </div>
      </section>

      {/* УСЛУГИ */}
      <section id="services" className="mt-14 scroll-mt-20 sm:mt-20 sm:scroll-mt-24 md:mt-24">
        <SectionTitle kickerKey="serviceOffers.kicker" titleKey="serviceOffers.title" />
        <Reveal>
          <ServiceOfferGrid />
        </Reveal>
        <Reveal delayMs={120}>
          <div className="mt-10 rounded-2xl border border-border/14 bg-bg/[0.22] px-5 py-6 sm:px-8 sm:py-8">
            <h3 className="text-lg font-bold text-text sm:text-xl">{messages.uncertaintyBlock.title}</h3>
            <p className="mt-2 max-w-2xl text-base leading-relaxed text-text/80">{messages.uncertaintyBlock.body}</p>
            <div className="mt-5">
              <Button href={siteLinks.email} variant="primary" className="min-h-[48px] px-6 text-base">
                {messages.uncertaintyBlock.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section id="calculator" className="mt-14 scroll-mt-20 sm:mt-20 sm:scroll-mt-24 md:mt-24">
        <SectionTitle kickerKey="calculatorSection.kicker" titleKey="calculatorSection.title" />
        <ServiceCalculator />
      </section>

      {/* ОБУЧЕНИЕ */}
      <section id="education" className="mt-14 scroll-mt-20 sm:mt-20 sm:scroll-mt-24 md:mt-24">
        <SectionTitle kickerKey="educationSection.kicker" titleKey="educationSection.title" />
        <p className="mb-8 max-w-2xl text-base leading-relaxed text-text/85">{messages.educationSection.lead}</p>
        <p className="mb-8 text-sm font-medium text-text/70">{messages.educationSection.bonuses}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {messages.educationSection.tariffs.map((tariff) => (
            <Reveal key={tariff.id}>
              <div
                className={`flex h-full flex-col rounded-2xl border p-5 sm:p-6 ${
                  tariff.featured
                    ? "border-accent/45 bg-accent/[0.08] ring-1 ring-accent/25"
                    : "border-border/12 bg-bg/[0.18]"
                }`}
              >
                <div className="text-xs font-bold uppercase tracking-widest text-text/55">{tariff.name}</div>
                <div className="mt-3 text-3xl font-black tracking-tight text-text sm:text-4xl">{tariff.price}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text/75">{tariff.blurb}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <Button href={`${siteLinks.email}?subject=${encodeURIComponent(tariff.name)}`} variant="primary" className="min-h-[46px] w-full text-base">
                    {messages.educationSection.ctaChoose}
                  </Button>
                  <Button href={siteLinks.email} variant="ghost" className="min-h-[44px] w-full text-base">
                    {messages.educationSection.ctaRequest}
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="mt-14 scroll-mt-20 sm:mt-20 sm:scroll-mt-24 md:mt-24">
        <SectionTitle kickerKey="about.kicker" titleKey="about.title" />
        <div className="grid items-start gap-8 lg:grid-cols-2 lg:gap-10">
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.985 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.78, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-none"
          >
            <div
              className="relative rounded-[22px] p-[2px] shadow-[0_20px_60px_rgb(0_0_0/0.45)] sm:rounded-[24px]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--accent-rgb) / 0.55), rgb(var(--accent2-rgb) / 0.4), rgb(var(--warm-rgb) / 0.35))"
              }}
            >
              <div className="rounded-[20px] bg-bg/40 p-1 ring-1 ring-white/10 backdrop-blur-[2px] sm:rounded-[22px] sm:p-1.5">
                {/* Лёгкая виньетка без multiply — портрет остаётся читаемым, края чуть уходат в фон */}
                <div className="relative overflow-hidden rounded-[16px] bg-bg sm:rounded-[18px]">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/anastasia-about.png"
                    alt={t("footer.name")}
                    className="relative z-0 mx-auto block h-auto max-h-[320px] w-auto max-w-full object-contain object-center brightness-[1.06] contrast-[1.02] sm:max-h-none lg:mx-0"
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[1] rounded-[inherit]"
                    style={{
                      background:
                        "radial-gradient(ellipse 95% 90% at 50% 45%, transparent 52%, rgb(var(--bg-rgb) / 0.22) 100%)"
                    }}
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[2] rounded-[inherit] bg-gradient-to-b from-bg/18 via-transparent to-bg/28 opacity-80"
                    aria-hidden
                  />
                  <div
                    className="pointer-events-none absolute inset-0 z-[3] rounded-[inherit] opacity-[0.04] mix-blend-overlay"
                    aria-hidden
                    style={{
                      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`
                    }}
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <div className="space-y-6">
            <Reveal delayMs={60}>
              <div className="rounded-3xl border border-border/[0.07] bg-transparent p-4 sm:border-border/12 sm:p-6">
                <p className="whitespace-pre-line leading-relaxed text-text/88">{t("about.p1")}</p>
                <p className="mt-4 whitespace-pre-line leading-relaxed text-text/88">{t("about.p2")}</p>
                <p className="mt-6 text-sm font-semibold text-text/90">{t("about.listLabel")}</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-text/80">
                  {aboutListItems.map((line) => (
                    <li key={line} className="flex gap-2">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/90" aria-hidden />
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
      <section id="pain" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <SectionTitle kickerKey="pain.kicker" titleKey="pain.title" />
        <div className="grid gap-3 md:grid-cols-2">
          {painCards.map((card, idx) => (
            <Reveal key={card} delayMs={idx * 70}>
              <div className="h-full rounded-3xl border border-border/[0.07] bg-bg/[0.18] p-4 transition-all duration-300 hover:border-accent/25 hover:shadow-card-hover sm:border-border/12 sm:p-5 md:p-6">
                <div className="text-sm font-bold leading-snug text-text/90 sm:text-base">{card}</div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={320}>
          <p className="mt-7 max-w-2xl whitespace-pre-line text-base font-semibold leading-relaxed text-text/85 sm:mt-10 sm:text-lg">
            {messages.pain.closing}
          </p>
        </Reveal>
      </section>

      {/* РЕШЕНИЕ */}
      <section id="solution" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <SectionTitle kickerKey="solution.kicker" titleKey="solution.title" />
        <Reveal>
          <div className="rounded-2xl border border-border/12 bg-bg/[0.2] p-5 sm:p-7 md:p-8">
            <div className="text-center text-sm font-semibold tracking-wide text-accent sm:text-base">{messages.solution.flow}</div>
            <ul className="mx-auto mt-8 max-w-xl space-y-3 text-base leading-relaxed text-text/85">
              {solutionBullets.map((line) => (
                <li key={line} className="flex gap-3">
                  <span className="mt-2.5 h-1 w-1 shrink-0 rounded-full bg-accent2/90" aria-hidden />
                  <span>{line}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 flex justify-center">
              <Button href={siteLinks.email} variant="primary" className="min-h-[48px] px-6 text-base">
                {messages.solution.cta}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* PORTFOLIO */}
      <section id="portfolio" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <SectionTitle kickerKey="portfolio.kicker" titleKey="portfolio.title" />
        <p className="mb-5 max-w-2xl text-sm leading-relaxed text-text/72 sm:mb-8">{t("portfolio.intro")}</p>
        <div className="grid gap-4 md:grid-cols-3">
          {portfolioItems.map((item, idx) => (
            <Reveal key={item.title} delayMs={idx * 70}>
              <a
                href={`#${item.anchor}`}
                className="group relative block h-full cursor-pointer overflow-hidden rounded-3xl border border-border/[0.07] bg-surface/[0.03] p-4 no-underline outline-none transition-all duration-500 ease-out will-change-transform hover:scale-[1.02] hover:border-accent/35 hover:shadow-glow focus-visible:ring-2 focus-visible:ring-accent/40 sm:border-border/12 sm:p-6"
              >
                <article className="relative flex h-full flex-col">
                  <h3 className="font-display text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text/72">{item.desc}</p>
                  <span className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent/90">↓</span>
                </article>
              </a>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 space-y-10 sm:mt-16 sm:space-y-16">
          {portfolioItems.map((item, idx) => (
            <div key={item.anchor} id={item.anchor} className="scroll-mt-28">
              <Reveal delayMs={idx * 40}>
                <div className="rounded-3xl border border-border/[0.08] bg-bg/[0.15] p-4 sm:border-border/12 sm:p-6 md:p-8">
                  <h3 className="font-display text-xl font-bold">{item.title}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text/75">{item.desc}</p>

                  {item.anchor === "portfolio-photos" ? <NeuroPhotoGallery photos={PORTFOLIO_PHOTOS} /> : null}

                  {item.anchor === "portfolio-video" && item.casesCta ? (
                    <div className="mt-6">
                      <div className="mb-3 text-sm font-semibold text-text">{t("portfolio.watchClip")}</div>
                      <Button
                        href={siteLinks.telegramPortfolioCases}
                        variant="primary"
                        className="min-h-[48px] w-full transition-transform hover:brightness-110 active:scale-[0.99] sm:w-auto"
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
                    <div className="mt-6">
                      <PortfolioMusicTracks tracks={PORTFOLIO_MUSIC_TRACKS} listenLabel={t("portfolio.listenTrack")} />
                    </div>
                  ) : null}
                </div>
              </Reveal>
            </div>
          ))}
        </div>
      </section>


      {/* AUDIENCE */}
      <section id="audience" className="mt-12 sm:mt-16 md:mt-20">
        <SectionTitle kickerKey="audience.kicker" titleKey="audience.title" />
        <div className="grid gap-4 md:grid-cols-2">
          {audienceItems.map((x, idx) => (
            <Reveal key={x.title} delayMs={idx * 80}>
              <div className="rounded-3xl border border-border/[0.07] bg-bg/20 p-4 transition-all duration-300 hover:border-accent/15 sm:border-border/12 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-display text-lg font-bold">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-text/70">{x.desc}</div>
                  </div>
                  <div className="grid h-11 w-11 place-items-center rounded-2xl border border-border/12 bg-transparent">
                    <span className="font-display font-bold text-accent">{idx + 1}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="mt-12 sm:mt-16 md:mt-20">
        <SectionTitle kickerKey="cases.kicker" titleKey="cases.title" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caseItems.map((c, idx) => (
            <Reveal key={idx} delayMs={idx * 70}>
              <ElectricBorder
                borderRadius={24}
                className="h-full min-h-0"
                accentVariant="accent"
                speed={0.88}
                chaos={0.11}
                contentClassName="h-full"
              >
                <div className="h-full rounded-3xl bg-bg/[0.16] p-4 backdrop-blur-[1px] transition-colors duration-300 sm:p-6">
                  <div className="text-sm text-text/65">{t("cases.task")}</div>
                  <div className="mt-2 font-bold leading-relaxed">{c.task}</div>
                  <div className="mt-5 text-sm text-text/65">{t("cases.solution")}</div>
                  <div className="mt-2 text-sm leading-relaxed text-text/70">{c.solution}</div>
                  <div className="mt-5 text-sm text-text/65">{t("cases.result")}</div>
                  <div className="mt-2 text-sm leading-relaxed text-text/80">{c.result}</div>
                </div>
              </ElectricBorder>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROCESS */}
      <section id="process" className="mt-12 sm:mt-16 md:mt-20">
        <SectionTitle kickerKey="process.kicker" titleKey="process.title" />
        <div className="grid gap-4 md:grid-cols-2">
          {processSteps.map((x, idx) => (
            <Reveal key={x.step} delayMs={idx * 90}>
              <div className="rounded-3xl border border-border/[0.07] bg-bg/20 p-4 transition-all duration-300 hover:border-accent/20 sm:border-border/12 sm:p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="text-sm text-text/70">
                      {messages.process.stepPrefix} {x.step}
                    </div>
                    <div className="font-display mt-1 text-lg font-bold">{x.title}</div>
                    <div className="mt-2 text-sm leading-relaxed text-text/70">{x.desc}</div>
                  </div>
                  <div className="grid h-12 w-12 place-items-center rounded-3xl border border-accent/30 bg-accent/15 shadow-glow">
                    <span className="font-display font-bold text-accent">{x.step}</span>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <SectionTitle kickerKey="reviews.kicker" titleKey="reviews.title" />
        <div className="grid gap-5 md:grid-cols-3">
          {reviewItems.map((r, idx) => (
            <Reveal key={r.name} delayMs={idx * 80}>
              <div className="flex h-full flex-col rounded-3xl border border-border/[0.07] bg-bg/[0.12] p-4 sm:border-border/12 sm:p-6">
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
                      className="font-display grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-accent/25 bg-gradient-to-br from-accent/15 to-accent2/15 text-sm font-bold text-accent"
                      aria-hidden
                    >
                      {r.name.replace(/[^A-ZА-ЯЁ]/gi, "").slice(0, 1) || "—"}
                    </div>
                  )}

                  <div className="min-w-0">
                    <div className="font-bold text-text">{r.name}</div>
                    <div className="mt-0.5 text-xs font-medium text-text/55">{r.niche}</div>
                  </div>
                </div>

                <div className="mt-3 text-xs font-medium uppercase tracking-wide text-text/45">
                  {t("reviews.label")}
                </div>
                <p className="mt-2 flex-1 text-base leading-relaxed text-text/90">{r.text}</p>
                <div className="mt-4 rounded-md border border-dashed border-border/20 bg-bg/[0.25] px-3 py-2.5 text-sm font-medium leading-snug text-text/85">
                  {r.outcome}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* СОЦСЕТИ, КОНТАКТЫ, РЕФЕРАЛЫ */}
      <section id="socials" className="mt-12 sm:mt-16 md:mt-20">
        <SectionTitle kickerKey="socials.kicker" titleKey="socials.title" />
        <div className="rounded-[28px] border border-border/[0.08] bg-bg/20 p-4 sm:rounded-[32px] sm:border-border/12 sm:p-5 md:p-6">
          <p className="text-sm leading-relaxed text-text/70">{t("socials.intro")}</p>

          <div className="mt-6 grid gap-4 lg:grid-cols-3">
            {/* Telegram-канал — акцент */}
            <div className="relative overflow-hidden rounded-3xl border border-accent/25 bg-accent/[0.06] p-4 sm:p-6 lg:col-span-2">
              <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="text-sm text-text/70">{t("socials.tgChannelTitle")}</div>
                  <div className="font-display mt-1 text-lg font-bold">{t("socials.tgChannelSubtitle")}</div>
                  <p className="mt-2 max-w-xl text-sm text-text/80">{t("socials.tgChannelText")}</p>
                </div>
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-3xl border border-border/12 bg-bg/30 text-accent">
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
              className="group flex flex-col rounded-3xl border border-border/[0.07] bg-transparent p-4 transition-all duration-300 hover:border-accent/25 hover:bg-surface/5 sm:border-border/12 sm:p-6"
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
              className="group flex flex-col rounded-3xl border border-border/[0.07] bg-transparent p-4 transition-all duration-300 hover:border-accent/25 sm:border-border/12 sm:p-6"
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
              className="group flex flex-col rounded-3xl border border-border/[0.07] bg-transparent p-4 transition-all duration-300 hover:border-accent/25 sm:border-border/12 sm:p-6"
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
              className="group flex flex-col rounded-3xl border border-border/[0.07] bg-transparent p-4 transition-all duration-300 hover:border-accent/25 sm:border-border/12 sm:p-6"
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
              className="group flex flex-col rounded-3xl border border-border/[0.07] bg-transparent p-4 transition-all duration-300 hover:border-accent/25 sm:border-border/12 sm:p-6 lg:col-span-2"
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
            <h3 className="font-display mt-2 text-xl font-bold">{t("referralSection.title")}</h3>
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
                  <ElectricBorder
                    key={item.key}
                    borderRadius={16}
                    className="h-full min-h-0"
                    accentVariant="accent2"
                    speed={0.85}
                    chaos={0.1}
                    contentClassName="h-full"
                  >
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block h-full rounded-2xl bg-surface/[0.06] p-4 no-underline transition-colors duration-300 hover:bg-surface/[0.1] sm:p-5"
                    >
                      <div className="font-bold text-text">{block.title}</div>
                      <p className="mt-2 text-sm text-text/65">{block.desc}</p>
                      <span className="mt-3 inline-block text-sm font-semibold text-accent2">{block.cta} →</span>
                    </a>
                  </ElectricBorder>
                );
              })}
            </div>
          </div>

          <p className="mt-6 text-xs text-text/50">{t("socials.note")}</p>
        </div>
      </section>

      {/* ФИНАЛ */}
      <section id="consultation" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <div className="relative rounded-[28px] border border-border/[0.08] bg-bg/[0.18] sm:rounded-[32px] sm:border-border/14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] sm:rounded-[32px]"
          >
            <div className="animated-gradient absolute inset-0 opacity-[0.22]" />
            <div className="gradient-orb warm absolute -right-24 -top-24 h-64 w-64 opacity-75" />
          </div>
          <div className="relative z-10 p-5 sm:p-10">
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
          </div>
        </div>
      </section>

      <div className="h-10" />
    </div>
  );
}