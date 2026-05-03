INSERT INTO product_statuses (product_slug, product_name, status)
VALUES ('apex-external', 'Ultimate - Apex Legends', 'undetected')
ON CONFLICT (product_slug) DO NOTHING;

INSERT INTO product_statuses (product_slug, product_name, status)
VALUES ('r6-astral', 'R6 Astral', 'undetected')
ON CONFLICT (product_slug) DO NOTHING;
