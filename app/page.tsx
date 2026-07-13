"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [mensagem, setMensagem] = useState("");
  const [carregando, setCarregando] = useState(false);

  const [mensagens, setMensagens] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Olá, Laires! Eu sou a Jade. Como posso ajudar você hoje?",
    },
  ]);

  async function enviarMensagem() {
    if (!mensagem.trim() || carregando) return;

    const novaMensagem: ChatMessage = {
      role: "user",
      content: mensagem,
    };

    const historico = [...mensagens, novaMensagem];

    setMensagens(historico);
    setMensagem("");
    setCarregando(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: historico,
        }),
      });

      const data = await response.json();

      setMensagens([
        ...historico,
        {
          role: "assistant",
          content: data.reply,
        },
      ]);
    } catch {
      setMensagens([
        ...historico,
        {
          role: "assistant",
          content: "Não consegui responder no momento.",
        },
      ]);
    }

    setCarregando(false);
  }

  return (
    <main className="min-h-screen bg-zinc-950 flex justify-center p-8">
      <div className="w-full max-w-5xl rounded-3xl bg-zinc-900 p-8">

        <h1 className="text-5xl font-bold text-white">
          Jade
        </h1>

        <p className="mt-2 text-zinc-400">
          Sua Diretora de Operações Inteligente
        </p>

        <div className="mt-8 h-[450px] overflow-y-auto rounded-2xl bg-zinc-800 p-6 space-y-4">

          {mensagens.map((msg, index) => (

            <div
              key={index}
              className={
                msg.role === "user"
                  ? "text-right"
                  : "text-left"
              }
            >
              <div
                className={
                  msg.role === "user"
                    ? "inline-block rounded-2xl bg-emerald-500 px-5 py-3 text-white"
                    : "inline-block rounded-2xl bg-zinc-700 px-5 py-3 text-zinc-100"
                }
              >
                {msg.content}
              </div>
            </div>

          ))}

          {carregando && (
            <div className="text-left">
              <div className="inline-block rounded-2xl bg-zinc-700 px-5 py-3 text-zinc-100">
                Jade está pensando...
              </div>
            </div>
          )}

        </div>

        <textarea
          value={mensagem}
          onChange={(e) => setMensagem(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              enviarMensagem();
            }
          }}
          rows={4}
          placeholder="Digite sua mensagem..."
          className="mt-6 w-full rounded-xl bg-zinc-700 p-4 text-white outline-none"
        />

        <button
          onClick={enviarMensagem}
          disabled={carregando}
          className="mt-6 w-full rounded-xl bg-emerald-500 py-4 text-xl font-bold text-white hover:bg-emerald-600"
        >
          Enviar
        </button>

      </div>
    </main>
  );
}