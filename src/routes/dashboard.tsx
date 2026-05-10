import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { auth, jobsStore, type Job } from "@/lib/jobs-store";
import { Briefcase, TrendingUp, Users, Plus } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Hireloop" }, { name: "description", content: "Manage your job listings and track activity." }] }),
  component: Dashboard,
});

function Dashboard() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    if (!auth.isLoggedIn()) {
      navigate({ to: "/login" });
      return;
    }
    setUser(auth.user());
    const sync = () => setJobs(jobsStore.list());
    sync();
    window.addEventListener("jobs:updated", sync);
    return () => window.removeEventListener("jobs:updated", sync);
  }, [navigate]);

  const stats = [
    { label: "Active jobs", value: jobs.length, icon: Briefcase },
    { label: "Total views", value: jobs.length * 124, icon: TrendingUp },
    { label: "Applicants", value: jobs.length * 8, icon: Users },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-sm text-muted-foreground">Signed in as {user}</p>
            <h1 className="text-4xl font-bold mt-1">Dashboard</h1>
          </div>
          <Link to="/post" className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
            <Plus className="w-4 h-4" /> New job
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-3 mb-12">
          {stats.map((s) => (
            <div key={s.label} className="p-6 rounded-2xl border border-border" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">{s.label}</span>
                <span className="w-10 h-10 rounded-xl flex items-center justify-center text-primary-foreground" style={{ background: "var(--gradient-hero)" }}>
                  <s.icon className="w-5 h-5" />
                </span>
              </div>
              <div className="text-4xl font-bold mt-4 font-display">{s.value.toLocaleString()}</div>
            </div>
          ))}
        </div>

        <h2 className="text-2xl font-bold mb-5">Your listings</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {jobs.map((j) => (
            <JobCard key={j.id} job={j} onDelete={() => jobsStore.remove(j.id)} />
          ))}
        </div>
        {jobs.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No jobs yet. Post your first one!</div>
        )}
      </div>
    </div>
  );
}
