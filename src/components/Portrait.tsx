"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const moveX = useTransform(mx, [0, 1], [10, -10]);
  const moveY = useTransform(my, [0, 1], [-8, 8]);
  const springX = useSpring(moveX, { stiffness: 52, damping: 22, mass: 0.4 });
  const springY = useSpring(moveY, { stiffness: 52, damping: 22, mass: 0.4 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduceMotion) return;
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  }

  function onPointerLeave() {
    mx.set(0.5);
    my.set(0.5);
  }

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-xl lg:mx-0 lg:max-w-none"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-6 rounded-[36px] bg-[radial-gradient(ellipse_at_30%_20%,rgb(var(--orb-cyan)/0.14),transparent_55%),radial-gradient(ellipse_at_80%_70%,rgb(var(--orb-purple)/0.12),transparent_50%)] opacity-90 blur-[1px]"
      />
      <motion.div
        className="relative overflow-hidden rounded-[28px] border border-white/[0.08] shadow-[0_28px_90px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.04),0_0_60px_rgba(55,230,255,0.08)]"
        style={reduceMotion ? undefined : { x: springX, y: springY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/anastasia-hero.png"
          alt="Анастасия Мельникова"
          className="aspect-[4/5] w-full object-cover sm:aspect-[3/4] lg:min-h-[min(520px,70vh)] lg:aspect-auto"
        />
      </motion.div>
    </div>
  );
}
