# BBY-BOO CLOSET - Backend Server

This small Express server provides simple API endpoints for products, orders, and a Stripe payment intent route for testing.

How to run

1. Copy `.env.example` to `.env` and set your Stripe test secret key:

```
STRIPE_SECRET_KEY=sk_test_your_test_key_here
PORT=4000
```

2. Install dependencies and start the server:

Windows PowerShell:

```powershell
cd server
npm install
npm run dev
```

Endpoints

- GET /api/products -> returns sample products from `server/data/products.json`
- GET /api/products/:id -> single product
- POST /api/orders -> save order payload to `server/data/orders.json` (expects JSON { order: { ... } })
- POST /api/create-payment-intent -> create a Stripe PaymentIntent (expects { amount, currency?, metadata? })

Notes

- This server is intended for local development only. It uses a simple JSON file for persisting orders.
- For production, replace the JSON persistence with a database (MongoDB, Postgres, etc.) and secure your Stripe secret.
