import type { Metadata } from "next";
import Script from "next/script";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../src/components/Header";
import { Container } from "../src/components/Container";
import { SiteFooter } from "../src/components/SiteFooter";
import { ThemeToggle } from "../src/components/ThemeToggle";
import { Analytics } from "@vercel/analytics/next";

const fontDisplay = Unbounded({
  subsets: ["latin", "cyrillic"],
  variable: "--font-display",
  weight: ["600", "700", "800"]
});

const fontBody = Onest({
  subsets: ["latin", "cyrillic"],
  variable: "--font-body",
  weight: ["400", "500", "600", "700"]
});

const yandexMetrikaId = 111188666;

export const metadata: Metadata = {
  title: "Анастасия Мельникова — AI-креатор и AI-архитектор",
  description:
    "Системы роста на базе ИИ: сайт, контент, автоматизация и инструменты — в одном контуре с измеримым результатом"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fontDisplay.variable} ${fontBody.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Script id="yandex-metrika" strategy="afterInteractive">
          {`
            (function(m,e,t,r,i,k,a){
              m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
              m[i].l=1*new Date();
              for (var j = 0; j < document.scripts.length; j++) {if (document.scripts[j].src === r) { return; }}
              k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)
            })(window, document,'script','https://mc.yandex.ru/metrika/tag.js?id=${yandexMetrikaId}', 'ym');

            ym(${yandexMetrikaId}, 'init', {ssr:true, webvisor:true, clickmap:true, ecommerce:"dataLayer", referrer: document.referrer, url: location.href, accurateTrackBounce:true, trackLinks:true});
          `}
        </Script>
        <noscript>
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://mc.yandex.ru/watch/${yandexMetrikaId}`} style={{ position: "absolute", left: "-9999px" }} alt="" />
          </div>
        </noscript>
        <Providers>
          <div className="relative min-h-screen overflow-x-hidden">
            {/* Фоновые градиенты (не перехватывают клики) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
              <div className="orb-drift-1 absolute left-1/2 top-0 h-[34rem] w-[34rem] gradient-orb will-change-transform" />
              <div className="orb-drift-2 absolute left-3 top-1/4 h-[24rem] w-[24rem] gradient-orb warm will-change-transform" />
              <div className="orb-drift-3 absolute bottom-0 right-0 h-[28rem] w-[28rem] opacity-65 gradient-orb will-change-transform" />
              <div className="animated-gradient absolute inset-0 opacity-[0.38]" />
              {/* Светлая тема: мягкий «радужный» слой под зелёным свечением (см. .light-rainbow-mesh) */}
              <div className="light-rainbow-mesh absolute inset-0" />
            </div>

            <div className="site-noise" aria-hidden="true" />

            <div className="relative z-10">
              <Header />

              {/* pt: резерв под fixed header (~56–68px), чтобы контент не уходил под шапку */}
              <Container className="relative pt-14 sm:pt-16">{children}</Container>

              <SiteFooter />

              <ThemeToggle />
            </div>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  );
}
