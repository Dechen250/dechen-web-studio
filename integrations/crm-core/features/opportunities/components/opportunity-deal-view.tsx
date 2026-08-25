"use client";

import { useMemo, useState, useTransition, type ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ActivityForm, ActivityTimeline } from "@/features/activities/components/activity-ui";
import { moveOpportunityAction } from "@/features/opportunities/actions";
import {
  OutcomeDialog,
  type OutcomeTarget,
} from "@/features/opportunities/components/outcome-dialog";
import { OpportunityForm } from "@/features/opportunities/components/opportunity-forms";
import { AddOpportunityTask } from "@/features/tasks/components/add-opportunity-task";
import { CompleteTaskForm } from "@/features/tasks/components/task-forms";
import { taskTypeLabel } from "@/features/tasks/task-types";
import {
  CommentsPanel,
  type CommentRow,
} from "@/features/comments/components/comments-panel";
import { Button } from "@/components/ui/forms";
import { Badge, Panel, dataTableLinkClass } from "@/components/ui/lightning";
import { formatMinorUnits } from "@/lib/utils/commercial";

type Option = { value: string; label: string };

type TaskItem = {
  id: string;
  title: string;
  status: string;
  dueAt: string | null;
  assigneeId: string;
  taskType?: string | null;
};

type ActivityItem = {
  id: string;
  title: string;
  body: string | null;
  activityType: string;
  isSystem: boolean;
  occurredAt: string;
};

type StageItem = {
  id: string;
  name: string;
  position: number;
  stageType: "open" | "won" | "lost";
};

type PartySummary = {
  id: string;
  name: string;
  email?: string | null;
  phone?: string | null;
  website?: string | null;
};

type OpportunityDefaults = {
  title?: string;
  description?: string | null;
  pipelineId?: string | null;
  contactId?: string | null;
  companyId?: string | null;
  ownerId?: string;
  stageId?: string;
  source?: string | null;
  productName?: string | null;
  estimatedValue?: number | null;
  proposedValue?: number | null;
  closedValue?: number | null;
  probability?: number;
  expectedCloseDate?: Date | null;
  nextAction?: string | null;
  nextActionAt?: Date | null;
  status: "open" | "won" | "lost";
  wonAt?: Date | null;
  lostAt?: Date | null;
  lostNotes?: string | null;
  lossReasonName?: string | null;
};

const tabs = [
  { id: "history", label: "Histórico" },
  { id: "tasks", label: "Tarefas" },
  { id: "notes", label: "Anotações" },
  { id: "data", label: "Dados" },
] as const;

type TabId = (typeof tabs)[number]["id"];

const PROSPECTION_SOURCES = new Set([
  "agent-site",
  "website",
  "ops-descoberta",
  "site",
]);

function isProspection(source?: string | null) {
  if (!source) return false;
  const value = source.trim().toLowerCase();
  return PROSPECTION_SOURCES.has(value) || value.includes("prospec");
}

function daysBetween(fromIso: string, now = Date.now()) {
  const from = new Date(fromIso).getTime();
  if (Number.isNaN(from)) return 0;
  return Math.max(0, Math.floor((now - from) / 86_400_000));
}

function SideBlock({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: ReactNode;
  defaultOpen?: boolean;
}) {
  return (
    <details open={defaultOpen} className="border-b border-border">
      <summary className="cursor-pointer list-none px-3 py-2.5 text-sm font-semibold text-text marker:content-none [&::-webkit-details-marker]:hidden">
        <span className="flex items-center justify-between gap-2">
          {title}
          <span className="text-xs font-normal text-text-muted">▾</span>
        </span>
      </summary>
      <div className="space-y-1.5 px-3 pb-3 text-sm text-text">{children}</div>
    </details>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div>
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-muted">
        {label}
      </p>
      <div className="mt-0.5 text-sm text-text">{children}</div>
    </div>
  );
}

function StageBar({
  stages,
  currentStageId,
  opportunityId,
  status,
  daysInStage,
}: {
  stages: StageItem[];
  currentStageId?: string;
  opportunityId: string;
  status: "open" | "won" | "lost";
  daysInStage: number;
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const openStages = useMemo(
    () =>
      [...stages]
        .filter((stage) => stage.stageType === "open")
        .sort((a, b) => a.position - b.position),
    [stages],
  );
  const currentIndex = openStages.findIndex((stage) => stage.id === currentStageId);

  function moveTo(stageId: string) {
    if (status !== "open" || stageId === currentStageId || pending) return;
    setError(null);
    startTransition(async () => {
      try {
        await moveOpportunityAction(opportunityId, stageId);
        router.refresh();
      } catch {
        setError("Não foi possível mover a etapa.");
      }
    });
  }

  if (openStages.length === 0) return null;

  return (
    <div className="space-y-2">
      <div className="flex overflow-x-auto">
        {openStages.map((stage, index) => {
          const current = stage.id === currentStageId && status === "open";
          const past = currentIndex >= 0 && index < currentIndex && status === "open";
          const label =
            current && daysInStage >= 0
              ? `${stage.name} (${daysInStage} ${daysInStage === 1 ? "dia" : "dias"})`
              : stage.name;
          return (
            <button
              key={stage.id}
              type="button"
              disabled={status !== "open" || pending}
              onClick={() => moveTo(stage.id)}
              title={stage.name}
              className={`min-w-[7.5rem] flex-1 px-2 py-2.5 text-center text-[11px] font-semibold leading-tight transition ${
                current
                  ? "bg-brand text-white"
                  : past
                    ? "bg-brand-soft text-brand-dark"
                    : "bg-[#d8dde3] text-[#5c6b7a]"
              } ${status === "open" ? "hover:brightness-95" : "cursor-default opacity-90"}`}
            >
              {label}
            </button>
          );
        })}
      </div>
      {error ? <p className="px-1 text-xs text-danger">{error}</p> : null}
    </div>
  );
}

export function OpportunityDealView({
  opportunityId,
  title,
  stageName,
  opportunity,
  contacts,
  companies,
  members,
  products,
  reasons,
  tasks,
  activities,
  comments,
  currentUserId,
  canWriteComments,
  canModerateComments,
  todayDate,
  pipelineId,
  stages,
  createdAt,
  contactSummary,
  companySummary,
  ownerName,
}: {
  opportunityId: string;
  title: string;
  stageName: string;
  opportunity: OpportunityDefaults;
  contacts: Option[];
  companies: Option[];
  members: Option[];
  products: Option[];
  reasons: Option[];
  tasks: TaskItem[];
  activities: ActivityItem[];
  comments: CommentRow[];
  currentUserId: string;
  canWriteComments: boolean;
  canModerateComments: boolean;
  todayDate: string;
  pipelineId: string;
  stages: StageItem[];
  createdAt: string;
  contactSummary: PartySummary | null;
  companySummary: PartySummary | null;
  ownerName: string;
}) {
  const [tab, setTab] = useState<TabId>("history");
  const [outcome, setOutcome] = useState<OutcomeTarget | null>(null);

  const openTasks = useMemo(
    () => tasks.filter((task) => task.status === "open"),
    [tasks],
  );
  const doneTasks = useMemo(
    () => tasks.filter((task) => task.status !== "open"),
    [tasks],
  );

  const value = formatMinorUnits(
    opportunity.closedValue ?? opportunity.proposedValue ?? opportunity.estimatedValue,
  );

  const lastStageChange = activities.find((item) => item.activityType === "stage_changed");
  const daysInStage = daysBetween(lastStageChange?.occurredAt ?? createdAt);
  const showProspection = isProspection(opportunity.source);

  return (
    <div className="space-y-3">
      <section className="crm-surface overflow-hidden">
        <div className="border-b border-border bg-surface px-4 py-4 sm:px-5">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="min-w-0 space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="text-2xl font-semibold tracking-tight text-text">{title}</h1>
                {showProspection ? <Badge tone="warning">PROSPECÇÃO</Badge> : null}
                {opportunity.status !== "open" ? (
                  <Badge
                    tone={opportunity.status === "won" ? "success" : "danger"}
                  >
                    {opportunity.status === "won" ? "Venda" : "Perda"}
                  </Badge>
                ) : null}
              </div>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <span className="text-text-muted">{stageName}</span>
                {opportunity.productName ? (
                  <Badge tone="brand">{opportunity.productName}</Badge>
                ) : null}
                <span className="font-semibold tabular-nums text-text">{value}</span>
              </div>
            </div>
            <div className="flex flex-wrap gap-2">
              <Link
                href={`/app/pipeline?pipelineId=${pipelineId}`}
                className="inline-flex items-center justify-center rounded-sm border border-border bg-surface px-3.5 py-1.5 text-sm font-medium text-text hover:bg-page"
              >
                Voltar ao funil
              </Link>
              {opportunity.status === "open" ? (
                <>
                  <Button
                    type="button"
                    variant="danger"
                    onClick={() =>
                      setOutcome({
                        opportunityId,
                        title,
                        kind: "lost",
                        defaultOwnerId: opportunity.ownerId || members[0]?.value || "",
                      })
                    }
                  >
                    Marcar perda
                  </Button>
                  <Button
                    type="button"
                    onClick={() =>
                      setOutcome({
                        opportunityId,
                        title,
                        kind: "won",
                        defaultOwnerId: opportunity.ownerId || members[0]?.value || "",
                        defaultProduct: opportunity.productName,
                        defaultValue:
                          opportunity.proposedValue ?? opportunity.estimatedValue,
                      })
                    }
                  >
                    Marcar venda
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        </div>

        <StageBar
          stages={stages}
          currentStageId={opportunity.stageId}
          opportunityId={opportunityId}
          status={opportunity.status}
          daysInStage={daysInStage}
        />
      </section>

      <div className="grid gap-3 lg:grid-cols-[17.5rem_minmax(0,1fr)]">
        <aside className="crm-surface h-fit overflow-hidden">
          <SideBlock title="Negociação">
            <Field label="Valor">{value}</Field>
            <Field label="Origem">{opportunity.source || "—"}</Field>
            <Field label="Probabilidade">{opportunity.probability ?? 0}%</Field>
            <Field label="Criada em">
              {new Date(createdAt).toLocaleDateString("pt-BR")}
            </Field>
          </SideBlock>
          <SideBlock title="Contatos">
            {contactSummary ? (
              <>
                <Link
                  href={`/app/contacts/${contactSummary.id}`}
                  className={dataTableLinkClass()}
                >
                  {contactSummary.name}
                </Link>
                <p className="text-text-muted">{contactSummary.email || "Sem e-mail"}</p>
                <p className="text-text-muted">{contactSummary.phone || "Sem telefone"}</p>
              </>
            ) : (
              <p className="text-text-muted">Nenhum contato vinculado.</p>
            )}
          </SideBlock>
          <SideBlock title="Empresa">
            {companySummary ? (
              <>
                <Link
                  href={`/app/companies/${companySummary.id}`}
                  className={dataTableLinkClass()}
                >
                  {companySummary.name}
                </Link>
                {companySummary.website ? (
                  <p className="break-all text-text-muted">{companySummary.website}</p>
                ) : null}
                <p className="text-text-muted">
                  {companySummary.email || companySummary.phone || "Sem contato da empresa"}
                </p>
              </>
            ) : (
              <p className="text-text-muted">Nenhuma empresa vinculada.</p>
            )}
          </SideBlock>
          <SideBlock title="Responsável" defaultOpen={false}>
            <p>{ownerName || "—"}</p>
          </SideBlock>
        </aside>

        <div className="space-y-3">
          {opportunity.nextAction ? (
            <section className="crm-surface p-4">
              <h2 className="text-sm font-semibold text-text">Próxima ação recomendada</h2>
              <p className="mt-1 text-sm text-text">{opportunity.nextAction}</p>
              {opportunity.nextActionAt ? (
                <p className="mt-1 text-xs text-text-muted">
                  {new Date(opportunity.nextActionAt).toLocaleString("pt-BR")}
                </p>
              ) : null}
            </section>
          ) : null}

          <section className="crm-surface p-4">
            <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
              <h2 className="text-sm font-semibold text-text">Próximas tarefas</h2>
              <AddOpportunityTask
                opportunityId={opportunityId}
                opportunityTitle={title}
                contactId={opportunity.contactId}
                companyId={opportunity.companyId}
                members={members}
                defaultAssigneeId={currentUserId}
              />
            </div>
            {openTasks.length === 0 ? (
              <p className="text-sm text-text-muted">
                Não existem tarefas pendentes para essa Negociação.
              </p>
            ) : (
              <ul className="space-y-2">
                {openTasks.map((task) => (
                  <li key={task.id} className="rounded-sm border border-border p-3">
                    <p className="font-medium">
                      <Link href={`/app/tasks/${task.id}`} className={dataTableLinkClass()}>
                        {task.title}
                      </Link>
                    </p>
                    <p className="text-xs text-text-muted">
                      {taskTypeLabel(task.taskType)}
                      {" · "}
                      {task.dueAt
                        ? new Date(task.dueAt).toLocaleString("pt-BR")
                        : "Sem prazo"}
                    </p>
                    <div className="mt-3">
                      <CompleteTaskForm
                        taskId={task.id}
                        members={members}
                        defaultAssigneeId={task.assigneeId}
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </section>

          <section className="crm-surface overflow-hidden">
            <div className="flex gap-1 border-b border-border bg-thead/70 px-2 pt-2 sm:px-4">
              {tabs.map((item) => {
                const active = tab === item.id;
                const count =
                  item.id === "tasks"
                    ? openTasks.length
                    : item.id === "history"
                      ? activities.length
                      : item.id === "notes"
                        ? comments.length
                        : null;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTab(item.id)}
                    className={`rounded-t-sm px-3 py-2 text-sm font-medium transition ${
                      active
                        ? "border border-b-0 border-border bg-surface text-brand"
                        : "text-text-muted hover:bg-page hover:text-text"
                    }`}
                  >
                    {item.label}
                    {count != null ? (
                      <span className="ml-1.5 text-xs text-text-muted">{count}</span>
                    ) : null}
                  </button>
                );
              })}
            </div>

            <div className="bg-surface p-4 sm:p-5">
              {tab === "history" ? (
                <ActivityTimeline items={activities} />
              ) : null}

              {tab === "tasks" ? (
                <div className="space-y-4">
                  {doneTasks.length === 0 && openTasks.length === 0 ? (
                    <p className="text-sm text-text-muted">
                      Nenhuma tarefa nesta negociação.
                    </p>
                  ) : null}
                  {doneTasks.length > 0 ? (
                    <div className="space-y-2">
                      <h3 className="text-sm font-semibold text-text">Concluídas</h3>
                      <ul className="space-y-2">
                        {doneTasks.map((task) => (
                          <li
                            key={task.id}
                            className="rounded-sm border border-border bg-page/50 p-3 text-sm"
                          >
                            <Link
                              href={`/app/tasks/${task.id}`}
                              className={dataTableLinkClass()}
                            >
                              {task.title}
                            </Link>
                            <p className="text-xs text-text-muted">{task.status}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              ) : null}

              {tab === "notes" ? (
                <div className="space-y-4">
                  <ActivityForm
                    opportunityId={opportunityId}
                    contactId={opportunity.contactId ?? undefined}
                    companyId={opportunity.companyId ?? undefined}
                  />
                  <Panel title="Comentários">
                    <CommentsPanel
                      entityType="opportunity"
                      entityId={opportunityId}
                      comments={comments}
                      currentUserId={currentUserId}
                      canWrite={canWriteComments}
                      canModerate={canModerateComments}
                    />
                  </Panel>
                </div>
              ) : null}

              {tab === "data" ? (
                <div className="space-y-4">
                  {opportunity.status === "won" || opportunity.status === "lost" ? (
                    <Panel title="Resultado">
                      {opportunity.status === "won" ? (
                        <dl className="grid gap-2 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                              Valor fechado
                            </dt>
                            <dd className="font-medium text-success">
                              {formatMinorUnits(opportunity.closedValue)}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                              Data do ganho
                            </dt>
                            <dd>
                              {opportunity.wonAt
                                ? new Date(opportunity.wonAt).toLocaleDateString("pt-BR")
                                : "—"}
                            </dd>
                          </div>
                          <div className="sm:col-span-2">
                            <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                              Produto
                            </dt>
                            <dd>{opportunity.productName ?? "—"}</dd>
                          </div>
                        </dl>
                      ) : (
                        <dl className="grid gap-2 text-sm sm:grid-cols-2">
                          <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                              Motivo da perda
                            </dt>
                            <dd className="font-medium text-danger">
                              {opportunity.lossReasonName ?? "—"}
                            </dd>
                          </div>
                          <div>
                            <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                              Data da perda
                            </dt>
                            <dd>
                              {opportunity.lostAt
                                ? new Date(opportunity.lostAt).toLocaleDateString("pt-BR")
                                : "—"}
                            </dd>
                          </div>
                          {opportunity.lostNotes ? (
                            <div className="sm:col-span-2">
                              <dt className="text-xs font-semibold uppercase tracking-wide text-text-muted">
                                Observações
                              </dt>
                              <dd className="whitespace-pre-wrap">{opportunity.lostNotes}</dd>
                            </div>
                          ) : null}
                        </dl>
                      )}
                    </Panel>
                  ) : null}
                  <OpportunityForm
                    mode="edit"
                    opportunityId={opportunityId}
                    contacts={contacts}
                    companies={companies}
                    members={members}
                    products={products}
                    stages={stages
                      .filter((stage) => stage.stageType === "open")
                      .map((stage) => ({ value: stage.id, label: stage.name }))}
                    defaults={opportunity}
                  />
                </div>
              ) : null}
            </div>
          </section>
        </div>
      </div>

      {outcome ? (
        <OutcomeDialog
          target={outcome}
          members={members}
          reasons={reasons}
          products={products}
          todayDate={todayDate}
          onClose={() => setOutcome(null)}
        />
      ) : null}
    </div>
  );
}
