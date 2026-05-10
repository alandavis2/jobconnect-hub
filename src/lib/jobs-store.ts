export type Job = {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  tags: string[];
  postedAt: number;
};

const KEY = "portal_jobs_v1";
const AUTH_KEY = "portal_auth_v1";

const seed: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Engineer",
    company: "Nebula Labs",
    location: "Remote · Worldwide",
    type: "Full-time",
    salary: "$120k – $160k",
    description: "Build delightful interfaces with React, TypeScript and modern tooling. Work with a distributed team shipping weekly.",
    tags: ["React", "TypeScript", "Tailwind"],
    postedAt: Date.now() - 1000 * 60 * 60 * 6,
  },
  {
    id: "2",
    title: "Product Designer",
    company: "Aurora Studio",
    location: "Berlin, DE · Hybrid",
    type: "Full-time",
    salary: "€70k – €95k",
    description: "Shape end-to-end product experiences from research through pixel-perfect handoff. Design systems mindset required.",
    tags: ["Figma", "Design Systems", "UX"],
    postedAt: Date.now() - 1000 * 60 * 60 * 26,
  },
  {
    id: "3",
    title: "Backend Engineer (Go)",
    company: "Cobalt",
    location: "San Francisco, CA",
    type: "Full-time",
    salary: "$140k – $180k",
    description: "Design highly scalable services powering millions of requests per minute. Strong distributed systems background.",
    tags: ["Go", "Postgres", "Kubernetes"],
    postedAt: Date.now() - 1000 * 60 * 60 * 50,
  },
];

function read(): Job[] {
  if (typeof window === "undefined") return seed;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      localStorage.setItem(KEY, JSON.stringify(seed));
      return seed;
    }
    return JSON.parse(raw);
  } catch {
    return seed;
  }
}

function write(jobs: Job[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(jobs));
  window.dispatchEvent(new Event("jobs:updated"));
}

export const jobsStore = {
  list: () => read().sort((a, b) => b.postedAt - a.postedAt),
  add: (job: Omit<Job, "id" | "postedAt">) => {
    const jobs = read();
    const newJob: Job = { ...job, id: crypto.randomUUID(), postedAt: Date.now() };
    write([newJob, ...jobs]);
    return newJob;
  },
  remove: (id: string) => {
    write(read().filter((j) => j.id !== id));
  },
};

export const auth = {
  isLoggedIn: () => typeof window !== "undefined" && !!localStorage.getItem(AUTH_KEY),
  login: (email: string) => {
    if (typeof window !== "undefined") {
      localStorage.setItem(AUTH_KEY, email);
      window.dispatchEvent(new Event("auth:changed"));
    }
  },
  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(AUTH_KEY);
      window.dispatchEvent(new Event("auth:changed"));
    }
  },
  user: () => (typeof window !== "undefined" ? localStorage.getItem(AUTH_KEY) : null),
};
