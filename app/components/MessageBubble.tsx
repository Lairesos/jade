type Props = {
  role: "user" | "assistant";
  content: string;
};

export default function MessageBubble({
  role,
  content,
}: Props) {
  const usuario = role === "user";

  return (
    <div className={usuario ? "text-right" : "text-left"}>
      <div
        className={
          usuario
            ? "inline-block max-w-[80%] rounded-2xl bg-emerald-500 px-5 py-3 text-white"
            : "inline-block max-w-[80%] rounded-2xl bg-zinc-700 px-5 py-3 text-zinc-100"
        }
      >
        {content}
      </div>
    </div>
  );
}