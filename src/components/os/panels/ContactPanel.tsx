import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { sendContactMessage } from "@/lib/contact.functions";
import { owner } from "@/data/portfolio";

export function ContactPanel() {
  const submit = useServerFn(sendContactMessage);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [reference, setReference] = useState("");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const form = new FormData(formEl);
    setStatus("sending");
    setError("");
    try {
      const res = await submit({
        data: {
          name: String(form.get("name") ?? ""),
          email: String(form.get("email") ?? ""),
          message: String(form.get("message") ?? ""),
        },
      });
      setReference(res.reference);
      setStatus("sent");
      formEl.reset();
    } catch {
      setError("That didn't go through. Please check the fields and try again.");
      setStatus("error");
    }
  }

  const field =
    "w-full rounded-md border border-input bg-secondary/40 px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary/60 focus:ring-2 focus:ring-ring/40 focus:outline-none";

  return (
    <div className="grid gap-6 md:grid-cols-[1fr_minmax(0,240px)]">
      <form onSubmit={onSubmit} className="space-y-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Name
            </span>
            <input name="name" required maxLength={120} className={field} placeholder="Your name" />
          </label>
          <label className="block">
            <span className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              className={field}
              placeholder="you@studio.com"
            />
          </label>
        </div>
        <label className="block">
          <span className="mb-1 block font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
            Message
          </span>
          <textarea
            name="message"
            required
            minLength={5}
            rows={5}
            className={field}
            placeholder="Project, timeline, budget range…"
          />
        </label>

        <button
          type="submit"
          disabled={status === "sending"}
          className="glow-primary rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-60"
        >
          {status === "sending" ? "Transmitting…" : "Send message"}
        </button>

        <div aria-live="polite" className="min-h-5 text-sm">
          {status === "sent" && (
            <p className="text-primary">
              Message received — reference {reference}. I'll reply within two business days.
            </p>
          )}
          {status === "error" && <p className="text-destructive">{error}</p>}
        </div>
      </form>

      <aside className="space-y-3 rounded-lg border border-border bg-secondary/30 p-4">
        <h4 className="font-mono text-[10px] tracking-[0.2em] text-muted-foreground uppercase">
          Direct
        </h4>
        <a href={`mailto:${owner.email}`} className="block text-sm text-primary hover:underline">
          {owner.email}
        </a>
        <p className="text-xs text-muted-foreground">{owner.location} · replies within 48h</p>
        <div className="flex flex-wrap gap-2 pt-1">
          {owner.socials.map((s) => (
            <a
              key={s.label}
              href={s.url}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded border border-border px-2 py-1 font-mono text-[11px] text-foreground/80 hover:bg-secondary"
            >
              {s.label}
            </a>
          ))}
        </div>
      </aside>
    </div>
  );
}
