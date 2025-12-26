function extractJSONFromAI(message) {
  const cleaned = message
    .replace(/```json\s*/gi, "")
    .replace(/```\s*/g, "")
    .trim();
  const match = cleaned.match(/\{[\s\S]*\}/);
  if (!match) {
    throw new Error("No JSON object found");
  }
  return JSON.parse(match[0]);
}

module.exports = extractJSONFromAI;
