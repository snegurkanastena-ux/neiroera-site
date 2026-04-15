import { Button } from "../../src/components/ui/Button";
import { Reveal } from "../../src/components/Reveal";
import { caseStudies } from "../../src/lib/content";

export default function CasesPage() {
  return (
    <div className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Кейсы</h1>
        <p className="mt-3 text-text/70 max-w-2xl">
          Заглушка под полноценную витрину кейсов. Сейчас на главной уже есть “карточки-истории” — здесь можно расширить под статьи.
        </p>
      </Reveal>

      <div className="mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {caseStudies.map((c, idx) => (
          <Reveal key={idx} delayMs={idx * 80}>
            <div className="ne-card-hover bg-transparent p-6">
              <div className="ne-card-hover__inner">
                <div className="font-bold">{c.task}</div>
                <div className="mt-3 text-sm text-text/70 leading-relaxed">{c.solution}</div>
                <div className="mt-4 text-sm text-text/80 leading-relaxed">{c.result}</div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-8">
        <Button href="/" variant="ghost">
          На главную
        </Button>
      </div>
    </div>
  );
}

