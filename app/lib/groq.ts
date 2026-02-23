import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

function cleanAIResponse(text: string) {
  if (!text) return "";

  return text
    .replace(/```[a-z]*\n?/gi, "")
    .replace(/```/g, "")
    .trim();
}

export async function askGroq(prompt: string) {
  try {
    if (prompt.length > 15000) {
      return "Code too large. Reduce input size.";
    }

    const controller = new AbortController();

    const timeout = setTimeout(() => controller.abort(), 15000);

    const response = await groq.chat.completions.create(
      {
        model: "llama-3.3-70b-versatile",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        temperature: 0.2,
        max_tokens: 4096,
      },
      {
        signal: controller.signal,
      },
    );

    clearTimeout(timeout);

    const raw = response.choices[0]?.message?.content || "";

    return cleanAIResponse(raw);
  } catch (error: any) {
    console.error("Groq Error:", error?.message || error);

    if (error.name === "AbortError") {
      return "AI timeout. Try again.";
    }

    return "Error generating response from AI";
  }
}
