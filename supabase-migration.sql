-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sku TEXT NOT NULL DEFAULT '',
  name TEXT NOT NULL,
  description TEXT,
  price_cents INTEGER NOT NULL DEFAULT 0,
  stock INTEGER NOT NULL DEFAULT 0,
  category TEXT,
  images TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Users (syncs with Supabase Auth)
CREATE TABLE users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  name TEXT,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Orders
CREATE TABLE orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  status TEXT NOT NULL DEFAULT 'PENDING',
  total_cents INTEGER NOT NULL DEFAULT 0,
  customer_email TEXT,
  customer_name TEXT,
  customer_phone TEXT,
  shipping_address TEXT,
  shipping_city TEXT,
  shipping_region TEXT,
  payment_reference TEXT,
  payment_method TEXT DEFAULT 'mobile_money',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Order items
CREATE TABLE order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  unit_price_cents INTEGER NOT NULL DEFAULT 0
);

-- Storage bucket for uploads
INSERT INTO storage.buckets (id, name, public) VALUES ('uploads', 'uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Enable Row Level Security
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;

-- RLS: anyone can read products
CREATE POLICY "Products public read" ON products
  FOR SELECT USING (true);

-- RLS: only admins can modify products
CREATE POLICY "Products admin insert" ON products
  FOR INSERT WITH CHECK (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
CREATE POLICY "Products admin update" ON products
  FOR UPDATE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));
CREATE POLICY "Products admin delete" ON products
  FOR DELETE USING (auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- RLS: users read own data, admins read all
CREATE POLICY "Users read own" ON users
  FOR SELECT USING (auth.uid() = id OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- RLS: orders
CREATE POLICY "Orders own" ON orders
  FOR ALL USING (auth.uid() = user_id OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin'));

-- RLS: order_items
CREATE POLICY "Order items own" ON order_items
  FOR ALL USING (
    order_id IN (SELECT id FROM orders WHERE user_id = auth.uid())
    OR auth.uid() IN (SELECT id FROM users WHERE role = 'admin')
  );
