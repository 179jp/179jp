import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";
import { issueSchema } from "./components/newsPapperBlog/schema";

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
    width: z.coerce.number().default(0),
  }),
});

// News Papper Blog（1 号 = 1 ファイル）
const newsPapperBlog = defineCollection({
  loader: glob({ base: "./src/content/news-papper-blog/", pattern: "**/*.{yaml,yml}" }),
  schema: issueSchema,
});

export const collections = {
  sandBox,
  exhibitBlog,
  newsPapperBlog,
};
