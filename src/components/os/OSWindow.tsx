import { useCallback, useRef, useState, type ReactNode } from "react";
import { X, Minus, Maximize2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  title: string;
  subtitle?: string;
  initial: { x: number; y: number };
  width: number;
  zIndex: number;
  onFocus: () => void;
  onClose: () => void;
  draggable: boolean;
  children: ReactNode;
};

export function OSWindow({
  title,
  subtitle,
  initial,
  width,
  zIndex,
  onFocus,
  onClose,
  draggable,
  children,
}: Props) {
  const [pos, setPos] = useState(initial);
  const [expanded, setExpanded] = useState(false);
  const drag = useRef<{ dx: number; dy: number } | null>(null);

  const onPointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (!draggable) return;
      onFocus();
      drag.current = { dx: e.clientX - pos.x, dy: e.clientY - pos.y };
      (e.target as Element).setPointerCapture(e.pointerId);
    },
    [draggable, onFocus, pos.x, pos.y],
  );

  const onPointerMove = useCallback((e: React.PointerEvent) => {
    if (!drag.current) return;
    const x = Math.max(8, Math.min(e.clientX - drag.current.dx, window.innerWidth - 120));
    const y = Math.max(8, Math.min(e.clientY - drag.current.dy, window.innerHeight - 90));
    setPos({ x, y });
  }, []);

  const endDrag = useCallback(() => {
    drag.current = null;
  }, []);

  const style = draggable
    ? { left: pos.x, top: pos.y, width: expanded ? Math.min(1100, window.innerWidth - 64) : width }
    : undefined;

  return (
    <section
      role="dialog"
      aria-label={title}
      onPointerDown={onFocus}
      style={{ ...style, zIndex }}
      className={cn(
        "glass-panel animate-window-in overflow-hidden rounded-xl border border-border",
        draggable
          ? "absolute max-h-[78vh]"
          : "relative w-full max-h-none",
      )}
    >
      <header
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        className={cn(
          "chrome-edge flex items-center gap-3 border-b border-border px-4 py-2.5 select-none",
          draggable && "cursor-grab active:cursor-grabbing",
        )}
      >
        <div className="flex items-center gap-1.5">
          <button
            aria-label={`Close ${title}`}
            onClick={onClose}
            className="group grid size-3 place-items-center rounded-full bg-destructive/80 transition-transform hover:scale-125"
          >
            <X className="size-2 opacity-0 group-hover:opacity-100" strokeWidth={3} />
          </button>
          <span className="size-3 rounded-full bg-accent/70" />
          <button
            aria-label="Toggle size"
            onClick={() => setExpanded((v) => !v)}
            className="group grid size-3 place-items-center rounded-full bg-primary/70 transition-transform hover:scale-125"
          >
            {expanded ? (
              <Minus className="size-2 opacity-0 group-hover:opacity-100" strokeWidth={3} />
            ) : (
              <Maximize2 className="size-2 opacity-0 group-hover:opacity-100" strokeWidth={3} />
            )}
          </button>
        </div>
        <div className="min-w-0">
          <h2 className="truncate font-mono text-xs tracking-[0.18em] text-foreground/90 uppercase">
            {title}
          </h2>
        </div>
        {subtitle ? (
          <span className="ml-auto hidden truncate font-mono text-[10px] text-muted-foreground sm:block">
            {subtitle}
          </span>
        ) : null}
      </header>
      <div className="max-h-[62vh] overflow-y-auto p-5 sm:p-6">{children}</div>
    </section>
  );
}
