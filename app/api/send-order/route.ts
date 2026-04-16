import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, contact, message } = await req.json();

    if (!name || !contact || !message) {
      return NextResponse.json({ ok: false }, { status: 400 });
    }

    // ===== EMAIL =====
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"NeuroEra" <${process.env.SMTP_USER}>`,
      to: process.env.LEADS_EMAIL_TO,
      subject: "Новая заявка с сайта",
      text: `
Имя: ${name}
Контакт: ${contact}

Сообщение:
${message}
      `,
    });

    // ===== TELEGRAM =====
    try {
      await fetch(
        `https://api.telegram.org/bot${process.env.TELEGRAM_BOT_TOKEN}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            chat_id: process.env.TELEGRAM_CHAT_ID,
            text: `Новая заявка:\n\nИмя: ${name}\nКонтакт: ${contact}\n\n${message}`,
          }),
        }
      );
    } catch (e) {
      console.log("Telegram error:", e);
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("SEND ERROR:", e);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}