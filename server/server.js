import express from "express";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());
const FRONTEND_URL = "http://localhost:5173";

const SUPABASE_URL = "https://mmhaxqcklycbkjihvngo.supabase.co";
const SUPABASE_SERVICE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1taGF4cWNrbHljYmtqaWh2bmdvIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTA0MTAwMCwiZXhwIjoyMDk2NjE3MDAwfQ.RJ7s__1iahGVUr_raYRGiqI_bgWHobfDHoOB0NIyGCg";

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Products
app.get("/api/products", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  const mapped = data.map((p) => ({
    id: p.id,
    name: p.name,
    price: (p.price_cents || 0) / 100,
    originalPrice: undefined,
    image: p.images?.[0] || "",
    category: p.category || "",
    isCustomizable: false,
    colors: [],
    sizes: [],
  }));
  res.json(mapped);
});

app.get("/api/products/:id", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("id", req.params.id).single();
  if (error || !data) return res.status(404).json({ error: "Product not found" });
  res.json(data);
});

app.get("/api/featured", async (req, res) => {
  const { data, error } = await supabase.from("products").select("*").eq("featured", true);
  if (error) return res.status(500).json({ error: error.message });
  const mapped = (data || []).map((p) => ({
    id: p.id,
    name: p.name,
    price: (p.price_cents || 0) / 100,
    image: p.images?.[0] || "",
    category: p.category || "",
  }));
  res.json(mapped);
});

// Orders
app.post("/api/orders", async (req, res) => {
  const { order } = req.body;
  if (!order) return res.status(400).json({ error: "Missing order object" });
  const { data, error } = await supabase.from("orders").insert({
    user_id: order.user_id || null,
    status: "PENDING",
    total_cents: Math.round((order.total || 0) * 100),
  }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  if (order.items?.length) {
    const items = order.items.map((item) => ({
      order_id: data.id,
      product_id: item.product_id,
      quantity: item.qty || 1,
      unit_price_cents: Math.round((item.price || 0) * 100),
    }));
    await supabase.from("order_items").insert(items);
  }
  res.json({ ok: true, order: data });
});

app.get("/api/orders", async (req, res) => {
  const { data, error } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

// Admin: stats
app.get("/api/admin/stats", async (req, res) => {
  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true });
  const { data: orders } = await supabase.from("orders").select("total_cents");
  const revenue = (orders || []).reduce((sum, o) => sum + (o.total_cents || 0), 0) / 100;
  res.json({ totalProducts: totalProducts || 0, totalOrders: totalOrders || 0, revenue, customers: 0 });
});

// Admin: add product
app.post("/api/admin/products", async (req, res) => {
  const product = req.body;
  if (!product.name || !product.price) return res.status(400).json({ error: "Missing required fields" });
  const { data, error } = await supabase.from("products").insert({
    name: product.name,
    sku: product.sku || `SKU-${Date.now()}`,
    price_cents: Math.round(parseFloat(product.price) * 100),
    category: product.category || null,
    stock: product.stock ?? 100,
    images: product.image ? [product.image] : [],
  }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true, product: data });
});

// Admin: update product
app.put("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const updates = {};
  if (req.body.name !== undefined) updates.name = req.body.name;
  if (req.body.price !== undefined) updates.price_cents = Math.round(parseFloat(req.body.price) * 100);
  if (req.body.category !== undefined) updates.category = req.body.category;
  if (req.body.stock !== undefined) updates.stock = req.body.stock;
  if (req.body.image !== undefined) updates.images = req.body.image ? [req.body.image] : [];
  const { data, error } = await supabase.from("products").update(updates).eq("id", id).select().single();
  if (error) return res.status(500).json({ error: error.message });
  if (!data) return res.status(404).json({ error: "Product not found" });
  res.json({ ok: true, product: data });
});

// Admin: delete product
app.delete("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true, message: "Product deleted" });
});

// Admin: update featured
app.put("/api/admin/featured", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: "ids must be an array" });
  await supabase.from("products").update({ featured: false }).neq("id", "none");
  if (ids.length > 0) {
    await supabase.from("products").update({ featured: true }).in("id", ids);
  }
  res.json({ ok: true, ids });
});

// Stripe payment intent
app.post("/api/create-payment-intent", async (req, res) => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) return res.status(500).json({ error: "Stripe secret key not configured" });
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });
  const { amount, currency = "ghs", metadata = {} } = req.body;
  if (!amount) return res.status(400).json({ error: "Missing amount (in cents)" });
  try {
    const paymentIntent = await stripe.paymentIntents.create({ amount, currency, metadata });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error", details: String(err) });
  }
});

// Stripe Checkout Session
app.post("/api/create-checkout-session", async (req, res) => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) return res.status(500).json({ error: "Stripe secret key not configured" });
  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });
  const { cart, success_url, cancel_url } = req.body;
  if (!cart || !Array.isArray(cart) || cart.length === 0) return res.status(400).json({ error: "Cart is empty" });
  try {
    const line_items = cart.map((item) => ({
      price_data: {
        currency: "ghs",
        product_data: { name: item.name },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.qty || 1,
    }));
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: success_url || `${FRONTEND_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: cancel_url || `${FRONTEND_URL}/cart`,
    });
    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe checkout error", details: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
