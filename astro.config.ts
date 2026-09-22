import { existsSync } from "node:fs";
import { cp } from "node:fs/promises";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { unified } from "@astrojs/markdown-remark";
import sitemap from "@astrojs/sitemap";
import sentry from "@sentry/astro";
import { defineConfig } from "astro/config";
import autoprefixer from "autoprefixer";

import config from "@/content/config.json";

import { rehypeHtml } from "./internal/rehype-html.mjs";

const emitOgCards = () => ({
  name: "emit-og-cards",
  hooks: {
    "astro:build:done": async ({ dir, logger }: { dir: URL; logger: { info: (message: string) => void } }) => {
      const source = "public/generated/og";

      if (!existsSync(source)) {
        return;
      }

      await cp(source, join(fileURLToPath(dir), "generated/og"), {
        recursive: true,
      });
      logger.info("og cards emitted");
    },
  },
});

export default defineConfig({
  output: "static",
  outDir: "target",
  site: config.url,
  integrations: [
    sentry({ telemetry: false }),
    sitemap({
      changefreq: "daily",
      priority: 0.7,
      filter: (page) => !page.includes("/404") && !page.endsWith(".txt") && !page.endsWith(".md"),
    }),
    emitOgCards(),
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
