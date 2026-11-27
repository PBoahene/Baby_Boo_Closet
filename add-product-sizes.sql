-- Adds age ranges (e.g. "0-6 months", "3-6 years") to products.
-- Used by the Admin "Age Range" picker and the shop's "By Age" filter.
-- Run once in the Supabase SQL editor.
ALTER TABLE products ADD COLUMN IF NOT EXISTS sizes TEXT[] DEFAULT '{}';
