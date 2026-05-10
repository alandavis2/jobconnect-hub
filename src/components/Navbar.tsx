import { Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { auth } from "@/lib/jobs-store";
import { Briefcase } from "lucide-react";

export function Navbar() {
  const [user, setUser] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sync = () => setUser(auth.user());
    sync();
    window.addEventListener("auth:changed", sync);
    return () => window.removeEventListener("auth:changed", sync);
  }, []);

  return (
    <header className="sticky top-0 z-50 backdrop-blur-xl bg-background/70 border-b border-border/60">
      <nav className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-display font-bold text-lg">
          <span className="w-9 h-9 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
            <Briefcase className="w-5 h-5" />
          </span>
          Hireloop
        </Link>
        <div className="flex items-center gap-1 text-sm">
          <Link to="/" className="px-3 py-2 rounded-lg hover:bg-muted transition-colors" activeOptions={{ exact: true }} activeProps={{ className: "text-primary font-semibold" }}>Jobs</Link>
          <Link to="/post" className="px-3 py-2 rounded-lg hover:bg-muted transition-colors" activeProps={{ className: "text-primary font-semibold" }}>Post a Job</Link>
          {user && (
            <Link to="/dashboard" className="px-3 py-2 rounded-lg hover:bg-muted transition-colors" activeProps={{ className: "text-primary font-semibold" }}>Dashboard</Link>
          )}
          {user ? (
            <button
              onClick={() => { auth.logout(); navigate({ to: "/" }); }}
              className="ml-2 px-4 py-2 rounded-lg border border-border hover:bg-muted transition-colors"
            >
              Logout
            </button>
          ) : (
            <Link to="/login" className="ml-2 px-4 py-2 rounded-lg text-primary-foreground font-medium shadow-md hover:opacity-90 transition" style={{ background: "var(--gradient-hero)" }}>
              Sign in
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
}
