import type { ServiceId } from "./servicesCatalog";

export type Lang = "ru" | "en";

/** Вложенный ключ через точку, напр. "hero.title" */
export type MessageKey = string;

type CaseItem = { task: string; solution: string; result: string };
type ReviewItem = { name: string; text: string; niche: string; outcome: string; photo?: string };
type AudienceItem = { title: string; desc: string };
type ProcessStep = { step: string; title: string; desc: string };

export type Messages = {
  nav: Record<string, string>;
  hero: Record<string, string | string[]>;
  about: {
    kicker: string;
    title: string;
    p1: string;
    p2: string;
    listLabel: string;
    listItems: string;
    thesis: string;
  };
  pain: { kicker: string; title: string; cards: string[]; closing: string };
  solution: { kicker: string; title: string; flow: string; bullets: string[]; cta: string };
  portfolio: {
    kicker: string;
    title: string;
    intro: string;
    items: {
      title: string;
      desc: string;
      anchor: string;
      casesCta?: string;
      casesNote?: string;
      listenMoreCta?: string;
    }[];
  };
  productsSection: { kicker: string; title: string; items: { title: string; desc: string }[] };
  servicesSection: Record<string, string>;
  serviceItems: Record<ServiceId, { title: string; desc: string; action: string }>;
  calculatorSection: Record<string, string>;
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
  chipmunk: { text: string; cta: string };
  leadForm: Record<string, string>;
  footer: Record<string, string>;
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
      portfolio: "Портфолио",
      services: "Продукты",
      calculator: "Калькулятор",
      audience: "Для кого",
      cases: "Кейсы",
      process: "Как работаю",
      reviews: "Отзывы",
      socials: "Соцсети",
      toTelegram: "В Telegram",
      openMenu: "Открыть меню"
    },
    hero: {
      title:
        "Создаю системы роста на базе ИИ\nдля бизнеса, экспертов и творчества",
      subtitle:
        "Сайт, контент, автоматизация и AI-инструменты —\nвсё в одной системе, которая приносит результат",
      trust1: "15+ лет опыта",
      trust2: "внедрение под задачи, а не обучение",
      trust3: "реальные кейсы",
      ctaConsult: "Получить систему под свой бизнес",
      ctaTg: "В Telegram"
    },
    about: {
      kicker: "Обо мне",
      title: "Системный AI-архитектор и креатор",
      p1: "Я не учу «пользоваться нейросетями».\nЯ внедряю их в реальные задачи бизнеса.",
      p2: "Более 15 лет управленческого опыта\nи переход в практическое применение ИИ.",
      listLabel: "Помогаю собрать систему, где:",
      listItems: JSON.stringify([
        "сайт приводит клиентов",
        "контент продаёт",
        "автоматизация экономит время",
        "AI усиливает результат"
      ]),
      thesis: "Вы не покупаете сайт.\nВы покупаете систему, которая работает."
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
      closing: "Проблема не в инструментах.\nПроблема — в отсутствии системы."
    },
    solution: {
      kicker: "Решение",
      title: "Я собираю систему, где всё работает вместе",
      flow: "Трафик → Контент → Сайт → AI → Заявка",
      bullets: [
        "сайт приводит",
        "контент прогревает",
        "AI ускоряет",
        "система работает как единый механизм"
      ],
      cta: "Разобрать мою ситуацию"
    },
    portfolio: {
      kicker: "Портфолио",
      title: "Визуал, движение и звук",
      intro: "Направления, в которых собираю цельные решения на стыке креатива и AI.",
      items: [
        {
          title: "Нейрофото",
          desc: "Обложки, визуалы для соцсетей и рекламы — быстро, в едином стиле и с сильным кадром.",
          anchor: "portfolio-neurophoto"
        },
        {
          title: "Кейсы и видео",
          desc: "Реальные проекты, сценарии и визуал — смотрите в Telegram",
          anchor: "portfolio-video",
          casesCta: "Смотреть кейсы →",
          casesNote: "Часть кейсов не публикуется в открытом доступе"
        },
        {
          title: "Музыка",
          desc: "Музыкальные идеи и аранжировки в связке с современными AI-инструментами.",
          anchor: "portfolio-music",
          listenMoreCta: "Слушать больше →"
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
      kicker: "Диагностика",
      title: "Быстрый разбор запроса",
      hint: "Три вопроса — чтобы понять контекст и предложить формат системы."
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
          text: "Анастасия собрала мне систему: контент перестал быть «раз в неделю» и превратился в процесс. Плюс GPT-агент реально снял рутину."
        },
        {
          name: "Алексей С.",
          niche: "Предприниматель, услуги",
          outcome: "После разбора и стратегии воронка начала стабильно отдавать заявки.",
          text: "Очень практичный подход. Никаких абстракций: мы разобрали задачи, сделали стратегию, и дальше пошла сборка системы. Результат — воронка начала работать."
        },
        {
          name: "Мария К.",
          niche: "Digital-проект",
          outcome: "Сайт и контент выстроены в одну линию; визуально premium tech, по смыслу — по делу.",
          text: "Понравилось, что сайт и контент начали «разговаривать» друг с другом. Визуально — premium tech, по смыслу — чётко и по делу."
        }
      ]
    },
    socials: {
      kicker: "Соцсети и контакты",
      title: "На связи там, где вам удобнее",
      intro: "Практика и обновления — в Telegram и VK. Для быстрой связи есть бот и почта.",
      tgChannelTitle: "Telegram-канал",
      tgChannelSubtitle: "«НейроЭра»: внедрения, инструменты, примеры",
      tgChannelText: "Контент, который можно применять сразу: сценарии ИИ, разборы и свежие находки.",
      tgCta: "Открыть канал",
      tgBotTitle: "Бот для связи",
      tgBotText: "Быстрый контакт и заявка в пару касаний.",
      vkPageTitle: "Страница VK",
      vkPageText: "Публикации и новости проекта.",
      vkChannelTitle: "VK-канал",
      vkChannelText: "Формат канала в мессенджере VK.",
      emailTitle: "Email",
      emailText: "Для деловой переписки и материалов.",
      write: "Написать",
      open: "Открыть",
      instagramTitle: "Instagram",
      instagramText: "Визуальные фрагменты и настроение бренда.",
      note: "Ссылки централизованы в коде (`src/lib/links.ts`) — при смене URL правьте там."
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
      }
    },
    final: {
      kicker: "Следующий шаг",
      title: "Если вы хотите систему, а не хаос — давайте соберём её",
      subtitle: "Обычно начинаем с диагностики и собираем решение под вас",
      cta: "Получить разбор"
    },
    chipmunk: {
      text: "Давайте соберём вашу систему",
      cta: "Получить разбор"
    },
    leadForm: {
      badge: "Связь",
      title: "Заявка и консультация",
      intro: "Откройте диалог в боте и кратко опишите задачу — так быстрее согласуем запрос и следующий шаг.",
      hint: "Напишите в Telegram — так быстрее согласуем задачу и следующий шаг",
      name: "Имя",
      namePh: "Как к вам обращаться?",
      contact: "Telegram / Email / Телефон",
      contactPh: "Например: @username или email@domain.com",
      goal: "Что хотите получить",
      goalPh: "Сайт, контент-система, внедрение ИИ, GPT-ассистент...",
      message: "Коротко о задаче",
      messagePh: "Напишите 2–4 предложения: что есть сейчас, что не получается, какой результат нужен.",
      submit: "Отправить заявку",
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
      rights: "Все права защищены"
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
      portfolio: "Portfolio",
      services: "Products",
      calculator: "Estimator",
      audience: "Audience",
      cases: "Cases",
      process: "Process",
      reviews: "Reviews",
      socials: "Social",
      toTelegram: "Telegram",
      openMenu: "Open menu"
    },
    hero: {
      title: "I build AI-powered growth systems\nfor business, experts, and creative work",
      subtitle:
        "Website, content, automation, and AI tools —\none connected system that drives outcomes",
      trust1: "15+ years of experience",
      trust2: "implementation for your tasks, not generic training",
      trust3: "real case studies",
      ctaConsult: "Get a system for your business",
      ctaTg: "Telegram"
    },
    about: {
      kicker: "About",
      title: "AI architect and creator, systems-first",
      p1: "I don’t teach people to “use neural networks.”\nI embed them into real business problems.",
      p2: "15+ years in leadership\nand a shift into hands-on AI adoption.",
      listLabel: "I help assemble a system where:",
      listItems: JSON.stringify([
        "your site brings clients",
        "content sells",
        "automation saves time",
        "AI amplifies outcomes"
      ]),
      thesis: "You’re not buying a website.\nYou’re buying a system that works."
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
      closing: "The problem isn’t the tools.\nThe problem is the lack of a system."
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
      cta: "Review my situation"
    },
    portfolio: {
      kicker: "Portfolio",
      title: "Visuals, motion, and sound",
      intro: "Focus areas where I ship cohesive work at the intersection of craft and AI.",
      items: [
        {
          title: "Neuro photography",
          desc: "Covers and social visuals with a strong frame — fast and visually consistent.",
          anchor: "portfolio-neurophoto"
        },
        {
          title: "Cases & video",
          desc: "Real projects, scripts, and visuals — on Telegram",
          anchor: "portfolio-video",
          casesCta: "View cases →",
          casesNote: "Some work is not shared publicly"
        },
        {
          title: "Music",
          desc: "Musical ideas and arrangements using modern AI music workflows.",
          anchor: "portfolio-music",
          listenMoreCta: "Listen more →"
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
      kicker: "Diagnostics",
      title: "Quick request check-in",
      hint: "Three questions to understand context and suggest a system format."
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
          text: "Anastasia gave me a real system—content became a process, not a random weekly post. The GPT agent removed so much grunt work."
        },
        {
          name: "Alex S.",
          niche: "Entrepreneur, services",
          outcome: "After discovery and strategy, the funnel started delivering steady inquiries.",
          text: "Practical and concrete. We clarified the jobs to be done, set the strategy, then built the stack. The funnel finally moved."
        },
        {
          name: "Maria K.",
          niche: "Digital project",
          outcome: "Site and content aligned; premium-tech look with sharp messaging.",
          text: "Site and content finally feel connected. Visually premium-tech, verbally sharp and to the point."
        }
      ]
    },
    socials: {
      kicker: "Social & contact",
      title: "Reach out where it fits you",
      intro: "Updates live on Telegram and VK. For a fast ping, use the bot or email.",
      tgChannelTitle: "Telegram channel",
      tgChannelSubtitle: "NeuroEra: playbooks, tools, examples",
      tgChannelText: "Actionable ideas you can apply immediately—AI workflows, breakdowns, fresh finds.",
      tgCta: "Open channel",
      tgBotTitle: "Contact bot",
      tgBotText: "Quick touchpoints and requests in a few taps.",
      vkPageTitle: "VK profile",
      vkPageText: "Posts and project news.",
      vkChannelTitle: "VK channel",
      vkChannelText: "Messenger-style channel inside VK.",
      emailTitle: "Email",
      emailText: "For formal threads and materials.",
      write: "Write",
      open: "Open",
      instagramTitle: "Instagram",
      instagramText: "Visual snippets and brand mood.",
      note: "All URLs live in `src/lib/links.ts` for easy updates."
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
      }
    },
    final: {
      kicker: "Next step",
      title: "If you want a system—not chaos—let’s build it together",
      subtitle: "We usually start with diagnostics and tailor the solution to you",
      cta: "Get a review session"
    },
    chipmunk: {
      text: "Let’s assemble your system",
      cta: "Get a review session"
    },
    leadForm: {
      badge: "Contact",
      title: "Requests & consultations",
      intro: "Open the bot chat and share a short brief — we’ll align faster on scope and next steps.",
      hint: "Message on Telegram — fastest way to align on the brief and next steps",
      name: "Name",
      namePh: "How should we address you?",
      contact: "Telegram / Email / Phone",
      contactPh: "e.g. @username or you@domain.com",
      goal: "What you want to achieve",
      goalPh: "Website, content engine, AI rollout, GPT assistant...",
      message: "Brief context",
      messagePh: "2–4 sentences: current state, blockers, desired outcome.",
      submit: "Send request",
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
      rights: "All rights reserved"
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
