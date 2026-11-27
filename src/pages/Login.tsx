import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CheckCircle2, Eye, EyeOff, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import schoolUniform from "@/assets/school-uniform.jpg";

type Mode = "login" | "register";

const inputClass =
  "h-12 w-full border border-gray-300 bg-white px-4 text-[15px] text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-gray-900 focus:ring-1 focus:ring-gray-900";

const benefits = [
  "Track your orders and order history",
  "Faster checkout with saved details",
  "Early access to school-season offers",
];

const PasswordInput = ({
  id,
  value,
  onChange,
  placeholder,
  autoComplete,
}: {
  id: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  autoComplete: string;
}) => {
  const [show, setShow] = useState(false);
  return (
    <div className="relative">
      <input
        id={id}
        type={show ? "text" : "password"}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className={`${inputClass} pr-12`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required
        minLength={6}
      />
      <button
        type="button"
        onClick={() => setShow((s) => !s)}
        className="absolute inset-y-0 right-0 flex w-12 items-center justify-center text-gray-500 hover:text-gray-900"
        aria-label={show ? "Hide password" : "Show password"}
      >
        {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
      </button>
    </div>
  );
};

const Label = ({ htmlFor, children }: { htmlFor: string; children: React.ReactNode }) => (
  <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-gray-900">
    {children}
  </label>
);

const Login = () => {
  const [mode, setMode] = useState<Mode>("login");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const [loginForm, setLoginForm] = useState({ email: "", password: "" });
  const [registerForm, setRegisterForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({
        email: loginForm.email,
        password: loginForm.password,
      });
      if (error) throw error;
      toast({ title: "Welcome back!", description: "You're signed in to Baby-Boo Closet." });
      navigate("/");
    } catch (err: unknown) {
      toast({ title: "Sign in failed", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!loginForm.email) {
      toast({ title: "Enter your email first", description: "Type your email above, then tap “Forgot password?” again." });
      return;
    }
    const { error } = await supabase.auth.resetPasswordForEmail(loginForm.email, {
      redirectTo: `${window.location.origin}/account`,
    });
    if (error) {
      toast({ title: "Couldn't send reset email", description: error.message, variant: "destructive" });
    } else {
      toast({ title: "Check your email", description: `We sent a password reset link to ${loginForm.email}.` });
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({ title: "Passwords don't match", description: "Please re-enter your password.", variant: "destructive" });
      return;
    }
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signUp({
        email: registerForm.email,
        password: registerForm.password,
        options: { data: { name: registerForm.name, phone: registerForm.phone } },
      });
      if (error) throw error;
      toast({ title: "Account created", description: "Check your email to confirm your account." });
      navigate("/");
    } catch (err: unknown) {
      toast({ title: "Registration failed", description: err instanceof Error ? err.message : "Please try again.", variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  const isLogin = mode === "login";

  return (
    <main className="bg-white">
      <div className="mx-auto grid min-h-[calc(100vh-170px)] max-w-[1600px] lg:grid-cols-2">
        {/* Brand panel */}
        <aside className="relative hidden overflow-hidden lg:block">
          <img src={schoolUniform} alt="" className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/20" />
          <div className="relative flex h-full flex-col justify-end p-12 xl:p-16">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-primary">Baby-Boo Closet</p>
            <h2 className="mt-3 max-w-md text-4xl font-bold leading-tight text-white">
              Kidswear that looks smart and lasts the school year.
            </h2>
            <ul className="mt-8 space-y-3">
              {benefits.map((b) => (
                <li key={b} className="flex items-center gap-3 text-white/90">
                  <CheckCircle2 className="h-5 w-5 shrink-0 text-primary" /> {b}
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Form */}
        <section className="flex items-center justify-center px-4 py-12 sm:px-8 md:py-16">
          <div className="w-full max-w-md">
            <img src="/brand/logo-mark.svg" alt="" className="h-14 w-14" />
            <h1 className="mt-4 text-3xl font-bold text-gray-900">
              {isLogin ? "Welcome back" : "Create your account"}
            </h1>
            <p className="mt-2 text-gray-600">
              {isLogin
                ? "Sign in to track orders and check out faster."
                : "Join Baby-Boo Closet in less than a minute."}
            </p>

            {/* Mode switch */}
            <div className="mt-8 grid grid-cols-2 border-b border-gray-200" role="tablist" aria-label="Account">
              {(["login", "register"] as Mode[]).map((m) => (
                <button
                  key={m}
                  role="tab"
                  aria-selected={mode === m}
                  onClick={() => setMode(m)}
                  className={`-mb-px border-b-2 pb-3 text-[15px] font-medium transition-colors ${
                    mode === m ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-900"
                  }`}
                >
                  {m === "login" ? "Sign in" : "Register"}
                </button>
              ))}
            </div>

            {isLogin ? (
              <form onSubmit={handleLogin} className="mt-8 space-y-5">
                <div>
                  <Label htmlFor="login-email">Email</Label>
                  <input
                    id="login-email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@example.com"
                    className={inputClass}
                    value={loginForm.email}
                    onChange={(e) => setLoginForm((p) => ({ ...p, email: e.target.value }))}
                    required
                  />
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <Label htmlFor="login-password">Password</Label>
                    <button
                      type="button"
                      onClick={handleForgotPassword}
                      className="mb-1.5 text-sm text-gray-600 underline-offset-4 hover:text-gray-900 hover:underline"
                    >
                      Forgot password?
                    </button>
                  </div>
                  <PasswordInput
                    id="login-password"
                    autoComplete="current-password"
                    placeholder="Your password"
                    value={loginForm.password}
                    onChange={(v) => setLoginForm((p) => ({ ...p, password: v }))}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gray-900 text-[15px] font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isLoading ? "Signing in…" : "Sign in"}
                </button>
                <p className="text-center text-sm text-gray-600">
                  New to Baby-Boo Closet?{" "}
                  <button type="button" onClick={() => setMode("register")} className="font-medium text-gray-900 underline underline-offset-4">
                    Create an account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="mt-8 space-y-5">
                <div>
                  <Label htmlFor="register-name">Full name</Label>
                  <input
                    id="register-name"
                    autoComplete="name"
                    placeholder="e.g. Ama Mensah"
                    className={inputClass}
                    value={registerForm.name}
                    onChange={(e) => setRegisterForm((p) => ({ ...p, name: e.target.value }))}
                    required
                  />
                </div>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="register-email">Email</Label>
                    <input
                      id="register-email"
                      type="email"
                      autoComplete="email"
                      placeholder="you@example.com"
                      className={inputClass}
                      value={registerForm.email}
                      onChange={(e) => setRegisterForm((p) => ({ ...p, email: e.target.value }))}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="register-phone">Phone</Label>
                    <input
                      id="register-phone"
                      type="tel"
                      autoComplete="tel"
                      placeholder="+233 ..."
                      className={inputClass}
                      value={registerForm.phone}
                      onChange={(e) => setRegisterForm((p) => ({ ...p, phone: e.target.value }))}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="register-password">Password</Label>
                  <PasswordInput
                    id="register-password"
                    autoComplete="new-password"
                    placeholder="At least 6 characters"
                    value={registerForm.password}
                    onChange={(v) => setRegisterForm((p) => ({ ...p, password: v }))}
                  />
                </div>
                <div>
                  <Label htmlFor="confirm-password">Confirm password</Label>
                  <PasswordInput
                    id="confirm-password"
                    autoComplete="new-password"
                    placeholder="Type it again"
                    value={registerForm.confirmPassword}
                    onChange={(v) => setRegisterForm((p) => ({ ...p, confirmPassword: v }))}
                  />
                </div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-gray-900 text-[15px] font-medium text-white transition hover:bg-gray-800 disabled:opacity-60"
                >
                  {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                  {isLoading ? "Creating account…" : "Create account"}
                </button>
                <p className="text-center text-sm text-gray-600">
                  Already have an account?{" "}
                  <button type="button" onClick={() => setMode("login")} className="font-medium text-gray-900 underline underline-offset-4">
                    Sign in
                  </button>
                </p>
              </form>
            )}

            <p className="mt-8 border-t border-gray-100 pt-6 text-center text-xs leading-relaxed text-gray-500">
              By continuing, you agree to our{" "}
              <Link to="/terms" className="underline underline-offset-2 hover:text-gray-900">
                Terms and Privacy Policy
              </Link>
              .
            </p>
          </div>
        </section>
      </div>
    </main>
  );
};

export default Login;
