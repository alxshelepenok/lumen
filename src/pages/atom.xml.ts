import type { APIContext } from "astro";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { getCollection, render } from "astro:content";
import type { CollectionEntry } from "astro:content";

import { getSiteMetadata } from "@/utils/get-site-metadata";
import { getSlug } from "@/utils/get-slug";

type Post = CollectionEntry<"posts">;

const escapeXml = (value: string): string =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");

export const GET = async (context: APIContext) => {
  const { title, description } = getSiteMetadata();
  const site = context.site?.href ?? "/";

  const posts = (
    await getCollection("posts", ({ data }: Post) => !data.draft)
  ).sort((a: Post, b: Post) => b.data.date.valueOf() - a.data.date.valueOf());

  const container = await AstroContainer.create();

  const entries = await Promise.all(
    posts.map(async (post: Post) => {
      const { Content } = await render(post);
      const content = await container.renderToString(Content);
      const link = context.site
        ? new URL(getSlug(post.id, "posts"), context.site).href
        : getSlug(post.id, "posts");

      return [
        "  <entry>",
        `    <title type="html">${escapeXml(post.data.title)}</title>`,
        `    <link href="${link}" rel="alternate" type="text/html"/>`,
        `    <id>${link}</id>`,
        `    <updated>${post.data.date.toISOString()}</updated>`,
        `    <summary type="html">${escapeXml(post.data.description ?? "")}</summary>`,
        `    <content type="html">${escapeXml(content)}</content>`,
        "  </entry>",
      ].join("\n");
    })
  );

  const updated = posts[0]?.data.date.toISOString() ?? new Date(0).toISOString();

  const atom = [
    '<?xml version="1.0" encoding="utf-8"?>',
    '<feed xmlns="http://www.w3.org/2005/Atom">',
    `  <title type="html">${escapeXml(title)}</title>`,
    `  <subtitle type="html">${escapeXml(description)}</subtitle>`,
    `  <id>${site}</id>`,
    `  <link href="${site}" rel="alternate" type="text/html"/>`,
    `  <link href="${new URL("atom.xml", site).href}" rel="self" type="application/atom+xml"/>`,
    `  <updated>${updated}</updated>`,
    ...entries,
    "</feed>",
    "",
  ].join("\n");

  return new Response(atom, {
    headers: { "Content-Type": "application/atom+xml; charset=utf-8" },
  });
};
