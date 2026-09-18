import type { CollectionEntry } from "astro:content";

interface Group {
  fieldValue: string;
  totalCount: number;
}

type KeyOf = (entry: CollectionEntry<"posts">) => string[] | undefined;

const getGroups = (
  posts: CollectionEntry<"posts">[],
  keyOf: KeyOf,
  compare: (a: Group, b: Group) => number
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
  })).sort(compare);
};

const alphabetical = (a: Group, b: Group): number =>
  a.fieldValue.localeCompare(b.fieldValue);

const newestFirst = (a: Group, b: Group): number =>
  Number.parseInt(b.fieldValue) - Number.parseInt(a.fieldValue);

const getCategories = (posts: CollectionEntry<"posts">[]): Group[] =>
  getGroups(
    posts,
    (entry) => (entry.data.category ? [entry.data.category] : undefined),
    alphabetical
  );

const getTags = (posts: CollectionEntry<"posts">[]): Group[] =>
  getGroups(posts, (entry) => entry.data.tags, alphabetical);

const getYears = (posts: CollectionEntry<"posts">[]): Group[] =>
  getGroups(
    posts,
    (entry) => [entry.data.date.getFullYear().toString()],
    newestFirst
  );

export { getGroups, getTags, getCategories, getYears };
export type { Group };
