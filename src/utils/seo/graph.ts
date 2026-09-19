import type { JsonLdGraph, JsonLdNode } from "@/utils/seo/types";

const mergeGraphs = (...sources: JsonLdNode[][]): JsonLdGraph => {
  const byId = new Map<string, JsonLdNode>();
  const unanchored: JsonLdNode[] = [];

  for (const nodes of sources) {
    for (const raw of nodes) {
      const { "@context": _context, ...node } = raw;
      const id = node["@id"];

      if (typeof id === "string" && id) {
        const existing = byId.get(id);
        byId.set(id, existing ? { ...existing, ...node } : node);
      } else {
        unanchored.push(node);
      }
    }
  }

  return {
    "@context": "https://schema.org",
    "@graph": [...byId.values(), ...unanchored],
  };
};

export { mergeGraphs };
