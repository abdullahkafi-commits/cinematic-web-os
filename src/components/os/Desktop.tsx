import { Suspense, lazy, useCallback, useEffect, useState } from "react";
import { User, FolderOpen, Mail } from "lucide-react";
import { OSWindow } from "./OSWindow";
import { AboutPanel } from "./panels/AboutPanel";
import { ProjectsPanel } from "./panels/ProjectsPanel";
import { ContactPanel } from "./panels/ContactPanel";
import { owner } from "@/data/portfolio";
import { cn } from "@/lib/utils";

const Scene3D = lazy(() => import("./Scene3D"));

type AppId = "about" | "projects" | "contact";

const APPS: {
  id: AppId;
  label: string;
  subtitle: string;
  icon: typeof User;
  initial: { x: number; y: number };
  width: number;
}[] = [
  {
    id: "projects",
    label: "Project Showcases",
    subtitle: "/work",
    icon: FolderOpen,
    initial: { x: 120, y: 130 },
    width: 720,
  },
  {
    id: "about",
    label: "About Me",
    subtitle: "/profile",
    icon: User,
    initial: { x: 220, y: 220 },
    width: 520,
  },
  {
    id: "contact",
    label: "Contact",
    subtitle: "/transmit",
    icon: Mail,
    initial: { x: 320, y: 300 },
    width: 640,
  },
];

export function Desktop() {
  const [open, setOpen] = useState<AppId[]>([]);
  const [isDesktop, setIsDesktop] = useState(false);
  const [heavyOk, setHeavyOk] = useState(false);
  const [booted, setBooted] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setIsDesktop(mq.matches);
    apply();
    mq.addEventListener("change", apply);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const cores = navigator.hardwareConcurrency ?? 4;
    setHeavyOk(!reduced && cores >= 4);
    const t = setTimeout(() => setBooted(true), 400);
    return () => {
      mq.removeEventListener("change", apply);
      clearTimeout(t);
    };
  }, []);

  const focusApp = useCallback((id: AppId) => {
    setOpen((prev) => [...prev.filter((a) => a !== id), id]);
  }, []);

  const closeApp = useCallback((id: AppId) => {
    setOpen((prev) => prev.filter((a) => a !== id));
  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden">
      <div className="pointer-events-none fixed inset-0 -z-10">
        {heavyOk ? (
          <Suspense fallback={null}>
            <Scene3D />
          </Suspense>
        ) : null}
      </div>
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(70%_50%_at_50%_40%,transparent,oklch(0.1_0.02_265/70%))]" />

      {/* Top status bar */}
      <header className="glass-panel sticky top-0 z-50 flex items-center gap-3 border-b border-border px-4 py-2">
        <span className="animate-pulse-ring size-2 rounded-full bg-primary" />
        <span className="font-mono text-[11px] tracking-[0.22em] uppercase">
          {owner.name} <span className="text-muted-foreground">/ OS</span>
        </span>
        <span className="ml-auto hidden font-mono text-[11px] text-muted-foreground sm:block">
          {owner.role}
        </span>
      </header>

      {/* Hero */}
      <section
        className={cn(
          "relative mx-auto max-w-3xl px-6 pt-20 pb-10 text-center transition-opacity duration-700",
          booted ? "opacity-100" : "opacity-0",
        )}
      >
        <p className="font-mono text-[11px] tracking-[0.35em] text-primary/80 uppercase">
          Portfolio System v1.0
        </p>
        <h1 className="text-glow mt-4 text-4xl font-semibold tracking-tight sm:text-6xl">
          Work you can open, drag and explore.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-sm text-muted-foreground sm:text-base">
          Launch an app below to move through the projects, the person behind them, and how to start
          something together.
        </p>
      </section>

      {/* Windows */}
      {isDesktop ? (
        <div className="pointer-events-none fixed inset-0 z-30">
          <div className="pointer-events-auto">
            {open.map((id, i) => {
              const app = APPS.find((a) => a.id === id)!;
              return (
                <OSWindow
                  key={id}
                  title={app.label}
                  subtitle={app.subtitle}
                  initial={app.initial}
                  width={app.width}
                  zIndex={40 + i}
                  draggable
                  onFocus={() => focusApp(id)}
                  onClose={() => closeApp(id)}
                >
                  <PanelFor id={id} />
                </OSWindow>
              );
            })}
          </div>
        </div>
      ) : (
        <div className="relative z-30 mx-auto flex max-w-2xl flex-col gap-4 px-4 pb-40">
          {open.map((id, i) => {
            const app = APPS.find((a) => a.id === id)!;
            return (
              <OSWindow
                key={id}
                title={app.label}
                subtitle={app.subtitle}
                initial={{ x: 0, y: 0 }}
                width={0}
                zIndex={30 + i}
                draggable={false}
                onFocus={() => {}}
                onClose={() => closeApp(id)}
              >
                <PanelFor id={id} />
              </OSWindow>
            );
          })}
        </div>
      )}

      {/* Dock */}
      <nav
        aria-label="Applications"
        className="glass-panel fixed bottom-4 left-1/2 z-50 flex -translate-x-1/2 gap-2 rounded-2xl border border-border p-2"
      >
        {APPS.map((app) => {
          const Icon = app.icon;
          const isOpen = open.includes(app.id);
          return (
            <button
              key={app.id}
              onClick={() => (isOpen ? closeApp(app.id) : focusApp(app.id))}
              aria-pressed={isOpen}
              className={cn(
                "group relative flex flex-col items-center gap-1 rounded-xl px-4 py-2 transition-all duration-300",
                isOpen
                  ? "glow-primary bg-primary/15 text-primary"
                  : "text-foreground/80 hover:-translate-y-1 hover:bg-secondary/60",
              )}
            >
              <Icon className="size-5" />
              <span className="font-mono text-[10px] tracking-wider whitespace-nowrap">
                {app.label.split(" ")[0]}
              </span>
              <span
                className={cn(
                  "absolute -bottom-0.5 size-1 rounded-full bg-primary transition-opacity",
                  isOpen ? "opacity-100" : "opacity-0",
                )}
              />
            </button>
          );
        })}
      </nav>
    </main>
  );
}

function PanelFor({ id }: { id: AppId }) {
  if (id === "about") return <AboutPanel />;
  if (id === "projects") return <ProjectsPanel />;
  return <ContactPanel />;
}
