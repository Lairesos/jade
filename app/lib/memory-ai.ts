import { openai } from "./ai";

export async function classifyWithAI(text: string) {
  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "system",
        content: `
Você é responsável por decidir se uma mensagem deve virar memória permanente.

Responda SOMENTE um JSON válido.

Formato:

{
  "save": true,
  "category": "",
  "title": ""
}

Se a mensagem não for importante:

{
  "save": false,
  "category": "",
  "title": ""
}
`,
      },
      {
        role: "user",
        content: text,
      },
    ],
  });

  return JSON.parse(response.output_text);
}