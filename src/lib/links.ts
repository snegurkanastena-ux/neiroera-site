/**
 * Централизованные внешние ссылки: соцсети, контакты, реферальные партнёры.
 * При смене URL править только здесь.
 */

export const siteLinks = {
  /** Telegram-канал «НейроЭра» */
  telegramChannel: "https://t.me/neiroeraMelnikova",
  /** Telegram-бот для связи */
  telegramBot: "https://t.me/Neuroeracall_bot",
  /** Telegram: кейсы, видео и музыка (портфолио) */
  telegramPortfolioCases: "https://t.me/portfplio_creator_Melnikova",
  /** Страница VK */
  vkPage: "https://vk.com/neuroera_melnikova",
  /** VK канал (мессенджер) */
  vkChannel: "https://vk.com/im/channels/-234461837",
  /** Email */
  email: "mailto:neuroera@yandex.com",
  /** Instagram (сохранён из прежней версии сайта) */
  instagram: "https://www.instagram.com/snegurka_nastena/",
  /** MelanoMusic — музыкальный проект */
  melanoMusic: "https://melanomusic.ru/",
  referrals: {
    /** DEMO-реферал: Syntx Bot */
    syntxBot: "https://t.me/syntxaibot?start=aff_1950103999",
    /** Suno */
    suno: "https://suno.com/invite/@anastasia_melnikova",
    /** VPN VEZARYS */
    vezarysVpn: "https://t.me/vezarysbot?start=1950103999"
  }
} as const;
