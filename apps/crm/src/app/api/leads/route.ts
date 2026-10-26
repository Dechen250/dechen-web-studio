import { bearerMatches } from "@/lib/auth";
import { listLeads } from "@/lib/store";

export async function GET(request: Request) {
  if (!bearerMatches(request, process.env.OPS_SECRET)) {
    return Response.json({ success: false, message: "Não autorizado." }, { status: 401 });
  }

  return Response.json({ success: true, leads: await listLeads() });
}
