import { describe, expect, it } from "bun:test";

import { mergeGraphs } from "@/utils/seo/graph";
import {
  blogPostingNode,
  breadcrumbNode,
  itemListNode,
  personNode,
  siteNavigationNodes,
  webContacts,
  webPageNode,
  websiteNode,
} from "@/utils/seo/nodes";
import { postGraph } from "@/utils/seo/pages";
import { homeFeedGraph } from "@/utils/seo/pages";
import { routes } from "@/utils/routes";

const site = "https://lumen.alxshelepenok.com";

describe("root nodes", () => {
  it("anchors the person and the website at the site root", () => {
    const person = personNode() as Record<string, string>;
    const website = websiteNode() as Record<string, string>;

    expect(person["@id"]).toBe(`${site}/#person`);
    expect(person["@id"]).toBe(person["url"]);
    expect(person["givenName"]).toBe("John");
    expect(person["familyName"]).toBe("Doe");
    expect(Array.isArray(person["sameAs"])).toBe(true);

    expect(website["@id"]).toBe(`${site}/#web`);
    expect(website["url"]).toBe(site);
  });
});

describe("breadcrumbNode", () => {
  it("numbers crumbs from one and anchors each item", () => {
    const node = breadcrumbNode(routes.post("hello"), [
      { name: "Blog by John Doe", url: `${site}/` },
      { name: "Hello", url: `${site}/posts/hello/` },
    ]) as Record<string, any>;

    const crumbs = node.itemListElement as Record<string, any>[];

    expect(node["@id"]).toBe(`${site}/posts/hello/#breadcrumb`);
    expect(crumbs.map((c) => c.position)).toEqual([1, 2]);
    expect(crumbs[0]["@id"]).toBe(
      `${site}/posts/hello/#breadcrumb-item-blog-by-john-doe`
    );
    expect(crumbs[1].item.url).toBe(`${site}/posts/hello/`);
  });
});

describe("itemListNode", () => {
  it("reports numberOfItems and sequential positions", () => {
    const node = itemListNode(
      routes.tag("Typography"),
      "articles",
      "Typography articles",
      [
        { name: "One", url: `${site}/posts/one/` },
        { name: "Two", url: `${site}/posts/two/` },
        { name: "Three", url: `${site}/posts/three/` },
      ]
    ) as Record<string, any>;

    const items = node.itemListElement as Record<string, any>[];

    expect(node["@id"]).toBe(`${site}/tag/typography/#articles`);
    expect(node.numberOfItems).toBe(3);
    expect(items.map((i) => i.position)).toEqual([1, 2, 3]);
    expect(items[0].item.name).toBe("One");
  });
});

describe("page nodes", () => {
  it("links the blog posting to the blog and its page", () => {
    const route = routes.post("hello");
    const page = webPageNode(route, {
      name: "Hello",
      description: "A post",
      dateModified: "2026-02-01T00:00:00.000Z",
      datePublished: "2026-01-01T00:00:00.000Z",
      mainEntity: { "@id": `${site}/posts/hello/#article` },
    }) as Record<string, any>;
    const posting = blogPostingNode(route, {
      headline: "Hello",
      description: "A post",
      dateModified: "2026-02-01T00:00:00.000Z",
      datePublished: "2026-01-01T00:00:00.000Z",
      keywords: ["Typography", "History"],
    }) as Record<string, any>;

    expect(page["@id"]).toBe(`${site}/posts/hello/#page`);
    expect(page.isPartOf["@id"]).toBe(`${site}/#web`);
    expect(page.mainEntity["@id"]).toBe(`${site}/posts/hello/#article`);
    expect(page.datePublished).toBe("2026-01-01T00:00:00.000Z");
    expect(page.dateModified).toBe("2026-02-01T00:00:00.000Z");

    expect(posting["@id"]).toBe(`${site}/posts/hello/#article`);
    expect(posting.isPartOf["@id"]).toBe(`${site}/#blog`);
    expect(posting.mainEntityOfPage["@id"]).toBe(`${site}/posts/hello/#page`);
    expect(posting.datePublished).toBe("2026-01-01T00:00:00.000Z");
    expect(posting.dateModified).toBe("2026-02-01T00:00:00.000Z");
    expect(posting.keywords).toBe("Typography, History");
    expect(posting.author["@id"]).toBe(`${site}/#person`);
  });
});

describe("postGraph toc removal", () => {
  const base = {
    date: new Date("2026-01-01T00:00:00.000Z"),
    description: "A post",
    title: "Hello",
  };

  it("emits no toc nodes and no hasPart edge", () => {
    const graph = postGraph("hello", base) as Record<string, any>;
    const nodes = graph["@graph"] as Record<string, any>[];

    expect(
      nodes.some((node) => String(node["@id"]).includes("#toc"))
    ).toBe(false);

    const page = nodes.find(
      (node) => node["@id"] === `${site}/posts/hello/#page`
    ) as Record<string, any>;

    expect(page.hasPart).toBeUndefined();
  });
});

describe("site navigation nodes", () => {
  it("mirrors the sidebar menu as a root-anchored entity", () => {
    const [navigation, list] = siteNavigationNodes() as Record<string, any>[];

    expect(navigation["@type"]).toEqual([
      "SiteNavigationElement",
      "WebPageElement",
    ]);
    expect(navigation["@id"]).toBe(`${site}/#sidebar-menu`);
    expect(navigation.isPartOf["@id"]).toBe(`${site}/#web`);
    expect(navigation.mainEntity["@id"]).toBe(`${site}/#sidebar-menu-list`);

    expect(list["@id"]).toBe(`${site}/#sidebar-menu-list`);
    expect(list.name).toBe("Pages");
    expect(list.numberOfItems).toBe(list.itemListElement.length);
    expect(list.itemListElement.map((i: any) => i.position)).toEqual(
      list.itemListElement.map((_: any, index: number) => index + 1)
    );
    expect(list.itemListElement[0].item.name).toBe("Articles");
    expect(list.itemListElement[0].item["@id"]).toBe(`${site}/#page`);
  });
});

describe("blog node", () => {
  it("carries exactly the reference fields on post graphs", () => {
    const graph = postGraph("hello", {
      date: new Date("2026-01-01T00:00:00.000Z"),
      description: "A post",
      title: "Hello",
    }) as Record<string, any>;

    const blog = (graph["@graph"] as Record<string, any>[]).find(
      (node) => node["@type"] === "Blog"
    ) as Record<string, any>;

    expect(blog).toBeDefined();
    expect(Object.keys(blog).sort()).toEqual([
      "@id",
      "@type",
      "isPartOf",
      "name",
      "publisher",
      "url",
    ]);
    expect(blog["@id"]).toBe(`${site}/#blog`);
    expect(blog["url"]).toBe(blog["@id"]);
    expect(blog.isPartOf["@id"]).toBe(`${site}/#web`);
    expect(blog.publisher["@id"]).toBe(`${site}/#person`);
  });

  it("stays off the feed graphs; the home hasPart targets the blog and links regions", () => {
    const feedItem = {
      date: new Date("2026-01-01T00:00:00.000Z"),
      slug: "/posts/one/",
      title: "One",
    };
    const [home, paginated] = [
      homeFeedGraph(0, [feedItem]),
      homeFeedGraph(1, [feedItem]),
    ] as Record<string, any>[];

    const homeNodes = home["@graph"] as Record<string, any>[];
    const paginatedNodes = paginated["@graph"] as Record<string, any>[];

    const blog = homeNodes.find((node) => node["@id"] === `${site}/#blog`) as Record<string, any>;

    expect(blog).toBeDefined();
    expect(blog["@type"]).toBe("WebPageElement");
    expect(blog.isPartOf["@id"]).toBe(`${site}/#page`);
    expect(blog.mainEntity["@id"]).toBe(`${site}/#articles`);

    expect(homeNodes.some((node) => node["@type"] === "Blog")).toBe(false);

    const links = homeNodes.find((node) => node["@id"] === `${site}/#links`) as Record<string, any>;

    expect(links).toBeDefined();
    expect(links.isPartOf["@id"]).toBe(`${site}/#web`);
    expect(links.mainEntity["@id"]).toBe(`${site}/#links-list`);

    const homePage = homeNodes.find(
      (node) => node["@id"] === `${site}/#page`
    ) as Record<string, any>;

    expect(homePage.hasPart).toEqual([
      { "@id": `${site}/#blog` },
      { "@id": `${site}/#links` },
    ]);

    const paginatedPage = paginatedNodes.find(
      (node) => node["@id"] === `${site}/page/1/#page`
    ) as Record<string, any>;

    expect(paginatedPage.hasPart).toBeUndefined();
    expect(paginatedPage.publisher["@id"]).toBe(`${site}/#person`);
    expect(
      paginatedNodes.some((node) => node["@id"] === `${site}/#links`)
    ).toBe(true);
  });
});

describe("web contacts", () => {
  it("keeps only contacts whose href is an http url", () => {
    expect(
      webContacts([
        { name: "email", contact: "john@example.com" },
        { name: "line", contact: "abc123" },
        { name: "github", contact: "alxshelepenok" },
      ])
    ).toEqual([{ name: "github", href: "https://github.com/alxshelepenok" }]);
  });
});

describe("mergeGraphs", () => {
  it("dedupes nodes by id and strips per-node context", () => {
    const graph = mergeGraphs(
      [personNode(), { "@context": "https://schema.org", "@type": "WebSite", "@id": `${site}/#web` } as any],
      [websiteNode(), { "@type": "Thing", "@id": `${site}/#thing` }]
    );

    expect(graph["@context"]).toBe("https://schema.org");
    expect(graph["@graph"]).toHaveLength(3);
    expect(
      graph["@graph"].every(
        (node) => node["@context"] === undefined
      )
    ).toBe(true);
  });

  it("merges later fields into the first occurrence of a node", () => {
    const graph = mergeGraphs(
      [{ "@type": "WebPage", "@id": `${site}/#page`, name: "Home" }],
      [{ "@id": `${site}/#page`, description: "merged in" }]
    );

    const page = graph["@graph"][0] as Record<string, string>;

    expect(page.name).toBe("Home");
    expect(page.description).toBe("merged in");
  });
});
