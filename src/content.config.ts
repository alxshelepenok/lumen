import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

const posts = defineCollection({
  loader: glob({ base: "./content/posts", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date(),
      template: z.literal("post"),
      draft: z.boolean().default(false),
      slug: z.string().optional(),
      category: z.string().optional(),
      tags: z.array(z.string()).optional(),
      description: z.string().optional(),
      socialImage: image().optional(),
    }),
});

const pages = defineCollection({
  loader: glob({ base: "./content/pages", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      date: z.coerce.date().optional(),
      template: z.literal("page"),
      draft: z.boolean().default(false),
      slug: z.string().optional(),
      description: z.string().optional(),
      socialImage: image().optional(),
    }),
});

export const collections = { pages, posts };
