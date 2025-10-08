import OpenAI from "openai";
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const generateQuizFromPDF = async (pdfText) => {
  const prompt = `Generate MCQs, SAQs, LAQs from this text: ${pdfText}. Return JSON.`;
  const completion = await openai.chat.completions.create({
    model: "gpt-4",
    messages: [{ role: "user", content: prompt }]
  });
  return JSON.parse(completion.choices[0].message.content);
};
