import { supabase } from "./supabase";

export type Client = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  birthday: string | null;
  profession: string | null;
  company: string | null;
  address: string | null;
  city: string | null;
  state: string | null;
  notes: string | null;
  metadata: Record<string, any> | null;
};

export async function getClientByName(name: string) {
  const { data, error } = await supabase
    .from("clients")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Client | null;
}

export async function createClient(name: string) {
  const { data, error } = await supabase
    .from("clients")
    .insert({
      name,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Client;
}

export async function findOrCreateClient(name: string) {
  const existing = await getClientByName(name);

  if (existing) {
    return existing;
  }

  return createClient(name);
}