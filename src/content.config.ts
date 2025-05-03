import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Blog
const blog = defineCollection({
  loader: glob({ base: "./src/content/blog/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    image: z.string().optional(),
  }),
});

// Sandbox
const sandBox = defineCollection({
  loader: glob({ base: "./src/content/sand-box/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
  }),
});

export const collections = {
  blog,
  sandBox,
};
