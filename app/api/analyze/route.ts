import { askGroq } from "@/app/lib/groq";
import { AnalyzeMode, getPrompt } from "@/app/lib/prompt";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const { code, language, mode } = await req.json();
    if (!code) {
      return NextResponse.json({ error: "No code" }, { status: 400 });
    }
    if (code.length > 2000) {
      return NextResponse.json({ error: "Code is to large" }, { status: 400 });
    }
    const prompt = getPrompt(mode as AnalyzeMode, code, language);

    const result = await askGroq(prompt);

    return NextResponse.json({ result });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
