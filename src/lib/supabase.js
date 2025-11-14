import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://dldwmpamxnnzcxspkfun.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRsZHdtcGFteG5uemN4c3BrZnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgwNjY5NDEsImV4cCI6MjA3MzY0Mjk0MX0.rkDQFeI2JbEPkwIc3ZOJlS5XSSmer9wtaz777x0x7gw";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
