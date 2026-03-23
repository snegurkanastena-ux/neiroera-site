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
  websites: 45000,
  apps: 95000,
  content: 12000,
  neurovideo: 8000,
  neurophoto: 5000,
  songs: 7000,
  automation: 25000,
  bots: 35000,
  training: 18000,
  aiConsulting: 15000,
  branding: 40000,
  custom: 20000
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
