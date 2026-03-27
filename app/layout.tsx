import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../src/components/Header";
import { Container } from "../src/components/Container";
import { SiteFooter } from "../src/components/SiteFooter";
import { ThemeToggle } from "../src/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Анастасия Мельникова — AI-креатор и AI-архитектор",
  description:
    "Системы роста на базе ИИ: сайт, контент, автоматизация и инструменты — в одном контуре с измеримым результатом"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            {/* Фоновые градиенты (не перехватывают клики) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-[28rem] w-[28rem] -translate-x-1/2 gradient-orb opacity-50" />
              <div className="absolute bottom-0 right-0 h-[20rem] w-[20rem] opacity-35 gradient-orb purple" />
              <div className="animated-gradient absolute inset-0 opacity-[0.14]" />
            </div>

            <Header />

            <Container className="relative">{children}</Container>

            <SiteFooter />

            {/* Плавающая смена темы: правый нижний угол */}
            <ThemeToggle />
          </div>
        </Providers>
      </body>
    </html>
  );
}
