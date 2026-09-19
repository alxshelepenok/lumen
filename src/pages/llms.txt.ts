import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { getFeedItems } from "@/utils/get-feed-items";
import { getSiteMetadata } from "@/utils/get-site-metadata";
import { getSlug } from "@/utils/get-slug";
import { getGroups, categoryOf, tagsOf, yearOf, newestFirst } from "@/utils/get-taxonomy";
import { routes } from "@/utils/routes";

export const GET: APIRoute = async () => {
  const { url, title, description, feedLimit } = getSiteMetadata();

  const posts = (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const pages = await getCollection("pages", ({ data }) => !data.draft);
  const recent = getFeedItems(posts.slice(0, feedLimit));

  const lines: string[] = [
    `# ${title}`,
    "",
    `> ${description}`,
    "",
    "## Pages",
    "",
    `- [Articles](${url}/): The latest articles.`,
    `- [Categories](${url}${routes.categories().href()}): Articles grouped by category.`,
    `- [Tags](${url}${routes.tags().href()}): Articles grouped by tag.`,
    `- [Years](${url}${routes.years().href()}): Articles grouped by year.`,
  ];

  for (const page of pages) {
    const slug = getSlug(page.id, "pages")
      .replace(/^\/pages\/?/, "")
      .replace(/\/$/, "");
    lines.push(
      `- [${page.data.title}](${url}${routes.page(slug).href()}): ${page.data.description ?? description}`
    );
  }

  lines.push("", "## Recent articles", "");

  for (const item of recent) {
    lines.push(`- [${item.title}](${url}${item.slug}): ${item.description ?? ""}`);
  }

  lines.push(
    "",
    `## Categories (${getGroups(posts, categoryOf).length})`,
    ""
  );

  for (const group of getGroups(posts, categoryOf)) {
    lines.push(
      `- [${group.fieldValue}](${url}${routes.category(group.fieldValue).href()}): ${group.totalCount} articles.`
    );
  }

  lines.push("", `## Tags (${getGroups(posts, tagsOf).length})`, "");

  for (const group of getGroups(posts, tagsOf)) {
    lines.push(
      `- [${group.fieldValue}](${url}${routes.tag(group.fieldValue).href()}): ${group.totalCount} articles.`
    );
  }

  lines.push("", `## Years (${getGroups(posts, yearOf).length})`, "");

  for (const group of getGroups(posts, yearOf, newestFirst)) {
    lines.push(
      `- [${group.fieldValue}](${url}${routes.year(group.fieldValue).href()}): ${group.totalCount} articles.`
    );
  }

  lines.push(
    "",
    `Full article corpus: ${url}/llms-full.txt`,
    ""
  );

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
