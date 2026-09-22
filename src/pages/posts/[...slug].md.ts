import type { APIRoute } from "astro";
import { getCollection } from "astro:content";

import { getSlug } from "@/utils/get-slug";

export const getStaticPaths = async () => {
  const posts = await getCollection("posts", ({ data }) => !data.draft);

  return posts.map((post) => ({
    params: {
      slug: getSlug(post.id, "posts")
        .replace(/^\/posts\/?/, "")
        .replace(/\/$/, ""),
    },
    props: { body: post.body ?? "" },
  }));
};

export const GET: APIRoute<{ body: string }> = async ({ props }) => {
  return new Response(props.body, {
    headers: { "Content-Type": "text/markdown; charset=utf-8" },
  });
};
