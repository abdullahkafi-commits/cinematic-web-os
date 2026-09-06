import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const schema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(200),
  message: z.string().min(5).max(4000),
});

export const sendContactMessage = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => schema.parse(data))
  .handler(async ({ data }) => {
    // Message received server-side. Wire this to email/database when ready.
    console.log("[contact] new message", { name: data.name, email: data.email });
    return {
      ok: true as const,
      receivedAt: new Date().toISOString(),
      reference: `MSG-${Math.random().toString(36).slice(2, 8).toUpperCase()}`,
    };
  });
