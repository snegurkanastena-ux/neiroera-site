import type { Metadata } from "next";
import { Button } from "../../src/components/ui/Button";
import { Reveal } from "../../src/components/Reveal";

const PAYFORM_URL = "https://neuroera.payform.ru";

export const metadata: Metadata = {
  title: "Оплата — NeuroEra",
  description: "Безопасная онлайн-оплата услуг NeuroEra через защищённую платёжную форму."
};

export default function PaymentPage() {
  return (
    <div className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Оплата</h1>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-text/80">
          Вы можете оплатить услуги онлайн через безопасную платежную форму
        </p>
      </Reveal>

      <div className="mt-8">
        <Button href={PAYFORM_URL} variant="primary" className="min-h-[48px] px-6 text-base" target="_blank" rel="noopener noreferrer">
          Перейти к оплате
        </Button>
      </div>

      <Reveal delayMs={80}>
        <div className="mt-10 max-w-xl rounded-2xl border border-border/14 bg-bg/[0.18] px-5 py-5 sm:px-6 sm:py-6">
          <div className="flex flex-col gap-2 text-sm sm:text-base">
            <p>
              <span className="font-semibold text-text">Промокод:</span>{" "}
              <span className="text-text/90">НЕЙРОЭРА2026</span>
            </p>
            <p>
              <span className="font-semibold text-text">Скидка:</span> <span className="text-accent">10%</span>
            </p>
            <p>
              <span className="font-semibold text-text">Действует до:</span>{" "}
              <span className="text-text/85">30.06.2026</span>
            </p>
          </div>
        </div>
      </Reveal>

      <Reveal delayMs={120}>
        <p className="mt-8 max-w-2xl text-sm leading-relaxed text-text/70 sm:text-base">
          Введите промокод при оплате, если он применим к выбранной услуге
        </p>
      </Reveal>
    </div>
  );
}
