import express from "express";
import fs from "fs";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const DATA_DIR = path.join(process.cwd(), "data");
const PRODUCTS_FILE = path.join(DATA_DIR, "products.json");
const ORDERS_FILE = path.join(DATA_DIR, "orders.json");

// Helper to read JSON
function readJson(filePath) {
  try {
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
  } catch (err) {
    return null;
  }
}

// Helper to write JSON
function writeJson(filePath, data) {
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

app.get("/api/products", (req, res) => {
  const products = readJson(PRODUCTS_FILE) || [];
  res.json(products);
});

app.get("/api/products/:id", (req, res) => {
  const products = readJson(PRODUCTS_FILE) || [];
  const p = products.find((x) => x.id === req.params.id);
  if (!p) return res.status(404).json({ error: "Product not found" });
  res.json(p);
});

// Create order - stores the order in orders.json
app.post("/api/orders", (req, res) => {
  const { order } = req.body;
  if (!order) return res.status(400).json({ error: "Missing order object" });

  const orders = readJson(ORDERS_FILE) || [];
  const createdAt = new Date().toISOString();
  const id = `${Date.now()}`;
  const newOrder = { id, createdAt, ...order };
  orders.push(newOrder);
  writeJson(ORDERS_FILE, orders);

  res.json({ ok: true, order: newOrder });
});

// Admin: Add single product
app.post("/api/admin/products", (req, res) => {
  const product = req.body;
  if (!product.name || !product.price) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const products = readJson(PRODUCTS_FILE) || [];
  const newProduct = {
    id: `${Date.now()}`,
    ...product,
    price: parseFloat(product.price),
    originalPrice: product.originalPrice ? parseFloat(product.originalPrice) : undefined
  };
  
  products.push(newProduct);
  writeJson(PRODUCTS_FILE, products);

  res.json({ ok: true, product: newProduct });
});

// Admin: Update product
app.put("/api/admin/products/:id", (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  
  const products = readJson(PRODUCTS_FILE) || [];
  const index = products.findIndex(p => p.id === id);
  
  if (index === -1) {
    return res.status(404).json({ error: "Product not found" });
  }
  
  products[index] = { ...products[index], ...updates };
  writeJson(PRODUCTS_FILE, products);
  
  res.json({ ok: true, product: products[index] });
});

// Admin: Delete product
app.delete("/api/admin/products/:id", (req, res) => {
  const { id } = req.params;
  
  const products = readJson(PRODUCTS_FILE) || [];
  const filtered = products.filter(p => p.id !== id);
  
  if (filtered.length === products.length) {
    return res.status(404).json({ error: "Product not found" });
  }
  
  writeJson(PRODUCTS_FILE, filtered);
  res.json({ ok: true, message: "Product deleted" });
});

// Stripe payment intent
app.post("/api/create-payment-intent", async (req, res) => {
  const stripeSecret = process.env.STRIPE_SECRET_KEY;
  if (!stripeSecret) return res.status(500).json({ error: "Stripe secret key not configured" });

  const Stripe = (await import("stripe")).default;
  const stripe = new Stripe(stripeSecret, { apiVersion: "2022-11-15" });

  const { amount, currency = "usd", metadata = {} } = req.body;
  if (!amount) return res.status(400).json({ error: "Missing amount (in cents)" });

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      metadata,
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe error", details: String(err) });
  }
});

// Create Stripe Checkout Session
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
        currency: "usd",
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round((item.price || 0) * 100),
      },
      quantity: item.qty || 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: success_url || "http://localhost:5173/checkout/success?session_id={CHECKOUT_SESSION_ID}",
      cancel_url: cancel_url || "http://localhost:5173/cart",
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Stripe checkout error", details: String(err) });
  }
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${PORT}`);
});
