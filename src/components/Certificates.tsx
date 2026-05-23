"use client";

import Image from "next/image";
import { Reveal } from "./Reveal";

const certificates = [
  {
    title: "Практический курс: Нейровидео с 0 до Pro",
    src: "/certificates/neurovideo-c-do-pro.jpg"
  },
  {
    title: "GPT-агенты и AI-боты",
    src: "/certificates/gpt-agenty-i-ai-boty.jpg"
  },
  {
    title: "Вайб-кодинг: с 0 до Pro",
    src: "/certificates/vibe-coding-c-do-pro.jpg"
  },
  {
    title: "SMM - OPTIMA",
    src: "/certificates/smm-optima.jpg"
  },
  {
    title: "Нейросети для контента, бизнеса и творчества",
    src: "/certificates/prompt-inzhener-specialist-po-nejrosetyam.jpg"
  }
] as const;

export function Certificates() {
  return (
    <section id="certificates" className="mt-12 scroll-mt-20 sm:mt-16 sm:scroll-mt-24 md:mt-20">
      <Reveal>
        <div className="mb-6 sm:mb-10">
          <div className="flex items-center gap-3">
            <span className="block h-px w-8 shrink-0 bg-gradient-to-r from-accent to-accent2 sm:w-10" aria-hidden />
            <div className="text-[0.7rem] uppercase tracking-[0.22em] text-text/60 sm:text-xs">
              Подтверждение квалификации
            </div>
          </div>
          <h2 className="font-display mt-3 max-w-3xl text-2xl font-bold leading-[1.12] tracking-tight sm:mt-4 sm:text-3xl md:text-[2.1rem]">
            <span className="bg-gradient-to-br from-text via-text to-text/75 bg-clip-text text-transparent">
              Сертификаты
            </span>
            <span
              className="mt-1 block h-1 w-16 rounded-full bg-gradient-to-r from-accent via-accent2 to-warm sm:w-20"
              aria-hidden
            />
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-text/72 sm:text-base">
            Документы о прохождении профильного обучения по AI, GPT, контенту, автоматизации и digital-направлениям
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((certificate, idx) => (
          <Reveal key={certificate.src} delayMs={idx * 70}>
            <a
              href={certificate.src}
              target="_blank"
              rel="noopener noreferrer"
              className="ne-card-hover group flex h-full flex-col overflow-hidden p-3 no-underline outline-none focus-visible:ring-2 focus-visible:ring-accent/45 sm:p-4"
              aria-label={`Открыть сертификат: ${certificate.title}`}
            >
              <span className="ne-card-hover__inner flex h-full flex-col">
                <span className="relative block aspect-[800/565] overflow-hidden rounded-2xl border border-border/10 bg-bg/35">
                  <Image
                    src={certificate.src}
                    alt={`Сертификат: ${certificate.title}`}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    loading="lazy"
                    className="object-cover object-center transition-transform duration-300 group-hover:scale-[1.025]"
                  />
                </span>
                <span className="flex flex-1 flex-col p-2 pt-4 sm:p-3 sm:pt-4">
                  <span className="font-display text-base font-bold leading-snug text-text sm:text-lg">
                    {certificate.title}
                  </span>
                  <span className="mt-4 inline-flex w-fit items-center gap-2 rounded-2xl border border-accent/30 bg-accent/[0.08] px-4 py-2 text-sm font-semibold text-accent transition-colors group-hover:border-accent/55 group-hover:bg-accent/[0.13]">
                    Открыть сертификат
                    <span aria-hidden>↗</span>
                  </span>
                </span>
              </span>
            </a>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
