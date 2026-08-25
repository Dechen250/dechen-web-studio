"use client";

import { useEffect, useMemo, useState, useTransition } from "react";
import Link from "next/link";
import {
  DndContext,
  DragOverlay,
  PointerSensor,
  TouchSensor,
  closestCorners,
  useDroppable,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
} from "@dnd-kit/core";
import { useDraggable } from "@dnd-kit/core";
import { moveOpportunityAction } from "@/features/opportunities/actions";
import { CreateTaskTrigger } from "@/features/tasks/components/create-task-drawer";
import { taskTypeLabel } from "@/features/tasks/task-types";
import { formatMinorUnits } from "@/lib/utils/commercial";

export type KanbanStage = {
  id: string;
  name: string;
  stageType: "open" | "won" | "lost";
  position: number;
};

export type KanbanCard = {
  id: string;
  title: string;
  stageId: string;
  status: string;
  ownerId: string;
  estimatedValue: number | null;
  proposedValue: number | null;
  closedValue: number | null;
  ownerName: string | null;
  contactFirstName: string | null;
  contactLastName: string | null;
  companyName: string | null;
  productName?: string | null;
  lossReasonName?: string | null;
  nextAction: string | null;
  nextActionAt: string | null;
  expectedCloseDate: string | null;
  nextTaskTitle?: string | null;
  nextTaskDueAt?: string | null;
  nextTaskType?: string | null;
};

type Option = { value: string; label: string };

function ownerInitials(name: string | null) {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "?";
  if (parts.length === 1) return parts[0]!.slice(0, 1).toUpperCase();
  return `${parts[0]!.slice(0, 1)}${parts[parts.length - 1]!.slice(0, 1)}`.toUpperCase();
}

function cardValue(card: KanbanCard) {
  return card.proposedValue ?? card.estimatedValue ?? card.closedValue ?? 0;
}

function sortCards(cards: KanbanCard[], sort: string) {
  const next = [...cards];
  if (sort === "title-asc") {
    next.sort((a, b) => a.title.localeCompare(b.title, "pt-BR"));
  } else if (sort === "title-desc") {
    next.sort((a, b) => b.title.localeCompare(a.title, "pt-BR"));
  } else if (sort === "value-desc") {
    next.sort((a, b) => cardValue(b) - cardValue(a));
  }
  return next;
}

function formatTaskWhen(iso: string | null | undefined) {
  if (!iso) return "";
  try {
    return new Date(iso).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return "";
  }
}

function OpportunityCard({
  card,
  dragging,
  members,
  opportunities,
  currentUserId,
}: {
  card: KanbanCard;
  dragging?: boolean;
  members: Option[];
  opportunities: Option[];
  currentUserId: string;
}) {
  const party =
    card.companyName ||
    [card.contactFirstName, card.contactLastName].filter(Boolean).join(" ") ||
    "Sem empresa";

  return (
    <div
      className={`rounded-xl border bg-surface p-3.5 transition ${
        dragging
          ? "border-brand shadow-lift opacity-95"
          : "border-border shadow-soft hover:border-border-strong hover:shadow-lift"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <Link
          href={`/app/opportunities/${card.id}`}
          className="min-w-0 flex-1 font-semibold leading-snug text-text hover:text-brand"
          onClick={(event) => event.stopPropagation()}
          onPointerDown={(event) => event.stopPropagation()}
        >
          {card.title}
        </Link>
        <span
          className="inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-[10px] font-semibold text-brand-dark"
          title={card.ownerName ?? "Sem responsável"}
        >
          {ownerInitials(card.ownerName)}
        </span>
      </div>
      <p className="mt-1 truncate text-xs text-text-muted">{party}</p>
      <p className="mt-3 text-sm font-semibold tabular-nums text-text">
        {formatMinorUnits(cardValue(card) || null)}
      </p>

      {card.nextTaskTitle ? (
        <p className="mt-2 truncate text-[11px] text-text-muted">
          {taskTypeLabel(card.nextTaskType)}{" "}
          {formatTaskWhen(card.nextTaskDueAt)}
        </p>
      ) : null}

      <div
        className="mt-3 border-t border-border pt-2"
        onPointerDown={(event) => event.stopPropagation()}
        onClick={(event) => event.stopPropagation()}
      >
        <CreateTaskTrigger
          label="+ Criar Tarefa"
          className="w-full rounded-full px-2 py-1.5 text-left text-xs font-semibold text-brand hover:bg-brand-soft"
          members={members}
          opportunities={opportunities}
          defaultAssigneeId={currentUserId}
          defaultOpportunityId={card.id}
          lockOpportunity
        />
      </div>
    </div>
  );
}

function DraggableCard({
  card,
  members,
  opportunities,
  currentUserId,
}: {
  card: KanbanCard;
  members: Option[];
  opportunities: Option[];
  currentUserId: string;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: card.id,
      data: { card },
      disabled: card.status !== "open",
    });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`cursor-grab active:cursor-grabbing ${isDragging ? "opacity-40" : ""}`}
      {...listeners}
      {...attributes}
    >
      <OpportunityCard
        card={card}
        members={members}
        opportunities={opportunities}
        currentUserId={currentUserId}
      />
    </div>
  );
}

function StageColumn({
  stage,
  cards,
  members,
  opportunities,
  currentUserId,
}: {
  stage: KanbanStage;
  cards: KanbanCard[];
  members: Option[];
  opportunities: Option[];
  currentUserId: string;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: stage.id });
  const total = cards.reduce((sum, card) => sum + cardValue(card), 0);

  return (
    <div
      ref={setNodeRef}
      className={`flex w-[min(78vw,17.5rem)] shrink-0 snap-start flex-col ${
        isOver ? "opacity-95" : ""
      }`}
    >
      <div className="mb-2 px-1">
        <h3 className="text-sm font-semibold text-text">
          {stage.name}{" "}
          <span className="font-normal text-text-muted">({cards.length})</span>
        </h3>
        <p className="text-xs tabular-nums text-text-muted">
          {formatMinorUnits(total)}
        </p>
      </div>
      <div
        className={`flex min-h-[24rem] flex-col gap-2 rounded-2xl border border-transparent bg-transparent p-1 ${
          isOver ? "border-brand/40 bg-brand-soft/40" : ""
        }`}
      >
        {cards.map((card) => (
          <DraggableCard
            key={card.id}
            card={card}
            members={members}
            opportunities={opportunities}
            currentUserId={currentUserId}
          />
        ))}
      </div>
    </div>
  );
}

export function PipelineKanban({
  stages,
  cards: initialCards,
  sort = "recent",
  members,
  opportunities,
  currentUserId,
}: {
  stages: KanbanStage[];
  cards: KanbanCard[];
  sort?: string;
  members: Option[];
  opportunities: Option[];
  currentUserId: string;
}) {
  const [cards, setCards] = useState(initialCards);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  useEffect(() => {
    setCards(initialCards);
  }, [initialCards]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, {
      activationConstraint: { delay: 180, tolerance: 8 },
    }),
  );

  const cardsByStage = useMemo(() => {
    const map = new Map<string, KanbanCard[]>();
    for (const stage of stages) map.set(stage.id, []);
    for (const card of sortCards(cards, sort)) {
      const list = map.get(card.stageId) ?? [];
      list.push(card);
      map.set(card.stageId, list);
    }
    return map;
  }, [cards, stages, sort]);

  const activeCard = cards.find((card) => card.id === activeId) ?? null;

  function onDragStart(event: DragStartEvent) {
    setActiveId(String(event.active.id));
    setError(null);
  }

  function onDragEnd(event: DragEndEvent) {
    setActiveId(null);
    const opportunityId = String(event.active.id);
    const overId = event.over?.id ? String(event.over.id) : null;
    if (!overId) return;

    const stage =
      stages.find((item) => item.id === overId) ??
      stages.find((item) =>
        (cardsByStage.get(item.id) ?? []).some((card) => card.id === overId),
      );

    if (!stage || stage.stageType !== "open") return;

    const current = cards.find((card) => card.id === opportunityId);
    if (!current || current.stageId === stage.id) return;

    const previous = cards;
    setCards((prev) =>
      prev.map((card) =>
        card.id === opportunityId ? { ...card, stageId: stage.id } : card,
      ),
    );

    startTransition(async () => {
      try {
        await moveOpportunityAction(opportunityId, stage.id);
      } catch {
        setCards(previous);
        setError("Não foi possível mover a negociação.");
      }
    });
  }

  return (
    <div className="space-y-2">
      {error ? (
        <p className="rounded-xl border border-warning/40 bg-warning/10 px-3 py-2 text-sm text-text">
          {error}
        </p>
      ) : null}
      {pending ? (
        <p className="text-xs text-text-muted">Salvando movimentação...</p>
      ) : null}
      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragStart={onDragStart}
        onDragEnd={onDragEnd}
      >
        <div className="-mx-1 flex min-h-[28rem] snap-x snap-mandatory gap-4 overflow-x-auto px-1 pb-4 touch-pan-x">
          {stages.map((stage) => (
            <StageColumn
              key={stage.id}
              stage={stage}
              cards={cardsByStage.get(stage.id) ?? []}
              members={members}
              opportunities={opportunities}
              currentUserId={currentUserId}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <OpportunityCard
              card={activeCard}
              dragging
              members={members}
              opportunities={opportunities}
              currentUserId={currentUserId}
            />
          ) : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
