import { toKebabCase } from "@/utils/to-kebab-case";

type ContentPrefix = "posts" | "pages";

const getSlug = (id: string, prefix: ContentPrefix): string =>
  id.startsWith("/") ? id : `/${prefix}/${id}`;

const getTagSlugs = (tags: string[]): string[] =>
  tags.map((tag) => `/tag/${toKebabCase(tag)}/`);

const getCategorySlug = (category: string): string =>
  `/category/${toKebabCase(category)}`;

export { getCategorySlug, getSlug, getTagSlugs };
export type { ContentPrefix };
