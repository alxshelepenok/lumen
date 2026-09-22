import type { APIRoute } from "astro";

import { getSiteMetadata } from "@/utils/get-site-metadata";

export const GET: APIRoute = () => {
  const { url } = getSiteMetadata();

  const body = ["User-agent: *", "Allow: /", "", `Sitemap: ${url}/sitemap-index.xml`, ""].join(
    "\n"
  );

  return new Response(body, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
};
