interface JsonLdValue {
  [key: string]: unknown;
}

interface AuditIssue {
  id?: string;
  message: string;
}

interface SchemaAuditInput {
  graphs: JsonLdValue[];
  htmlLang?: string | null;
  listItemCount?: (fragment: string) => number | null;
  metaContent?: (name: string) => string | null;
  metaContents?: (name: string) => string[];
  pagePathname: string;
  resolveAnchor?: (fragment: string) => boolean;
}

const normalizePath = (pathname: string): string =>
  pathname !== "/" ? pathname.replace(/\/$/, "") : "/";

const collectNodes = (graphs: JsonLdValue[]): JsonLdValue[] => {
  const nodes: JsonLdValue[] = [];

  for (const graph of graphs) {
    const members = graph["@graph"];
    if (!Array.isArray(members)) continue;

    for (const node of members) {
      if (!node || typeof node !== "object") continue;
      nodes.push(node);

      const list = node["itemListElement"];
      if (Array.isArray(list)) {
        for (const item of list) {
          if (item && typeof item === "object") {
            nodes.push(item as JsonLdValue);
          }
        }
      }
    }
  }

  return nodes;
};

const collectRefs = (nodes: JsonLdValue[]): string[] => {
  const refs: string[] = [];

  for (const node of nodes) {
    for (const value of Object.values(node)) {
      if (Array.isArray(value)) {
        for (const entry of value) {
          if (
            entry &&
            typeof entry === "object" &&
            typeof (entry as JsonLdValue)["@id"] === "string" &&
            (entry as JsonLdValue)["@type"] === undefined
          ) {
            refs.push((entry as JsonLdValue)["@id"] as string);
          }
        }
      } else if (
        value &&
        typeof value === "object" &&
        typeof (value as JsonLdValue)["@id"] === "string" &&
        (value as JsonLdValue)["@type"] === undefined
      ) {
        refs.push((value as JsonLdValue)["@id"] as string);
      }
    }
  }

  return refs;
};

const auditSchemaGraph = (input: SchemaAuditInput): AuditIssue[] => {
  const issues: AuditIssue[] = [];
  const pagePath = normalizePath(input.pagePathname);
  const nodes = collectNodes(input.graphs);

  if (nodes.length === 0) {
    return issues;
  }

  const knownIds = new Set<string>();

  for (const node of nodes) {
    const id = node["@id"];
    const url = node["url"];

    if (typeof id !== "string" || id.length === 0) {
      issues.push({ message: "node is missing @id" });
      continue;
    }

    knownIds.add(id);

    if (typeof url !== "string" || url.length === 0) {
      issues.push({ id, message: "node is missing url" });
      continue;
    }

    if (id !== url) {
      issues.push({ id, message: `@id does not equal url (${url})` });
    }

    const hashIndex = id.indexOf("#");

    if (hashIndex === -1) {
      continue;
    }

    const originAndPath = id.slice(0, hashIndex);
    const fragment = id.slice(hashIndex + 1);
    let nodePath: string;

    try {
      nodePath = normalizePath(new URL(originAndPath).pathname);
    } catch {
      issues.push({ id, message: "@id is not an absolute url" });
      continue;
    }

    if (nodePath === "/" && !originAndPath.endsWith("/")) {
      issues.push({
        id,
        message: "root id must keep the slash before the fragment",
      });
    }

    if (nodePath === pagePath && input.resolveAnchor && !input.resolveAnchor(fragment)) {
      issues.push({ id, message: `no element with id="${fragment}"` });
    }
  }

  for (const ref of collectRefs(nodes)) {
    if (knownIds.has(ref)) {
      continue;
    }

    const hashIndex = ref.indexOf("#");
    const refPath = normalizePath(
      new URL(hashIndex === -1 ? ref : ref.slice(0, hashIndex)).pathname
    );

    if (refPath === pagePath) {
      issues.push({ id: ref, message: "reference points to no node in the graph" });
    }
  }

  return issues;
};

const fragmentOf = (value: unknown): string | null => {
  if (value && typeof value === "object" && !Array.isArray(value)) {
    value = (value as JsonLdValue)["@id"];
  }

  if (typeof value !== "string" || !value.includes("#")) return null;
  return value.slice(value.indexOf("#") + 1);
};

const typesOf = (node: JsonLdValue): string[] => {
  const type = node["@type"];
  return Array.isArray(type) ? (type as string[]) : typeof type === "string" ? [type] : [];
};

const auditCrossChecks = (input: SchemaAuditInput): AuditIssue[] => {
  const issues: AuditIssue[] = [];
  const nodes = collectNodes(input.graphs);

  if (nodes.length === 0) {
    return issues;
  }

  const pageNodes = nodes.filter((node) => typesOf(node).some((t) => t.endsWith("Page")));

  for (const node of pageNodes) {
    const id = typeof node["@id"] === "string" ? node["@id"] : undefined;
    const lang = node["inLanguage"];

    if (typeof lang === "string" && input.htmlLang && lang !== input.htmlLang) {
      issues.push({
        id,
        message: `inLanguage "${lang}" does not match html lang "${input.htmlLang}"`,
      });
    }

    const metaDescription = input.metaContent?.("description");

    if (
      typeof metaDescription === "string" &&
      metaDescription.length > 0 &&
      node["description"] !== metaDescription
    ) {
      issues.push({
        id,
        message: "graph description does not equal the meta description",
      });
    }

    const mainEntityFragment = fragmentOf(node["mainEntity"]);
    const breadcrumbFragment = fragmentOf(node["breadcrumb"]);

    if (mainEntityFragment && breadcrumbFragment) {
      const crumbs = nodes.find(
        (candidate) => fragmentOf(candidate["@id"]) === breadcrumbFragment
      );
      const items = crumbs?.["itemListElement"];

      if (Array.isArray(items) && items.length > 0) {
        const last = items[items.length - 1] as JsonLdValue;
        const item = last["item"] as JsonLdValue | undefined;
        const lastFragment =
          (item ? fragmentOf(item["@id"]) ?? fragmentOf(item["url"]) : null) ??
          fragmentOf(last["url"]) ??
          fragmentOf(last["@id"]);

        if (lastFragment && lastFragment !== mainEntityFragment) {
          issues.push({
            id,
            message: `last breadcrumb fragment "${lastFragment}" does not equal mainEntity fragment "${mainEntityFragment}"`,
          });
        }
      }
    }
  }

  const posting = nodes.find((node) => typesOf(node).includes("BlogPosting"));

  if (posting) {
    const metaTags = new Set(input.metaContents?.("article:tag") ?? []);
    const graphTags = new Set(
      typeof posting["keywords"] === "string"
        ? (posting["keywords"] as string).split(", ").filter(Boolean)
        : []
    );

    if (metaTags.size > 0 || graphTags.size > 0) {
      const missingInMeta = [...graphTags].filter((tag) => !metaTags.has(tag));
      const missingInGraph = [...metaTags].filter((tag) => !graphTags.has(tag));

      if (missingInMeta.length > 0 || missingInGraph.length > 0) {
        issues.push({
          id: typeof posting["@id"] === "string" ? posting["@id"] : undefined,
          message: `keywords and article:tag metas differ (meta missing: [${missingInMeta.join(", ")}], graph missing: [${missingInGraph.join(", ")}])`,
        });
      }
    }
  }

  for (const node of nodes) {
    const id = typeof node["@id"] === "string" ? node["@id"] : undefined;
    const items = node["itemListElement"];

    if (!Array.isArray(items)) {
      continue;
    }

    items.forEach((item, index) => {
      const position = (item as JsonLdValue)["position"];

      if (position !== index + 1) {
        issues.push({
          id,
          message: `ListItem position ${String(position)} at index ${index} breaks the 1-based sequence`,
        });
      }
    });

    const fragment = fragmentOf(node["@id"]);

    if (fragment && typeof node["numberOfItems"] === "number") {
      const rendered = input.listItemCount?.(fragment);

      if (rendered !== null && rendered !== undefined && rendered !== node["numberOfItems"]) {
        issues.push({
          id,
          message: `numberOfItems ${String(node["numberOfItems"])} does not equal ${rendered} rendered list items`,
        });
      }
    }
  }

  return issues;
};

const runSchemaAudit = (doc: Document): void => {
  const scripts = Array.from(
    doc.querySelectorAll('script[type="application/ld+json"]')
  );

  const graphs: JsonLdValue[] = [];

  for (const script of scripts) {
    try {
      graphs.push(JSON.parse(script.textContent ?? "{}"));
    } catch {
      console.error("[audit-schema] a ld+json script is not valid JSON");
    }
  }

  const issues = [
    ...auditSchemaGraph({
      graphs,
      pagePathname: doc.defaultView?.location.pathname ?? "/",
      resolveAnchor: (fragment) => doc.getElementById(fragment) !== null,
    }),
    ...auditCrossChecks({
      graphs,
      pagePathname: doc.defaultView?.location.pathname ?? "/",
      htmlLang: doc.documentElement.getAttribute("lang"),
      metaContent: (name) =>
        doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ??
        null,
      metaContents: (name) =>
        Array.from(doc.querySelectorAll(`meta[name="${name}"]`))
          .map((meta) => meta.getAttribute("content"))
          .filter((content): content is string => content !== null),
      listItemCount: (fragment) => {
        const anchor = doc.getElementById(fragment);
        return anchor ? anchor.querySelectorAll("li").length : null;
      },
    }),
  ];

  for (const issue of issues) {
    console.error(
      `[audit-schema] ${issue.id ? `${issue.id}: ` : ""}${issue.message}`
    );
  }
};

export { auditCrossChecks, auditSchemaGraph, runSchemaAudit };
export type { AuditIssue, JsonLdValue, SchemaAuditInput };
