import type { CollectionEntry } from "astro:content";

interface Group {
  fieldValue: string;
  totalCount: number;
}

const countGroups = (
  posts: CollectionEntry<"posts">[],
  keyOf: (entry: CollectionEntry<"posts">) => string[] | undefined
): Group[] => {
  const counts = new Map<string, number>();

  for (const entry of posts) {
    for (const key of keyOf(entry) ?? []) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([fieldValue, totalCount]) => ({
    fieldValue,
    totalCount,
  }));
};

const byFieldAlphabetical = (a: Group, b: Group): number =>
  a.fieldValue.localeCompare(b.fieldValue);

const byYearDescending = (a: Group, b: Group): number =>
  Number.parseInt(b.fieldValue) - Number.parseInt(a.fieldValue);

const getCategories = (posts: CollectionEntry<"posts">[]): Group[] =>
  countGroups(posts, (entry) =>
    entry.data.category ? [entry.data.category] : undefined
  ).sort(byFieldAlphabetical);

const getTags = (posts: CollectionEntry<"posts">[]): Group[] =>
  countGroups(posts, (entry) => entry.data.tags).sort(byFieldAlphabetical);

const getYears = (posts: CollectionEntry<"posts">[]): Group[] =>
  countGroups(posts, (entry) => [
    entry.data.date.getFullYear().toString(),
  ]).sort(byYearDescending);

export { getCategories, getTags, getYears };
export type { Group };
