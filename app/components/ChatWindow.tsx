import MessageBubble from "./MessageBubble";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: ChatMessage[];
  loading: boolean;
};

export default function ChatWindow({
  messages,
  loading,
}: Props) {
  return (
    <div className="flex-1 overflow-y-auto rounded-2xl bg-zinc-800 p-6 space-y-4">
      {messages.map((msg, index) => (
        <MessageBubble
          key={index}
          role={msg.role}
          content={msg.content}
        />
      ))}

      {loading && (
        <MessageBubble
          role="assistant"
          content="Jade está pensando..."
        />
      )}
    </div>
  );
}