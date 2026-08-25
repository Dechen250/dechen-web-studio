-- Funil comercial no formato de prospecção (barra de etapas da ficha).
-- Só o pipeline padrão. O funil "Acompanhamento" (1/3/6 meses) fica intacto.

DO $$
DECLARE
  p RECORD;
  has_followup boolean;
BEGIN
  FOR p IN
    SELECT id FROM pipelines WHERE is_default = true
  LOOP
    UPDATE pipeline_stages SET
      name = CASE position
        WHEN 1 THEN 'Sem contato'
        WHEN 2 THEN 'Enriquecer dados'
        WHEN 3 THEN 'Primeiro contato'
        WHEN 4 THEN 'Levantamento'
        WHEN 5 THEN 'Agendamento'
        WHEN 6 THEN 'Apresentação'
        WHEN 7 THEN 'Proposta'
        ELSE name
      END,
      probability = CASE position
        WHEN 1 THEN 10
        WHEN 2 THEN 20
        WHEN 3 THEN 30
        WHEN 4 THEN 40
        WHEN 5 THEN 50
        WHEN 6 THEN 60
        WHEN 7 THEN 75
        ELSE probability
      END,
      updated_at = now()
    WHERE pipeline_id = p.id
      AND stage_type = 'open'
      AND position BETWEEN 1 AND 7;

    SELECT EXISTS (
      SELECT 1 FROM pipeline_stages
      WHERE pipeline_id = p.id
        AND stage_type = 'open'
        AND name = 'Acompanhamento'
    ) INTO has_followup;

    IF NOT has_followup THEN
      UPDATE pipeline_stages
      SET position = position + 1, updated_at = now()
      WHERE pipeline_id = p.id
        AND stage_type IN ('won', 'lost');

      INSERT INTO pipeline_stages (pipeline_id, name, position, probability, stage_type)
      VALUES (p.id, 'Acompanhamento', 8, 85, 'open');
    END IF;
  END LOOP;
END $$;

UPDATE opportunities
SET
  title = LEFT('PROSPECÇÃO | ' || regexp_replace(title, '^Site encontrado · ', ''), 160),
  updated_at = now()
WHERE source = 'agent-site'
  AND title LIKE 'Site encontrado · %';
