interface JsonLdNode {
  "@type"?: string | string[];
  "@id"?: string;
  [key: string]: unknown;
}

interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

interface BreadcrumbItem {
  name: string;
  url: string;
}

interface ListItemEntry {
  fragment?: string;
  name: string;
  url: string;
}

export type { BreadcrumbItem, JsonLdGraph, JsonLdNode, ListItemEntry };
