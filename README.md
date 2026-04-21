# Baby_Boo_Closet 🛍️

A modern React.js e-commerce platform specializing in kids' fashion and unisex underwear.

![React](https://img.shields.io/badge/React-18.2.0-61DAFB?style=for-the-badge&logo=react)
![React Router](https://img.shields.io/badge/React_Router-6.3.0-CA4245?style=for-the-badge&logo=react-router)
![E-Commerce](https://img.shields.io/badge/E--Commerce-Platform-FF6B6B?style=for-the-badge)

## ✨ Features

### 🎯 Customer Features
- **Product Catalog** - Browse with search & filters
- **User Authentication** - Secure login/register
- **Shopping Cart** - Persistent cart storage
- **Checkout Process** - Smooth order placement
- **Order Tracking** - Real-time status updates
- **Responsive Design** - Mobile-first approach

### ⚡ Admin Features
- **Product Management** - Add/edit/delete products
- **Inventory Control** - Stock management
- **Admin Dashboard** - Full store control
- **Order Management** - Process customer orders

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/PBoahene/Baby_Boo_Closet.git
cd Baby_Boo_Closet

# Install frontend dependencies
npm install

# Create frontend env file
cp src/.env.local.example .env.local

# Start the Vite dev server (http://localhost:5173)
npm run dev

# Run linting and tests
npm run lint
npm run test

# Build for production
npm run build

# Backend API (Stripe checkout + product data)
cd server
npm install
cp .env.example .env   # add STRIPE_SECRET_KEY before running
npm run dev            # starts Express API on http://localhost:4000
```

## Environment Variables

Frontend (`.env.local` in project root):

```bash
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_API_BASE_URL=http://localhost:4000
VITE_FRONTEND_URL=http://localhost:5173
```

Backend (`server/.env`):

```bash
STRIPE_SECRET_KEY=sk_test_or_live_key
PORT=4000
FRONTEND_URL=http://localhost:5173
```

For production, set `VITE_API_BASE_URL` and `VITE_FRONTEND_URL` to your deployed URLs.

📁 **Project Structure (excerpt)**

```
Baby_Boo_Closet/
├── package.json
├── vite.config.ts
├── src/
│   ├── App.tsx
│   ├── main.tsx
│   ├── assets/
│   ├── components/
│   │   ├── ProductCard.tsx
│   │   ├── FeaturedProducts.jsx
│   │   └── ui/            # shadcn-ui primitives
│   ├── hooks/
│   ├── lib/
│   │   └── cart.ts
│   └── pages/
│       ├── Index.tsx
│       ├── Cart.tsx
│       └── CheckoutSuccess.tsx
└── server/
	├── server.js
	├── package.json
	└── data/
```

### 🎨 Pages Overview
Page	Description
Home	Featured products & promotions
Products	Catalog with filtering
Product Detail	Individual product view
Cart	Shopping cart management
Checkout	Order completion
Login/Register	User authentication
Admin	Store management dashboard

###🔧 Tech Stack
Frontend: React 18.2.0

Routing: React Router DOM 6.3.0

State Management: React Context API

Storage: localStorage

HTTP Client: Axios

Styling: CSS3 + Responsive Design

Build Tool: Create React App

###📱 Responsive Design
Fully optimized for:

📱 Mobile (320px+)

📟 Tablet (768px+)

💻 Desktop (1200px+)

###🎯 Key Features
Product Management
Advanced filtering by category/price

Search functionality

Product details with images

Admin product CRUD operations

User Experience
Persistent shopping cart

Smooth checkout flow

Order history tracking

Responsive navigation

Performance
Fast loading (<3s)

Optimized images

Efficient state management

Lighthouse score 90+

###🔐 Security Features
Client-side validation

XSS protection

Secure authentication flow

HTTPS ready

**🤝 Contributing**
Fork the project

Create feature branch (git checkout -b feature/AmazingFeature)

Commit changes (git commit -m 'Add feature')

Push to branch (git push origin feature/AmazingFeature)

Open Pull Request

**📝 License**
MIT License - see LICENSE file for details.

**👨‍💻 Development Team**

Syntrix Software Engineering

DCIT208 - Software Engineering Project

2024/2025 Academic Year

University of Ghana Legon.

**💡 Future Enhancements**
Backend API integration

Payment gateway (Stripe/Momo)

Email notifications

Product reviews

Wishlist functionality

PWA capabilities

Multi-language support

⭐ Star this repo if you find it helpful!

###📞 Support
For questions or issues:

Open a GitHub issue

Email: Pbohene007@st.ug.edu.gh

