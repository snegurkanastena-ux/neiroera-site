"use client";

/**
 * Подвал сайта: копирайт и быстрые соцкнопки (переводы через i18n).
 */

import Link from "next/link";
import { socialLinks } from "../lib/socials";
import { useI18n } from "../providers/SiteProviders";
import { Container } from "./Container";
import { VkLogoIcon } from "./icons/VkLogoIcon";
import { Button } from "./ui/Button";

function TelegramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M22 3L2 10.5L9 13L21 5.5L11.2 15.8L10.4 21L13.7 17.7L17.8 20.4L22 3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    </svg>
  );
}

function VkIcon() {
  return <VkLogoIcon size={18} />;
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

  return (
    <footer className="relative border-t border-border/8 py-10 transition-colors duration-300">
      <Container className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="font-display text-lg font-bold tracking-tight">{t("footer.name")}</div>
            <div className="text-sm text-text/70">{t("footer.tag")}</div>
            <div className="mt-2 text-xs text-text/50">© 2026 NeuroEra by Anastasia Melnikova</div>
            <nav className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-text/60" aria-label="Юридическая информация и оплата">
              <Link href="/payment" className="transition-colors hover:text-accent">
                {t("footer.linkPayment")}
              </Link>
              <Link href="/offer" className="transition-colors hover:text-accent">
                {t("footer.linkOffer")}
              </Link>
              <Link href="/contacts" className="transition-colors hover:text-accent">
                {t("footer.linkContacts")}
              </Link>
            </nav>
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
