# Portfolio OS

A cinematic, browser-based "operating system" portfolio: a realtime WebGL scene behind draggable
app windows for **About Me**, **Project Showcases** and **Contact**.

## Stack

- React 19 + TanStack Start (Vite 8)
- Three.js via @react-three/fiber + @react-three/drei
- Tailwind CSS v4 (design tokens in `src/styles.css`)

## Getting started

```bash
bun install     # or npm install
bun run dev     # dev server on http://localhost:8080
bun run build   # production build
bun run preview # preview the production build
```

## Where things live

| Path | Purpose |
| --- | --- |
| `src/routes/index.tsx` | Home route (client-rendered, mounts the desktop) |
| `src/components/os/Desktop.tsx` | Dock, window manager, progressive enhancement gate |
| `src/components/os/Scene3D.tsx` | Lazy-loaded WebGL scene |
| `src/components/os/OSWindow.tsx` | Draggable / resizable window chrome |
| `src/components/os/panels/` | About, Projects, Contact content |
| `src/data/portfolio.ts` | All editable copy: bio, projects, links, email |
| `src/lib/contact.functions.ts` | Server function backing the AJAX contact form |
| `src/styles.css` | Design tokens, glass/glow utilities, animations |

## Performance notes

- The 3D scene is code-split and only mounted after checking WebGL2 support,
  `prefers-reduced-motion` and CPU cores; unsupported devices get the full static UI.
- `dpr` is capped at 1.6, no post-processing passes, single shadow-free directional light.
- All motion is delta-time based, so animation speed is frame-rate independent.

## Deployment

Publish from Lovable (Publish button) for instant hosting on `*.lovable.app` with a custom domain
option. The build output is a standard Vite/Nitro bundle, so Cloudflare Pages, Netlify or Vercel
also work with `bun run build`.
