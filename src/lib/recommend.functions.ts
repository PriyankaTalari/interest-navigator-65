import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ReelSchema = z.object({
  id: z.string(),
  handle: z.string(),
  title: z.string(),
  caption: z.string(),
  tags: z.array(z.string()),
  bucket: z.string(),
  seconds: z.number(),
});

const InputSchema = z.object({
  current: ReelSchema,
  history: z.array(z.object({ reel: ReelSchema, watchedPercent: z.number() })).max(20),
});

export const recommendTechReel = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => InputSchema.parse(input))
  .handler(async ({ data }) => {
    const { generateRecommendation } = await import("./recommend.server");
    return generateRecommendation(data);
  });