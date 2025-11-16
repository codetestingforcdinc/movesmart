import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { userMessage } = await req.json();

  const API_KEY = process.env.GROQ_API_KEY!;
  const API_URL = "https://api.groq.com/openai/v1/chat/completions";

  const body = {
    model: "llama-3.1-8b-instant",
    messages: [{ role: "user", content: userMessage }],
  };

  try {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
      body: JSON.stringify(body),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No reply";

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ reply: "Error: " + error.message });
  }
}
