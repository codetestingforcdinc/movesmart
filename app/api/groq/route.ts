export const runtime = "nodejs"; 

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userMessage } = await req.json();

    const API_KEY = process.env.GROQ_API_KEY;
    const API_URL = "https://api.groq.com/openai/v1/chat/completions";

    if (!API_KEY) {
      console.error("Error!");
      return NextResponse.json(
        { reply: "Server misconfiguration: missing API key" },
        { status: 500 }
      );
    }

    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama-3.1-8b-instant",
        messages: [{ role: "user", content: userMessage }],
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";

    return NextResponse.json({ reply });

  } catch (error: any) {
    console.error("GROQ API ERROR:", error);
    return NextResponse.json({ reply: "Error: " + error.message }, { status: 500 });
  }
}
