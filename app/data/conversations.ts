import type { Conversation } from "../types/conversation";

export const initialConversations: Conversation[] = [
  {
    id: crypto.randomUUID(),
    title: "Nova conversa",
    messages: [
      {
        role: "assistant",
        content: "Olá, Laires! Eu sou a Jade. Como posso ajudar você hoje?",
      },
    ],
  },
];

export function createConversation(): Conversation {
  return {
    id: crypto.randomUUID(),
    title: "Nova conversa",
    messages: [
      {
        role: "assistant",
        content: "Olá, Laires! Eu sou a Jade. Como posso ajudar você hoje?",
      },
    ],
  };
}