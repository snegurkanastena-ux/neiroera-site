"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  className?: string;
  delayMs?: number;
  /** Лёгкое размытие до появления (отключается при prefers-reduced-motion) */
  blur?: boolean;
};

export function Reveal({ children, className = "", delayMs = 0, blur = true }: RevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 18, filter: blur ? "blur(7px)" : "blur(0px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.68, ease: [0.22, 1, 0.36, 1], delay: delayMs / 1000 }}
    >
      {children}
    </motion.div>
  );
}
