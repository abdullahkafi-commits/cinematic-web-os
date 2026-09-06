import { useState } from "react";
import { projects } from "@/data/portfolio";
import { cn } from "@/lib/utils";

export function ProjectsPanel() {
  const [activeId, setActiveId] = useState(projects[0]!.id);
  const active = projects.find((p) => p.id === activeId) ?? projects[0]!;


  return (
    <div className="grid gap-5 md:grid-cols-[minmax(0,200px)_1fr]">
      <nav className="flex gap-2 overflow-x-auto md:flex-col md:overflow-visible">
        {projects.map((p) => (
          <button
            key={p.id}
            onClick={() => setActiveId(p.id)}
            className={cn(
              "shrink-0 rounded-md border px-3 py-2 text-left transition-colors md:w-full",
              p.id === activeId
                ? "border-primary/50 bg-primary/10 text-primary"
                : "border-border bg-secondary/30 text-foreground/80 hover:bg-secondary/60",
            )}
          >
            <span className="block text-sm font-medium">{p.title}</span>
            <span className="block font-mono text-[10px] tracking-wider text-muted-foreground uppercase">
              {p.year}
            </span>
          </button>
        ))}
      </nav>

      <article
        key={active.id}
        className="animate-window-in scanlines rounded-lg border border-border bg-card/60 p-5"
      >
        <h3 className="text-lg font-semibold tracking-tight">{active.title}</h3>
        <p className="mt-1 text-sm text-primary/90">{active.tagline}</p>
        <p className="mt-4 text-sm leading-relaxed text-foreground/85">{active.description}</p>
        <dl className="mt-5 grid gap-3 sm:grid-cols-2">
          <div>
            <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Role
            </dt>
            <dd className="text-sm">{active.role}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Year
            </dt>
            <dd className="text-sm">{active.year}</dd>
          </div>
        </dl>
        <ul className="mt-5 flex flex-wrap gap-2">
          {active.stack.map((s) => (
            <li
              key={s}
              className="rounded border border-accent/30 px-2 py-1 font-mono text-[11px] text-accent"
            >
              {s}
            </li>
          ))}
        </ul>
      </article>
    </div>
  );
}
