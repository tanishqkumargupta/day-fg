import { CONFIG } from "../data/config.js";

// The model name Google exposes changes over time. Override it via
// VITE_GEMINI_MODEL in your .env if this one is ever retired —
// check https://ai.google.dev/gemini-api/docs/models for the current list.
const MODEL = import.meta.env.VITE_GEMINI_MODEL || "gemini-flash-latest";
const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${API_KEY}`;

export function isGeminiConfigured() {
  return Boolean(API_KEY);
}

function buildSystemPrompt() {
  return `You are role-playing as ${CONFIG.yourName}, texting your girlfriend ${CONFIG.partnerName} on Girlfriend Day.

VOICE:
- Talk exactly like a loving boyfriend texting his girlfriend — warm, playful, a little teasing, reassuring.
- Mix natural English and Hinglish (Roman-script Hindi mixed with English), the way real Indian couples text. Don't overdo it — sprinkle words like "yaar", "arre", "bas", "achha", "sach mein", "pagal", "jaanu" naturally, not in every sentence.
- Keep messages short-to-medium, like real texts — usually 1-4 sentences. Occasionally use one fitting emoji, never a whole row of them.
- Vary your wording every time. Never reuse the same opening line, pet name, or joke twice in a row. Sound spontaneous, not scripted.
- Be affectionate and supportive by default, and playfully bratty/teasing when she's teasing you.
- If she seems upset, drop the jokes and be genuinely comforting and present.
- Never be creepy, possessive, controlling, or guilt-tripping. This is a healthy, respectful relationship — affectionate, not clingy.
- Do not mention that you are an AI, a model, or role-playing. Just respond as ${CONFIG.yourName} would.
- Do not generate sexual or explicit content.`;
}

/**
 * Sends the conversation to Gemini and returns the reply text.
 * @param {{role: "user"|"model", text: string}[]} history
 */
export async function sendMessageToGemini(history) {
  if (!API_KEY) {
    throw new Error(
      "Missing Gemini API key. Add VITE_GEMINI_API_KEY to your .env file (see .env.example)."
    );
  }

  const contents = history.map((m) => ({
    role: m.role,
    parts: [{ text: m.text }],
  }));

  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [{ text: buildSystemPrompt() }],
      },
      contents,
      generationConfig: {
        temperature: 1.1,
        topP: 0.95,
        maxOutputTokens: 300,
      },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_ONLY_HIGH" },
        { category: "HARM_CATEGORY_SEXUALLY_EXPLICIT", threshold: "BLOCK_MEDIUM_AND_ABOVE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_ONLY_HIGH" },
      ],
    }),
  });

  if (!res.ok) {
    const errBody = await res.text().catch(() => "");
    throw new Error(`Gemini API error (${res.status}): ${errBody || res.statusText}`);
  }

  const data = await res.json();
  const text = data?.candidates?.[0]?.content?.parts?.map((p) => p.text).join("").trim();

  if (!text) {
    const blockReason = data?.promptFeedback?.blockReason;
    throw new Error(blockReason ? `Message was blocked (${blockReason}).` : "No response from Gemini.");
  }

  return text;
}
