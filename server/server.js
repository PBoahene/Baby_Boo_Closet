import express from "express";
import { createClient } from "@supabase/supabase-js";
import cors from "cors";
import crypto from "crypto";
import multer from "multer";
import serverless from "serverless-http";

const app = express();
app.use(cors());
app.use(express.json());

// NOTE: process.env.* here refers to Vercel's serverless function
// environment (Node.js), which is separate from Vite's import.meta.env
// used in the browser bundle. Env vars must be set in Vercel's
// Environment Variables settings under these exact names.
const SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL;

// Support both naming conventions in case either is set in Vercel,
// but SUPABASE_SERVICE_ROLE_KEY is Supabase's standard name and the
// one that should be used going forward.
const SUPABASE_SERVICE_KEY =
  process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_KEY;

const FRONTEND_URL = process.env.VITE_APP_BASE_URL || "https://baby-boo-closet.vercel.app";

if (!SUPABASE_URL) {
  console.error("Missing VITE_SUPABASE_URL (or SUPABASE_URL) environment variable");
}
if (!SUPABASE_SERVICE_KEY) {
  console.error("Missing SUPABASE_SERVICE_ROLE_KEY (or SUPABASE_SERVICE_KEY) environment variable");
}

// Fail fast with a clear message instead of letting createClient() throw
// an opaque error that crashes every route in this file on import.
if (!SUPABASE_URL || !SUPABASE_SERVICE_KEY) {
  throw new Error(
    "Supabase server credentials are not configured. Set VITE_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in Vercel's Environment Variables (Production)."
  );
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

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

app.post("/api/orders", async (req, res) => {
  const { order } = req.body;
  if (!order) return res.status(400).json({ error: "Missing order object" });
  const { data, error } = await supabase.from("orders").insert({
    user_id: order.user_id || null,
    status: order.status || "PENDING",
    total_cents: Math.round((order.total || 0) * 100),
    customer_email: order.email || null,
    customer_name: order.firstName && order.lastName ? `${order.firstName} ${order.lastName}` : null,
    customer_phone: order.phone || null,
    shipping_address: order.address || null,
    shipping_city: order.city || null,
    shipping_region: order.region || null,
    payment_reference: order.payment_reference || null,
    payment_method: order.payment_method || "mobile_money",
  }).select().single();
  if (error) return res.status(500).json({ error: error.message });
  if (order.items?.length) {
    const items = order.items.map((item) => ({
      order_id: data.id,
      product_id: item.product_id || item.id,
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

app.get("/api/admin/stats", async (req, res) => {
  const { count: totalProducts } = await supabase.from("products").select("*", { count: "exact", head: true });
  const { count: totalOrders } = await supabase.from("orders").select("*", { count: "exact", head: true });
  const { data: orders } = await supabase.from("orders").select("total_cents");
  const revenue = (orders || []).reduce((sum, o) => sum + (o.total_cents || 0), 0) / 100;
  res.json({ totalProducts: totalProducts || 0, totalOrders: totalOrders || 0, revenue, customers: 0 });
});

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

app.delete("/api/admin/products/:id", async (req, res) => {
  const { id } = req.params;
  const { error } = await supabase.from("products").delete().eq("id", id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ ok: true, message: "Product deleted" });
});

app.put("/api/admin/featured", async (req, res) => {
  const { ids } = req.body;
  if (!Array.isArray(ids)) return res.status(400).json({ error: "ids must be an array" });
  await supabase.from("products").update({ featured: false }).neq("id", "none");
  if (ids.length > 0) {
    await supabase.from("products").update({ featured: true }).in("id", ids);
  }
  res.json({ ok: true, ids });
});

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

app.post("/api/paystack/initialize", async (req, res) => {
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) return res.status(500).json({ error: "Paystack secret key not configured" });
  const Paystack = (await import("paystack")).default;
  const paystack = new Paystack(paystackSecret);
  const { email, amount, order } = req.body;
  if (!email || !amount) return res.status(400).json({ error: "Missing email or amount" });
  try {
    const response = await paystack.transaction.initialize({
      amount: String(amount),
      email,
      reference: `BB-${Date.now()}`,
      currency: "GHS",
      channels: ["mobile_money"],
      metadata: { order_id: order?.order_id || null },
    });
    res.json({
      reference: response.data.reference,
      authorization_url: response.data.authorization_url,
      access_code: response.data.access_code,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Paystack initialize error", details: String(err) });
  }
});

app.get("/api/paystack/verify/:reference", async (req, res) => {
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) return res.status(500).json({ error: "Paystack secret key not configured" });
  const Paystack = (await import("paystack")).default;
  const paystack = new Paystack(paystackSecret);
  try {
    const response = await paystack.transaction.verify(req.params.reference);
    if (response.data.status === "success") {
      await supabase.from("orders").update({
        status: "PAID",
        payment_reference: req.params.reference,
      }).eq("payment_reference", req.params.reference);
    }
    res.json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Verification failed", details: String(err) });
  }
});

app.post("/api/paystack/webhook", express.raw({ type: "application/json" }), async (req, res) => {
  const paystackSecret = process.env.PAYSTACK_SECRET_KEY;
  if (!paystackSecret) return res.status(500).json({ error: "Paystack secret key not configured" });
  const hash = crypto.createHmac("sha512", paystackSecret).update(JSON.stringify(req.body)).digest("hex");
  if (hash !== req.headers["x-paystack-signature"]) return res.status(400).send("Invalid signature");
  const event = req.body;
  if (event.event === "charge.success") {
    const ref = event.data?.reference;
    if (ref) {
      await supabase.from("orders").update({
        status: "PAID",
        payment_reference: ref,
      }).eq("payment_reference", ref);
    }
  }
  res.sendStatus(200);
});

const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

app.post("/api/custom-orders", upload.array("files"), async (req, res) => {
  try {
    const { body, files } = req;
    const fileMeta = (files || []).map((f) => ({
      originalName: f.originalname,
      mimetype: f.mimetype,
      size: f.size,
    }));
    const { data, error } = await supabase.from("custom_orders").insert({
      full_name: body.fullName,
      email: body.email,
      phone: body.phone,
      organization: body.organization || null,
      garment_type: body.garmentType,
      quantity: parseInt(body.quantity) || 1,
      colors: body.colors,
      embroidery_required: body.embroideryRequired === "true",
      printing_required: body.printingRequired === "true",
      delivery_date: body.deliveryDate,
      additional_notes: body.additionalNotes || null,
      file_count: parseInt(body.file_count) || 0,
      file_metadata: fileMeta,
    }).select().single();
    if (error) return res.status(500).json({ error: error.message });
    res.json({ ok: true, id: data.id });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to save custom order" });
  }
});

export default serverless(app);