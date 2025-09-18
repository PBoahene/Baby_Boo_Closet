# Supabase Integration for Baby_Boo_Closet

## Setup

1. Create a Supabase project: https://supabase.com
2. Go to **Storage** and create a bucket called `logos`.
3. Copy your **Project URL** and **anon public key** from Supabase settings.

## Environment Variables

Create a `.env.local` file in your project root:

```
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-anon-key
```

## Usage

- Upload logos via the `LogoUploader` component.
- Logos will be stored in Supabase and displayed in the `ProductCustomizer` preview.

Enjoy 🎉
