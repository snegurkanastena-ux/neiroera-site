"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import { siteLinks } from "../lib/links";
import { useI18n } from "../providers/SiteProviders";
import { Button } from "./ui/Button";

export function ChipmunkBanner() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const inView = useInView(ref, { once: true, margin: "0px 0px -12% 0px" });
  const { t } = useI18n();

  return (
    <div ref={ref} className="mt-20">
      <motion.div
        className="chipmunk-banner relative overflow-hidden rounded-[28px] border border-border/12 bg-bg/[0.28] px-5 py-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-md sm:px-8 sm:py-7"
        initial={reduceMotion ? false : { opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : reduceMotion ? {} : { opacity: 0, y: 16 }}
        transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -right-20 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgb(var(--orb-cyan)/0.12),transparent_68%)] blur-2xl"
        />
        <div className="relative flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between sm:gap-8">
          <motion.div
            className="relative shrink-0"
            whileHover={reduceMotion ? undefined : { scale: 1.04 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/chipmunk.png"
              alt=""
              width={112}
              height={112}
              className="chipmunk-wink h-[5.5rem] w-[5.5rem] object-contain opacity-95 sm:h-[6.25rem] sm:w-[6.25rem]"
            />
          </motion.div>
          <div className="max-w-xl text-center sm:flex-1 sm:text-left">
            <p className="text-base font-semibold leading-snug text-text/90 sm:text-lg">{t("chipmunk.text")}</p>
            <div className="mt-4 flex justify-center sm:justify-start">
              <Button href={siteLinks.telegramBot} variant="secondary" className="!px-5 !py-2.5 !text-sm" target="_blank" rel="noopener noreferrer">
                {t("chipmunk.cta")}
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
