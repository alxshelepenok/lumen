import { describe, expect, it } from "bun:test";

import { Route, SLICE, routes } from "@/utils/routes";

const site = "https://lumen.alxshelepenok.com";

describe("Route", () => {
  it("keeps the root href as is", () => {
    expect(routes.home().href()).toBe("/");
  });

  it("emits hrefs with a trailing slash", () => {
    expect(routes.post("a-brief-history").href()).toBe(
      "/posts/a-brief-history/"
    );
  });

  it("emits feed urls without a trailing slash", () => {
    expect(routes.post("a-brief-history").url("https://lumen.alxshelepenok.com")).toBe(
      "https://lumen.alxshelepenok.com/posts/a-brief-history"
    );
  });

  it("emits canonical urls with a trailing slash", () => {
    expect(new Route("/pages/about").canonical(site)).toBe(
      `${site}/pages/about/`
    );
  });

  it("builds graph ids with a slice fragment on the canonical form", () => {
    expect(routes.home().id(site, SLICE.page)).toBe(`${site}/#page`);
    expect(routes.post("a-brief-history").id(site, SLICE.article)).toBe(
      `${site}/posts/a-brief-history/#article`
    );
    expect(
      routes.paginated(routes.category("Design Culture"), 1).id(
        site,
        SLICE.page
      )
    ).toBe(`${site}/category/design-culture/page/1/#page`);
  });

  it("builds in-site anchor links with a slice fragment", () => {
    expect(routes.home().anchor(SLICE.page)).toBe("/#page");
    expect(routes.post("a-brief-history").anchor(SLICE.article)).toBe(
      "/posts/a-brief-history/#article"
    );
  });
});

describe("routes factories", () => {
  it("kebabs category and tag names", () => {
    expect(routes.category("Design Inspiration").href()).toBe(
      "/category/design-inspiration/"
    );
    expect(routes.tag("History of typography").href()).toBe(
      "/tag/history-of-typography/"
    );
  });

  it("builds pagination paths zero-based", () => {
    const base = routes.category("Design Culture");

    expect(routes.paginated(base, 0).href()).toBe("/category/design-culture/");
    expect(routes.paginated(base, 1).href()).toBe(
      "/category/design-culture/page/1/"
    );
  });
});
