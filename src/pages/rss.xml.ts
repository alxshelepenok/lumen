import rss from "@astrojs/rss";
import { getCollection, render } from "astro:content";
import { experimental_AstroContainer as AstroContainer } from "astro/container";
import type { APIContext } from "astro";

import { getSlug } from "@/utils/get-slug";
import { getSiteMetadata } from "@/utils/get-site-metadata";

export const GET = async (context: APIContext) => {
  const { title, description } = getSiteMetadata();

  const posts = (await getCollection("posts", ({ data }) => !data.draft)).sort(
    (a, b) => b.data.date.valueOf() - a.data.date.valueOf()
  );

  const container = await AstroContainer.create();

  const items = await Promise.all(
    posts.map(async (post) => {
      const { Content } = await render(post);
      const content = await container.renderToString(Content);
      const link = context.site
        ? new URL(getSlug(post.id, "posts"), context.site).href
        : getSlug(post.id, "posts");

      return {
        content,
        description: post.data.description,
        link,
        pubDate: post.data.date,
        title: post.data.title,
      };
    })
  );

  return rss({
    description,
    items,
    site: context.site ?? "/",
    title,
  });
}
