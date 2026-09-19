interface JsonLdValue {
  [key: string]: unknown;
}

interface AuditIssue {
  id?: string;
  message: string;
}

interface SchemaAuditInput {
  graphs: JsonLdValue[];
  listItemCount?: (fragment: string) => number | null;
  metaContent?: (name: string) => string | null;
  htmlLang?: string | null;
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

  const issues = auditSchemaGraph({
    graphs,
    pagePathname: doc.defaultView?.location.pathname ?? "/",
    resolveAnchor: (fragment) => doc.getElementById(fragment) !== null,
  });

  for (const issue of issues) {
    console.error(
      `[audit-schema] ${issue.id ? `${issue.id}: ` : ""}${issue.message}`
    );
  }
};

export { auditSchemaGraph, runSchemaAudit };
export type { AuditIssue, JsonLdValue, SchemaAuditInput };
