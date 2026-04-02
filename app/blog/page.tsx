import { Button } from "../../src/components/ui/Button";
import { Reveal } from "../../src/components/Reveal";

export default function BlogPage() {
  return (
    <div className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Блог</h1>
        <p className="mt-3 text-text/70 max-w-2xl">
          Здесь будут публикации: как внедрять нейросети в контент и продажи, какие сценарии дают эффект, и как собирать систему.
        </p>
      </Reveal>

      <div className="mt-6 flex gap-3 flex-col sm:flex-row">
        <Button href="/" variant="primary">
          На главную
        </Button>
        <Button href="#socials" variant="ghost">
          Читать в Telegram
        </Button>
      </div>

      <div className="mt-10 rounded-3xl border border-border/12 bg-bg/20 p-6 text-sm text-text/70">
        Заглушка под расширение: со временем подключим статьи/рубрики, лид-магнит и воронку в Telegram.
      </div>
    </div>
  );
}

