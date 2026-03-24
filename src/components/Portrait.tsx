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
      className="relative mx-auto w-full max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-none lg:pl-2"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        className="relative mx-auto w-fit max-w-full lg:mx-0 lg:ml-auto"
        style={reduceMotion ? undefined : { x: springX, y: springY }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/anastasia-hero.png"
          alt="Анастасия Мельникова"
          className="mx-auto block h-auto max-h-[320px] w-auto max-w-full object-contain object-center rounded-[18px] sm:max-h-none lg:mx-0 lg:rounded-[20px]"
        />
      </motion.div>
    </div>
  );
}
