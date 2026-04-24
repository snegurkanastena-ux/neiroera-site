"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { useI18n } from "../providers/SiteProviders";

export function ServiceOfferGrid() {
  const { messages } = useI18n();
  const { cards, expand, collapse } = messages.serviceOffers;
  const [openId, setOpenId] = useState<string | null>(null);
  const reduceMotion = useReducedMotion();
  const openCard = openId ? cards.find((c) => c.id === openId) : undefined;

  return (
    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
      {cards.map((card) => {
        const isOpen = openId === card.id;
        return (
          <div key={card.id} className="min-w-0">
            <motion.button
              type="button"
              aria-expanded={isOpen}
              aria-controls={isOpen ? `service-offer-panel-${card.id}` : undefined}
              onClick={() => setOpenId((prev) => (prev === card.id ? null : card.id))}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              transition={{ type: "spring", stiffness: 480, damping: 28 }}
              className={`ne-card-hover-sm flex w-full max-w-full flex-col items-start overflow-hidden px-4 py-5 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/45 sm:min-h-[140px] sm:px-5 sm:py-6 ${
                isOpen ? "border-accent/50 bg-accent/[0.08] text-text" : "text-text/95"
              }`}
            >
              <span className="ne-card-hover__inner flex w-full min-w-0 max-w-full flex-col items-start text-left">
                <span className="text-2xl leading-none" aria-hidden>
                  {card.emoji}
                </span>
                <span className="mt-3 min-w-0 max-w-full break-words text-lg font-bold leading-tight">{card.title}</span>
                <span className="mt-2 min-w-0 max-w-full break-words text-lg font-bold tabular-nums tracking-tight text-accent sm:text-xl">
                  {card.priceLine}
                </span>
                <span className="mt-3 text-xs font-medium text-text/55">
                  {isOpen ? "▼" : "▶"} {isOpen ? collapse : expand}
                </span>
              </span>
            </motion.button>
          </div>
        );
      })}

      <AnimatePresence initial={false}>
        {openCard ? (
          <motion.div
            key={openCard.id}
            id={`service-offer-panel-${openCard.id}`}
            role="region"
            aria-label={openCard.title}
            initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
            transition={{ duration: reduceMotion ? 0.12 : 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="col-span-full min-w-0"
          >
            <div className="overflow-hidden rounded-xl border border-border/12 bg-bg/[0.55] px-4 py-4 sm:px-6 sm:py-5">
              <ul className="space-y-0 divide-y divide-border/10">
                {openCard.details.map((row, i) => (
                  <motion.li
                    key={`${openCard.id}-${row.name}-${i}`}
                    initial={reduceMotion ? false : { opacity: 0, x: -6 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: reduceMotion ? 0 : 0.04 + i * 0.04, duration: 0.28 }}
                    className="py-4 first:pt-0 last:pb-0"
                  >
                    <div className="flex flex-col gap-1.5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                      <span className="min-w-0 flex-1 text-base font-semibold leading-snug text-text sm:text-lg sm:leading-snug">
                        {row.name}
                      </span>
                      <span className="shrink-0 text-left text-xl font-bold tabular-nums leading-tight tracking-tight text-accent sm:text-right sm:text-2xl sm:leading-tight">
                        {row.price}
                      </span>
                    </div>
                    {row.linkHref ? (
                      <a
                        href={row.linkHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-2 inline-flex max-w-full items-center gap-1 text-sm font-medium leading-snug text-accent/95 underline decoration-accent/35 underline-offset-[3px] transition-colors hover:text-accent hover:decoration-accent sm:mt-2.5 sm:text-base"
                      >
                        {row.linkLabel ?? row.linkHref}
                        <span aria-hidden className="text-sm opacity-80">
                          ↗
                        </span>
                      </a>
                    ) : null}
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
