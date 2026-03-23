"use client";

import { useState } from "react";

export function Portrait() {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-[32px] border border-border/12 overflow-hidden bg-bg/30">
      <div className="absolute inset-0 animated-gradient opacity-35" />
      <div className="absolute -top-28 -left-28 h-64 w-64 gradient-orb" />
      <div className="absolute -bottom-32 -right-36 h-72 w-72 gradient-orb purple opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(243,201,182,0.14),rgba(11,15,20,0)_55%)]" />

      {/* Световой “каркас” */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none">
        <div className="absolute left-10 top-12 h-2 w-2 rounded-full bg-accent shadow-glow" />
        <div className="absolute right-10 top-24 h-2 w-2 rounded-full bg-accent2 shadow-[0_0_24px_rgba(139,92,255,0.35)]" />
        <div className="absolute left-16 bottom-16 h-2 w-2 rounded-full bg-warm/90 shadow-[0_0_24px_rgba(243,201,182,0.25)]" />
      </div>

      <div className="absolute inset-0 flex items-end justify-end p-5">
        <div className="rounded-2xl border border-border/12 bg-bg/40 px-4 py-3">
          <div className="text-xs text-text/60">Digital glow</div>
          <div className="text-lg font-black">personal brand</div>
        </div>
      </div>

      <div className="absolute inset-0 grid place-items-center">
        <div className="h-[72%] w-[66%] overflow-hidden rounded-3xl border border-border/12 bg-bg/30 shadow-[0_10px_40px_rgba(11,15,20,0.35)]">
          {imgOk ? (
            // Замените файл на свой портрет: `public/images/anastasia-hero.png`
            // Если файла нет — покажем fallback.
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src="/images/anastasia-hero.png"
              alt="Анастасия Мельникова"
              className="h-full w-full object-cover"
              onError={() => setImgOk(false)}
            />
          ) : (
            <div className="text-center">
              <div className="text-7xl font-black bg-clip-text text-transparent bg-gradient-to-r from-accent via-accent2 to-warm leading-none">
                AM
              </div>
              <div className="mt-2 text-sm text-text/70">AI-архитектор • наставник</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

