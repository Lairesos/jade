import { openai } from "./ai";

export type EntityExtraction = {
  clientName: string | null;
  projectName: string | null;
};

export async function extractEntities(
  text: string
): Promise<EntityExtraction> {
  try {
    const response = await openai.responses.create({
      model: "gpt-5.5",
      input: [
        {
          role: "system",
          content: `
Você extrai entidades de mensagens.

Retorne SOMENTE um JSON válido.

Exemplo:

{
  "clientName":"Solange",
  "projectName":"Casa Alphaville"
}

Se alguma entidade não existir, retorne null.

Exemplo:

{
  "clientName":"Solange",
  "projectName":null
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

  } catch (error) {
    console.error(error);

    return {
      clientName: null,
      projectName: null,
    };
  }
}