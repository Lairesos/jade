import type { Conversation } from "../types/conversation";

type Props = {
  conversations: Conversation[];
};

export default function ConversationList({
  conversations,
}: Props) {
  return (
    <div className="space-y-2">
      {conversations.map((conversation) => (
        <button
          key={conversation.id}
          className="w-full rounded-lg bg-zinc-800 p-3 text-left text-white hover:bg-zinc-700"
        >
          {conversation.title}
        </button>
      ))}
    </div>
  );
}