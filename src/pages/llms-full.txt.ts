import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { getSiteMetadata } from "@/utils/get-site-metadata";
import { getSlug } from "@/utils/get-slug";
import { routes } from "@/utils/routes";

export const GET: APIRoute = async () => {
  const { url, title, description } = getSiteMetadata();

  const posts = (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );
  const pages = await getCollection("pages", ({ data }) => !data.draft);

  const lines: string[] = [
    `# ${title}`,
    "",
    `> ${description}`,
    `Site: ${url}`,
    "",
    "---",
  ];

  const emit = (heading: string[], body: string | undefined) => {
    lines.push("", ...heading);
    if (body) {
      lines.push("", body.trim());
    }
    lines.push("", "---");
  };

  for (const page of pages) {
    const slug = getSlug(page.id, "pages")
      .replace(/^\/pages\/?/, "")
      .replace(/\/$/, "");

    emit(
      [
        `# ${page.data.title}`,
        `URL: ${url}${routes.page(slug).href()}`,
        `Description: ${page.data.description ?? description}`,
      ],
      page.body
    );
  }

  for (const post of posts) {
    const slug = getSlug(post.id, "posts")
      .replace(/^\/posts\/?/, "")
      .replace(/\/$/, "");

    emit(
      [
        `# ${post.data.title}`,
        `URL: ${url}${routes.post(slug).href()}`,
        `Description: ${post.data.description ?? description}`,
        `Date: ${post.data.date.toISOString()}`,
        ...(post.data.tags?.length ? [`Tags: ${post.data.tags.join(", ")}`] : []),
      ],
      post.body
    );
  }

  return new Response(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
