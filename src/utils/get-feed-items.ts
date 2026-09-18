import type { CollectionEntry } from "astro:content";

import { getCategorySlug, getSlug } from "@/utils/get-slug";

interface FeedItem {
  category?: string;
  categorySlug?: string;
  date: Date;
  description?: string;
  slug: string;
  title: string;
}

const getFeedItems = (posts: CollectionEntry<"posts">[]): FeedItem[] =>
  posts.map((entry) => ({
    category: entry.data.category,
    categorySlug: entry.data.category
      ? getCategorySlug(entry.data.category)
      : undefined,
    date: entry.data.date,
    description: entry.data.description,
    slug: getSlug(entry.id, "posts"),
    title: entry.data.title,
  }));

export { getFeedItems };
export type { FeedItem };
