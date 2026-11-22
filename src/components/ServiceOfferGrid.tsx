"use client";

import { useState } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";

const portfolioUrl = "https://www.xn----8sb1aregjk5f.xn--p1ai/portfolio";
const vkUrl = new URL(new URL(siteLinks.vkPage).pathname, "https://vk.me").href;
const phoneUrl = "tel:+79922080300";

const offerText = {
  ru: {
    sites: { title: "Сайты", summary: "Лендинг или многостраничный сайт под вашу задачу.", topic: "Обсудить разработку сайта" },
    automation: { title: "Автоматизация", summary: "Боты, ИИ-агенты и Android-приложения под вашу задачу.", topic: "Обсудить автоматизацию" },
    content: { title: "Разбор", summary: "Консультация по вашей задаче и рекомендации по следующим шагам.", topic: "Записаться на разбор" },
    training: { title: "Обучение нейросетям", summary: "Уроки и шаблоны. В старших тарифах — проверка заданий и наставничество.", topic: "Узнать об обучении нейросетям" },
    creative: { title: "Видео и музыка на заказ", summary: "Видео или песня под вашу задачу.", topic: "Обсудить заказ видео или музыки" }
  },
  en: {
    sites: { title: "Websites", summary: "A landing page or a multi-page website for your needs.", topic: "Discuss a website project" },
    automation: { title: "Automation", summary: "Bots, AI agents and Android apps for your workflow.", topic: "Discuss automation" },
    content: { title: "Consultation", summary: "Review your challenge and get clear recommendations on next steps.", topic: "Book a consultation" },
    training: { title: "AI training", summary: "Lessons and templates, with assignment feedback and mentoring in higher tiers.", topic: "Ask about AI training" },
    creative: { title: "Custom video and music", summary: "A video or song tailored to your project.", topic: "Discuss a video or music project" }
  }
};

const contactText = {
  ru: { choose: "Выбрать", email: "Почта", call: "Позвонить", quote: "По задаче", examples: "Примеры сайтов", cases: "Кейсы автоматизации", plans: "Тарифы обучения", video: "Примеры видео", music: "MELANØ" },
  en: { choose: "Select", email: "Email", call: "Call", quote: "Project quote", examples: "Website examples", cases: "Automation case studies", plans: "Training plans", video: "Video examples", music: "MELANØ" }
};

const choiceClass = "inline-flex min-h-11 items-center justify-center rounded-lg border border-border/25 px-3 py-2 text-center text-sm font-semibold leading-snug text-text hover:border-accent hover:text-accent focus-visible:ring-2 focus-visible:ring-accent";

function trackReviewBooking() {
  const metrika = window as Window & { ym?: (id: number, method: "reachGoal", goal: string) => void };
  metrika.ym?.(111188666, "reachGoal", "review_vk_click");
}

export function ServiceOfferGrid() {
  const { messages, lang } = useI18n();
  const { cards, collapse } = messages.serviceOffers;
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const labels = contactText[lang];
  const destinations: Record<string, { href: string; label: string }[]> = {
    sites: [{ href: `${portfolioUrl}?utm_source=neiroera&utm_medium=referral&utm_campaign=services&utm_content=sites`, label: labels.examples }],
    automation: [{ href: `${portfolioUrl}?utm_source=neiroera&utm_medium=referral&utm_campaign=services&utm_content=automation`, label: labels.cases }],
    training: [{ href: "#education", label: labels.plans }],
    creative: [
      { href: siteLinks.portfolioTelegramVideo, label: labels.video },
      { href: siteLinks.melanoMusic, label: labels.music }
    ]
  };

  return (
    <div className="grid items-start grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const copy = offerText[lang][card.id as keyof typeof offerText.ru];
        const isOpen = selectedId === card.id;
        const panelId = `service-offer-panel-${card.id}`;

        return (
          <div key={card.id} className="min-w-0">
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setSelectedId(isOpen ? null : card.id)}
              className={`ne-card-hover-sm flex w-full flex-col items-start px-4 py-5 text-left focus-visible:ring-2 focus-visible:ring-accent sm:min-h-[240px] ${isOpen ? "border-accent/50 bg-accent/[0.08]" : ""}`}
            >
              <span className="text-2xl leading-none" aria-hidden>{card.emoji}</span>
              <span className="mt-3 break-words text-base font-bold leading-tight">{copy?.title ?? card.title}</span>
              {copy && <span className="mt-2 text-sm leading-snug text-text/80">{copy.summary}</span>}
              <span className="mt-auto pt-3 font-bold text-accent">{card.id === "automation" ? labels.quote : card.priceLine}</span>
              <span className="mt-3 inline-flex min-h-9 items-center rounded-lg border border-border/25 px-3 text-sm font-semibold">
                {isOpen ? collapse : labels.choose}
                <span className="ml-2" aria-hidden>{isOpen ? "↑" : "↓"}</span>
              </span>
            </button>
            <div id={panelId} hidden={!isOpen} className="mt-2 rounded-lg border border-border/25 bg-bg px-3 py-4">
              <h3 className="text-base font-bold leading-snug">{copy?.topic ?? card.title}</h3>
              {(card.id === "sites" || card.id === "automation") && (
                <ul className="mt-2 space-y-1.5 text-sm leading-snug text-text/80">
                  {card.details.map((detail) => (
                    <li key={detail.name}>{detail.name} · <span className="text-accent">{detail.price}</span></li>
                  ))}
                </ul>
              )}
              <div className="mt-3 grid grid-cols-2 gap-2">
                <a className={`${choiceClass} border-accent/50 bg-accent/10 text-accent`} href={siteLinks.telegramBot}>Telegram</a>
                <a className={choiceClass} href={`${siteLinks.email}?subject=${encodeURIComponent(copy?.topic ?? card.title)}`}>{labels.email}</a>
                <a className={choiceClass} href={vkUrl} onClick={card.id === "content" ? trackReviewBooking : undefined}>VK</a>
                <a className={choiceClass} href={phoneUrl}>{labels.call}</a>
              </div>
              {destinations[card.id]?.map(({ href, label }) => (
                <a key={href} className={`${choiceClass} mt-2 flex w-full`} href={href}>
                  {label} <span className="ml-1" aria-hidden>→</span>
                </a>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
