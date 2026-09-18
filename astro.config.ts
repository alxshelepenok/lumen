import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";

import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypeExternalLinks from "rehype-external-links";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkSmartypants from "remark-smartypants";

import { rehypeResponsiveIframe } from "./internal/astro/rehype/responsive-iframe.mjs";
import { remarkResolveContentImages } from "./internal/astro/remark/resolve-content-images.mjs";

import config from "./content/config.json";

const anchorIcon = {
  type: "element",
  tagName: "svg",
  properties: {
    ariaHidden: "true",
    focusable: "false",
    height: 16,
    version: "1.1",
    viewBox: "0 0 16 16",
    width: 16,
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: {
        fillRule: "evenodd",
        d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
      },
      children: [],
    },
  ],
} as const;

export default defineConfig({
  output: "static",
  publicDir: "static",
  site: config.url,
  integrations: [
    sitemap({
      changefreq: "daily",
      priority: 0.7,
      filter: (page) => !page.includes("/404"),
    }),
  ],
  image: {
    layout: "constrained",
    breakpoints: [320, 480, 640, 750, 828, 960],
    responsiveStyles: true,
  },
  markdown: {
    remarkPlugins: [remarkResolveContentImages, remarkSmartypants],
    rehypePlugins: [
      rehypeRaw,
      rehypeSlug,
      [
        rehypeAutolinkHeadings,
        {
          behavior: "prepend",
          headingProperties: { style: "position: relative;" },
          properties: (element: { properties: { id?: unknown } }) => ({
            className: ["anchor", "before"],
            ariaLabel: `${String(element.properties.id ?? "").replace(/-/g, " ")} permalink`,
          }),
          content: anchorIcon,
        },
      ],
      [rehypeExternalLinks, { target: "_blank", rel: "noopener" }],
      rehypeResponsiveIframe,
    ],
    shikiConfig: {
      theme: "solarized-light",
    },
  },
  vite: {
    css: {
      modules: {
        localsConvention: "camelCase",
      },
      preprocessorOptions: {
        scss: {
          loadPaths: ["./"],
        },
      },
    },
  },
});
