"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import { CreateDealDialog } from "@/features/opportunities/components/create-deal-dialog";

type Option = { value: string; label: string };

const pillClass =
  "inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface px-3 text-sm text-text shadow-sm outline-none hover:border-border-strong focus:border-brand focus:ring-2 focus:ring-brand/20";

export function NegotiationsToolbar({
  pipelines,
  activePipelineId,
  members,
  ownerId,
  sort,
  filterCount,
  clearHref,
  settingsHref,
  canManage,
  createDeal,
}: {
  pipelines: Option[];
  activePipelineId: string;
  members: Option[];
  ownerId?: string;
  sort: string;
  filterCount: number;
  clearHref: string;
  settingsHref: string;
  canManage: boolean;
  createDeal: {
    open?: boolean;
    pipelineId: string;
    stageId: string;
    ownerId: string;
    contacts: Option[];
    companies: Option[];
    members: Option[];
    products: Option[];
  };
}) {
  const router = useRouter();
  const [filtersOpen, setFiltersOpen] = useState(false);

  const queryBase = useMemo(() => {
    const params = new URLSearchParams();
    params.set("pipelineId", activePipelineId);
    if (ownerId) params.set("ownerId", ownerId);
    if (sort && sort !== "recent") params.set("sort", sort);
    return params;
  }, [activePipelineId, ownerId, sort]);

  function pushWith(updates: Record<string, string | undefined>) {
    const params = new URLSearchParams(queryBase.toString());
    for (const [key, value] of Object.entries(updates)) {
      if (!value) params.delete(key);
      else params.set(key, value);
    }
    router.push(`/app/pipeline?${params.toString()}`);
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="text-2xl font-semibold tracking-tight text-text">
            Negociações
          </h1>
          <div className="inline-flex overflow-hidden rounded-full border border-border bg-surface">
            <span
              className="inline-flex items-center gap-1.5 bg-brand px-2.5 py-1.5 text-xs font-semibold text-white"
              title="Visão kanban"
            >
              <span aria-hidden>▦</span>
              Kanban
            </span>
            <Link
              href={`/app/opportunities?pipelineId=${activePipelineId}`}
              className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-text-muted hover:bg-page hover:text-text"
              title="Visão lista"
            >
              <span aria-hidden>☰</span>
              Lista
            </Link>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={settingsHref}
            className="rounded-full px-3 py-1.5 text-sm text-text-muted hover:bg-page hover:text-text"
          >
            Configurar funil
          </Link>
          <CreateDealDialog
            open={createDeal.open}
            pipelineId={createDeal.pipelineId}
            stageId={createDeal.stageId}
            ownerId={createDeal.ownerId}
            contacts={createDeal.contacts}
            companies={createDeal.companies}
            members={createDeal.members}
            products={createDeal.products}
            label="+ Criar"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <label className="sr-only" htmlFor="pipeline-filter">
          Funil de vendas
        </label>
        <select
          id="pipeline-filter"
          className={pillClass}
          value={activePipelineId}
          onChange={(event) =>
            pushWith({ pipelineId: event.target.value, ownerId, sort })
          }
        >
          {pipelines.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="owner-filter">
          Responsável
        </label>
        <select
          id="owner-filter"
          className={pillClass}
          value={ownerId ?? ""}
          onChange={(event) =>
            pushWith({ ownerId: event.target.value || undefined })
          }
        >
          <option value="">Todos os responsáveis</option>
          {members.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>

        <label className="sr-only" htmlFor="sort-filter">
          Ordenação
        </label>
        <select
          id="sort-filter"
          className={pillClass}
          value={sort}
          onChange={(event) => pushWith({ sort: event.target.value })}
        >
          <option value="recent">Mais recentes</option>
          <option value="title-asc">Alfabética A-Z</option>
          <option value="title-desc">Alfabética Z-A</option>
          <option value="value-desc">Maior valor</option>
        </select>

        <button
          type="button"
          className={`${pillClass} ${
            filterCount > 0 || filtersOpen
              ? "border-brand bg-brand-soft text-brand-dark"
              : ""
          }`}
          onClick={() => setFiltersOpen((open) => !open)}
        >
          Filtros ({filterCount})
        </button>

        {filterCount > 0 ? (
          <Link href={clearHref} className="text-sm text-brand hover:underline">
            Limpar
          </Link>
        ) : null}

        {canManage && pipelines.length < 2 ? (
          <span className="text-xs text-text-muted">
            Crie mais funis em Configurar funil
          </span>
        ) : null}
      </div>

      {filtersOpen ? (
        <form
          method="get"
          className="rounded-2xl border border-border bg-surface p-4 shadow-soft"
        >
          <input type="hidden" name="pipelineId" value={activePipelineId} />
          {ownerId ? <input type="hidden" name="ownerId" value={ownerId} /> : null}
          {sort !== "recent" ? <input type="hidden" name="sort" value={sort} /> : null}
          <div className="flex flex-wrap items-end gap-2 text-sm">
            <label className="text-xs font-medium text-text-muted">
              Origem
              <input
                name="source"
                className="mt-1 block rounded-xl border border-border bg-surface px-3 py-1.5 text-sm"
              />
            </label>
            <label className="text-xs font-medium text-text-muted">
              Produto
              <input
                name="productName"
                className="mt-1 block rounded-xl border border-border bg-surface px-3 py-1.5 text-sm"
              />
            </label>
            <label className="text-xs font-medium text-text-muted">
              Valor mín.
              <input
                name="minValue"
                className="mt-1 block w-28 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm"
              />
            </label>
            <label className="text-xs font-medium text-text-muted">
              Valor máx.
              <input
                name="maxValue"
                className="mt-1 block w-28 rounded-xl border border-border bg-surface px-3 py-1.5 text-sm"
              />
            </label>
            <label className="flex items-center gap-2 pb-2 text-text">
              <input type="checkbox" name="withoutNextAction" value="1" />
              Sem próxima ação
            </label>
            <label className="flex items-center gap-2 pb-2 text-text">
              <input type="checkbox" name="overdue" value="1" />
              Tarefa atrasada
            </label>
            <label className="flex items-center gap-2 pb-2 text-text">
              <input type="checkbox" name="stuck" value="1" />
              Paradas
            </label>
            <button
              type="submit"
              className="rounded-full bg-brand px-3.5 py-1.5 text-sm font-semibold text-white hover:bg-brand-dark"
            >
              Aplicar
            </button>
          </div>
        </form>
      ) : null}
    </div>
  );
}
