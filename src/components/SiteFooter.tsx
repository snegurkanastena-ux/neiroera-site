"use client";

/**
 * Подвал сайта: копирайт и быстрые соцкнопки (переводы через i18n).
 */

import { socialLinks } from "../lib/socials";
import { useI18n } from "../providers/SiteProviders";
import { Container } from "./Container";
import { Button } from "./ui/Button";

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 3L2 10.5L9 13L21 5.5L11.2 15.8L10.4 21L13.7 17.7L17.8 20.4L22 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function VkIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 6.5C4 6.5 4 7.7 4 9.2C4 14.2 7 17 10.5 17H12V14.8H10.8C9.6 14.8 8.5 13.8 8.5 12.7V11.8H10.3C11.4 11.8 12 10.6 12 9.7V6.5H8.5V8.7C8.5 9.1 8.2 9.4 7.8 9.4H7.4C7.1 9.4 6.8 9.2 6.7 8.9C6.5 8.6 6.5 8.2 6.5 7.9V6.5H4Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M20 17C18.1 17 16.5 15.4 16.5 13.5V6.5H13.8V13.4C13.8 16 16 18.2 18.6 18.2H20V17Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.8" />
      <path d="M15.3 8.7H15.3" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
      <circle cx="12" cy="12" r="2.8" stroke="currentColor" strokeWidth="1.8" />
    </svg>
  );
}

function SocialGlyph({ label }: { label: string }) {
  if (label === "Telegram") return <TelegramIcon />;
  if (label === "VK") return <VkIcon />;
  return <InstagramIcon />;
}

export function SiteFooter() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-border/8 py-10 transition-colors duration-300">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-bold">{t("footer.name")}</div>
            <div className="text-sm text-text/70">{t("footer.tag")}</div>
            <div className="mt-2 text-xs text-text/50">
              © {year} {t("footer.rights")}
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {socialLinks.map((s) => (
              <Button
                key={s.label}
                href={s.href}
                variant={s.label === "Telegram" ? "primary" : "ghost"}
                className="!px-3"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span
                  className={`inline-flex items-center gap-2 ${s.label === "Telegram" ? "text-onAccent" : "text-accent"}`}
                >
                  <SocialGlyph label={s.label} />
                  <span className="hidden sm:inline">{s.label}</span>
                </span>
              </Button>
            ))}
          </div>
      </Container>
    </footer>
  );
}
