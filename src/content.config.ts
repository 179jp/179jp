import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Blog
const sandBox = defineCollection({
  loader: glob({ base: "./src/content/sand-box/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
  }),
});

export const collections = {
  sandBox,
};
