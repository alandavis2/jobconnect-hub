import type { Job } from "@/lib/jobs-store";
import { MapPin, Clock, DollarSign } from "lucide-react";

function timeAgo(ts: number) {
  const m = Math.floor((Date.now() - ts) / 60000);
  if (m < 60) return `${m}m ago`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h}h ago`;
  return `${Math.floor(h / 24)}d ago`;
}

export function JobCard({ job, onDelete }: { job: Job; onDelete?: () => void }) {
  return (
    <article
      className="group relative p-6 rounded-2xl border border-border/60 transition-all hover:-translate-y-1"
      style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider">{job.company}</p>
          <h3 className="text-xl font-bold mt-1 group-hover:text-primary transition-colors">{job.title}</h3>
        </div>
        <span className="text-xs px-3 py-1 rounded-full bg-accent text-accent-foreground font-medium whitespace-nowrap">{job.type}</span>
      </div>
      <p className="mt-3 text-sm text-muted-foreground line-clamp-2">{job.description}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {job.tags.map((t) => (
          <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground">{t}</span>
        ))}
      </div>
      <div className="mt-5 pt-4 border-t border-border/60 flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-muted-foreground">
        <span className="flex items-center gap-1.5"><MapPin className="w-3.5 h-3.5" />{job.location}</span>
        <span className="flex items-center gap-1.5"><DollarSign className="w-3.5 h-3.5" />{job.salary}</span>
        <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" />{timeAgo(job.postedAt)}</span>
        {onDelete && (
          <button onClick={onDelete} className="ml-auto text-destructive hover:underline">Delete</button>
        )}
      </div>
    </article>
  );
}
