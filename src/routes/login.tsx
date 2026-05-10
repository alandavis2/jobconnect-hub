import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { auth } from "@/lib/jobs-store";
import { Briefcase } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — Hireloop" }, { name: "description", content: "Sign in to manage your job listings." }] }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !pw) return;
    auth.login(email);
    navigate({ to: "/dashboard" });
  };

  const input = "w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-ring/30 outline-none transition";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
        <div className="max-w-md mx-auto px-6 py-20">
          <div className="p-8 rounded-3xl border border-border" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-elegant)" }}>
            <div className="w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
              <Briefcase className="w-7 h-7" />
            </div>
            <h1 className="text-3xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground mt-1">Sign in to your Hireloop account.</p>

            <form onSubmit={submit} className="mt-8 space-y-4">
              <label className="block">
                <span className="text-sm font-medium mb-1.5 inline-block">Email</span>
                <input type="email" required className={input} value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@company.com" />
              </label>
              <label className="block">
                <span className="text-sm font-medium mb-1.5 inline-block">Password</span>
                <input type="password" required className={input} value={pw} onChange={(e) => setPw(e.target.value)} placeholder="••••••••" />
              </label>
              <button type="submit" className="w-full px-6 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
                Sign in
              </button>
            </form>
            <p className="text-xs text-muted-foreground text-center mt-6">Demo only — any email & password works.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
