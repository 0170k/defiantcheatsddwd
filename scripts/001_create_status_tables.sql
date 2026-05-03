-- Product statuses table
CREATE TABLE IF NOT EXISTS product_statuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_slug TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'operational' CHECK (status IN ('operational', 'degraded', 'partial_outage', 'major_outage', 'maintenance', 'offline', 'updating')),
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Status updates / incidents table
CREATE TABLE IF NOT EXISTS status_updates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  message TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'info' CHECK (severity IN ('info', 'warning', 'critical', 'resolved')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Allow public read access (no auth needed to view status)
ALTER TABLE product_statuses ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on product_statuses" ON product_statuses FOR SELECT USING (true);

ALTER TABLE status_updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public read on status_updates" ON status_updates FOR SELECT USING (true);

-- Seed with the existing products
INSERT INTO product_statuses (product_slug, product_name, status) VALUES
  ('rust-external', 'Defiant - Rust External', 'operational'),
  ('r6-crusader', 'R6 - Crusader', 'operational'),
  ('r6-diamond', 'Defiant - R6 Diamond', 'operational'),
  ('arc-external', 'Arc Raiders - External', 'operational')
ON CONFLICT (product_slug) DO NOTHING;
