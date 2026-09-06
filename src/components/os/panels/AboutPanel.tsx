import { owner } from "@/data/portfolio";

export function AboutPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-start gap-4">
        <div className="glow-primary grid size-14 shrink-0 place-items-center rounded-lg border border-primary/40 bg-primary/10 font-mono text-lg text-primary">
          AK
        </div>
        <div>
          <h3 className="text-xl font-semibold tracking-tight">{owner.name}</h3>
          <p className="text-sm text-muted-foreground">{owner.role}</p>
          <p className="mt-1 font-mono text-[11px] tracking-wider text-primary/80 uppercase">
            {owner.location}
          </p>
        </div>
      </div>

      <p className="text-sm leading-relaxed text-foreground/85">{owner.bio}</p>

      <div>
        <h4 className="mb-3 font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
          Focus areas
        </h4>
        <ul className="grid gap-2 sm:grid-cols-2">
          {owner.focus.map((f) => (
            <li
              key={f}
              className="rounded-md border border-border bg-secondary/40 px-3 py-2 text-sm text-foreground/85"
            >
              {f}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-wrap gap-2">
        {owner.socials.map((s) => (
          <a
            key={s.label}
            href={s.url}
            target="_blank"
            rel="noreferrer noopener"
            className="rounded-md border border-primary/30 px-3 py-1.5 font-mono text-xs text-primary transition-colors hover:bg-primary/10"
          >
            {s.label}
          </a>
        ))}
      </div>
    </div>
  );
}
