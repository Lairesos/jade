type Props = {
  onMenuClick: () => void;
};

export default function Header({ onMenuClick }: Props) {
  return (
    <header className="flex items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-4">
      <button
        onClick={onMenuClick}
        className="rounded-lg p-2 text-2xl text-white md:hidden"
      >
        ☰
      </button>

      <div>
        <h1 className="text-3xl font-bold text-white">
          Jade
        </h1>

        <p className="text-sm text-zinc-400">
          Sua Diretora de Operações Inteligente
        </p>
      </div>

      <div className="w-10" />
    </header>
  );
}