import { and, count, eq } from "drizzle-orm";
import { lossReasons, pipelines, pipelineStages } from "@/database/schema";
import type { Database } from "@/lib/db";

export const DEFAULT_PIPELINE_STAGES = [
  { name: "Sem contato", position: 1, probability: 10, stageType: "open" as const },
  { name: "Enriquecer dados", position: 2, probability: 20, stageType: "open" as const },
  { name: "Primeiro contato", position: 3, probability: 30, stageType: "open" as const },
  { name: "Levantamento", position: 4, probability: 40, stageType: "open" as const },
  { name: "Agendamento", position: 5, probability: 50, stageType: "open" as const },
  { name: "Apresentação", position: 6, probability: 60, stageType: "open" as const },
  { name: "Proposta", position: 7, probability: 75, stageType: "open" as const },
  { name: "Acompanhamento", position: 8, probability: 85, stageType: "open" as const },
  { name: "Ganho", position: 9, probability: 100, stageType: "won" as const },
  { name: "Perdido", position: 10, probability: 0, stageType: "lost" as const },
];

export const DEFAULT_LOSS_REASONS = [
  "Preço",
  "Sem orçamento",
  "Sem prioridade",
  "Concorrente",
  "Não respondeu",
  "Timing inadequado",
  "Serviço não adequado",
  "Decisão interna",
  "Duplicado",
  "Outro",
];

type Tx = Parameters<Parameters<Database["transaction"]>[0]>[0];

/**
 * Idempotent seed: if a default pipeline already exists for the organization,
 * returns it without duplicating stages or loss reasons.
 */
export async function seedOrganizationDefaults(
  tx: Tx | Database,
  organizationId: string,
) {
  const [existingPipeline] = await tx
    .select()
    .from(pipelines)
    .where(
      and(
        eq(pipelines.organizationId, organizationId),
        eq(pipelines.isDefault, true),
      ),
    )
    .limit(1);

  if (existingPipeline) {
    const [stageCount] = await tx
      .select({ value: count() })
      .from(pipelineStages)
      .where(eq(pipelineStages.pipelineId, existingPipeline.id));

    if ((stageCount?.value ?? 0) === 0) {
      await tx.insert(pipelineStages).values(
        DEFAULT_PIPELINE_STAGES.map((stage) => ({
          pipelineId: existingPipeline.id,
          name: stage.name,
          position: stage.position,
          probability: stage.probability,
          stageType: stage.stageType,
        })),
      );
    }

    const [reasonCount] = await tx
      .select({ value: count() })
      .from(lossReasons)
      .where(eq(lossReasons.organizationId, organizationId));

    if ((reasonCount?.value ?? 0) === 0) {
      await tx.insert(lossReasons).values(
        DEFAULT_LOSS_REASONS.map((name, index) => ({
          organizationId,
          name,
          position: index + 1,
          isActive: true,
        })),
      );
    }

    return existingPipeline;
  }

  const [pipeline] = await tx
    .insert(pipelines)
    .values({
      organizationId,
      name: "Funil comercial",
      isDefault: true,
    })
    .returning();

  await tx.insert(pipelineStages).values(
    DEFAULT_PIPELINE_STAGES.map((stage) => ({
      pipelineId: pipeline.id,
      name: stage.name,
      position: stage.position,
      probability: stage.probability,
      stageType: stage.stageType,
    })),
  );

  await tx.insert(lossReasons).values(
    DEFAULT_LOSS_REASONS.map((name, index) => ({
      organizationId,
      name,
      position: index + 1,
      isActive: true,
    })),
  );

  return pipeline;
}
