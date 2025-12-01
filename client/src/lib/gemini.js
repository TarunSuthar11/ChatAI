import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: import.meta.env.VITE_GEMINI_API_KEY,
});

async function main(prompt, onChunk, imageData) {
  const parts = [];

  // Image part 
  if (imageData?.data) {
    parts.push({
      inlineData: {
        mimeType: imageData.mimeType,
        data: imageData.data, // base64 format
      },
    });
  }

  // if text part
  if (prompt && prompt.trim() !== "") {
    parts.push({ text: prompt });
  }

  // Safety check
  if (parts.length === 0) {
    throw new Error("No prompt or image provided to Gemini.");
  }

  const result = await ai.models.generateContentStream({
    model: "gemini-2.5-flash",
    contents: [
      {
        role: "user",
        parts: parts,
      },
    ],
  });

  // Streaming
  for await (const chunk of result) {
    const text = chunk.text;
    if (text) onChunk(text);
  }

  const final = result.response;
  return final.text();
}

export default main;

