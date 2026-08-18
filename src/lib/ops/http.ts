import { isOpsAuthenticated } from "./auth";

export async function requireOps(): Promise<Response | null> {
  if (await isOpsAuthenticated()) return null;
  return Response.json({ error: "Não autorizado." }, { status: 401 });
}

export function jsonError(message: string, status: number): Response {
  return Response.json({ error: message }, { status });
}
