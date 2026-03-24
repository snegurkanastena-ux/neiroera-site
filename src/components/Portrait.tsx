"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

export function Portrait() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const moveX = useTransform(mx, [0, 1], [6, -6]);
  const moveY = useTransform(my, [0, 1], [-5, 5]);
  const springX = useSpring(moveX, { stiffness: 44, damping: 24, mass: 0.45 });
  const springY = useSpring(moveY, { stiffness: 44, damping: 24, mass: 0.45 });

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
      className="relative mx-auto w-full max-w-lg lg:mx-0 lg:max-w-none lg:pl-2"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        className="relative overflow-hidden rounded-[22px] border border-white/[0.12] shadow-[0_32px_100px_rgba(0,0,0,0.55),0_0_0_1px_rgba(255,255,255,0.06),0_0_72px_rgba(94,231,255,0.1)] ring-1 ring-white/[0.04]"
        style={reduceMotion ? undefined : { x: springX, y: springY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/anastasia-hero.png"
          alt="Анастасия Мельникова"
          className="aspect-[3/4] w-full object-cover sm:aspect-[3/4] lg:aspect-[4/5] lg:min-h-[min(600px,78vh)]"
        />
      </motion.div>
    </div>
  );
}
