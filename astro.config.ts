import { unified } from "@astrojs/markdown-remark";
import { defineConfig } from "astro/config";

import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import autoprefixer from "autoprefixer";

import { rehypeHtml } from "./internal/rehype-html.mjs";
import { remarkResolveContentImages } from "./internal/resolve-content-images.mjs";

import config from "./content/config.json";

export default defineConfig({
  output: "static",
  outDir: "target",
  site: config.url,
  integrations: [
    sentry({ telemetry: false }),
    sitemap({
      changefreq: "daily",
      priority: 0.7,
      filter: (page) => !page.includes("/404"),
    }),
  ],
  image: {
    layout: "constrained",
    breakpoints: [320, 480, 640, 750, 828, 960],
    responsiveStyles: false,
  },
  markdown: {
    shikiConfig: {
      theme: "solarized-light",
    },
    processor: unified({
      remarkPlugins: [remarkResolveContentImages],
      rehypePlugins: [rehypeHtml],
    }),
  },
  vite: {
    css: {
      postcss: {
        plugins: [autoprefixer()],
      },
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
