"use client";

/**
 * Корневая клиентская обёртка: тема + переводы для всего приложения.
 */

import { SiteProviders } from "../src/providers/SiteProviders";

export function Providers({ children }: { children: React.ReactNode }) {
  return <SiteProviders>{children}</SiteProviders>;
}
