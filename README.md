# Baby-Boo Closet 🛍️

An online store for **Baby-Boo Closet**, a Greater Accra kidswear brand selling school uniforms, everyday kids' clothing, underwear and custom-made pieces (embroidery, corporate and event wear).

Live site: <https://baby-boo-closet.vercel.app>

![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?style=for-the-badge&logo=vite)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Hosting-000000?style=for-the-badge&logo=vercel)

## ✨ Features

### For shoppers
- **Home page** – sliding promo banner, scrolling offers strip, trust badges and the product grid
- **Category menu** – School Wear, Girls, Boys, Infant Wear, Underwear, Corporate and Custom Design, with dropdowns on desktop and a slide-down menu on phones
- **Shop** – search, "Filter by" sidebar (category, price slider, **By Age**), sort, and Load More
- **Shop by age** – products are tagged with age ranges: 0-6 months, 6-12 months, 12-18 months, 18-24 months, 2-3 years, 3-6 years, 6-9 years, 9-12 years and 12+ years
- **Cart** – quantity controls, order summary and a free-delivery progress bar (free over GH₵300)
- **Checkout** – customers place the order with their delivery details, and the team contacts them to arrange payment (e.g. Mobile Money)
- **Upload Your Design** – send logos or sketches for a custom quote
- **Contact page** – phone, email, hours, quick answers and a message form that sends to WhatsApp
- **WhatsApp Quick Order** button on every page
- **Accounts** – sign up, log in and reset passwords with Supabase Auth

### For admins (`/admin`)
- Add, edit and delete products, upload product photos
- Tag each product with the **age ranges** it fits
- Choose featured products, view orders and store stats

## 🚀 Quick Start

```bash
git clone https://github.com/PBoahene/Baby_Boo_Closet.git
cd Baby_Boo_Closet
npm install
cp .env.example .env   # then fill in the values below
npm run dev            # http://localhost:5173
```

Other scripts:

```bash
npm run lint      # ESLint
npm run test      # Vitest
npm run build     # production build into dist/
npm run preview   # serve the production build locally
```

> **Note:** the shop loads products from `/api/products`. In production Vercel runs `api/server.js` for every `/api/*` route. Locally, point `VITE_API_BASE_URL` at a running API (see [`server/README.md`](server/README.md)) or the shop will show "We couldn't load products right now".

## 🗄️ Database setup (Supabase)

Run these SQL files once in the Supabase SQL editor, in order:

1. `supabase-migration.sql` – products, users and orders tables
2. `add-product-sizes.sql` – **new:** adds the `sizes` column that stores each product's age ranges

Until `add-product-sizes.sql` has been run, products can still be saved, but without age ranges — pick ages in Admin after running it.

(`add-order-fields.sql`, `rls-fix.sql` and `first-admin.sql` are currently empty placeholders.)

## 🔑 Environment variables

Frontend (`.env`, read by Vite):

| Name | Purpose |
| --- | --- |
| `VITE_SUPABASE_URL` | Supabase project URL |
| `VITE_SUPABASE_ANON_KEY` | Supabase public (anon) key |
| `VITE_API_BASE_URL` | API base URL; leave empty in production so `/api` on the same domain is used |
| `VITE_APP_BASE_URL` | Public site URL used for payment redirects (defaults to the current origin) |

API (`api/server.js`, set in Vercel → Project → Settings → Environment Variables):

| Name | Purpose |
| --- | --- |
| `SUPABASE_URL` | Supabase project URL (falls back to `VITE_SUPABASE_URL`) |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service key (server only — never expose it in the frontend) |
| `PAYSTACK_SECRET_KEY` | Optional Paystack key for the Paystack API routes (not used by checkout today) |
| `STRIPE_SECRET_KEY` | Optional Stripe key for the Stripe test routes |

Never commit real keys. See **Secret scanning** below.

## 📁 Project structure

```
Baby_Boo_Closet/
├── api/server.js            # Express API, deployed as a Vercel function
├── server/                  # same API for running locally + sample data
├── public/brand/            # logo.svg (full logo) and logo-mark.svg (icon)
├── src/
│   ├── components/
│   │   ├── Header.jsx        # logo, search, category menu, mobile drawer
│   │   ├── BannerSlider.tsx  # home page promo slider
│   │   ├── PromoTicker.tsx   # scrolling offers strip
│   │   ├── TrustRow.tsx      # delivery / service / quality badges
│   │   ├── ShopCatalog.tsx   # filters + product grid (home and shop)
│   │   ├── ProductCard.tsx
│   │   ├── Footer.jsx
│   │   └── ui/               # shadcn/ui building blocks
│   ├── lib/
│   │   ├── catalog.ts        # product type, category menu, age ranges
│   │   ├── cart.ts           # cart helpers (stored in localStorage)
│   │   └── currency.ts       # GH₵ formatting
│   └── pages/                # Index, Shop, ProductDetail, Cart, Checkout,
│                             # CustomDesign, SchoolKids, Admin, Account, ...
├── *.sql                    # Supabase migrations
└── vercel.json              # routes /api/* to the API, everything else to the app
```

To change the category menu or the age ranges, edit `src/lib/catalog.ts`.

## 🎨 Pages

| Page | Route | What it does |
| --- | --- | --- |
| Home | `/` | Banner slider, offers, trust badges, product grid |
| Shop | `/shop` | Full catalog with filters; supports `?category=` and `?q=` |
| Product | `/product/:id` | Product details |
| Cart | `/cart` | Cart and order summary |
| Checkout | `/checkout` | Delivery details and payment |
| Upload Design | `/custom-design` | Custom order request with file upload |
| School Kids | `/school-kids` | School uniform and bulk orders |
| About | `/about` | Store story and values |
| Contact | `/contact` | Phone, email, hours, FAQ and a message form that opens WhatsApp |
| Login | `/login` | Sign in, register and password reset |
| Account | `/account` | Customer account |
| Admin | `/admin` | Store management (admins only) |

## 🔧 Tech stack

- **Frontend:** React 18, TypeScript, React Router, TanStack Query
- **Styling:** Tailwind CSS, shadcn/ui, lucide icons, Inter font
- **Backend:** Express on Vercel serverless functions
- **Database, auth & storage:** Supabase
- **Payments:** arranged by the team after ordering; Paystack/Stripe API routes are available for future online payment
- **Build & hosting:** Vite, Vercel

## 🔐 Secret scanning

This project includes a `gitleaks` setup to stop secrets being committed.

```bash
# one-time: install gitleaks (https://github.com/gitleaks/gitleaks), then
npm run setup:hooks

# manual scan
npm run scan:secrets
```

After setup, every commit runs a staged secret scan using `.gitleaks.toml`.

## 🤝 Contributing

1. Fork the project
2. Create a branch: `git checkout -b feature/my-feature`
3. Commit your changes: `git commit -m "Add my feature"`
4. Push: `git push origin feature/my-feature`
5. Open a pull request

## 💡 Ideas for later

- Online payment at checkout (Paystack Mobile Money)
- Wishlist and product reviews
- Email / SMS order notifications
- Gender and colour filters
- Gift cards

## 👨‍💻 Development team

Syntrix Software Engineering · DCIT208 Software Engineering Project · 2024/2025 · University of Ghana, Legon

## 📞 Support

Open a GitHub issue or email **Pbohene007@st.ug.edu.gh**.

## 📝 License

MIT License.
