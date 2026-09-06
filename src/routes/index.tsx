import { createFileRoute } from "@tanstack/react-router";
import { Desktop } from "@/components/os/Desktop";

const title = "Al Kafi — Creative Engineer Portfolio OS";
const description =
  "A cinematic, browser-based operating system portfolio: draggable app windows for projects, profile and contact, powered by realtime WebGL.";

export const Route = createFileRoute("/")({
  ssr: false,
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: Desktop,
});
