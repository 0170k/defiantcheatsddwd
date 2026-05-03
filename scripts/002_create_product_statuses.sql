CREATE TABLE IF NOT EXISTS product_statuses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_slug TEXT NOT NULL UNIQUE,
  product_name TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'operational',
  last_updated TIMESTAMPTZ NOT NULL DEFAULT now(),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE product_statuses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow public read on product_statuses" ON product_statuses FOR SELECT USING (true);
