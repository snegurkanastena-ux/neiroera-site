"use client";

import { motion, useMotionValue, useReducedMotion, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "../providers/SiteProviders";

export function Portrait() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [tiltEnabled, setTiltEnabled] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setTiltEnabled(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);

  const moveX = useTransform(mx, [0, 1], [6, -6]);
  const moveY = useTransform(my, [0, 1], [-5, 5]);
  const springX = useSpring(moveX, { stiffness: 44, damping: 24, mass: 0.45 });
  const springY = useSpring(moveY, { stiffness: 44, damping: 24, mass: 0.45 });

  function onPointerMove(e: React.PointerEvent) {
    if (reduceMotion || !tiltEnabled) return;
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

  const motionStyle =
    reduceMotion || !tiltEnabled ? undefined : { x: springX, y: springY };

  return (
    <div
      ref={ref}
      className="relative mx-auto w-full max-w-[min(100%,18rem)] sm:max-w-[min(100%,20rem)] lg:mx-0 lg:max-w-none lg:pl-2"
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
    >
      <motion.div
        className="relative mx-auto w-fit max-w-full lg:mx-0 lg:ml-auto"
        style={motionStyle}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/anastasia-hero.png"
          alt={t("footer.name")}
          className="mx-auto block h-auto max-h-[220px] w-auto max-w-full object-contain object-center rounded-[16px] sm:max-h-[280px] sm:rounded-[18px] lg:max-h-none lg:rounded-[20px]"
        />
      </motion.div>
    </div>
  );
}
