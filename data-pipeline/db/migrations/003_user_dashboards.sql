-- Dashboard widget system: user_dashboards + user_widgets
-- Migration 003: User Dashboard & Widget persistence

CREATE TABLE IF NOT EXISTS user_dashboards (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id      TEXT NOT NULL,
  name         TEXT NOT NULL DEFAULT 'My Dashboard',
  is_default   BOOLEAN NOT NULL DEFAULT false,
  layout_json  JSONB NOT NULL DEFAULT '[]'::jsonb,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_dashboards_user ON user_dashboards(user_id);
CREATE INDEX IF NOT EXISTS idx_user_dashboards_default ON user_dashboards(user_id, is_default);

CREATE TABLE IF NOT EXISTS user_widgets (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id   UUID NOT NULL REFERENCES user_dashboards(id) ON DELETE CASCADE,
  widget_type    TEXT NOT NULL CHECK (widget_type IN ('table','pie','bar','horizontal_bar','line','area','heatmap','metric')),
  title          TEXT NOT NULL DEFAULT 'Untitled Widget',
  config_json    JSONB NOT NULL DEFAULT '{}'::jsonb,
  sort_order     INTEGER NOT NULL DEFAULT 0,
  created_at     TIMESTAMPTZ DEFAULT NOW(),
  updated_at     TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_user_widgets_dashboard ON user_widgets(dashboard_id);

-- Trigger: keep updated_at current on user_dashboards
CREATE OR REPLACE FUNCTION touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_user_dashboards_updated_at'
  ) THEN
    CREATE TRIGGER trg_user_dashboards_updated_at
      BEFORE UPDATE ON user_dashboards
      FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_trigger WHERE tgname = 'trg_user_widgets_updated_at'
  ) THEN
    CREATE TRIGGER trg_user_widgets_updated_at
      BEFORE UPDATE ON user_widgets
      FOR EACH ROW EXECUTE FUNCTION touch_updated_at();
  END IF;
END;
$$;
