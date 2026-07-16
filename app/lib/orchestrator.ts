import { extractEntities } from "./entity-ai";
import { findOrCreateClient } from "./clients";
import { findOrCreateProject } from "./projects";
import { classifyWithAI } from "./memory-ai";
import { saveMemory } from "./memory";

export async function processUserMessage(message: string) {
  const entities = await extractEntities(message);
  console.log("ENTITIES:", entities);
  let client = null;
  let project = null;

  if (entities.clientName) {
  console.log("CRIANDO CLIENTE:", entities.clientName);

  client = await findOrCreateClient(entities.clientName);

  console.log("CLIENTE:", client);
}

  if (entities.projectName) {
  console.log("CRIANDO PROJETO:", entities.projectName);

  project = await findOrCreateProject(
    entities.projectName,
    client?.id
  );

  console.log("PROJETO:", project);
}

  const memory = await classifyWithAI(message);

  if (memory.save) {
    await saveMemory(
      memory.category,
      memory.title,
      message
    );
  }

  return {
    client,
    project,
    memory,
  };
}