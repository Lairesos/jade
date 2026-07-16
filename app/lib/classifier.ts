export type MemoryClassification = {
  save: boolean;
  category: string;
  title: string;
};

export function classifyMemory(text: string): MemoryClassification {
  const normalized = text.toLowerCase();

  const rules = [
    {
      keywords: ["cliente"],
      category: "cliente",
      title: "Informação do cliente",
    },
    {
      keywords: ["fornecedor", "marceneiro", "marmoraria", "vidraçaria"],
      category: "fornecedor",
      title: "Fornecedor",
    },
    {
      keywords: ["projeto", "obra", "ambiente"],
      category: "projeto",
      title: "Projeto",
    },
    {
      keywords: ["pedra", "quartzito", "granito", "mármore"],
      category: "materiais",
      title: "Material",
    },
    {
      keywords: ["cor", "estilo", "quiet luxury"],
      category: "preferências",
      title: "Preferência",
    },
    {
      keywords: ["reunião", "prazo", "cronograma"],
      category: "planejamento",
      title: "Planejamento",
    },
    {
      keywords: ["telefone", "e-mail", "endereço"],
      category: "contato",
      title: "Contato",
    }
  ];

  for (const rule of rules) {
    if (rule.keywords.some(k => normalized.includes(k))) {
      return {
        save: true,
        category: rule.category,
        title: rule.title,
      };
    }
  }

  return {
    save: false,
    category: "",
    title: "",
  };
}