/**
 * Каталог услуг для карточек и калькулятора.
 *
 * DEMO-ЦЕНЫ (заглушки): замените значения в SERVICE_PRICES на актуальные.
 * Сумма в калькуляторе = price * quantity для каждой позиции.
 */

export const SERVICE_IDS = [
  "websites",
  "apps",
  "content",
  "neurovideo",
  "neurophoto",
  "songs",
  "automation",
  "bots",
  "training",
  "aiConsulting",
  "branding",
  "custom"
] as const;

export type ServiceId = (typeof SERVICE_IDS)[number];

/** Цены в условных единицах (например, руб.) — заглушки для демонстрации UI */
export const SERVICE_PRICES: Record<ServiceId, number> = {
  websites: 10000,
  apps: 25000,
  content: 12000,
  neurovideo: 8000,
  neurophoto: 5000,
  songs: 7000,
  automation: 20000,
  bots: 20000,
  training: 18000,
  aiConsulting: 5000,
  branding: 10000,
  custom: 5000
};

export type QtyLabelKind = "projects" | "units" | "sessions";

export type CalculatorRowConfig = {
  id: ServiceId;
  /** максимум единиц в одной строке */
  maxQty: number;
  /** подпись к полю количества → `calculator.qtyLabels.*` в messages */
  qtyLabelKind: QtyLabelKind;
};

function qtyKindForService(id: ServiceId): QtyLabelKind {
  if (["content", "neurovideo", "neurophoto", "songs"].includes(id)) return "units";
  if (["aiConsulting", "training"].includes(id)) return "sessions";
  return "projects";
}

export const CALCULATOR_ROW_CONFIG: CalculatorRowConfig[] = SERVICE_IDS.map((id) => ({
  id,
  maxQty: 50,
  qtyLabelKind: qtyKindForService(id)
}));
