import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);

    // Заглушка: здесь можно подключить отправку на email/CRM или Telegram-бота.
    // Пока просто возвращаем успех, чтобы форма на фронте работала.
    if (!body) {
      return NextResponse.json({ ok: false, error: "Empty body" }, { status: 400 });
    }

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Bad request" }, { status: 400 });
  }
}

