import { siteLinks } from "./links";

export type SocialLink = {
  label: string;
  href: string;
};

/**
 * Короткий список для футера и быстрых кнопок (иконки).
 * Полный набор контактов — в секции соцсетей на главной и в `siteLinks`.
 */
export const socialLinks: SocialLink[] = [
  { label: "Telegram", href: siteLinks.telegramChannel },
  { label: "VK", href: siteLinks.vkPage },
  { label: "Instagram", href: siteLinks.instagram }
];
