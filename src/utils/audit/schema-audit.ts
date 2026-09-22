interface JsonLdValue {
  [key: string]: unknown;
}

interface AuditIssue {
  id?: string;
  message: string;
}

interface SchemaAuditInput {
  accessibleName?: (fragment: string) => string | null;
  graphs: JsonLdValue[];
  htmlLang?: string | null;
  internalHrefs?: string[];
  listItemCount?: (fragment: string) => number | null;
  metaContent?: (name: string) => string | null;
  metaContents?: (name: string) => string[];
  metaPropertyContent?: (property: string) => string | null;
  pagePathname: string;
  resolveAnchor?: (fragment: string) => boolean;
}

const normalizePath = (pathname: string): string =>
  pathname !== "/" ? pathname.replace(/\/$/, "") : "/";

const FILE_LIKE_RE = /\.(txt|xml|md|png|ico|svg|webmanifest|jpe?g|webp|css|js|json)$/i;

const isFileLike = (href: string): boolean => FILE_LIKE_RE.test(href.split("#")[0]);

const normalizeName = (value: string): string =>
  value
    .toLowerCase()
    .replace(/[^\p{L}\p{N} ]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();

interface LinkGrammarInput {
  internalHrefs?: string[];
  pagePathname: string;
  resolveAnchor?: (fragment: string) => boolean;
}

const auditLinkGrammar = (input: LinkGrammarInput): AuditIssue[] => {
  const issues: AuditIssue[] = [];

  for (const href of input.internalHrefs ?? []) {
    if (href.startsWith("#")) {
      const fragment = href.slice(1);

      if (
        fragment.length > 0 &&
        input.resolveAnchor &&
        !input.resolveAnchor(fragment)
      ) {
        issues.push({
          id: href,
          message: `same-page link "${href}" resolves to no element with id="${fragment}"`,
        });
      }

      continue;
    }

    if (!href.startsWith("/") || href.startsWith("//")) {
      continue;
    }

    if (isFileLike(href)) {
      continue;
    }

    if (!href.includes("#")) {
      issues.push({
        id: href,
        message: `internal link "${href}" carries no fragment (expected a #page style target)`,
      });
    }
  }

  return issues;
};

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
  const typesOf = (node: JsonLdValue): string[] => {
    const types = node["@type"];

    if (Array.isArray(types)) {
      return types.filter((t): t is string => typeof t === "string");
    }

    return typeof types === "string" ? [types] : [];
  };

  for (const node of nodes) {
    const types = typesOf(node);

    if (types.includes("WebSite")) {
      const id = node["@id"];

      if (typeof id !== "string" || id.length === 0) {
        issues.push({ message: "node is missing @id" });
      } else {
        knownIds.add(id);
      }

      if (typeof node["name"] !== "string" || node["name"].length === 0) {
        issues.push({ id: typeof id === "string" ? id : undefined, message: "missing name" });
      }

      continue;
    }

    let id = node["@id"];
    let url = node["url"];

    if (types.includes("ListItem")) {
      const item = node["item"] as JsonLdValue | undefined;

      if (item && typeof item === "object" && !Array.isArray(item)) {
        if (typeof item["@id"] === "string") {
          id = item["@id"];
        }

        if (typeof item["url"] === "string") {
          url = item["url"];
        }
      }
    }

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

    const ogLocale = input.metaPropertyContent?.("og:locale");

    if (typeof lang === "string" && ogLocale && ogLocale !== lang && !ogLocale.startsWith(`${lang}_`)) {
      issues.push({
        id,
        message: `og:locale "${ogLocale}" does not agree with inLanguage "${lang}"`,
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

    if (fragment && typeof node["name"] === "string" && input.accessibleName) {
      const label = input.accessibleName(fragment);
      const name = node["name"] as string;

      if (label !== null) {
        const target = normalizeName(label);
        const candidate = normalizeName(name);

        if (
          candidate.length > 0 &&
          target.length > 0 &&
          candidate !== target &&
          !candidate.includes(target) &&
          !target.includes(candidate)
        ) {
          issues.push({
            id,
            message: `name "${name}" does not match the accessible name "${label}" of #${fragment}`,
          });
        }
      } else {
        issues.push({
          id,
          message: `name "${name}" has no accessible name (aria-label or aria-labelledby) on #${fragment}`,
        });
      }
    }

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

const collectSchemaIssues = (doc: Document, pagePathname: string): AuditIssue[] => {
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
      pagePathname,
      resolveAnchor: (fragment) => doc.getElementById(fragment) !== null,
    }),
    ...auditLinkGrammar({
      pagePathname,
      internalHrefs: Array.from(doc.querySelectorAll("a[href]")).map((link) =>
        link.getAttribute("href") ?? ""
      ),
      resolveAnchor: (fragment) => doc.getElementById(fragment) !== null,
    }),
    ...auditCrossChecks({
      graphs,
      pagePathname,
      htmlLang: doc.documentElement.getAttribute("lang"),
      accessibleName: (fragment) => {
        const anchor = doc.getElementById(fragment);

        if (!anchor) {
          return null;
        }

        const labelledBy = anchor.getAttribute("aria-labelledby");

        if (labelledBy) {
          const text = labelledBy
            .split(/\s+/)
            .map((ref) => doc.getElementById(ref)?.textContent?.trim() ?? "")
            .filter(Boolean)
            .join(" ");

          if (text) {
            return text;
          }
        }

        return anchor.getAttribute("aria-label");
      },
      metaContent: (name) =>
        doc.querySelector(`meta[name="${name}"]`)?.getAttribute("content") ??
        null,
      metaContents: (name) =>
        Array.from(doc.querySelectorAll(`meta[name="${name}"]`))
          .map((meta) => meta.getAttribute("content"))
          .filter((content): content is string => content !== null),
      metaPropertyContent: (property) =>
        doc.querySelector(`meta[property="${property}"]`)?.getAttribute("content") ??
        null,
      listItemCount: (fragment) => {
        const anchor = doc.getElementById(fragment);

        if (!anchor) {
          return null;
        }

        const tag = anchor.tagName.toLowerCase();

        if (tag === "ul" || tag === "ol") {
          return anchor.querySelectorAll("li").length;
        }

        return Array.from(anchor.children).filter(
          (child) => child.tagName.toLowerCase() === "article"
        ).length;
      },
    }),
  ];

  return issues;
};

const runSchemaAudit = (doc: Document): void => {
  const issues = collectSchemaIssues(
    doc,
    doc.defaultView?.location.pathname ?? "/"
  );

  for (const issue of issues) {
    console.error(
      `[audit-schema] ${issue.id ? `${issue.id}: ` : ""}${issue.message}`
    );
  }
};

export { auditCrossChecks, auditLinkGrammar, auditSchemaGraph, collectSchemaIssues, runSchemaAudit };
export type { AuditIssue, JsonLdValue, SchemaAuditInput };
