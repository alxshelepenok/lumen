import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import { defineConfig } from "astro/config";
import autoprefixer from "autoprefixer";

import config from "@/content/config.json";

import { rehypeHtml } from "./internal/rehype-html.mjs";

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
  markdown: {
    shikiConfig: {
      theme: "solarized-light",
    },
    processor: unified({
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
