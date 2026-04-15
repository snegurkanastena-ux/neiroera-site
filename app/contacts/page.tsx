import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Button } from "../../src/components/ui/Button";
import { Reveal } from "../../src/components/Reveal";

export const metadata: Metadata = {
  title: "Контакты — NeuroEra",
  description: "Контакты NeuroEra: Анастасия Мельникова, самозанятая, способы связи."
};

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex flex-col gap-1 border-b border-border/10 py-3 last:border-b-0 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="shrink-0 text-sm font-semibold text-text/90">{label}</dt>
      <dd className="text-sm leading-relaxed text-text/75 sm:text-base">{children}</dd>
    </div>
  );
}

export default function ContactsPage() {
  return (
    <div className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Контакты</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text/80">
          Связаться можно через сайт, email или социальные сети
        </p>
      </Reveal>

      <Reveal delayMs={60}>
        <dl className="mt-10 max-w-2xl rounded-2xl border border-border/14 bg-bg/[0.15] px-5 py-2 sm:px-8 sm:py-4">
        <Row label="Имя">Мельникова Анастасия Викторовна</Row>
          <Row label="Бренд">НейроЭра</Row>
          <Row label="Email">neuroera@yandex.com</Row>
          <Row label="Телефон">+7 919 718-21-32</Row>
          <Row label="Telegram">@Neuroeracall_bot</Row>
          <Row label="VK">https://vk.com/neuroera_melnikova</Row>
          <Row label="Instagram">https://www.instagram.com/snegurka_nastena/</Row>
        </dl>
      </Reveal>

      <Reveal delayMs={100}>
        <div className="mt-10 max-w-2xl rounded-2xl border border-border/12 bg-bg/[0.12] px-5 py-5 sm:px-6">
          <h2 className="font-display text-lg font-bold text-text">Юридическая информация</h2>
          <dl className="mt-4 space-y-3 text-sm text-text/80 sm:text-base">
            <div>
              <dt className="font-semibold text-text">Статус</dt>
              <dd className="mt-1">самозанятая</dd>
            </div>
            <div>
              <dt className="font-semibold text-text">ИНН</dt>
              <dd className="mt-1 font-mono text-xs sm:text-sm">591111416790</dd>
            </div>
          </dl>
        </div>
      </Reveal>

      <div className="mt-10">
        <Button href="/" variant="ghost">
          На главную
        </Button>
      </div>
    </div>
  );
}
