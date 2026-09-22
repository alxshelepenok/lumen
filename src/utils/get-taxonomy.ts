import type { CollectionEntry } from "astro:content";

interface Group {
  fieldValue: string;
  totalCount: number;
}

type Post = CollectionEntry<"posts">;

const alphabetical = (a: Group, b: Group): number =>
  a.fieldValue.localeCompare(b.fieldValue);

const newestFirst = (a: Group, b: Group): number =>
  Number.parseInt(b.fieldValue) - Number.parseInt(a.fieldValue);

const getGroups = (
  posts: Post[],
  keyOf: (entry: Post) => string[],
  compare = alphabetical
): Group[] => {
  const counts = new Map<string, number>();

  for (const entry of posts) {
    for (const key of keyOf(entry)) {
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }
  }

  return Array.from(counts, ([fieldValue, totalCount]) => ({
    fieldValue,
    totalCount,
  })).sort(compare);
};

const categoryOf = (entry: Post): string[] =>
  entry.data.category ? [entry.data.category] : [];

const tagsOf = (entry: Post): string[] => entry.data.tags ?? [];

const yearOf = (entry: Post): string[] => [
  entry.data.datePublished.getFullYear().toString(),
];

export { alphabetical, categoryOf, getGroups, newestFirst, tagsOf, yearOf };
export type { Group };
