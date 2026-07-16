import { supabase } from "./supabase";

export type Project = {
  id: string;
  client_id: string | null;
  name: string;
  status: string | null;
  start_date: string | null;
  expected_end_date: string | null;
  budget: number | null;
  notes: string | null;
  metadata: Record<string, any> | null;
};

export async function getProjectByName(name: string) {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .eq("name", name)
    .maybeSingle();

  if (error) {
    throw error;
  }

  return data as Project | null;
}

export async function createProject(
  name: string,
  clientId?: string
) {
  const { data, error } = await supabase
    .from("projects")
    .insert({
      name,
      client_id: clientId ?? null,
    })
    .select()
    .single();

  if (error) {
    throw error;
  }

  return data as Project;
}

export async function findOrCreateProject(
  name: string,
  clientId?: string
) {
  const existing = await getProjectByName(name);

  if (existing) {
    return existing;
  }

  return createProject(name, clientId);
}