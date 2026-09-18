import { describe, expect, it } from "bun:test";

import { getCategorySlug, getSlug, getTagSlugs } from "@/utils/get-slug";

describe("getSlug", () => {
  it("passes through a slug derived id", () => {
    expect(getSlug("/posts/custom-slug", "posts")).toBe("/posts/custom-slug");
  });

  it("falls back to the directory based path for posts", () => {
    expect(getSlug("2016-02-02---a-brief-history-of-typography", "posts")).toBe(
      "/posts/2016-02-02---a-brief-history-of-typography"
    );
  });

  it("falls back to the directory based path for pages", () => {
    expect(getSlug("about", "pages")).toBe("/pages/about");
  });
});

describe("getTagSlugs", () => {
  it("derives kebab case tag slugs", () => {
    expect(getTagSlugs(["Linotype", "History of typography"])).toEqual([
      "/tag/linotype/",
      "/tag/history-of-typography/",
    ]);
  });
});

describe("getCategorySlug", () => {
  it("derives the kebab case category slug", () => {
    expect(getCategorySlug("Design Inspiration")).toBe(
      "/category/design-inspiration"
    );
  });
});
