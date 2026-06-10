const https = require("https");
const fs = require("fs");
const path = require("path");

const SUPABASE_URL = "https://mmhaxqcklycbkjihvngo.supabase.co";
const ANON_KEY = "sb_publishable_1grlIqoOWXifHgtZg83t1Q_JWaBUjkM";

const products = JSON.parse(fs.readFileSync(path.join(__dirname, "data", "products.json"), "utf-8"));

function supabaseFetch(url, options) {
  return new Promise((resolve, reject) => {
    const u = new URL(url);
    const opts = {
      hostname: u.hostname,
      path: u.pathname + u.search,
      method: options.method || "GET",
      headers: {
        "apikey": ANON_KEY,
        "Authorization": `Bearer ${ANON_KEY}`,
        "Content-Type": "application/json",
        "Prefer": "return=minimal",
        ...options.headers,
      },
    };
    const req = https.request(opts, (res) => {
      let body = "";
      res.on("data", (c) => (body += c));
      res.on("end", () => resolve({ status: res.statusCode, body }));
    });
    req.on("error", reject);
    if (options.body) req.write(options.body);
    req.end();
  });
}

async function migrate() {
  const toInsert = products.map((p) => ({
    name: p.name,
    price_cents: Math.round((p.price || 0) * 100),
    category: p.category || null,
    images: p.image ? [p.image] : [],
    stock: 100,
    sku: `SKU-${p.id}`,
    featured: p.isCustomizable || false,
  }));

  const res = await supabaseFetch(
    `${SUPABASE_URL}/rest/v1/products`,
    {
      method: "POST",
      body: JSON.stringify(toInsert),
      headers: { "Prefer": "return=representation" },
    }
  );

  if (res.status >= 200 && res.status < 300) {
    const inserted = JSON.parse(res.body || "[]");
    console.log(`Migrated ${inserted.length} products`);
  } else {
    console.error(`Error ${res.status}: ${res.body}`);
  }
}

migrate().catch(console.error);
