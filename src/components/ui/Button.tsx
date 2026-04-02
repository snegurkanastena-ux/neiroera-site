 "use client";

import Link from "next/link";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";

export type ButtonProps = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: ButtonVariant;
  className?: string;
  target?: string;
  rel?: string;
  disabled?: boolean;
};

function buttonClasses(variant: ButtonVariant) {
  switch (variant) {
    case "primary":
      return "bg-gradient-to-br from-accent via-accent to-accent2/95 text-onAccent shadow-glow hover:brightness-[1.06] border border-white/20";
    case "secondary":
      return "bg-accent2/15 text-text border border-accent2/40 hover:bg-accent2/22 backdrop-blur-sm";
    case "ghost":
      return "bg-transparent text-text/90 border border-border/12 hover:bg-surface/8";
  }
}

export function Button({
  children,
  href,
  onClick,
  type = "button",
  variant = "primary",
  className = "",
  target,
  rel,
  disabled
}: ButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold tracking-tight transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:pointer-events-none disabled:opacity-45 ${buttonClasses(
    variant
  )} ${className}`;

  if (href) {
    const isHash = href.startsWith("#");
    const isInternal = href.startsWith("/");
    if (isHash) {
      return (
        <a href={href} className={cls} onClick={onClick}>
          {children}
        </a>
      );
    }
    if (isInternal) {
      return (
        <Link href={href} className={cls} onClick={onClick}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} target={target ?? "_blank"} rel={rel ?? "noopener noreferrer"} onClick={onClick}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} className={cls} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}

