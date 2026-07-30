import { Button } from "../../src/components/ui/Button";
import { Reveal } from "../../src/components/Reveal";
import { siteLinks } from "../../src/lib/links";

const products = [
  {
    title: "Лендинг / простой сайт",
    price: "от 10 000 ₽",
    text: "Страница с услугой, ценой, примерами, полезными ссылками и кнопкой заявки."
  },
  {
    title: "Многостраничный сайт",
    price: "от 25 000 ₽",
    text: "Несколько страниц: услуги, кейсы, о вас, оплата, контакты и понятная навигация."
  },
  {
    title: "ИИ-ассистент",
    price: "20 000 ₽",
    text: "Сценарий диалога, ответы на частые вопросы, сбор вводных и доведение до заявки."
  },
  {
    title: "Разбор",
    price: "5 000 ₽",
    text: "Посмотрим, что есть сейчас, где теряются заявки и какой первый шаг выбрать."
  },
  {
    title: "Стикеры для бизнеса",
    price: "от 2 000 ₽",
    text: "Стикеры под стиль бизнеса для Telegram, MAX и коммуникаций в Битрикс."
  }
];

export default function ProductsPage() {
  return (
    <div className="py-10 sm:py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">Продукты</h1>
        <p className="mt-3 text-text/70 max-w-2xl">
          Сайты, ИИ-ассистенты, разборы и визуальные инструменты, которые помогают человеку понять предложение и оставить заявку без лишней переписки.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product, idx) => (
          <Reveal key={product.title} delayMs={idx * 70}>
            <article className="flex h-full flex-col rounded-3xl border border-border/12 bg-bg/[0.18] p-6">
              <h2 className="text-xl font-black">{product.title}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-text/70">{product.text}</p>
              <div className="mt-5 text-lg font-black text-accent">{product.price}</div>
            </article>
          </Reveal>
        ))}
      </div>

      <div className="mt-8 flex gap-3 flex-col sm:flex-row">
        <Button href={siteLinks.telegramChannel} variant="primary" target="_blank" rel="noopener noreferrer">
          Написать в Telegram
        </Button>
        <Button href="/cases" variant="ghost">
          Смотреть кейсы
        </Button>
      </div>
    </div>
  );
}
