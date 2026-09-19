import { describe, expect, it } from "bun:test";

import { mergeGraphs } from "@/utils/seo/graph";
import {
  blogPostingNode,
  breadcrumbNode,
  itemListNode,
  personNode,
  webPageNode,
  websiteNode,
} from "@/utils/seo/nodes";
import { routes } from "@/utils/routes";

const site = "https://lumen.alxshelepenok.com";

describe("root nodes", () => {
  it("anchors the person and the website at the site root", () => {
    const person = personNode() as Record<string, string>;
    const website = websiteNode() as Record<string, string>;

    expect(person["@id"]).toBe(`${site}/#person`);
    expect(person["@id"]).toBe(person["url"]);
    expect(Array.isArray(person["sameAs"])).toBe(true);

    expect(website["@id"]).toBe(`${site}/#web`);
    expect(website["@id"]).toBe(website["url"]);
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
  it("links the blog posting reciprocally with its page", () => {
    const route = routes.post("hello");
    const page = webPageNode(route, {
      name: "Hello",
      description: "A post",
      mainEntity: { "@id": `${site}/posts/hello/#article` },
    }) as Record<string, any>;
    const posting = blogPostingNode(route, {
      headline: "Hello",
      description: "A post",
      datePublished: "2026-01-01T00:00:00.000Z",
      keywords: ["Typography", "History"],
    }) as Record<string, any>;

    expect(page["@id"]).toBe(`${site}/posts/hello/#page`);
    expect(page.isPartOf["@id"]).toBe(`${site}/#web`);
    expect(page.mainEntity["@id"]).toBe(`${site}/posts/hello/#article`);

    expect(posting["@id"]).toBe(`${site}/posts/hello/#article`);
    expect(posting.mainEntityOfPage["@id"]).toBe(`${site}/posts/hello/#page`);
    expect(posting.keywords).toBe("Typography, History");
    expect(posting.author["@id"]).toBe(`${site}/#person`);
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
