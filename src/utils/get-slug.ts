import { routes } from "@/utils/routes";

type ContentPrefix = "posts" | "pages";

const getSlug = (id: string, prefix: ContentPrefix): string =>
  id.startsWith("/") ? id : `/${prefix}/${id}`;

const getTagSlugs = (tags: string[]): string[] =>
  tags.map((tag) => routes.tag(tag).href());

const getCategorySlug = (category: string): string =>
  routes.category(category).href();

export { getCategorySlug, getSlug, getTagSlugs };
export type { ContentPrefix };
