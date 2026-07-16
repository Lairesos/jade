import { openai, SYSTEM_PROMPT } from "./ai";
import { getRecentMemories } from "./memory";
import { processUserMessage } from "./orchestrator";

export async function generateReply(messages: any[]) {
  const lastMessage = messages[messages.length - 1];

  if (lastMessage?.role === "user") {
    await processUserMessage(lastMessage.content);
  }

  const memories = await getRecentMemories(10);

  const memoryText =
    memories.length === 0
      ? "Nenhuma memória cadastrada."
      : memories
          .map(
            (memory: any) =>
              `[${memory.category}] ${memory.title}: ${memory.content}`
          )
          .join("\n");

  const input = [
    {
      role: "system",
      content: `${SYSTEM_PROMPT}

Memórias recentes:

${memoryText}
`,
    },
    ...messages,
  ];

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input,
  });

  return response.output_text;
}