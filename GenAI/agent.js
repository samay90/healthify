import OpenAI from "openai";
import dotenv from "dotenv";
dotenv.config();

const openai = new OpenAI({
  apiKey: process.env.OPEN_AI_KEY,
});

const prompt = `
Analyze the food image and IMMEDIATELY return ONLY valid JSON.

Do NOT explain.
Do NOT acknowledge.
Do NOT add text before or after.
the warnings are the health concerns of the food and its ingredients of some usefull info about the food Ex: "High protein".
If food cannot be identified, return:
{ "error": true ,"message":(reason for failure)}

Otherwise return exactly this format:

{
  "error": false,
  "food_name": string,
  "ingredients": string[],
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "warnings": { "warning_text": string, "warning_type": "WARNING" | "INFO" }[]
}
`;


export async function analyzeFoodImage(imageUrl) {
  console.log(imageUrl);
  
  const response = await openai.chat.completions.create({
    model: "gpt-4.1-mini",
    temperature: 0,
    messages: [
      {
        role: "system",
        content: "You are a food nutrition analysis AI. You must output ONLY valid JSON."
      },
      {
        role: "user",
        content: [
          { type: "text", text: prompt },
          {
            type: "image_url",
            image_url: { url: imageUrl }
          }
        ]
      }
    ],
  });
  return response.choices[0].message.content;
}
