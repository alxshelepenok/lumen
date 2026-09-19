import { describe, expect, it } from "bun:test";

import { auditCrossChecks, auditSchemaGraph } from "@/utils/audit/schema-audit";
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
            "@type": "WebSite",
            "@id": "https://s.test#web",
            "url": "https://s.test#web",
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

  it("warns when an anchored landmark lacks tabindex", () => {
    const { warnings } = auditAccessibility({
      anchors: ["page"],
      root: el({
        tag: "body",
        children: [el({ tag: "main", id: "page", label: "Content" })],
      }),
    });

    expect(warnings.some((warning) => warning.message.includes('tabindex="-1"'))).toBe(true);
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
