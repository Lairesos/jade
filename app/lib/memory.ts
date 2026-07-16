import { supabase } from "./supabase";

export async function saveMemory(
  category: string,
  title: string,
  content: string
) {
  const { data, error } = await supabase
    .from("memories")
    .insert([
      {
        category,
        title,
        content,
      },
    ])
    .select();

  console.log("MEMORY DATA:", data);
  console.log("MEMORY ERROR:", error);

  return { data, error };
}