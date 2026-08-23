import { index, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { companies } from "./companies";
import { contacts } from "./contacts";
import { organizations } from "./organizations";
import { users } from "./users";

export const agentRuns = pgTable(
  "agent_runs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    organizationId: uuid("organization_id")
      .notNull()
      .references(() => organizations.id, { onDelete: "cascade" }),
    actorId: uuid("actor_id").references(() => users.id, { onDelete: "set null" }),
    contactId: uuid("contact_id").references(() => contacts.id, {
      onDelete: "set null",
    }),
    companyId: uuid("company_id").references(() => companies.id, {
      onDelete: "set null",
    }),
    kind: text("kind").notNull().default("lead"),
    status: text("status").notNull().default("queued"),
    title: text("title").notNull(),
    website: text("website"),
    markdown: text("markdown"),
    error: text("error"),
    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow().notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).defaultNow().notNull(),
  },
  (table) => [
    index("agent_runs_org_created_idx").on(table.organizationId, table.createdAt),
    index("agent_runs_contact_idx").on(table.contactId),
    index("agent_runs_company_idx").on(table.companyId),
  ],
);

export type AgentRun = typeof agentRuns.$inferSelect;
