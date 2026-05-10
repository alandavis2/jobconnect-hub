import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Navbar } from "@/components/Navbar";
import { JobCard } from "@/components/JobCard";
import { jobsStore, type Job } from "@/lib/jobs-store";
import { Search, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hireloop — Find your next role" },
      { name: "description", content: "Browse curated tech, design and product jobs from companies hiring now." },
    ],
  }),
  component: Index,
});

function Index() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [q, setQ] = useState("");

  useEffect(() => {
    const sync = () => setJobs(jobsStore.list());
    sync();
    window.addEventListener("jobs:updated", sync);
    return () => window.removeEventListener("jobs:updated", sync);
  }, []);

  const filtered = jobs.filter((j) =>
    [j.title, j.company, j.location, ...j.tags].join(" ").toLowerCase().includes(q.toLowerCase())
  );

  return (
    <div className="min-h-screen">
      <Navbar />

      <section className="relative overflow-hidden border-b border-border/60">
        <div className="absolute inset-0 -z-10" style={{ background: "var(--gradient-mesh)" }} />
        <div className="max-w-7xl mx-auto px-6 py-20 md:py-28">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card border border-border text-xs font-medium mb-6">
            <Sparkles className="w-3.5 h-3.5 text-primary" /> 1,200+ open roles this week
          </div>
          <h1 className="text-5xl md:text-7xl font-bold leading-[1.05] max-w-3xl">
            Find a job you'll<br />
            <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--gradient-hero)" }}>
              actually love.
            </span>
          </h1>
          <p className="mt-6 text-lg text-muted-foreground max-w-xl">
            Hireloop connects ambitious people with forward-thinking teams. Search, apply, and track everything in one place.
          </p>

          <div className="mt-10 max-w-2xl flex items-center gap-2 p-2 rounded-2xl bg-card border border-border" style={{ boxShadow: "var(--shadow-elegant)" }}>
            <Search className="w-5 h-5 ml-3 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search jobs, companies, skills…"
              className="flex-1 bg-transparent outline-none px-2 py-3 text-sm"
            />
            <Link to="/post" className="px-5 py-3 rounded-xl text-primary-foreground font-medium text-sm hover:opacity-90 transition" style={{ background: "var(--gradient-hero)" }}>
              Post a job
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold">Latest openings</h2>
            <p className="text-muted-foreground mt-1">{filtered.length} roles match your search</p>
          </div>
        </div>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((j) => (<JobCard key={j.id} job={j} />))}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-muted-foreground">No jobs match your search.</div>
        )}
      </section>

      <footer className="border-t border-border/60 py-8 text-center text-sm text-muted-foreground">
        © {new Date().getFullYear()} Hireloop. Crafted with care.
      </footer>
    </div>
  );
}
