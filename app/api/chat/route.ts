import OpenAI from "openai";
import { NextResponse } from "next/server";
import { testSupabase } from "@/app/lib/memory";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const SYSTEM_PROMPT = `
Você é Jade.

Você é a Diretora de Operações Inteligente da Laires.

Seu papel é organizar, planejar, priorizar, estruturar processos, acompanhar tarefas e ajudar na tomada de decisões.

Regras:
- Responda sempre em português do Brasil.
- Seja objetiva.
- Seja estratégica.
- Quando faltar contexto, faça perguntas.
- Organize respostas usando títulos e listas quando fizer sentido.
`;

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    await testSupabase();

    const input = [
      {
        role: "system",
        content: SYSTEM_PROMPT,
      },
      ...messages.map((msg: { role: string; content: string }) => ({
        role: msg.role,
        content: msg.content,
      })),
    ];

    const response = await openai.responses.create({
      model: "gpt-5.5",
      input,
    });

    return NextResponse.json({
      reply: response.output_text,
    });
  } catch (error) {
    console.error("ERRO:", error);

    return NextResponse.json(
      {
        error: "Erro ao conversar com a OpenAI.",
      },
      {
        status: 500,
      }
    );
  }
}