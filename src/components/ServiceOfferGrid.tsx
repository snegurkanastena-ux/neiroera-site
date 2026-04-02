"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "../providers/SiteProviders";

export function ServiceOfferGrid() {
  const { messages } = useI18n();
  const { cards, expand, collapse } = messages.serviceOffers;
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();

  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const isOpen = openId === card.id;
        const isSelected = openId === card.id;
        return (
          <div key={card.id} className="min-w-0">
            <motion.button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpenId((prev) => (prev === card.id ? null : card.id))}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 480, damping: 28 }}
              className={`flex w-full flex-col items-start rounded-2xl border px-4 py-5 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 sm:min-h-[140px] sm:px-5 sm:py-6 ${
                isSelected
                  ? "border-accent/50 bg-accent/[0.08] text-text"
                  : "border-border/14 bg-bg/[0.35] text-text/95 hover:border-border/25 hover:bg-bg/[0.5]"
              }`}
            >
              <span className="text-2xl leading-none" aria-hidden>
                {card.emoji}
              </span>
              <span className="mt-3 text-lg font-bold leading-tight">{card.title}</span>
              <span className="mt-2 text-base font-semibold text-accent">{card.priceLine}</span>
              <span className="mt-3 text-xs font-medium text-text/55">
                {isOpen ? "▼" : "▶"} {isOpen ? collapse : expand}
              </span>
            </motion.button>

            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  key="panel"
                  initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
                  transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <div
                    className="mt-2 rounded-xl border border-border/12 bg-bg/[0.55] px-4 py-3 text-sm"
                    role="region"
                    aria-label={card.title}
                  >
                    <ul className="space-y-2.5">
                      {card.details.map((row, i) => (
                        <motion.li
                          key={row.name}
                          initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: reduceMotion ? 0 : 0.04 + i * 0.04, duration: 0.28 }}
                          className="flex items-baseline justify-between gap-3 border-b border-border/8 pb-2 last:border-0 last:pb-0"
                        >
                          <span className="text-text/85">{row.name}</span>
                          <span className="shrink-0 font-semibold text-text">{row.price}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
