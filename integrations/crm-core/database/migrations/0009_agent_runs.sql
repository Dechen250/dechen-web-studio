CREATE TABLE IF NOT EXISTS agent_runs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id uuid NOT NULL REFERENCES organizations(id) ON DELETE CASCADE,
  actor_id uuid REFERENCES users(id) ON DELETE SET NULL,
  contact_id uuid REFERENCES contacts(id) ON DELETE SET NULL,
  company_id uuid REFERENCES companies(id) ON DELETE SET NULL,
  kind text NOT NULL DEFAULT 'lead',
  status text NOT NULL DEFAULT 'queued',
  title text NOT NULL,
  website text,
  markdown text,
  error text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS agent_runs_org_created_idx
  ON agent_runs (organization_id, created_at DESC);
CREATE INDEX IF NOT EXISTS agent_runs_contact_idx
  ON agent_runs (contact_id);
CREATE INDEX IF NOT EXISTS agent_runs_company_idx
  ON agent_runs (company_id);
