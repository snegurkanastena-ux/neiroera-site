"use client";

import { motion } from "framer-motion";
import { VkLogoIcon } from "./icons/VkLogoIcon";

export type SocialContactBrand = "telegram" | "vk" | "max" | "instagram" | "email" | "melano" | "bot" | "portfolio";

type SocialContactCardProps = {
  brand: SocialContactBrand;
  title: string;
  subtitle: string;
  description: string;
  cta: string;
  href: string;
  /** Для ссылки mailto: без target _blank */
  isMailto?: boolean;
  legalNote?: string;
  /** Сильная белая обводка (важные контакты) */
  emphasized?: boolean;
};

/** Белая иконка в духе MAX: кольцо + акцент снизу (читается на градиенте кнопки) */
function MaxGlyphIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="12" cy="9.5" r="5.2" stroke="currentColor" strokeWidth="2.2" fill="none" />
      <path
        d="M7 15.2c-1.1.7-1 2.1.1 2.5l1.1.4c.5.2 1-.1 1.1-.6l.4-1.3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

function ctaClass(brand: SocialContactBrand): string {
  const base =
    "inline-flex w-full min-h-[48px] items-center justify-center gap-2.5 rounded-2xl border border-white/15 px-4 py-3 text-sm font-semibold text-white transition hover:brightness-[1.08] sm:text-base";
  const glow: Record<SocialContactBrand, string> = {
    telegram: "shadow-[0_0_32px_rgba(42,170,230,0.5)]",
    bot: "shadow-[0_0_32px_rgba(42,170,230,0.45)]",
    vk: "shadow-[0_0_32px_rgba(0,119,255,0.5)]",
    max: "shadow-[0_0_36px_rgba(34,211,238,0.4)]",
    instagram: "shadow-[0_0_36px_rgba(236,72,153,0.35)]",
    email: "shadow-[0_0_28px_rgba(100,116,139,0.4)]",
    melano: "shadow-[0_0_32px_rgba(255,176,74,0.45)]",
    portfolio: "shadow-[0_0_34px_rgba(99,102,241,0.45)]"
  };
  const bg: Record<SocialContactBrand, string> = {
    telegram: "bg-gradient-to-br from-[#2AABEE] via-[#229ED9] to-[#1d8cc8]",
    bot: "bg-gradient-to-br from-[#2AABEE] via-[#229ED9] to-[#1d8cc8]",
    vk: "bg-gradient-to-br from-[#2787F5] via-[#0077FF] to-[#0066dd]",
    max: "bg-gradient-to-br from-[#22d3ee] from-10% via-[#6366f1] to-[#a855f7]",
    instagram: "bg-gradient-to-br from-[#f58529] via-[#dd2a7b] to-[#8134af]",
    email: "bg-gradient-to-br from-slate-500 to-slate-700",
    melano: "bg-gradient-to-br from-amber-400/95 via-orange-400/95 to-rose-500/90 text-slate-950",
    portfolio: "bg-gradient-to-br from-indigo-500 via-violet-600 to-purple-600"
  };
  return `${base} ${bg[brand]} ${glow[brand]}`;
}

function CtaIcon({ brand }: { brand: SocialContactBrand }) {
  if (brand === "vk") return <VkLogoIcon size={18} className="shrink-0" />;
  if (brand === "telegram" || brand === "bot")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
        <path
          d="M22 3L2 10.5L9 13L21 5.5L11.2 15.8L10.4 21L13.7 17.7L17.8 20.4L22 3Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      </svg>
    );
  if (brand === "max") return <MaxGlyphIcon className="h-[18px] w-[18px] shrink-0" />;
  if (brand === "instagram")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
        <rect x="6" y="6" width="12" height="12" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (brand === "email")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0" aria-hidden>
        <path d="M4 6h16v12H4V6Z" stroke="currentColor" strokeWidth="1.6" />
        <path d="M4 7l8 6 8-6" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (brand === "melano")
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="shrink-0 text-slate-950" aria-hidden>
        <path d="M9 18V5l12-2v13" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="6" cy="18" r="2.5" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="18" cy="16" r="2.5" stroke="currentColor" strokeWidth="1.6" />
      </svg>
    );
  if (brand === "portfolio")
    return (
      <span className="shrink-0 text-xs font-bold" aria-hidden>
        {"</>"}
      </span>
    );
  return null;
}

const MotionA = motion.a;

export function SocialContactCard({
  brand,
  title,
  subtitle,
  description,
  cta,
  href,
  isMailto,
  legalNote,
  emphasized
}: SocialContactCardProps) {
  const ctaTextClass = brand === "melano" ? "text-slate-950" : "text-white";
  const ctaIconClass = brand === "melano" ? "text-slate-950" : "text-white";
  const cardFrame = emphasized
    ? "ring-[3px] ring-white/95 border-[3px] border-white/90"
    : "";
  return (
    <div
      className={`ne-card-hover flex h-full min-h-[300px] flex-col rounded-3xl p-4 sm:p-6 ${cardFrame}`}
    >
      <div className="ne-card-hover__inner flex h-full min-h-0 flex-col">
        <div className="min-w-0">
          <div className="text-sm text-text/70">{title}</div>
          <div className="font-display mt-1 text-base font-bold leading-snug text-text sm:text-lg">{subtitle}</div>
          <p className="mt-2 text-sm leading-relaxed text-text/75">{description}</p>
        </div>
        {legalNote ? <p className="mt-3 text-xs leading-relaxed text-text/60">{legalNote}</p> : null}
        <div className="min-h-4 flex-1" aria-hidden />
        <div className="pt-4">
          <MotionA
            href={href}
            target={isMailto ? undefined : "_blank"}
            rel={isMailto ? undefined : "noopener noreferrer"}
            whileTap={{ scale: 0.98 }}
            className={`${ctaClass(brand)} ${ctaIconClass} focus:outline-none focus-visible:ring-2 focus-visible:ring-white/50`}
          >
            <CtaIcon brand={brand} />
            <span className={ctaTextClass}>{cta}</span>
          </MotionA>
        </div>
      </div>
    </div>
  );
}
