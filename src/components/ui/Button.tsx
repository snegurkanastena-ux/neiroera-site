"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";

const MotionLink = motion(Link);
const MotionA = motion.a;
const MotionButton = motion.button;

const tapTransition = { type: "spring" as const, stiffness: 520, damping: 30, mass: 0.35 };

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
  const cls = `inline-flex items-center justify-center gap-2 rounded-2xl px-5 py-3 text-sm sm:text-base font-semibold tracking-tight transition-all duration-300 hover:scale-[1.03] hover:shadow-[0_0_25px_rgba(0,255,200,0.22)] focus:outline-none focus:ring-2 focus:ring-accent/40 disabled:pointer-events-none disabled:opacity-45 ${buttonClasses(
    variant
  )} ${className}`;

  const motionProps = disabled
    ? {}
    : {
        whileTap: { scale: 0.97 },
        transition: tapTransition
      };

  if (href) {
    const isHash = href.startsWith("#");
    const isInternal = href.startsWith("/");
    if (isHash) {
      return (
        <MotionA href={href} className={cls} onClick={onClick} {...motionProps}>
          {children}
        </MotionA>
      );
    }
    if (isInternal) {
      return (
        <MotionLink href={href} className={cls} onClick={onClick} {...motionProps}>
          {children}
        </MotionLink>
      );
    }
    return (
      <MotionA
        href={href}
        className={cls}
        target={target ?? "_blank"}
        rel={rel ?? "noopener noreferrer"}
        onClick={onClick}
        {...motionProps}
      >
        {children}
      </MotionA>
    );
  }

  return (
    <MotionButton type={type} className={cls} onClick={onClick} disabled={disabled} {...motionProps}>
      {children}
    </MotionButton>
  );
}
