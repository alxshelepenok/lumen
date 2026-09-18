import { defineConfig } from "astro/config";

export default defineConfig({
  output: "static",
  publicDir: "static",
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
