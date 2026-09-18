import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

// Sandbox
const sandBox = defineCollection({
  loader: glob({ base: "./src/content/sand-box/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    heroImage: z.string().optional(),
    backgroundColor: z.string().optional(),
    version: z.string().optional(),
  }),
});

// Exhibit Blog
const exhibitBlog = defineCollection({
  loader: glob({ base: "./src/content/exhibit-blog/", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),

  }),
});

export const collections = {
  sandBox,
  exhibitBlog,
};
