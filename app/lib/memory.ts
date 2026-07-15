import { supabase } from "./supabase";

export async function saveMemory(
  category: string,
  title: string,
  content: string
) {
  const { error } = await supabase
    .from("memories")
    .insert({
      category,
      title,
      content,
    });

  if (error) {
    console.error("Erro ao salvar memória:", error);
  }
}