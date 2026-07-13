export type Conversation = {
  id: string;
  title: string;
  messages: {
    role: "user" | "assistant";
    content: string;
  }[];
};