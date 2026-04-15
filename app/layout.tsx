import type { Metadata } from "next";
import { Onest, Unbounded } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../src/components/Header";
import { Container } from "../src/components/Container";
import { SiteFooter } from "../src/components/SiteFooter";
import { ThemeToggle } from "../src/components/ThemeToggle";

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

export const metadata: Metadata = {
  title: "Анастасия Мельникова — AI-креатор и AI-архитектор",
  description:
    "Системы роста на базе ИИ: сайт, контент, автоматизация и инструменты — в одном контуре с измеримым результатом"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${fontDisplay.variable} ${fontBody.variable}`} suppressHydrationWarning>
      <body className="font-sans antialiased">
        <Providers>
          <div className="relative min-h-screen overflow-x-hidden">
            {/* Фоновые градиенты (не перехватывают клики) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0">
              <div className="orb-drift-1 absolute left-1/2 top-0 h-[34rem] w-[34rem] gradient-orb will-change-transform" />
              <div className="orb-drift-2 absolute left-3 top-1/4 h-[24rem] w-[24rem] gradient-orb warm will-change-transform" />
              <div className="orb-drift-3 absolute bottom-0 right-0 h-[28rem] w-[28rem] opacity-65 gradient-orb will-change-transform" />
              <div className="animated-gradient absolute inset-0 opacity-[0.38]" />
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
      </body>
    </html>
  );
}
