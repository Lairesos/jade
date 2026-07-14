type SidebarProps = {
  onNewChat: () => void;
  conversations: string[];
  activeConversation: number;
  onSelectConversation: (index: number) => void;
};
export default function Sidebar({
  onNewChat,
  conversations,
  activeConversation,
  onSelectConversation,
}: SidebarProps) {
  return (
    <aside className="w-72 h-screen bg-zinc-900 border-r border-zinc-800 p-4 flex flex-col">

      <button
  onClick={onNewChat}
  className="w-full rounded-xl bg-emerald-500 py-3 font-semibold text-white hover:bg-emerald-600"
>
        + Nova conversa
      </button>

      <div className="mt-6 space-y-2">

       {conversations.map((conversation, index) => (
  <button
    key={index}
    onClick={() => onSelectConversation(index)}
    className={`w-full rounded-lg p-3 text-left transition ${
      activeConversation === index
        ? "bg-emerald-600 text-white"
        : "bg-zinc-800 text-zinc-300 hover:bg-zinc-700"
    }`}
  >
    💬 {conversation}
  </button>
))}

      </div>

    </aside>
  );
}