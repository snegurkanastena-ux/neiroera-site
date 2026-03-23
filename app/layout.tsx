import type { Metadata } from "next";
import "./globals.css";
import { Providers } from "./providers";
import Header from "../src/components/Header";
import { Container } from "../src/components/Container";
import { SiteFooter } from "../src/components/SiteFooter";
import { ThemeToggle } from "../src/components/ThemeToggle";

export const metadata: Metadata = {
  title: "Анастасия Мельникова — AI-архитектор личного бренда",
  description: "Помогаю экспертам и бизнесу внедрять нейросети в контент, продажи и систему роста"
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <Providers>
          <div className="relative min-h-screen overflow-hidden">
            {/* Фоновые градиенты (не перехватывают клики) */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0">
              <div className="absolute left-1/2 top-0 h-96 w-96 -translate-x-1/2 gradient-orb" />
              <div className="absolute -left-24 top-1/3 h-72 w-72 gradient-orb purple" />
              <div className="absolute bottom-0 right-0 h-80 w-80 opacity-50 gradient-orb purple" />
              <div className="animated-gradient absolute inset-0 opacity-25" />
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
