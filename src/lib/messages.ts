import type { ServiceId } from "./servicesCatalog";

export type Lang = "ru" | "en";

/** Вложенный ключ через точку, напр. "hero.title" */
export type MessageKey = string;

type CaseItem = { task: string; solution: string; result: string };
type ReviewItem = { name: string; text: string; niche: string; outcome: string; photo?: string };
type AudienceItem = { title: string; desc: string };
type ProcessStep = { step: string; title: string; desc: string };

export type ServiceOfferDetail = {
  name: string;
  price: string;
  /** Внешняя ссылка (например, музыкальный проект) */
  linkHref?: string;
  linkLabel?: string;
};

export type ServiceOfferCard = {
  id: string;
  emoji: string;
  title: string;
  priceLine: string;
  details: ServiceOfferDetail[];
};

export type Messages = {
  nav: Record<string, string>;
  hero: Record<string, string | string[]>;
  about: {
    kicker: string;
    title: string;
    whoLabel: string;
    whoBody: string;
    whatLabel: string;
    whatLead: string;
    whatFlow: string;
    whatResultsLabel: string;
    whatResults: string;
    whatEntry: string;
    whatReinforce: string;
    whyLabel: string;
    whyBody: string;
    finalBlock: string;
  };
  pain: {
    kicker: string;
    title: string;
    cards: string[];
    closing: string;
    diagnosticsCta: string;
    /** Тема письма в mailto при клике «записаться на диагностику» */
    diagnosticsMailSubject: string;
  };
  solution: { kicker: string; title: string; flow: string; bullets: string[]; cta: string };
  portfolio: {
    kicker: string;
    title: string;
    intro: string;
    open: string;
    streamOn: string;
    /** Короткий заголовок у блока площадок (в одной строке с «Музыка») */
    listenHeading: string;
    streamApple: string;
    streamVk: string;
    streamYandex: string;
    listenTrack: string;
    watchClip: string;
    neuroPhotoHint: string;
    neuroPhotoReduced: string;
    musicTrack1: string;
    musicTrack2: string;
    musicTrack3: string;
    musicTrack4: string;
    musicTrack5: string;
    items: {
      title: string;
      desc: string;
      anchor: string;
      casesCta?: string;
      casesNote?: string;
    }[];
  };
  productsSection: { kicker: string; title: string; items: { title: string; desc: string }[] };
  servicesSection: Record<string, string>;
  serviceItems: Record<ServiceId, { title: string; desc: string; action: string }>;
  calculatorSection: Record<string, string>;
  serviceOffers: {
    kicker: string;
    title: string;
    expand: string;
    collapse: string;
    cards: ServiceOfferCard[];
  };
  simpleCalculator: {
    kicker: string;
    title: string;
    site: string;
    automation: string;
    visual: string;
    creative: string;
    emptyHint: string;
    /** Плейсхолдер {amount} — сумма минимальных ориентиров по выбранным позициям */
    estimateFrom: string;
  };
  educationSection: {
    kicker: string;
    title: string;
    lead: string;
    bonuses: string;
    /** Общий блок бонусов в модалке «описание тарифа» */
    bonusesBlockTitle: string;
    bonusesBlockBody: string;
    tariffs: {
      id: string;
      name: string;
      price: string;
      blurb: string;
      featured?: boolean;
      /** Заголовок в модалке (с подзаголовком-обещанием) */
      detailTitle: string;
      /** Текст с переносами (\n) */
      detailBody: string;
    }[];
    ctaChoose: string;
    ctaRequest: string;
  };
  /** Модалка заявки (POST /api/send-order) */
  contactChoice: {
    title: string;
    nameLabel: string;
    namePh: string;
    contactLabel: string;
    contactPh: string;
    contactHint: string;
    messageLabel: string;
    messagePh: string;
    submit: string;
    telegram: string;
    close: string;
    sending: string;
    success: string;
    error: string;
    errorValidation: string;
  };
  diagnosticCalculator: {
    kicker: string;
    title: string;
    intro: string;
    q1: string;
    needLeads: string;
    needPack: string;
    needAuto: string;
    q2: string;
    q3: string;
    yes: string;
    no: string;
    resultLabel: string;
    resultName: string;
    resultRange: string;
    cta: string;
    next: string;
    again: string;
  };
  calculator: Record<string, string | Record<string, string>>;
  audience: { kicker: string; title: string; items: AudienceItem[] };
  cases: { kicker: string; title: string; task: string; solution: string; result: string; items: CaseItem[] };
  process: { kicker: string; title: string; stepPrefix: string; steps: ProcessStep[] };
  reviews: { kicker: string; title: string; label: string; items: ReviewItem[] };
  socials: Record<string, string>;
  referralSection: Record<string, string>;
  referrals: Record<string, { title: string; desc: string; cta: string }>;
  final: Record<string, string>;
  leadForm: Record<string, string>;
  footer: Record<string, string>;
  /** Компактный блок онлайн-оплаты на главной */
  paymentBlock: { title: string; text: string; cta: string; promo: string };
  meta: { title: string; description: string };
  theme: { toLight: string; toDark: string; titleLight: string; titleDark: string };
};

function deepGet(obj: unknown, path: string): string | undefined {
  const parts = path.split(".");
  let cur: unknown = obj;
  for (const p of parts) {
    if (cur === null || typeof cur !== "object") return undefined;
    cur = (cur as Record<string, unknown>)[p];
  }
  return typeof cur === "string" ? cur : undefined;
}

export function translate(messages: Messages, key: MessageKey): string {
  const v = deepGet(messages, key);
  return v ?? key;
}

export const messagesByLang: Record<Lang, Messages> = {
  ru: {
    nav: {
      about: "Обо мне",
      services: "Услуги",
      cases: "Кейсы",
      reviews: "Отзывы",
      contacts: "Контакты",
      payment: "Оплата",
      toTelegram: "Telegram",
      openMenu: "Открыть меню",
      ariaLabel: "Основная навигация"
    },
    hero: {
      title:
        "Создаю системы роста на базе ИИ\nдля бизнеса, экспертов и творчества",
      typingLines: JSON.stringify([
        "Создаю системы роста на базе ИИ\nдля бизнеса, экспертов и творчества",
        "Сайт, контент, автоматизация и AI — в одной системе с результатом",
        "Системный AI-архитектор для вашего роста"
      ]),
      subtitle:
        "Сайт, контент, автоматизация и AI-инструменты —\nвсё в одной системе, которая приносит результат",
      whatYouGet: "Что вы получите:",
      bullets: JSON.stringify([
        "сайт, который приводит клиентов",
        "контент, который продаёт",
        "автоматизацию процессов"
      ]),
      trust1: "15+ лет опыта",
      trust2: "внедрение под задачи",
      trust3: "реальные кейсы",
      ctaConsult: "Собрать систему под себя",
      ctaRequest: "Оставить заявку",
      ctaTg: "Telegram"
    },
    about: {
      kicker: "Обо мне",
      title: "Сначала система — потом инструменты",
      whoLabel: "Кто я",
      whoBody:
        "AI-архитектор роста. Перевожу бизнес из ручного хаоса в связанную систему: от смысла и позиционирования — до AI и автоматизации, чтобы каждое звено работало на один измеримый результат, а не на «чек-лист ради чек-листа».",
      whatLabel: "Что вы получите",
      whatLead:
        "Смотрю на бизнес как на единый контур, а не как на набор несвязанных «про сайт / про визуал / про нейросеть».",
      whatFlow: "позиционирование → контент → сайт → автоматизация → AI",
      whatResultsLabel: "В результате вы получаете:",
      whatResults: JSON.stringify([
        "ясное позиционирование и рост узнаваемости",
        "стабильный поток заявок и сделок",
        "время, которое перестаёт сгорать в ручных операциях",
        "основу для масштабирования — без вечного тушения пожаров"
      ]),
      whatEntry:
        "Вход возможен с полной задачей «под ключ» или с точечным запросом: визуал, автоматизация, отдельное AI-решение — важно, чтобы кусок не ломал логику контура, а встраивался в неё.",
      whatReinforce: "Каждое вложенное в систему усиление работает на общий результат, а не «украшает» бизнес обособленно.",
      whyLabel: "Опыт и ориентир",
      whyBody:
        "15+ лет в операционном управлении бизнесом: в лидерстве — 100+ человек, сети — до 20 точек. Фокус — рост заявок, выручки и эффективности процессов, а не картинка в презентации.\n\nРешения подбираю и собираю под нишу, глубину задачи и масштаб: без готового шаблона — с тем, откуда в вашем бизнесе выгоднее и быстрее дать движение в деньгах и времени.",
      finalBlock: "В конце пути — система, которая работает на вас: с понятной логикой, заявками и деньгами, а не очередной набор инструментов по отдельности."
    },
    pain: {
      kicker: "Диагностика",
      title: "Почему у вас нет стабильных заявок",
      cards: [
        "Контент есть, но не продаёт",
        "Сайт есть, но не конвертит",
        "AI пробовали, но хаос",
        "Всё держится на вас и не масштабируется"
      ],
      closing: "Проблема не в инструментах.\nПроблема — в отсутствии системы.",
      diagnosticsCta: "Записаться на диагностику",
      diagnosticsMailSubject: "Запись на диагностику"
    },
    solution: {
      kicker: "Решение",
      title: "Я собираю систему, где всё работает вместе",
      flow: "Трафик → Контент → Сайт → AI → Заявка",
      bullets: [
        "сайт приводит клиентов",
        "визуал усиливает восприятие",
        "автоматизация ускоряет процессы",
        "творчество и AI работают как единая система"
      ],
      cta: "Разобрать мой кейс"
    },
    portfolio: {
      kicker: "Портфолио",
      title: "Визуал, движение и звук",
      intro: "Направления, в которых собираю цельные решения на стыке креатива и AI.",
      open: "Открыть",
      streamOn: "Слушать на площадках",
      listenHeading: "Слушать",
      streamApple: "Apple Music",
      streamVk: "VK Музыка",
      streamYandex: "Яндекс.Музыка",
      listenTrack: "Слушать трек",
      watchClip: "Смотреть клип",
      neuroPhotoHint: "",
      neuroPhotoReduced:
        "Анимация движения отключена в соответствии с настройками доступности — галерея статична.",
      musicTrack1: "Бизнес партнёр",
      musicTrack2: "Будни Т2 (18+)",
      musicTrack3: "Весна между строк",
      musicTrack4: "Всё нормально",
      musicTrack5: "Имею право",
      items: [
        {
          title: "Нейрофото",
          desc: "Обложки, визуалы для соцсетей и рекламы — быстро, в едином стиле и с сильным кадром.",
          anchor: "portfolio-photos"
        },
        {
          title: "Портфолио",
          desc: "Сценарии, монтаж и визуал — примеры смотрите в Telegram.",
          anchor: "portfolio-video",
          casesCta: "Смотреть в Telegram",
          casesNote: "Часть кейсов не публикуется в открытом доступе"
        },
        {
          title: "Музыка",
          desc: "Музыкальные идеи и аранжировки в связке с современными AI-инструментами.",
          anchor: "portfolio-music"
        }
      ]
    },
    productsSection: {
      kicker: "Продукты",
      title: "Три опоры системы роста",
      items: [
        {
          title: "Система заявок",
          desc: "Сайт, посадочные и сценарии, которые ведут человека к заявке — без хаоса в воронке."
        },
        {
          title: "Контент-система",
          desc: "Рубрики, смыслы и ритм публикаций, которые прогревают аудиторию и поддерживают продажи."
        },
        {
          title: "Автоматизация",
          desc: "AI и процессы, которые снимают рутину и ускоряют команду — от черновиков до сценариев."
        }
      ]
    },
    servicesSection: {
      kicker: "Продукты",
      title: "Три опоры системы роста",
      intro: "Не набор услуг — связанные продукты, из которых собирается работающая система."
    },
    serviceItems: {
      websites: {
        title: "Создание сайтов",
        desc: "Лендинги и многостраничные решения: структура, тексты, визуал в духе premium tech.",
        action: "В калькулятор"
      },
      apps: {
        title: "Создание приложений",
        desc: "Прототипы и продуктовые интерфейсы: от сценария до рабочего MVP.",
        action: "В калькулятор"
      },
      content: {
        title: "Контент: тексты, посты, оформление",
        desc: "Рубрики, посты, оформление страниц и единый голос бренда.",
        action: "В калькулятор"
      },
      neurovideo: {
        title: "Нейровидео",
        desc: "Сценарии, монтажные решения и визуальный ряд с опорой на нейросети.",
        action: "В калькулятор"
      },
      neurophoto: {
        title: "Нейрофото",
        desc: "Визуалы для соцсетей, обложек и рекламы — быстро и в одном стиле.",
        action: "В калькулятор"
      },
      songs: {
        title: "Создание песен",
        desc: "Музыкальные задумки и аранжировки в связке с AI-инструментами.",
        action: "В калькулятор"
      },
      automation: {
        title: "Автоматизация",
        desc: "Снимаю рутину: сценарии, интеграции и понятные процессы для команды.",
        action: "В калькулятор"
      },
      bots: {
        title: "Боты и AI-агенты",
        desc: "Telegram-боты, ассистенты и цепочки ответов под ваши задачи.",
        action: "В калькулятор"
      },
      training: {
        title: "Обучение с нуля",
        desc: "Спокойный вход в нейросети: от первых промптов до ежедневной практики.",
        action: "В калькулятор"
      },
      aiConsulting: {
        title: "Консультации по внедрению ИИ",
        desc: "Разбор процессов, приоритетов и дорожной карты без лишней теории.",
        action: "В калькулятор"
      },
      branding: {
        title: "Упаковка личного бренда",
        desc: "Позиционирование, визуальная логика и контент, который ведёт к заявке.",
        action: "В калькулятор"
      },
      custom: {
        title: "Другие digital-решения",
        desc: "Нестандартные задачи — соберём формат под ваш контекст.",
        action: "В калькулятор"
      }
    },
    calculatorSection: {
      kicker: "Ориентир",
      title: "Соберите свою систему",
      intro:
        "Не уверены в наборе? Отметьте, что важно для вашей системы — покажу ориентир по бюджету. В заявке соберу решение под ваш контекст.",
      hint: "Отметьте направления — покажу ориентир по бюджету."
    },
    serviceOffers: {
      kicker: "Услуги",
      title: "Выберите, что вам нужно",
      expand: "Подробнее",
      collapse: "Скрыть",
      cards: [
        {
          id: "sites",
          emoji: "💻",
          title: "Сайты",
          priceLine: "от 20 000 ₽",
          details: [
            { name: "Лендинг", price: "от 20 000 ₽" },
            { name: "Под ключ", price: "от 50 000 ₽" }
          ]
        },
        {
          id: "automation",
          emoji: "⚙️",
          title: "Автоматизация",
          priceLine: "от 15 000 ₽",
          details: [{ name: "Боты / агенты", price: "от 15 000 ₽" }]
        },
        {
          id: "content",
          emoji: "🎨",
          title: "Контент и визуал",
          priceLine: "от 5 000 ₽",
          details: [{ name: "Визуал", price: "от 5 000 ₽" }]
        },
        {
          id: "training",
          emoji: "🎓",
          title: "Обучение",
          priceLine: "от 10 000 ₽",
          details: [
            { name: "Старт / практика", price: "от 10 000 ₽" },
            { name: "Индивидуально", price: "заявка" }
          ]
        },
        {
          id: "creative",
          emoji: "🎬",
          title: "Портфолио",
          priceLine: "от 3 000 ₽",
          details: [
            { name: "Видео", price: "от 3 000 ₽" },
            {
              name: "Музыка",
              price: "от 3 000 ₽",
              linkHref: "https://melanomusic.ru/",
              linkLabel: "Смотреть музыкальный проект"
            }
          ]
        }
      ]
    },
    simpleCalculator: {
      kicker: "Ориентир",
      title: "Соберите свою систему",
      site: "сайт",
      automation: "автоматизация",
      visual: "визуал",
      creative: "портфолио",
      emptyHint: "Отметьте, что входит в систему",
      estimateFrom: "Ориентир: от {amount} ₽"
    },
    educationSection: {
      kicker: "Обучение",
      title: "Нейросети под ваши задачи",
      lead: "Спокойный вход в практику: от первых шагов до устойчивого результата.",
      bonuses: "Материалы, шаблоны и разбор ваших кейсов в формате тарифа.",
      bonusesBlockTitle: "🎁 БОНУСЫ",
      bonusesBlockBody:
        "🎁 «10 универсальных промптов для жизни и бизнеса»\n🎁 чек-лист «Как писать точные запросы»\n🎁 таблица «Где ChatGPT реально экономит деньги»",
      tariffs: [
        {
          id: "start",
          name: "START",
          price: "от 10 000 ₽",
          blurb: "База и первые результаты",
          detailTitle: "START — «смотрю и внедряю»",
          detailBody: `Для тех, кто хочет спокойно пройти курс в своём темпе.

Что внутри:
🎥 5 уроков в записи (по ~60 минут)
📘 шаблоны, чек-листы, гайды
🎁 бонусы курса
⏳ доступ 1 месяц

Без ДЗ и без проверки — просто берёшь и делаешь.`
        },
        {
          id: "practice",
          name: "PRACTICE",
          price: "от 25 000 ₽",
          blurb: "Практика и закрепление",
          featured: true,
          detailTitle: "PRACTICE — «С куратором и домашками» ⭐️",
          detailBody: `Самый частый выбор: важно не «посмотреть», а внедрить и получить результат.

Что внутри:
всё из пакета START +
🧩 домашние задания после каждого урока
👩‍🏫 проверка ДЗ куратором
💬 закрытый чат участников
⏳ доступ 3 месяца

Этот вариант для тех, кто не хочет сорваться — вас ведут и дают обратную связь.`
        },
        {
          id: "vip",
          name: "VIP",
          price: "от 80 000 ₽",
          blurb: "Индивидуально и глубоко",
          detailTitle: "VIP — «Наставничество + Zoom + визуал»",
          detailBody: `Для тех, кому нужен максимум, глубина и личная поддержка.

Что внутри:
всё из пакета PRACTICE +
📹 2 Zoom-встречи (внедрение + разбор задач)
🎨 доп. уроки по визуалу: нейрокартинки, баннеры, оформление
🧠 разбор вашего кейса / аккаунта / задач
📜 именной сертификат от «НейроЭры»
⏳ доступ 6 месяцев

VIP — когда вы выходите с курса уже с навыком и внедрением, а не с ощущением «попробовала».`
        }
      ],
      ctaChoose: "Выбрать тариф",
      ctaRequest: "Оставить заявку"
    },
    contactChoice: {
      title: "Заявка с сайта",
      nameLabel: "Имя",
      namePh: "Как к вам обращаться",
      contactLabel: "Как с вами связаться",
      contactPh: "Telegram, email или телефон",
      contactHint: "Укажите удобный контакт: Telegram, email или телефон",
      messageLabel: "Описание задачи",
      messagePh: "Кратко: что нужно, сроки, контекст",
      submit: "Отправить заявку",
      telegram: "Написать в Telegram",
      close: "Закрыть",
      sending: "Отправляем...",
      success: "Заявка отправлена",
      error: "Не удалось отправить. Попробуйте позже или напишите в Telegram.",
      errorValidation: "Заполните все поля."
    },
    diagnosticCalculator: {
      kicker: "Диагностика",
      title: "Понять, какая система вам подходит",
      intro: "Ответьте на три вопроса — покажу ориентир по формату и бюджету. Детали уточним в Telegram.",
      q1: "Что вам нужно?",
      needLeads: "Заявки",
      needPack: "Упаковка",
      needAuto: "Автоматизация",
      q2: "Есть ли сайт?",
      q3: "Есть ли контент?",
      yes: "Да",
      no: "Нет",
      resultLabel: "Вам подходит система:",
      resultName: "Система роста под ключ",
      resultRange: "Ориентир: 120–250 000 ₽",
      cta: "Записаться на разбор",
      next: "Далее",
      again: "Пройти снова"
    },
    calculator: {
      add: "Добавить в расчёт",
      remove: "Убрать",
      empty: "Выберите услуги в блоке выше или добавьте строку вручную.",
      subtotal: "Позиция",
      total: "Итого",
      discuss: "Обсудить проект",
      request: "Оставить заявку",
      perUnit: "за ед.",
      lineTitle: "Услуга",
      qty: "Количество",
      qtyLabels: {
        projects: "Проекты / пакеты",
        units: "Единицы (ролики, посты и т.п.)",
        sessions: "Сессии / занятия"
      }
    },
    audience: {
      kicker: "Для кого",
      title: "Эксперты, предприниматели и малый бизнес",
      items: [
        { title: "Эксперты", desc: "Которые хотят превратить знания в систему: контент, доверие, заявки." },
        { title: "Предприниматели", desc: "Которым важны процессы и скорость: AI там, где дают эффект." },
        { title: "Малый бизнес", desc: "Нужен результат без перегруза команды: автоматизация и GPT-ассистенты." },
        { title: "Те, кто растёт быстрее", desc: "Для тех, кто выбирает технологичность и ясность без пафоса." }
      ]
    },
    cases: {
      kicker: "Кейсы",
      title: "Задача → Решение → Результат",
      task: "Задача",
      solution: "Решение",
      result: "Результат",
      items: [
        {
          task: "Предпринимательница хотела упаковать бренд и увеличить поток заявок, не увеличивая нагрузку на себя.",
          solution:
            "Собрала контент-систему под Telegram: рубрики, формат воронки, связку «контент → заявка», подготовила шаблоны и GPT-агента для генерации черновиков.",
          result:
            "За первый цикл внедрения выросло количество лидов и ускорилось производство контента: вместо ручной рутины — повторяемые сценарии и прозрачная схема работы."
        },
        {
          task: "Эксперт по услугам испытывал провалы в продажах из-за нестабильного контента и слабой структуры сайта.",
          solution:
            "Перепроектировала одностраничник под лид-магнит, добавила кейсовую логику, оформила блоки доверия и настроила сквозную механику записи на консультацию.",
          result:
            "Сайт стал быстрее собирать заявки: улучшилась конверсия и появилось ощущение «дорого/уверенно», которое поддерживает личный стиль."
        },
        {
          task: "Малый бизнес хотел автоматизировать рутинные процессы, чтобы руководителю не приходилось «делать всё вручную».",
          solution:
            "Определила 5 задач с наибольшим эффектом, спроектировала простые AI-сценарии (черновики ответов, сводки, сегментация обращений) и внедрила процесс сопровождения.",
          result:
            "Команда стала действовать быстрее, а качество коммуникации выросло за счёт единых шаблонов и помощника, который ускоряет принятие решений."
        }
      ]
    },
    process: {
      kicker: "Как работаю",
      title: "4 шага к системе и результату",
      stepPrefix: "Шаг",
      steps: [
        { step: "1", title: "Разбор ситуации", desc: "Понимаем контекст, задачи, ограничения и где «болит» сильнее всего." },
        { step: "2", title: "Стратегия", desc: "Собираем план внедрения: приоритеты, сценарии ИИ, контент-логика." },
        { step: "3", title: "Создание системы", desc: "Делаю сайт/контент/AI-инструменты так, чтобы они работали вместе." },
        { step: "4", title: "Запуск и сопровождение", desc: "Запускаем, измеряем эффект и корректируем по данным и вашему ритму." }
      ]
    },
    reviews: {
      kicker: "Отзывы",
      title: "Когда система реально работает",
      label: "Отзыв",
      items: [
        {
          name: "Ольга Н.",
          niche: "Эксперт, образование",
          outcome: "Контент стал процессом, а не хаотичными постами; GPT-агент снял рутину.",
          text: "Анастасия собрала мне систему: контент перестал быть «раз в неделю» и превратился в процесс. Плюс GPT-агент реально снял рутину.",
          photo: "/reviews/olga.jpg"
        },
        {
          name: "Алексей С.",
          niche: "Предприниматель, услуги",
          outcome: "После разбора и стратегии воронка начала стабильно отдавать заявки.",
          text: "Очень практичный подход. Никаких абстракций: мы разобрали задачи, сделали стратегию, и дальше пошла сборка системы. Результат — воронка начала работать.",
          photo: "/reviews/aleksey.jpg"
        },
        {
          name: "Мария К.",
          niche: "Digital-проект",
          outcome: "Сайт и контент выстроены в одну линию; визуально premium tech, по смыслу — по делу.",
          text: "Понравилось, что сайт и контент начали «разговаривать» друг с другом. Визуально — premium tech, по смыслу — чётко и по делу.",
          photo: "/reviews/maria.jpg"
        }
      ]
    },
    socials: {
      kicker: "Соцсети и контакты",
      title: "На связи там, где вам удобнее",
      intro: "Практика и обновления в каналах. Для быстрой связи — бот и почта. Портфолио и музыка — отдельными ссылками.",
      tgChannelTitle: "Telegram-канал",
      tgChannelSubtitle: "«НейроЭра»: внедрения, инструменты, примеры",
      tgChannelText: "Контент, который можно применять сразу: сценарии ИИ, разборы и свежие находки.",
      tgCta: "Открыть канал",
      tgBotTitle: "Бот для связи",
      tgBotSubtitle: "Telegram",
      tgBotText: "Быстрый контакт и заявка в пару касаний.",
      tgBotCta: "Перейти в бот",
      vkBrand: "ВКонтакте",
      vkPageTitle: "Страница VK",
      vkPageText: "Публикации и новости проекта.",
      vkPageCta: "Открыть страницу",
      vkChannelTitle: "VK-канал",
      vkChannelText: "Формат канала в мессенджере VK.",
      vkChannelCta: "Открыть канал",
      maxTitle: "MAX",
      maxSubtitle: "Канал «НейроЭра»",
      maxText: "Обновления и смыслы в мессенджере MAX — удобно на телефоне и в вебе.",
      maxCta: "Канал в MAX",
      emailTitle: "Email",
      emailText: "Для деловой переписки и материалов.",
      emailCta: "Написать на почту",
      write: "Написать",
      open: "Открыть",
      instagramTitle: "Instagram",
      instagramSubtitle: "Профиль",
      instagramText: "Визуальные фрагменты и настроение бренда.",
      instagramCta: "Открыть Instagram",
      instagramLegal:
        "Instagram принадлежит Meta Platforms Inc., деятельность которой ограничена на территории РФ.",
      melanoTitle: "MelanoMusic",
      melanoSubtitle: "Музыка и витрина",
      melanoText: "Музыкальный проект — треки, витрина и настроение.",
      melanoCta: "Слушать проект",
      portfolioVibeTitle: "Портфолио",
      portfolioVibeSubtitle: "Vibe Coder / AI-first",
      portfolioVibeText: "Сайт с проектами, вайбом и ощущением от интерфейса — отдельно от направления «НейроЭра».",
      portfolioVibeCta: "Открыть сайт"
    },
    referralSection: {
      kicker: "Полезное",
      title: "Сервисы с реферальной поддержкой",
      intro: "Подборка инструментов, которыми пользуюсь сама. Вы поддерживаете проект, выбирая переход по ссылке."
    },
    referrals: {
      syntx: {
        title: "Syntx Bot",
        desc: "Удобный бот для работы с нейросетями в Telegram.",
        cta: "Перейти"
      },
      suno: {
        title: "Suno",
        desc: "Генерация и доработка музыкальных идей.",
        cta: "Получить доступ"
      },
      vezarys: {
        title: "VPN VEZARYS",
        desc: "Стабильный доступ к сервисам, когда это нужно по работе.",
        cta: "Открыть бота"
      },
      sferoom: {
        title: "SFEROOM",
        desc: "Бонус для рефералов: −10% по промокоду «НейроЭра». Скидка на подписку каждый месяц для приглашённых пользователей.",
        cta: "Перейти"
      },
      prodamus: {
        title: "Prodamus",
        desc: "Для ИП и ООО — скидка 20% на подключение. Для самозанятых сейчас отдельная акционная цена — 1 ₽.",
        cta: "Перейти"
      },
      edaSibiri: {
        title: "Еда Сибири",
        desc: "Сайт: edasibiri.ru. По промокоду НЕЙРОЭРА — скидка 5%.",
        cta: "Перейти"
      }
    },
    final: {
      kicker: "Следующий шаг",
      title: "Если вы хотите систему, а не хаос — давайте соберём её",
      subtitle: "Обычно начинаем с диагностики и собираем решение под вас",
      cta: "Оставить заявку"
    },
    leadForm: {
      badge: "Связь",
      title: "Заявка",
      intro: "Напишите на почту кратко о задаче — отвечу и предложу следующий шаг.",
      hint: "Или напишите в Telegram, если так удобнее",
      name: "Имя",
      namePh: "Как к вам обращаться?",
      contact: "Telegram / Email / Телефон",
      contactPh: "Например: @username или email@domain.com",
      goal: "Что хотите получить",
      goalPh: "Сайт, контент-система, внедрение ИИ, GPT-ассистент...",
      message: "Коротко о задаче",
      messagePh: "Напишите 2–4 предложения: что есть сейчас, что не получается, какой результат нужен.",
      submit: "Отправить заявку",
      ctaEmail: "Оставить заявку",
      ctaTelegram: "Написать в Telegram",
      sending: "Отправляем...",
      successTitle: "Заявка отправлена",
      successText:
        "Спасибо! Я свяжусь с вами, чтобы обсудить задачу и следующий шаг. Параллельно пришлю материалы в Telegram или на контакт.",
      error: "Не удалось отправить заявку. Попробуйте ещё раз.",
      consent: "Переходя в Telegram, вы инициируете диалог для обсуждения запроса."
    },
    footer: {
      name: "Анастасия Мельникова",
      tag: "НейроЭра",
      rights: "Все права защищены",
      linkPayment: "Оплата",
      linkOffer: "Оферта",
      linkContacts: "Контакты"
    },
    paymentBlock: {
      title: "Онлайн-оплата",
      text: "Оплатите услугу через защищенную форму",
      cta: "Оплатить",
      promo: "НЕЙРОЭРА2026 — скидка 10%"
    },
    meta: {
      title: "Анастасия Мельникова — AI-креатор и AI-архитектор",
      description:
        "Системы роста на базе ИИ: сайт, контент, автоматизация и инструменты — в одном контуре с измеримым результатом"
    },
    theme: {
      toLight: "Включить светлую тему",
      toDark: "Включить тёмную тему",
      titleLight: "Светлая тема",
      titleDark: "Тёмная тема"
    }
  },
  en: {
    nav: {
      about: "About",
      services: "Services",
      cases: "Cases",
      reviews: "Reviews",
      contacts: "Contacts",
      payment: "Payment",
      toTelegram: "Telegram",
      openMenu: "Open menu",
      ariaLabel: "Primary navigation"
    },
    hero: {
      title: "I build AI-powered growth systems\nfor business, experts, and creative work",
      typingLines: JSON.stringify([
        "I build AI-powered growth systems\nfor business, experts, and creative work",
        "Website, content, automation — one system that delivers outcomes",
        "Systems-first AI architect for your growth"
      ]),
      subtitle:
        "Website, content, automation, and AI tools —\none connected system that drives outcomes",
      whatYouGet: "What you get:",
      bullets: JSON.stringify([
        "a website that brings clients",
        "content that sells",
        "process automation"
      ]),
      trust1: "15+ years of experience",
      trust2: "hands-on implementation",
      trust3: "real case studies",
      ctaConsult: "Build a system for me",
      ctaRequest: "Request a quote",
      ctaTg: "Telegram"
    },
    about: {
      kicker: "About",
      title: "System first—tools second",
      whoLabel: "Who I am",
      whoBody:
        "A growth AI architect. I help businesses move from ad‑hoc firefighting to a connected system—from positioning to automation and AI—so every part pulls toward the same measurable outcome, not a checklist for its own sake.",
      whatLabel: "What you get in practice",
      whatLead:
        "I treat a business as one full loop, not a handful of separate “website / visuals / AI” projects that never connect.",
      whatFlow: "positioning → content → site → automation → AI",
      whatResultsLabel: "In practice, that means:",
      whatResults: JSON.stringify([
        "crisper positioning and growing recognition",
        "a more stable flow of leads and deals",
        "time you stop burning on manual work",
        "a foundation to scale without constant fire drills"
      ]),
      whatEntry:
        "We can work end‑to‑end or on a specific slice: visuals, automation, or a focused AI solution—what matters is that it slots into the loop, not fights it.",
      whatReinforce: "Each improvement is aimed at the whole, not as an isolated add‑on for show.",
      whyLabel: "Track record and focus",
      whyBody:
        "15+ years running operations in business. Leadership at 100+ people, networks of up to ~20 locations. I optimize for leads, revenue, and process efficiency—not a slide that only looks good.\n\nI tailor the stack to your niche, depth, and scale; no one‑size copy‑paste—anchored in where the fastest gains are for your money and time.",
      finalBlock: "The outcome is a system that works for you—with clear logic, demand, and revenue, not a pile of disconnected tools."
    },
    pain: {
      kicker: "Diagnosis",
      title: "Why steady leads still don’t show up",
      cards: [
        "You have content, but it doesn’t sell",
        "You have a site, but it doesn’t convert",
        "You tried AI, but it’s chaos",
        "Everything depends on you and doesn’t scale"
      ],
      closing: "The problem isn’t the tools.\nThe problem is the lack of a system.",
      diagnosticsCta: "Book a diagnostic call",
      diagnosticsMailSubject: "Diagnostic session request"
    },
    solution: {
      kicker: "Solution",
      title: "I assemble a system where everything works together",
      flow: "Traffic → Content → Site → AI → Lead",
      bullets: [
        "the site brings people in",
        "content warms them up",
        "AI accelerates execution",
        "the system runs as one mechanism"
      ],
      cta: "Break down my case"
    },
    portfolio: {
      kicker: "Portfolio",
      title: "Visuals, motion, and sound",
      intro: "Focus areas where I ship cohesive work at the intersection of craft and AI.",
      open: "Open",
      streamOn: "Listen on",
      listenHeading: "Listen",
      streamApple: "Apple Music",
      streamVk: "VK Music",
      streamYandex: "Yandex Music",
      listenTrack: "Listen to the track",
      watchClip: "Watch the clip",
      neuroPhotoHint: "",
      neuroPhotoReduced:
        "Motion is reduced per your accessibility settings — the gallery is static.",
      musicTrack1: "Business partner",
      musicTrack2: "Weekdays T2 (18+)",
      musicTrack3: "Spring between the lines",
      musicTrack4: "All good",
      musicTrack5: "I have the right",
      items: [
        {
          title: "Neuro photography",
          desc: "Covers and social visuals with a strong frame — fast and visually consistent.",
          anchor: "portfolio-photos"
        },
        {
          title: "Portfolio",
          desc: "Scripts, editing, and visuals — examples on Telegram.",
          anchor: "portfolio-video",
          casesCta: "View on Telegram",
          casesNote: "Some work is not shared publicly"
        },
        {
          title: "Music",
          desc: "Musical ideas and arrangements using modern AI music workflows.",
          anchor: "portfolio-music"
        }
      ]
    },
    productsSection: {
      kicker: "Products",
      title: "Three pillars of a growth system",
      items: [
        {
          title: "Lead system",
          desc: "Site, landing flows, and scenarios that move people to a request — without funnel chaos."
        },
        {
          title: "Content system",
          desc: "Themes, narrative, and publishing rhythm that warm the audience and support sales."
        },
        {
          title: "Automation",
          desc: "AI and workflows that remove busywork and speed up the team — from drafts to playbooks."
        }
      ]
    },
    servicesSection: {
      kicker: "Products",
      title: "Three pillars of a growth system",
      intro: "Not a service list — connected products that form a working system."
    },
    serviceItems: {
      websites: {
        title: "Websites",
        desc: "Landing pages and multi-section sites—structure, copy, and a premium tech look.",
        action: "Add to estimator"
      },
      apps: {
        title: "Applications",
        desc: "Product UX flows from scenario to a working MVP.",
        action: "Add to estimator"
      },
      content: {
        title: "Content: copy, posts, layouts",
        desc: "Editorial rhythm, social posts, and on-brand page design.",
        action: "Add to estimator"
      },
      neurovideo: {
        title: "AI-assisted video",
        desc: "Scripts, editing patterns, and visuals accelerated with neural tools.",
        action: "Add to estimator"
      },
      neurophoto: {
        title: "AI photo & visuals",
        desc: "Social, ads, and covers—fast and visually consistent.",
        action: "Add to estimator"
      },
      songs: {
        title: "Music creation",
        desc: "Song ideas and arrangements with modern AI music workflows.",
        action: "Add to estimator"
      },
      automation: {
        title: "Automation",
        desc: "Remove busywork: scenarios, integrations, and clear team playbooks.",
        action: "Add to estimator"
      },
      bots: {
        title: "Bots & AI agents",
        desc: "Telegram bots, assistants, and guided conversation flows.",
        action: "Add to estimator"
      },
      training: {
        title: "Training from scratch",
        desc: "A calm on-ramp to neural networks—from first prompts to daily practice.",
        action: "Add to estimator"
      },
      aiConsulting: {
        title: "AI implementation consulting",
        desc: "Process review, priorities, and a roadmap without buzzword noise.",
        action: "Add to estimator"
      },
      branding: {
        title: "Personal brand packaging",
        desc: "Positioning, visual logic, and content that moves people to inquire.",
        action: "Add to estimator"
      },
      custom: {
        title: "Other digital solutions",
        desc: "Non-standard briefs—we shape the format around your context.",
        action: "Add to estimator"
      }
    },
    calculatorSection: {
      kicker: "Estimate",
      title: "Build your stack",
      intro:
        "Not sure what to include? Check what matters for your system — I’ll give a budget range. In your request, I’ll shape the offer to your context.",
      hint: "Check what you need — I’ll share a budget range."
    },
    serviceOffers: {
      kicker: "Services",
      title: "Choose what you need",
      expand: "Details",
      collapse: "Hide",
      cards: [
        {
          id: "sites",
          emoji: "💻",
          title: "Websites",
          priceLine: "from 20,000 ₽",
          details: [
            { name: "Landing page", price: "from 20,000 ₽" },
            { name: "Full build", price: "from 50,000 ₽" }
          ]
        },
        {
          id: "automation",
          emoji: "⚙️",
          title: "Automation",
          priceLine: "from 15,000 ₽",
          details: [{ name: "Bots / agents", price: "from 15,000 ₽" }]
        },
        {
          id: "content",
          emoji: "🎨",
          title: "Content & visuals",
          priceLine: "from 5,000 ₽",
          details: [{ name: "Visuals", price: "from 5,000 ₽" }]
        },
        {
          id: "training",
          emoji: "🎓",
          title: "Training",
          priceLine: "from 10,000 ₽",
          details: [
            { name: "Start / practice", price: "from 10,000 ₽" },
            { name: "1:1", price: "on request" }
          ]
        },
        {
          id: "creative",
          emoji: "🎬",
          title: "Portfolio",
          priceLine: "from 3,000 ₽",
          details: [
            { name: "Video", price: "from 3,000 ₽" },
            {
              name: "Music",
              price: "from 3,000 ₽",
              linkHref: "https://melanomusic.ru/",
              linkLabel: "View music project"
            }
          ]
        }
      ]
    },
    simpleCalculator: {
      kicker: "Estimate",
      title: "Build your stack",
      site: "website",
      automation: "automation",
      visual: "visuals",
      creative: "portfolio",
      emptyHint: "Select what goes into the system",
      estimateFrom: "Ballpark: from {amount} ₽"
    },
    educationSection: {
      kicker: "Training",
      title: "Neural networks for your real tasks",
      lead: "A calm on-ramp: from first steps to steady outcomes.",
      bonuses: "Templates, materials, and case reviews tailored to your tier.",
      bonusesBlockTitle: "🎁 Bonuses (all tiers)",
      bonusesBlockBody:
        "🎁 10 universal prompts for life and business\n🎁 Checklist: how to write precise requests\n🎁 Table: where ChatGPT really saves money",
      tariffs: [
        {
          id: "start",
          name: "START",
          price: "from 10,000 ₽",
          blurb: "Foundations and first wins",
          detailTitle: "START — “I watch and implement”",
          detailBody: `For those who want to go through the course calmly at their own pace.

What’s inside:
🎥 5 recorded lessons (~60 min each)
📘 templates, checklists, guides
🎁 course bonuses
⏳ 1 month access

No homework or reviews — you take it and do it.`
        },
        {
          id: "practice",
          name: "PRACTICE",
          price: "from 25,000 ₽",
          blurb: "Practice and momentum",
          featured: true,
          detailTitle: "PRACTICE — “With a curator and homework” ⭐️",
          detailBody: `Our most popular option: the goal is not to “watch” but to implement and get a result.

What’s inside:
everything in START +
🧩 homework after every lesson
👩‍🏫 reviews from the curator
💬 private participants’ chat
⏳ 3 months access

You’re less likely to drop off — you’re guided and get feedback.`
        },
        {
          id: "vip",
          name: "VIP",
          price: "from 80,000 ₽",
          blurb: "1:1 and deep work",
          detailTitle: "VIP — “Mentoring + Zoom + visuals”",
          detailBody: `For those who want maximum depth and personal support.

What’s inside:
everything in PRACTICE +
📹 2 Zoom calls (implementation + task review)
🎨 extra lessons on visuals: AI images, banners, layout
🧠 review of your case / account / tasks
📜 personalized certificate from NeiroEra
⏳ 6 months access

VIP is when you leave with skills in use — not just “I tried it once.”`
        }
      ],
      ctaChoose: "Choose a tier",
      ctaRequest: "Request a quote"
    },
    contactChoice: {
      title: "Website request",
      nameLabel: "Name",
      namePh: "How should we address you",
      contactLabel: "How to reach you",
      contactPh: "Telegram, email or phone",
      contactHint: "Add your preferred contact: Telegram, email or phone",
      messageLabel: "Project details",
      messagePh: "Briefly: what you need, timing, context",
      submit: "Send request",
      telegram: "Message on Telegram",
      close: "Close",
      sending: "Sending...",
      success: "Request sent",
      error: "Could not send. Try again later or use Telegram.",
      errorValidation: "Please fill in all fields."
    },
    diagnosticCalculator: {
      kicker: "Diagnostics",
      title: "See which system fits you",
      intro: "Answer three questions — I’ll share a format and budget range. We’ll refine details in Telegram.",
      q1: "What do you need?",
      needLeads: "Leads",
      needPack: "Packaging",
      needAuto: "Automation",
      q2: "Do you have a website?",
      q3: "Do you have content?",
      yes: "Yes",
      no: "No",
      resultLabel: "Recommended system:",
      resultName: "Full growth system",
      resultRange: "Ballpark: 120,000–250,000 ₽",
      cta: "Book a diagnostic call",
      next: "Next",
      again: "Start over"
    },
    calculator: {
      add: "Add to estimate",
      remove: "Remove",
      empty: "Pick services above or add a line manually.",
      subtotal: "Line total",
      total: "Total",
      discuss: "Discuss the project",
      request: "Send a request",
      perUnit: "per unit",
      lineTitle: "Service",
      qty: "Quantity",
      qtyLabels: {
        projects: "Projects / packages",
        units: "Units (videos, posts, etc.)",
        sessions: "Sessions / lessons"
      }
    },
    audience: {
      kicker: "Audience",
      title: "Experts, founders, and lean teams",
      items: [
        { title: "Experts", desc: "Turn expertise into a system: content, trust, and inbound leads." },
        { title: "Founders", desc: "Care about velocity—AI only where it moves the needle." },
        { title: "Small business", desc: "Outcomes without overloading the team—automation plus assistants." },
        { title: "High-growth minds", desc: "For people who want clarity and tech-forward execution." }
      ]
    },
    cases: {
      kicker: "Cases",
      title: "Challenge → Approach → Outcome",
      task: "Challenge",
      solution: "Approach",
      result: "Outcome",
      items: [
        {
          task: "A founder wanted a sharper brand and more inbound leads without burning herself out.",
          solution:
            "Built a Telegram content system: editorial pillars, funnel cadence, content-to-lead handoff, templates, plus a GPT copilot for first drafts.",
          result:
            "Lead volume and production speed improved in the first cycle—repeatable scenarios replaced one-off hustle."
        },
        {
          task: "A service expert struggled with sales because content was uneven and the site lacked structure.",
          solution:
            "Reframed the landing page around a lead magnet, added proof blocks, and wired a clear consultation booking path end-to-end.",
          result:
            "Higher-quality inquiries and a premium, confident feel that matches the personal brand."
        },
        {
          task: "A small business needed to automate repetitive ops so the owner was not doing everything manually.",
          solution:
            "Mapped the five highest-impact tasks, designed lightweight AI flows (draft replies, summaries, triage), and rolled out a support rhythm.",
          result:
            "The team moves faster with shared templates and an assistant layer that speeds decisions."
        }
      ]
    },
    process: {
      kicker: "Process",
      title: "Four steps to a working system",
      stepPrefix: "Step",
      steps: [
        { step: "1", title: "Discovery", desc: "Context, goals, constraints, and the sharpest pain points." },
        { step: "2", title: "Strategy", desc: "Priorities, AI scenarios, and the content logic that sells." },
        { step: "3", title: "Build", desc: "Website, content, and AI assets wired to work as one." },
        { step: "4", title: "Launch & refine", desc: "Go live, measure, and adjust with data and your pace." }
      ]
    },
    reviews: {
      kicker: "Reviews",
      title: "When the system actually works",
      label: "Review",
      items: [
        {
          name: "Olga N.",
          niche: "Expert, education",
          outcome: "Content turned into a process; the GPT agent removed repetitive work.",
          text: "Anastasia gave me a real system—content became a process, not a random weekly post. The GPT agent removed so much grunt work.",
          photo: "https://picsum.photos/seed/neiro-review-1/112/112"
        },
        {
          name: "Alex S.",
          niche: "Entrepreneur, services",
          outcome: "After discovery and strategy, the funnel started delivering steady inquiries.",
          text: "Practical and concrete. We clarified the jobs to be done, set the strategy, then built the stack. The funnel finally moved.",
          photo: "https://picsum.photos/seed/neiro-review-2/112/112"
        },
        {
          name: "Maria K.",
          niche: "Digital project",
          outcome: "Site and content aligned; premium-tech look with sharp messaging.",
          text: "Site and content finally feel connected. Visually premium-tech, verbally sharp and to the point.",
          photo: "https://picsum.photos/seed/neiro-review-3/112/112"
        }
      ]
    },
    socials: {
      kicker: "Social & contact",
      title: "Reach out where it fits you",
      intro: "Updates in channels. For a fast ping, use the bot or email. Portfolio and music are separate links.",
      tgChannelTitle: "Telegram channel",
      tgChannelSubtitle: "NeuroEra: playbooks, tools, examples",
      tgChannelText: "Actionable ideas you can apply immediately—AI workflows, breakdowns, fresh finds.",
      tgCta: "Open channel",
      tgBotTitle: "Contact bot",
      tgBotSubtitle: "Telegram",
      tgBotText: "Quick touchpoints and requests in a few taps.",
      tgBotCta: "Open bot",
      vkBrand: "VK",
      vkPageTitle: "VK page",
      vkPageText: "Posts and project news.",
      vkPageCta: "Open page",
      vkChannelTitle: "VK channel",
      vkChannelText: "Messenger-style channel inside VK.",
      vkChannelCta: "Open channel",
      maxTitle: "MAX",
      maxSubtitle: "NeuroEra on MAX",
      maxText: "Updates in the MAX messenger—mobile and web.",
      maxCta: "Open MAX channel",
      emailTitle: "Email",
      emailText: "For formal threads and materials.",
      emailCta: "Write an email",
      write: "Write",
      open: "Open",
      instagramTitle: "Instagram",
      instagramSubtitle: "Profile",
      instagramText: "Visual snippets and brand mood.",
      instagramCta: "Open Instagram",
      instagramLegal:
        "Instagram is owned by Meta Platforms Inc., whose activities are restricted in the Russian Federation.",
      melanoTitle: "MelanoMusic",
      melanoSubtitle: "Music & site",
      melanoText: "Music project—tracks, site, and mood.",
      melanoCta: "Open project",
      portfolioVibeTitle: "Portfolio",
      portfolioVibeSubtitle: "Vibe Coder / AI-first",
      portfolioVibeText: "A separate site: projects, vibe, and the feel of the interface.",
      portfolioVibeCta: "Open site"
    },
    referralSection: {
      kicker: "Partners",
      title: "Tools with referral support",
      intro: "Services I use myself. Using the links below also supports the project."
    },
    referrals: {
      syntx: {
        title: "Syntx Bot",
        desc: "A handy Telegram bot for everyday neural-network tasks.",
        cta: "Open bot"
      },
      suno: {
        title: "Suno",
        desc: "Generate and refine musical ideas faster.",
        cta: "Get access"
      },
      vezarys: {
        title: "VPN VEZARYS",
        desc: "Reliable access when your work depends on it.",
        cta: "Open bot"
      },
      sferoom: {
        title: "SFEROOM",
        desc: "Referral bonus: −10% with promo code “NeuroEra.” Monthly subscription discount for invited users.",
        cta: "Open"
      },
      prodamus: {
        title: "Prodamus",
        desc: "20% off connection for sole proprietors and companies. A special promo price of ₽1 for the self‑employed.",
        cta: "Open"
      },
      edaSibiri: {
        title: "Eda Sibiri",
        desc: "edasibiri.ru. Promo code NEIROERA — 5% off.",
        cta: "Open"
      }
    },
    final: {
      kicker: "Next step",
      title: "If you want a system—not chaos—let’s build it together",
      subtitle: "We usually start with diagnostics and tailor the solution to you",
      cta: "Request a quote"
    },
    leadForm: {
      badge: "Contact",
      title: "Request",
      intro: "Email a short brief — I’ll reply with the next step.",
      hint: "Or message on Telegram if that’s easier",
      name: "Name",
      namePh: "How should we address you?",
      contact: "Telegram / Email / Phone",
      contactPh: "e.g. @username or you@domain.com",
      goal: "What you want to achieve",
      goalPh: "Website, content engine, AI rollout, GPT assistant...",
      message: "Brief context",
      messagePh: "2–4 sentences: current state, blockers, desired outcome.",
      submit: "Send request",
      ctaEmail: "Request a quote",
      ctaTelegram: "Message on Telegram",
      sending: "Sending...",
      successTitle: "Request received",
      successText:
        "Thank you! I’ll follow up to align on the brief and next steps, and share materials on Telegram or email.",
      error: "Something went wrong. Please try again.",
      consent: "Opening Telegram starts a conversation to discuss your request."
    },
    footer: {
      name: "Anastasia Melnikova",
      tag: "NeuroEra",
      rights: "All rights reserved",
      linkPayment: "Payment",
      linkOffer: "Public offer",
      linkContacts: "Contacts"
    },
    paymentBlock: {
      title: "Online payment",
      text: "Pay for services via a secure checkout form",
      cta: "Pay now",
      promo: "НЕЙРОЭРА2026 — 10% off"
    },
    meta: {
      title: "Anastasia Melnikova — AI creator & architect",
      description:
        "AI-powered growth systems: website, content, automation, and tools in one loop with measurable outcomes"
    },
    theme: {
      toLight: "Switch to light theme",
      toDark: "Switch to dark theme",
      titleLight: "Light theme",
      titleDark: "Dark theme"
    }
  }
};
