type Props = {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
  onVoice: () => void;
  loading: boolean;
};

export default function ChatInput({
  value,
  onChange,
  onSend,
  onVoice,
  loading,
}: Props) {
  return (
    <div className="border-t border-zinc-800 bg-zinc-900 p-4">
      <div className="flex items-end gap-3">

        <button
          onClick={onVoice}
          className="flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800 text-xl hover:bg-zinc-700"
        >
          🎤
        </button>

        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              onSend();
            }
          }}
          rows={2}
          placeholder="Converse com a Jade..."
          className="flex-1 resize-none rounded-xl bg-zinc-800 p-3 text-white outline-none"
        />

        <button
          onClick={onSend}
          disabled={loading}
          className="rounded-xl bg-emerald-500 px-6 py-3 font-semibold text-white hover:bg-emerald-600"
        >
          ➜
        </button>

      </div>
    </div>
  );
}