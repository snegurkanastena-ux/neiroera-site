"use client";

/**
 * Галерея «Нейрофото»: четыре вертикальных подвеса (точка крепления → шнур → клип → карточка).
 * Покачивание — framer-motion; при prefers-reduced-motion — статика.
 */

import { motion, useReducedMotion } from "framer-motion";
import { useI18n } from "../providers/SiteProviders";

const SWING_DEG = 1.35;
const DURATION_BASE = 4.65;
const DURATION_STEP = 0.5;

type NeuroPhotoGalleryProps = {
  photos: readonly string[];
};

export function NeuroPhotoGallery({ photos }: NeuroPhotoGalleryProps) {
  const { t } = useI18n();
  const reduceMotion = useReducedMotion();

  return (
    <div className="neuro-photo-gallery mt-6 overflow-visible px-1 sm:px-0">
      <p className="mb-6 text-xs text-text/55 sm:mb-8 sm:text-sm">
        {reduceMotion ? t("portfolio.neuroPhotoReduced") : t("portfolio.neuroPhotoHint")}
      </p>

      {/* Общая верхняя линия — зона «крепления» */}
      <div className="neuro-photo-gallery__rail mb-0 flex justify-center" aria-hidden>
        <div className="h-px w-[min(100%,56rem)] max-w-full bg-gradient-to-r from-transparent via-white/[0.14] to-transparent" />
      </div>

      <div className="neuro-photo-gallery__grid grid grid-cols-2 gap-x-6 gap-y-12 pt-3 sm:gap-x-8 sm:gap-y-14 md:grid-cols-2 lg:grid-cols-4 lg:gap-x-6 lg:gap-y-10">
        {photos.map((src, index) => (
          <NeuroPhotoPendulum key={src} src={src} index={index} reduceMotion={!!reduceMotion} />
        ))}
      </div>
    </div>
  );
}

function NeuroPhotoPendulum({
  src,
  index,
  reduceMotion
}: {
  src: string;
  index: number;
  reduceMotion: boolean;
}) {
  const duration = DURATION_BASE + index * DURATION_STEP;

  const swing = reduceMotion
    ? false
    : {
        rotate: [-SWING_DEG, SWING_DEG, -SWING_DEG],
        transition: {
          duration,
          repeat: Infinity,
          ease: "easeInOut" as const
        }
      };

  return (
    <div className="neuro-photo-pendulum flex flex-col items-center">
      {/* Точка на линии крепления */}
      <div
        className="neuro-photo-pendulum__anchor z-[1] -mt-px h-2 w-2 shrink-0 rounded-full border border-white/22 bg-[rgb(var(--bg-rgb))] shadow-[0_0_0_1px_rgba(255,255,255,0.04)]"
        aria-hidden
      />

      <motion.div
        className="neuro-photo-pendulum__swing flex w-full max-w-[220px] flex-col items-center sm:max-w-[240px]"
        style={{ transformOrigin: "50% 0" }}
        animate={swing}
        whileHover={
          reduceMotion
            ? undefined
            : { scale: 1.025, y: -6, transition: { type: "spring", stiffness: 380, damping: 28 } }
        }
      >
        {/* Шнур */}
        <div
          className="neuro-photo-pendulum__cord w-px shrink-0 bg-gradient-to-b from-white/[0.32] via-white/[0.14] to-white/[0.08]"
          style={{ height: "clamp(2.5rem, 4.5vw, 3.5rem)" }}
          aria-hidden
        />

        {/* Клип */}
        <div
          className="neuro-photo-pendulum__clip mt-0.5 flex h-2 w-[1.65rem] shrink-0 items-center justify-center rounded-[3px] border border-white/18 bg-gradient-to-b from-white/[0.1] to-white/[0.04] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
          aria-hidden
        >
          <span className="h-px w-[0.65rem] rounded-full bg-white/25" />
        </div>

        {/* Карточка */}
        <div className="neuro-photo-pendulum__card mt-2 w-full overflow-hidden rounded-2xl ring-1 ring-white/[0.1] shadow-[0_20px_48px_-14px_rgba(0,0,0,0.65)] sm:rounded-[1.1rem] sm:shadow-[0_24px_56px_-16px_rgba(0,0,0,0.7)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt=""
            className="aspect-[3/4] h-auto w-full object-cover object-center"
            loading="lazy"
            decoding="async"
          />
        </div>
      </motion.div>
    </div>
  );
}
