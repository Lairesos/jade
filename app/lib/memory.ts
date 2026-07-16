import { supabase } from "./supabase";

export async function testSupabase() {
  const { data, error } = await supabase
    .from("memories")
    .select("*")
    .limit(1);

  if (error) {
    console.error("SUPABASE ERROR:", error);
  } else {
    console.log("SUPABASE OK:", data);
  }

  return { data, error };
}