import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { jobsStore } from "@/lib/jobs-store";

export const Route = createFileRoute("/post")({
  head: () => ({ meta: [{ title: "Post a job — Hireloop" }, { name: "description", content: "Reach thousands of candidates by posting your role on Hireloop." }] }),
  component: PostJob,
});

function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "", company: "", location: "", type: "Full-time",
    salary: "", description: "", tags: "",
  });

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    jobsStore.add({
      ...form,
      tags: form.tags.split(",").map((t) => t.trim()).filter(Boolean),
    });
    navigate({ to: "/" });
  };

  const input = "w-full px-4 py-3 rounded-xl bg-card border border-border focus:border-primary focus:ring-2 focus:ring-ring/30 outline-none transition";

  return (
    <div className="min-h-screen">
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold">Post a new job</h1>
        <p className="text-muted-foreground mt-2">Fill in the details — your listing goes live instantly.</p>

        <form onSubmit={submit} className="mt-10 p-8 rounded-3xl border border-border space-y-5" style={{ background: "var(--gradient-card)", boxShadow: "var(--shadow-card)" }}>
          <div className="grid md:grid-cols-2 gap-5">
            <Field label="Job title"><input required className={input} value={form.title} onChange={set("title")} placeholder="Senior Designer" /></Field>
            <Field label="Company"><input required className={input} value={form.company} onChange={set("company")} placeholder="Acme Inc." /></Field>
            <Field label="Location"><input required className={input} value={form.location} onChange={set("location")} placeholder="Remote · EU" /></Field>
            <Field label="Employment type">
              <select className={input} value={form.type} onChange={set("type")}>
                <option>Full-time</option><option>Part-time</option><option>Contract</option><option>Internship</option>
              </select>
            </Field>
            <Field label="Salary range"><input className={input} value={form.salary} onChange={set("salary")} placeholder="$80k – $110k" /></Field>
            <Field label="Tags (comma separated)"><input className={input} value={form.tags} onChange={set("tags")} placeholder="React, Figma" /></Field>
          </div>
          <Field label="Description">
            <textarea required rows={6} className={input} value={form.description} onChange={set("description")} placeholder="Tell candidates what makes this role exciting…" />
          </Field>
          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={() => navigate({ to: "/" })} className="px-5 py-3 rounded-xl border border-border hover:bg-muted transition">Cancel</button>
            <button type="submit" className="px-6 py-3 rounded-xl text-primary-foreground font-semibold hover:opacity-90 transition" style={{ background: "var(--gradient-hero)", boxShadow: "var(--shadow-elegant)" }}>
              Publish job
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-sm font-medium mb-1.5 inline-block">{label}</span>
      {children}
    </label>
  );
}
