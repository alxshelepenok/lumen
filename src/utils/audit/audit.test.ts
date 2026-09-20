import { describe, expect, it } from "bun:test";

import { auditCrossChecks, auditLinkGrammar, auditSchemaGraph } from "@/utils/audit/schema-audit";
import {
  auditAccessibility,
  domBudgetOf,
  type A11yElement,
} from "@/utils/audit/accessibility-audit";

const el = (overrides: Partial<A11yElement> & { tag: string }): A11yElement => ({
  children: [],
  ...overrides,
});

describe("schema audit integrity", () => {
  const graphOf = (nodes: object[]) => ({
    "@context": "https://schema.org",
    "@graph": nodes,
  });
  const base = { pagePathname: "/posts/x/", resolveAnchor: () => true };

  it("detects an id and url mismatch", () => {
    const issues = auditSchemaGraph({
      ...base,
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test/posts/x/#page",
            "url": "https://s.test/posts/x/#other",
          },
        ]),
      ],
    });

    expect(issues.some((issue) => issue.message.includes("does not equal url"))).toBe(true);
  });

  it("detects a dangling same-page fragment", () => {
    const issues = auditSchemaGraph({
      pagePathname: "/posts/x/",
      resolveAnchor: () => false,
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test/posts/x/#page",
            "url": "https://s.test/posts/x/#page",
          },
        ]),
      ],
    });

    expect(issues.some((issue) => issue.message.includes('no element with id="page"'))).toBe(true);
  });

  it("flags root ids missing the slash before the fragment", () => {
    const issues = auditSchemaGraph({
      ...base,
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test#page",
            "url": "https://s.test#page",
          },
        ]),
      ],
    });

    expect(issues.some((issue) => issue.message.includes("slash before the fragment"))).toBe(true);
  });

  it("detects a dangling same-page reference", () => {
    const issues = auditSchemaGraph({
      ...base,
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test/posts/x/#page",
            "url": "https://s.test/posts/x/#page",
            "mainEntity": { "@id": "https://s.test/posts/x/#ghost" },
          },
        ]),
      ],
    });

    expect(issues.some((issue) => issue.message.includes("no node in the graph"))).toBe(true);
  });

  it("passes a grounded graph silently", () => {
    const issues = auditSchemaGraph({
      ...base,
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test/posts/x/#page",
            "url": "https://s.test/posts/x/#page",
            "isPartOf": { "@id": "https://s.test/#web" },
          },
        ]),
      ],
    });

    expect(issues).toEqual([]);
  });
});

describe("schema audit cross-checks", () => {
  it("detects broken list positions", () => {
    const issues = auditCrossChecks({
      pagePathname: "/x/",
      graphs: [
        {
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "ItemList",
              "@id": "https://s.test/x/#list",
              "url": "https://s.test/x/#list",
              "itemListElement": [
                { "@type": "ListItem", "@id": "https://s.test/x/#a", "url": "https://s.test/x/#a", "position": 1 },
                { "@type": "ListItem", "@id": "https://s.test/x/#b", "url": "https://s.test/x/#b", "position": 3 },
              ],
            },
          ],
        },
      ],
    });

    expect(issues.some((issue) => issue.message.includes("breaks the 1-based sequence"))).toBe(true);
  });
});

describe("schema audit link grammar", () => {
  const input = {
    pagePathname: "/posts/x/",
    resolveAnchor: (fragment: string) => fragment === "page",
  };

  it("flags internal links without a fragment", () => {
    const issues = auditLinkGrammar({
      ...input,
      internalHrefs: ["/blog/", "/#page", "/llms.txt", "https://ext.test/a/", "//cdn.test/a/"],
    });

    expect(
      issues.some((issue) => issue.message.includes('internal link "/blog/" carries no fragment'))
    ).toBe(true);
    expect(issues.length).toBe(1);
  });

  it("flags same-page links that resolve to nothing", () => {
    const issues = auditLinkGrammar({
      ...input,
      internalHrefs: ["#ghost", "#page"],
    });

    expect(
      issues.some((issue) => issue.message.includes('resolves to no element with id="ghost"'))
    ).toBe(true);
    expect(issues.length).toBe(1);
  });
});

describe("schema audit locale and list names", () => {
  const graphOf = (nodes: object[]) => ({
    "@context": "https://schema.org",
    "@graph": nodes,
  });

  it("flags og:locale disagreeing with inLanguage", () => {
    const issues = auditCrossChecks({
      pagePathname: "/x/",
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test/x/#page",
            "url": "https://s.test/x/#page",
            "inLanguage": "en",
          },
        ]),
      ],
      metaPropertyContent: (property) =>
        property === "og:locale" ? "de_DE" : null,
    });

    expect(
      issues.some((issue) => issue.message.includes('og:locale "de_DE" does not agree with inLanguage "en"'))
    ).toBe(true);
  });

  it("accepts an og:locale language prefix", () => {
    const issues = auditCrossChecks({
      pagePathname: "/x/",
      graphs: [
        graphOf([
          {
            "@type": "WebPage",
            "@id": "https://s.test/x/#page",
            "url": "https://s.test/x/#page",
            "inLanguage": "en",
          },
        ]),
      ],
      metaPropertyContent: (property) =>
        property === "og:locale" ? "en_US" : null,
    });

    expect(issues).toEqual([]);
  });

  it("flags ItemList names without an accessible name", () => {
    const issues = auditCrossChecks({
      pagePathname: "/x/",
      graphs: [
        graphOf([
          {
            "@type": "ItemList",
            "@id": "https://s.test/x/#list",
            "url": "https://s.test/x/#list",
            "name": "Tags",
            "itemListElement": [],
          },
        ]),
      ],
      accessibleName: () => null,
    });

    expect(
      issues.some((issue) => issue.message.includes("has no accessible name"))
    ).toBe(true);
  });

  it("flags ItemList names diverging from the accessible name", () => {
    const issues = auditCrossChecks({
      pagePathname: "/x/",
      graphs: [
        graphOf([
          {
            "@type": "ItemList",
            "@id": "https://s.test/x/#list",
            "url": "https://s.test/x/#list",
            "name": "Design articles",
            "itemListElement": [],
          },
        ]),
      ],
      accessibleName: () => "Graph theory",
    });

    expect(
      issues.some((issue) =>
        issue.message.includes('does not match the accessible name "Graph theory"')
      )
    ).toBe(true);
  });

  it("accepts containment between ItemList and accessible names", () => {
    const issues = auditCrossChecks({
      pagePathname: "/x/",
      graphs: [
        graphOf([
          {
            "@type": "ItemList",
            "@id": "https://s.test/x/#list",
            "url": "https://s.test/x/#list",
            "name": "Design articles",
            "itemListElement": [],
          },
        ]),
      ],
      accessibleName: () => "Articles",
    });

    expect(issues).toEqual([]);
  });
});

describe("accessibility audit", () => {
  it("detects an unnamed landmark", () => {
    const { errors } = auditAccessibility({
      anchors: [],
      root: el({ tag: "body", children: [el({ tag: "nav" })] }),
    });

    expect(errors.some((error) => error.message.includes("<nav> landmark has no accessible name"))).toBe(true);
  });

  it("detects duplicate sibling landmark names", () => {
    const { errors } = auditAccessibility({
      anchors: [],
      root: el({
        tag: "body",
        children: [
          el({ tag: "nav", label: "Menu" }),
          el({ tag: "nav", label: "Menu" }),
        ],
      }),
    });

    expect(errors.some((error) => error.message.includes("share the same accessible name"))).toBe(true);
  });

  it("accepts distinct sibling landmark names", () => {
    const { errors } = auditAccessibility({
      anchors: [],
      root: el({
        tag: "body",
        children: [
          el({ tag: "nav", label: "Site menu" }),
          el({ tag: "nav", label: "Breadcrumb" }),
        ],
      }),
    });

    expect(errors).toEqual([]);
  });

  it("detects an empty heading", () => {
    const { errors } = auditAccessibility({
      anchors: [],
      root: el({ tag: "body", children: [el({ tag: "h2", text: "  " })] }),
    });

    expect(errors.some((error) => error.message.includes("<h2> heading is empty"))).toBe(true);
  });

  it("detects a missing image alt", () => {
    const { errors } = auditAccessibility({
      anchors: [],
      root: el({ tag: "body", children: [el({ tag: "img", alt: null })] }),
    });

    expect(errors.some((error) => error.message.includes("missing an alt attribute"))).toBe(true);
  });

  it("detects a hidden graph anchor", () => {
    const { errors } = auditAccessibility({
      anchors: ["ghost"],
      root: el({
        tag: "body",
        children: [el({ tag: "section", id: "ghost", hidden: true, label: "Hidden" })],
      }),
    });

    expect(errors.some((error) => error.message.includes("inside a hidden subtree"))).toBe(true);
  });

  it("does not demand tabindex on anchored landmarks", () => {
    const { warnings } = auditAccessibility({
      anchors: ["page"],
      root: el({
        tag: "body",
        children: [el({ tag: "main", id: "page", label: "Content" })],
      }),
    });

    expect(warnings.some((warning) => warning.message.includes("tabindex"))).toBe(false);
  });
});

describe("dom budget", () => {
  it("measures node count and depth", () => {
    const tree = el({
      tag: "body",
      children: [
        el({ tag: "main", children: [el({ tag: "p" }), el({ tag: "p" })] }),
        el({ tag: "footer" }),
      ],
    });

    expect(domBudgetOf(tree)).toEqual({ count: 5, depth: 3 });
  });
});
