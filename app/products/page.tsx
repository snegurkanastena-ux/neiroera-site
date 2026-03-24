import { Button } from "../../src/components/ui/Button";
import { Reveal } from "../../src/components/Reveal";
import { siteLinks } from "../../src/lib/links";

export default function ProductsPage() {
  return (
    <div className="py-10 sm:py-14">
      <Reveal>
        <h1 className="text-3xl sm:text-4xl font-black">Продукты</h1>
        <p className="mt-3 text-text/70 max-w-2xl">
          Заглушка: здесь будут пакеты и лид-магниты (например, “Контент-система под Telegram”, “GPT-агент под задачу”, “AI-внедрение в бизнес”).
        </p>
      </Reveal>

      <div className="mt-6 flex gap-3 flex-col sm:flex-row">
        <Button href="/" variant="primary">
          На главную
        </Button>
        <Button href={siteLinks.telegramBot} variant="ghost" target="_blank" rel="noopener noreferrer">
          Telegram
        </Button>
      </div>
    </div>
  );
}

