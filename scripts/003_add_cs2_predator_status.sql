INSERT INTO product_statuses (product_slug, product_name, status)
VALUES ('cs2-predator', 'CS2 - Predator', 'operational')
ON CONFLICT (product_slug) DO NOTHING;
