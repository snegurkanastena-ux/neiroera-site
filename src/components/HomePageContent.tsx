"use client";

/**
 * Главная страница: контент + связка с переводами и калькулятором услуг.
 * Тексты — централизованно в src/lib/messages.ts; ссылки — в src/lib/links.ts.
 */

import { motion, useReducedMotion } from "framer-motion";
import Image from "next/image";
import { useCallback, useMemo, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Portrait } from "./Portrait";
import { Reveal } from "./Reveal";
import { ServiceCalculator } from "./ServiceCalculator";
import { ServiceOfferGrid } from "./ServiceOfferGrid";
import { ElectricBorder } from "./ElectricBorder";
import { TextType } from "./TextType";
import { EducationTariffDetailModal } from "./EducationTariffDetailModal";
import { LeadForm } from "./LeadForm";
import { SocialContactCard } from "./SocialContactCard";
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

function getPortfolioOpenHref(anchor: string): string {
  if (anchor === "portfolio-photos") return siteLinks.portfolioTelegramPhoto;
  if (anchor === "portfolio-video") return siteLinks.portfolioTelegramVideo;
  if (anchor === "portfolio-music") return siteLinks.melanoMusic;
  return "#";
}

type StreamPlatform = "apple" | "vk" | "yandex";

const STREAM_PLATFORM_BTN: Record<
  StreamPlatform,
  { className: string; focusClass: string }
> = {
  apple: {
    className:
      "bg-gradient-to-b from-[#ff4b6a] to-[#fa233b] text-white shadow-sm hover:brightness-[1.08]",
    focusClass: "focus:ring-rose-400/50"
  },
  vk: {
    className: "bg-[#0077FF] text-white shadow-sm hover:brightness-110",
    focusClass: "focus:ring-blue-400/45"
  },
  yandex: {
    className: "bg-[#0a0a0a] text-[#ffdb4d] border border-[#e8c530]/90 shadow-sm hover:bg-[#141414]",
    focusClass: "focus:ring-[#e8c530]/35"
  }
};

function StreamPlatformButton({
  href,
  children,
  platform,
  className = "",
  compact
}: {
  href: string;
  children: ReactNode;
  platform: StreamPlatform;
  className?: string;
  /** Компактные отступы и кегль — в один ряд в шапке «Музыка» */
  compact?: boolean;
}) {
  const s = STREAM_PLATFORM_BTN[platform];
  const sizeCls = compact
    ? "min-h-0 min-w-0 max-w-full whitespace-nowrap px-2 py-2 text-[0.7rem] sm:min-h-[40px] sm:px-3.5 sm:py-2.5 sm:text-sm"
    : "min-h-[40px] min-w-0 max-w-full px-3.5 py-2.5 text-sm";
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-1.5 rounded-2xl text-center font-semibold tracking-tight no-underline outline-none transition-all duration-200 hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-0 focus:ring-offset-bg ${sizeCls} ${s.className} ${s.focusClass} ${className}`}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring" as const, stiffness: 520, damping: 32, mass: 0.35 }}
    >
      {children}
    </motion.a>
  );
}

function PortfolioMusicTracks({
  tracks,
  trackNames,
  listenLabel
}: {
  tracks: readonly string[];
  trackNames: string[];
  listenLabel: string;
}) {
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
    <div>
      <div className="space-y-4">
        {tracks.map((src, idx) => {
          const isPlaying = active === src;
          const name = trackNames[idx] ?? "";
          return (
            <Reveal key={src} delayMs={idx * 70}>
              <ElectricBorder
                borderRadius={24}
                className="ne-card-hover min-h-0 w-full"
                accentVariant="accent"
                speed={isPlaying ? 1.05 : 0.88}
                chaos={isPlaying ? 0.13 : 0.11}
                contentClassName="w-full"
              >
                <div
                  className={`rounded-3xl bg-bg/[0.16] p-4 backdrop-blur-[1px] sm:p-5 ${
                    isPlaying ? "bg-accent/[0.09] ring-1 ring-accent/40" : ""
                  }`}
                >
                  <div className="ne-card-hover__inner">
                    <div className="mb-3 text-sm font-semibold text-text">
                      {listenLabel} <span className="text-text/55">· {idx + 1}</span>
                    </div>
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-stretch sm:gap-3 md:gap-4">
                      <audio
                        ref={(el) => registerAudio(src, el)}
                        controls
                        preload="metadata"
                        className="h-11 w-full min-w-0 shrink-0 rounded-lg accent-accent sm:max-w-[min(100%,26rem)]"
                        onPlay={() => handlePlay(src)}
                        onPause={() => handlePause(src)}
                        onEnded={() => handleEnded(src)}
                      >
                        <source src={src} type="audio/mpeg" />
                      </audio>
                      {name ? (
                        <div className="flex min-w-0 flex-1 items-center justify-end sm:pl-1 md:pl-2">
                          <p className="w-full min-w-0 break-words text-balance text-right text-xl font-bold leading-tight tracking-tight text-text sm:text-2xl md:max-w-none md:text-[1.6rem]">
                            {name}
                          </p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </div>
              </ElectricBorder>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}

type AboutPanelId = "who" | "what" | "why";

/** Подзаголовок в блоке «Обо мне»: линия + display — без капс-маркеров. */
function AboutSubsectionHeader({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 items-center gap-2.5 sm:gap-3">
      <span
        className="h-px w-5 shrink-0 bg-gradient-to-r from-accent to-accent2/50 sm:w-7"
        aria-hidden
      />
      <span className="min-w-0 text-left font-display text-base font-semibold leading-snug tracking-tight text-text sm:text-[1.05rem]">
        {children}
      </span>
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

/** Заголовок секции услуг: тот же визуальный каркас, что у SectionTitle, плюс «печать» как в hero */
function ServicesSectionTitle() {
  const { t, lang } = useI18n();
  const reduceMotion = useReducedMotion();

  const kickerLine = (
    <div className="flex items-center gap-3">
      <motion.span
        className="block h-px w-8 shrink-0 origin-left bg-gradient-to-r from-accent to-accent2 sm:w-10"
        aria-hidden
        initial={reduceMotion ? undefined : { scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1], delay: 0.06 }}
      />
      <div className="text-[0.7rem] sm:text-xs text-text/60 uppercase tracking-[0.22em]">{t("serviceOffers.kicker")}</div>
    </div>
  );

  const underline = (
    <span className="mt-1 block h-1 w-16 rounded-full bg-gradient-to-r from-accent via-accent2 to-warm sm:w-20" aria-hidden />
  );

  if (reduceMotion) {
    return (
      <div className="mb-6 sm:mb-10">
        {kickerLine}
        <h2 className="font-display mt-3 max-w-3xl text-2xl font-bold leading-[1.12] tracking-tight sm:mt-4 sm:text-3xl md:text-[2.1rem]">
          <span className="bg-clip-text text-transparent bg-gradient-to-br from-text via-text to-text/75">{t("serviceOffers.title")}</span>
          {underline}
        </h2>
      </div>
    );
  }

  return (
    <motion.div
      className="mb-6 sm:mb-10"
      initial={{ opacity: 0, y: 14, filter: "blur(5px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.35 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
    >
      {kickerLine}
      <div className="mt-3 sm:mt-4">
        <TextType
          key={lang}
          as="h2"
          text={t("serviceOffers.title")}
          loop={false}
          startOnVisible
          typingSpeed={52}
          deletingSpeed={42}
          pauseDuration={2400}
          initialDelay={280}
          showCursor
          cursorCharacter="_"
          cursorBlinkDuration={0.5}
          cursorClassName="text-accent align-baseline"
          className="font-display max-w-3xl whitespace-pre-line text-2xl font-bold leading-[1.12] tracking-tight sm:text-3xl md:text-[2.1rem] bg-clip-text text-transparent bg-gradient-to-br from-text via-text to-text/75"
        />
        {underline}
      </div>
    </motion.div>
  );
}

export function HomePageContent() {
  const { t, messages, lang } = useI18n();
  const reduceMotion = useReducedMotion();
  const [leadFormOpen, setLeadFormOpen] = useState(false);
  const openLeadForm = useCallback(() => setLeadFormOpen(true), []);
  const [aboutPanel, setAboutPanel] = useState<AboutPanelId | null>("who");
  const toggleAboutPanel = useCallback((id: AboutPanelId) => {
    setAboutPanel((prev) => (prev === id ? null : id));
  }, []);
  const [educationTariffId, setEducationTariffId] = useState<string | null>(null);
  const educationTariffForModal = useMemo(
    () => messages.educationSection.tariffs.find((x) => x.id === educationTariffId) ?? null,
    [messages.educationSection.tariffs, educationTariffId]
  );
  const openEducationTariff = useCallback((id: string) => setEducationTariffId(id), []);
  const requestQuoteFromEducationTariff = useCallback(() => {
    setEducationTariffId(null);
    setLeadFormOpen(true);
  }, []);

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

  const aboutResultItems = useMemo(() => {
    try {
      return JSON.parse(t("about.whatResults")) as string[];
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
  const painDiagnosticsMailto = useMemo(() => {
    const addr = siteLinks.email.replace(/^mailto:/, "");
    return `mailto:${addr}?subject=${encodeURIComponent(messages.pain.diagnosticsMailSubject)}`;
  }, [messages.pain.diagnosticsMailSubject]);
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
                <Button
                  variant="ghost"
                  className="min-h-[48px] w-full border-border/18 px-6 text-base sm:w-auto"
                  onClick={openLeadForm}
                >
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
        <ServicesSectionTitle />
        <Reveal>
          <ServiceOfferGrid />
        </Reveal>
      </section>

      {/* КАЛЬКУЛЯТОР */}
      <section id="calculator" className="mt-14 scroll-mt-20 sm:mt-20 sm:scroll-mt-24 md:mt-24">
        <SectionTitle kickerKey="calculatorSection.kicker" titleKey="calculatorSection.title" />
        <p className="mb-6 max-w-2xl text-sm leading-relaxed text-text/78 sm:mb-7 sm:text-base">
          {messages.calculatorSection.intro}
        </p>
        <ServiceCalculator onOpenLeadForm={openLeadForm} />
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
                className={`ne-card-hover flex h-full flex-col p-5 sm:p-6 ${
                  tariff.featured ? "border-accent/45 bg-accent/[0.08] ring-1 ring-accent/25" : ""
                }`}
              >
                <div className="ne-card-hover__inner flex h-full flex-col">
                <div className="text-xs font-bold uppercase tracking-widest text-text/55">{tariff.name}</div>
                <div className="mt-3 text-3xl font-black tracking-tight text-text sm:text-4xl">{tariff.price}</div>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-text/75">{tariff.blurb}</p>
                <div className="mt-6 flex flex-col gap-2">
                  <Button
                    variant="primary"
                    className="min-h-[46px] w-full text-base"
                    onClick={() => openEducationTariff(tariff.id)}
                  >
                    {messages.educationSection.ctaChoose}
                  </Button>
                  <Button variant="ghost" className="min-h-[44px] w-full text-base" onClick={openLeadForm}>
                    {messages.educationSection.ctaRequest}
                  </Button>
                </div>
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
            className="self-start mx-auto flex w-full max-w-[min(100%,18rem)] justify-center sm:max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-full lg:justify-start"
          >
            <div className="w-max max-w-full">
            <div
              className="relative rounded-[22px] p-[2px] shadow-[0_20px_60px_rgb(0_0_0/0.45)] sm:rounded-[24px]"
              style={{
                background:
                  "linear-gradient(135deg, rgb(var(--accent-rgb) / 0.55), rgb(var(--accent2-rgb) / 0.4), rgb(var(--warm-rgb) / 0.35))"
              }}
            >
              <div className="rounded-[20px] bg-bg/40 p-1 ring-1 ring-white/10 backdrop-blur-[2px] sm:rounded-[22px] sm:p-1.5">
                {/* Рамка плотно облегает снимок: контейнер w-max, без растянутой полосы bg по ширине колонки */}
                <div className="relative w-max max-w-full overflow-hidden rounded-[16px] bg-bg sm:rounded-[18px]">
                  <Image
                    src="/images/anastasia-about.png"
                    alt={t("footer.name")}
                    width={520}
                    height={680}
                    sizes="(max-width: 1024px) 90vw, 400px"
                    className="relative z-0 block h-auto max-h-[320px] w-auto max-w-full object-contain object-center brightness-[1.06] contrast-[1.02] sm:max-h-none"
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
            </div>
          </motion.div>

          <div className="min-h-0 min-w-0 w-full self-start">
            <Reveal delayMs={60}>
              <div className="ne-card-hover flex max-h-[min(70vh,28rem)] flex-col overflow-hidden p-0 sm:max-h-[min(78vh,32rem)] lg:max-h-[min(32rem,85svh)]">
                <div className="ne-card-hover__inner flex min-h-0 flex-1 flex-col p-4 sm:p-5">
                  <div
                    className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-0.5 [scrollbar-color:rgb(var(--border-rgb)/0.4)_transparent] [scrollbar-width:thin] sm:space-y-1"
                    style={{ WebkitOverflowScrolling: "touch" } as CSSProperties}
                  >
                    {/* Кто я */}
                    <div className="rounded-xl border border-border/[0.07] bg-surface/[0.03] sm:overflow-hidden sm:rounded-2xl">
                      <button
                        type="button"
                        onClick={() => toggleAboutPanel("who")}
                        aria-expanded={aboutPanel === "who"}
                        className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left transition hover:bg-surface/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 sm:px-3.5 sm:py-3.5"
                      >
                        <AboutSubsectionHeader>{t("about.whoLabel")}</AboutSubsectionHeader>
                        <span className="shrink-0 pl-1 text-xs text-text/50">
                          <span aria-hidden>{aboutPanel === "who" ? "▼" : "▶"}</span>{" "}
                          {aboutPanel === "who" ? messages.serviceOffers.collapse : messages.serviceOffers.expand}
                        </span>
                      </button>
                      {aboutPanel === "who" ? (
                        <div className="px-3 pb-3.5 pl-4 pr-2 text-sm leading-relaxed text-text/88 sm:px-3.5 sm:pl-5 sm:pb-4 sm:text-[0.95rem]">
                          <p className="whitespace-pre-line">{t("about.whoBody")}</p>
                        </div>
                      ) : null}
                    </div>
                    {/* Что вы получите */}
                    <div className="rounded-xl border border-border/[0.07] bg-surface/[0.03] sm:overflow-hidden sm:rounded-2xl">
                      <button
                        type="button"
                        onClick={() => toggleAboutPanel("what")}
                        aria-expanded={aboutPanel === "what"}
                        className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left transition hover:bg-surface/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 sm:px-3.5 sm:py-3.5"
                      >
                        <AboutSubsectionHeader>{t("about.whatLabel")}</AboutSubsectionHeader>
                        <span className="shrink-0 pl-1 text-xs text-text/50">
                          <span aria-hidden>{aboutPanel === "what" ? "▼" : "▶"}</span>{" "}
                          {aboutPanel === "what" ? messages.serviceOffers.collapse : messages.serviceOffers.expand}
                        </span>
                      </button>
                      {aboutPanel === "what" ? (
                        <div className="space-y-3 border-t border-border/8 px-3 pb-3.5 pl-[1.1rem] pr-2 pt-2.5 text-sm leading-relaxed text-text/88 sm:pl-[1.2rem] sm:pr-3.5 sm:pb-4 sm:pt-3 sm:text-[0.95rem]">
                          <p className="whitespace-pre-line">{t("about.whatLead")}</p>
                          <p className="rounded-lg border border-border/12 bg-surface/[0.06] px-3 py-2.5 text-sm font-medium text-text/90 sm:text-base">
                            {t("about.whatFlow")}
                          </p>
                          <p className="text-sm font-semibold text-text/90">{t("about.whatResultsLabel")}</p>
                          <ul className="space-y-2 text-sm leading-relaxed text-text/80">
                            {aboutResultItems.map((line) => (
                              <li key={line} className="flex gap-2">
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent/90" aria-hidden />
                                <span>{line}</span>
                              </li>
                            ))}
                          </ul>
                          <p className="whitespace-pre-line text-text/88">{t("about.whatEntry")}</p>
                          <p className="text-text/85">{t("about.whatReinforce")}</p>
                        </div>
                      ) : null}
                    </div>
                    {/* Опыт и ориентир */}
                    <div className="rounded-xl border border-border/[0.07] bg-surface/[0.03] sm:overflow-hidden sm:rounded-2xl">
                      <button
                        type="button"
                        onClick={() => toggleAboutPanel("why")}
                        aria-expanded={aboutPanel === "why"}
                        className="flex w-full items-center justify-between gap-2 rounded-xl px-3 py-3 text-left transition hover:bg-surface/6 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/35 sm:px-3.5 sm:py-3.5"
                      >
                        <AboutSubsectionHeader>{t("about.whyLabel")}</AboutSubsectionHeader>
                        <span className="shrink-0 pl-1 text-xs text-text/50">
                          <span aria-hidden>{aboutPanel === "why" ? "▼" : "▶"}</span>{" "}
                          {aboutPanel === "why" ? messages.serviceOffers.collapse : messages.serviceOffers.expand}
                        </span>
                      </button>
                      {aboutPanel === "why" ? (
                        <div className="border-t border-border/8 px-3 pb-3.5 pl-4 pr-2 pt-2.5 text-sm leading-relaxed text-text/88 sm:pl-5 sm:pr-3.5 sm:pb-4 sm:pt-3 sm:text-[0.95rem]">
                          <p className="whitespace-pre-line">{t("about.whyBody")}</p>
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <p className="mt-3 shrink-0 whitespace-pre-line border-t border-border/10 py-3 text-sm font-bold leading-snug text-text/95 sm:text-base">
                    {t("about.finalBlock")}
                  </p>
                </div>
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
              <div className="ne-card-hover h-full p-4 sm:p-5 md:p-6">
                <div className="ne-card-hover__inner">
                  <div className="text-sm font-bold leading-snug text-text/90 sm:text-base">{card}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal delayMs={320}>
          <div className="mt-7 flex flex-col items-stretch gap-4 sm:mt-10 sm:flex-row sm:items-end sm:justify-between sm:gap-6">
            <p className="max-w-2xl whitespace-pre-line text-base font-semibold leading-relaxed text-text/85 sm:text-lg">
              {messages.pain.closing}
            </p>
            <div className="shrink-0 self-start sm:self-auto sm:pb-0.5">
              <Button
                href={painDiagnosticsMailto}
                variant="primary"
                className="min-h-[48px] w-full min-w-0 sm:w-auto sm:min-w-[12rem] sm:px-6"
                target="_self"
              >
                {messages.pain.diagnosticsCta}
              </Button>
            </div>
          </div>
        </Reveal>
      </section>

      {/* РЕШЕНИЕ */}
      <section id="solution" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <SectionTitle kickerKey="solution.kicker" titleKey="solution.title" />
        <Reveal>
  <div className="ne-card-hover p-5 sm:p-7 md:p-8">
    <div className="ne-card-hover__inner">
    <div className="text-center text-sm font-semibold tracking-wide text-accent sm:text-base">
      {messages.solution.flow}
    </div>

    <ul className="mx-auto mt-10 max-w-2xl space-y-5 text-xl sm:text-2xl leading-snug text-text">
      {solutionBullets.map((line) => (
        <li key={line} className="flex items-start gap-4 text-xl sm:text-2xl font-medium">
          <span
            className="mt-3 h-2 w-2 shrink-0 rounded-full bg-accent shadow-[0_0_10px_rgba(0,255,200,0.35)]"
            aria-hidden
          />
          <span>{line}</span>
        </li>
      ))}
    </ul>

    <div className="mt-8 flex justify-center">
      <Button
        variant="primary"
        className="min-h-[48px] px-6 text-base"
        onClick={openLeadForm}
      >
        {messages.solution.cta}
      </Button>
    </div>
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
              <div className="ne-card-hover flex h-full flex-col p-4 sm:p-6">
                <div className="ne-card-hover__inner flex h-full min-h-0 flex-col">
                  <h3 className="font-display text-lg font-bold text-text">{item.title}</h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-text/72">{item.desc}</p>
                  <div className="mt-4">
                    <Button
                      href={getPortfolioOpenHref(item.anchor)}
                      variant="primary"
                      className="w-full"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {t("portfolio.open")}
                    </Button>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-10 space-y-10 sm:mt-16 sm:space-y-16">
          {portfolioItems.map((item, idx) => (
            <div key={item.anchor} id={item.anchor} className="scroll-mt-28">
              <Reveal delayMs={idx * 40}>
                <div className="ne-card-hover p-4 sm:p-6 md:p-8">
                  <div className="ne-card-hover__inner">
                  {item.anchor === "portfolio-music" ? (
                    <div>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-[minmax(0,1fr)_auto] sm:items-start sm:gap-x-6 sm:gap-y-1.5">
                        <h3 className="min-w-0 max-w-2xl font-display text-xl font-bold leading-tight sm:col-start-1 sm:row-start-1">
                          {item.title}
                        </h3>
                        <p className="mt-0 min-w-0 max-w-2xl text-sm leading-relaxed text-text/75 sm:col-start-1 sm:row-start-2 sm:mt-0 sm:pt-0">
                          {item.desc}
                        </p>
                        <div className="sm:col-start-2 sm:row-start-1 sm:flex sm:shrink-0 sm:items-start sm:justify-end sm:pl-1 sm:pt-0.5">
                          <div className="whitespace-nowrap text-xs font-semibold uppercase tracking-wider text-text/55 sm:text-right">
                            {t("portfolio.listenHeading")}
                          </div>
                        </div>
                        <div className="flex w-full min-w-0 max-w-full flex-nowrap items-center justify-start gap-1.5 overflow-x-auto px-0.5 pb-0.5 [scrollbar-width:thin] sm:col-start-2 sm:row-start-2 sm:mx-0 sm:w-auto sm:max-w-none sm:justify-end sm:overflow-visible sm:pl-1 sm:pr-0 sm:pb-0 sm:pt-0 sm:gap-2">
                          {(
                            [
                              { href: siteLinks.musicApple, label: t("portfolio.streamApple"), platform: "apple" as const },
                              { href: siteLinks.musicVk, label: t("portfolio.streamVk"), platform: "vk" as const },
                              { href: siteLinks.musicYandex, label: t("portfolio.streamYandex"), platform: "yandex" as const }
                            ] as const
                          ).map((l) => (
                            <StreamPlatformButton key={l.href} href={l.href} platform={l.platform} compact>
                              {l.label}
                            </StreamPlatformButton>
                          ))}
                        </div>
                      </div>
                    </div>
                  ) : item.anchor === "portfolio-video" && item.casesCta ? (
                    <div className="overflow-hidden rounded-2xl border border-border/12 bg-surface/[0.04] px-3 py-2.5 sm:px-5 sm:py-3">
                      <div className="flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between sm:gap-4">
                        <div className="min-w-0 flex-1 sm:pr-2">
                          <h3 className="font-display text-lg font-bold leading-tight sm:text-xl">{item.title}</h3>
                          <p className="mt-0.5 text-sm leading-snug text-text/75 sm:mt-1 sm:text-[0.95rem] sm:leading-relaxed">
                            {item.desc}
                          </p>
                        </div>
                        <Button
                          href={siteLinks.portfolioTelegramVideo}
                          variant="primary"
                          className="h-10 min-h-0 w-full shrink-0 justify-center rounded-2xl px-4 text-sm sm:h-11 sm:w-auto sm:min-w-[11.5rem] sm:self-center"
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.casesCta}
                        </Button>
                      </div>
                      {item.casesNote ? (
                        <p className="mt-2.5 text-[0.7rem] leading-relaxed text-text/50 sm:mt-2 sm:text-xs">
                          {item.casesNote}
                        </p>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      <h3 className="font-display text-xl font-bold">{item.title}</h3>
                      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-text/75">{item.desc}</p>
                    </>
                  )}

                  {item.anchor === "portfolio-photos" ? <NeuroPhotoGallery photos={PORTFOLIO_PHOTOS} /> : null}

                  {item.anchor === "portfolio-music" ? (
                    <div className="mt-6">
                      <PortfolioMusicTracks
                        tracks={PORTFOLIO_MUSIC_TRACKS}
                        trackNames={[
                          messages.portfolio.musicTrack1,
                          messages.portfolio.musicTrack2,
                          messages.portfolio.musicTrack3,
                          messages.portfolio.musicTrack4,
                          messages.portfolio.musicTrack5
                        ]}
                        listenLabel={t("portfolio.listenTrack")}
                      />
                    </div>
                  ) : null}
                  </div>
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
              <div className="ne-card-hover p-4 sm:p-6">
                <div className="ne-card-hover__inner">
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
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CASES */}
      <section id="cases" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <SectionTitle kickerKey="cases.kicker" titleKey="cases.title" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {caseItems.map((c, idx) => (
            <Reveal key={idx} delayMs={idx * 70}>
              <ElectricBorder
                borderRadius={24}
                className="ne-card-hover h-full min-h-0"
                accentVariant="accent"
                speed={0.88}
                chaos={0.11}
                contentClassName="h-full"
              >
                <div className="h-full rounded-3xl bg-bg/[0.16] p-4 backdrop-blur-[1px] sm:p-6">
                  <div className="ne-card-hover__inner h-full">
                  <div className="text-sm text-text/65">{t("cases.task")}</div>
                  <div className="mt-2 font-bold leading-relaxed">{c.task}</div>
                  <div className="mt-5 text-sm text-text/65">{t("cases.solution")}</div>
                  <div className="mt-2 text-sm leading-relaxed text-text/70">{c.solution}</div>
                  <div className="mt-5 text-sm text-text/65">{t("cases.result")}</div>
                  <div className="mt-2 text-sm leading-relaxed text-text/80">{c.result}</div>
                  </div>
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
              <div className="ne-card-hover p-4 sm:p-6">
                <div className="ne-card-hover__inner">
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
    <div className="ne-card-hover flex h-full flex-col p-4 sm:p-6">
      <div className="ne-card-hover__inner flex h-full flex-col">
        <div className="flex items-start gap-4">
        <div className="relative h-16 w-16 min-h-16 min-w-16 shrink-0 overflow-hidden rounded-full">
            {r.photo ? (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={r.photo}
                  alt={r.name}
                  className="absolute inset-0 w-full h-full object-cover"
                />

                <div
                  style={{ display: "none" }}
                  className="absolute inset-0 grid place-items-center text-sm font-semibold text-text/70"
                >
                  {r.name?.slice(0, 1)}
                </div>
              </>
            ) : (
              <div className="absolute inset-0 grid place-items-center text-sm font-semibold text-text/70">
                {r.name?.slice(0, 1)}
              </div>
            )}
          </div>

          <div>
            <div className="font-bold text-text">{r.name}</div>
            <div className="mt-0.5 text-xs font-medium text-text/55">{r.niche}</div>
          </div>
        </div>

        <div className="mt-3 text-xs font-medium uppercase tracking-wide text-text/45">
          {t("reviews.label")}
        </div>

        <p className="mt-2 flex-1 text-base leading-relaxed text-text/90">{r.text}</p>

        <div className="mt-4 rounded-md border border-dashed border-border/20 bg-bg/[0.25] p-4">
          {r.outcome}
        </div>
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

          <div className="mt-6 grid grid-cols-1 items-stretch gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Reveal delayMs={0}>
              <SocialContactCard
                brand="telegram"
                title={t("socials.tgChannelTitle")}
                subtitle={t("socials.tgChannelSubtitle")}
                description={t("socials.tgChannelText")}
                cta={t("socials.tgCta")}
                href={siteLinks.telegramChannel}
              />
            </Reveal>
            <Reveal delayMs={40}>
              <SocialContactCard
                brand="vk"
                title={t("socials.vkChannelTitle")}
                subtitle={t("socials.vkBrand")}
                description={t("socials.vkChannelText")}
                cta={t("socials.vkChannelCta")}
                href={siteLinks.vkChannel}
              />
            </Reveal>
            <Reveal delayMs={80}>
              <SocialContactCard
                brand="max"
                title={t("socials.maxTitle")}
                subtitle={t("socials.maxSubtitle")}
                description={t("socials.maxText")}
                cta={t("socials.maxCta")}
                href={siteLinks.maxChannel}
              />
            </Reveal>
            <Reveal delayMs={120}>
              <SocialContactCard
                brand="vk"
                title={t("socials.vkPageTitle")}
                subtitle={t("socials.vkBrand")}
                description={t("socials.vkPageText")}
                cta={t("socials.vkPageCta")}
                href={siteLinks.vkPage}
              />
            </Reveal>
            <Reveal delayMs={160}>
              <SocialContactCard
                brand="instagram"
                title={t("socials.instagramTitle")}
                subtitle={t("socials.instagramSubtitle")}
                description={t("socials.instagramText")}
                cta={t("socials.instagramCta")}
                href={siteLinks.instagram}
                legalNote={t("socials.instagramLegal")}
              />
            </Reveal>
            <Reveal delayMs={200}>
              <SocialContactCard
                brand="melano"
                title={t("socials.melanoTitle")}
                subtitle={t("socials.melanoSubtitle")}
                description={t("socials.melanoText")}
                cta={t("socials.melanoCta")}
                href={siteLinks.melanoMusic}
              />
            </Reveal>
            <Reveal delayMs={240}>
              <SocialContactCard
                brand="bot"
                title={t("socials.tgBotTitle")}
                subtitle={t("socials.tgBotSubtitle")}
                description={t("socials.tgBotText")}
                cta={t("socials.tgBotCta")}
                href={siteLinks.telegramBot}
                emphasized
              />
            </Reveal>
            <Reveal delayMs={280}>
              <SocialContactCard
                brand="email"
                title={t("socials.emailTitle")}
                subtitle="neuroera@yandex.com"
                description={t("socials.emailText")}
                cta={t("socials.emailCta")}
                href={siteLinks.email}
                isMailto
                emphasized
              />
            </Reveal>
            <Reveal delayMs={320}>
              <SocialContactCard
                brand="portfolio"
                title={t("socials.portfolioVibeTitle")}
                subtitle={t("socials.portfolioVibeSubtitle")}
                description={t("socials.portfolioVibeText")}
                cta={t("socials.portfolioVibeCta")}
                href={siteLinks.portfolioVibecoding}
              />
            </Reveal>
          </div>

          {/* Реферальные ссылки */}
          <div className="mt-10 border-t border-border/10 pt-8">
            <div className="text-xs uppercase tracking-widest text-text/55">{t("referralSection.kicker")}</div>
            <h3 className="font-display mt-2 text-xl font-bold">{t("referralSection.title")}</h3>
            <p className="mt-2 max-w-2xl text-sm text-text/65">{t("referralSection.intro")}</p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {(
                [
                  { key: "syntx" as const, href: siteLinks.referrals.syntxBot },
                  { key: "suno" as const, href: siteLinks.referrals.suno },
                  { key: "vezarys" as const, href: siteLinks.referrals.vezarysVpn },
                  { key: "sferoom" as const, href: siteLinks.referrals.sferoom },
                  { key: "prodamus" as const, href: siteLinks.referrals.prodamus },
                  { key: "edaSibiri" as const, href: siteLinks.referrals.edaSibiri }
                ] as const
              ).map((item) => {
                const block = messages.referrals[item.key];
                return (
                  <ElectricBorder
                    key={item.key}
                    borderRadius={16}
                    className="ne-card-hover-sm h-full min-h-0"
                    accentVariant="accent2"
                    speed={0.85}
                    chaos={0.1}
                    contentClassName="h-full"
                  >
                    <div className="flex h-full flex-col rounded-2xl bg-surface/[0.06] p-4 sm:p-5">
                      <div className="ne-card-hover__inner flex min-h-0 flex-1 flex-col">
                        <div className="font-bold text-text">{block.title}</div>
                        <p className="mt-2 flex-1 text-sm leading-relaxed text-text/65">{block.desc}</p>
                        <div className="mt-4">
                          <Button
                            href={item.href}
                            variant="primary"
                            className="w-full"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {block.cta}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </ElectricBorder>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ФИНАЛ */}
      <section id="consultation" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
        <div className="ne-card-hover ne-card-hover--consult relative border-border/[0.08] bg-bg/[0.18] sm:border-border/14">
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px] sm:rounded-[32px]"
          >
            <div className="animated-gradient absolute inset-0 opacity-[0.22]" />
            <div className="gradient-orb warm absolute -right-24 -top-24 h-64 w-64 opacity-75" />
          </div>
          <div className="relative z-10 p-5 sm:p-10">
            <div className="ne-card-hover__inner min-w-0 max-w-3xl">
              <Reveal>
                <SectionTitle kickerKey="final.kicker" titleKey="final.title" />
              </Reveal>
              <Reveal delayMs={100}>
                <Button variant="primary" className="mt-6 w-full sm:w-auto" onClick={openLeadForm}>
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

      {/* Онлайн-оплата (Prodamus / payform) */}
      <section className="mt-12 sm:mt-16 md:mt-20" aria-labelledby="payment-block-title">
        <Reveal>
          <div className="ne-card-hover px-5 py-6 sm:px-8 sm:py-7">
            <div className="ne-card-hover__inner">
            <h2 id="payment-block-title" className="font-display text-xl font-bold tracking-tight text-text sm:text-2xl">
              {messages.paymentBlock.title}
            </h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-text/80 sm:text-base">{messages.paymentBlock.text}</p>
            <p className="mt-3 text-sm font-medium text-accent/95">{messages.paymentBlock.promo}</p>
            <div className="mt-5">
              <Button
                href="https://neuroera.payform.ru"
                variant="primary"
                className="min-h-[48px] px-6 text-base"
                target="_blank"
                rel="noopener noreferrer"
              >
                {messages.paymentBlock.cta}
              </Button>
            </div>
            </div>
          </div>
        </Reveal>
      </section>

      <div className="h-10" />

      <EducationTariffDetailModal
        open={educationTariffForModal !== null}
        onClose={() => setEducationTariffId(null)}
        onRequestQuote={requestQuoteFromEducationTariff}
        tariff={educationTariffForModal}
        bonusesBlockTitle={messages.educationSection.bonusesBlockTitle}
        bonusesBlockBody={messages.educationSection.bonusesBlockBody}
        ctaRequest={messages.educationSection.ctaRequest}
      />
      <LeadForm open={leadFormOpen} onClose={() => setLeadFormOpen(false)} />
    </div>
  );
}