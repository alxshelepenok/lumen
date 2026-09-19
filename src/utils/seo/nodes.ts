import { getContactHref } from "@/utils/get-contact-href";
import { getSiteMetadata } from "@/utils/get-site-metadata";
import { Route, SLICE, routes, toKebabCase } from "@/utils/routes";

import type { BreadcrumbItem, JsonLdNode, ListItemEntry } from "@/utils/seo/types";

const IN_LANGUAGE = "en";

const siteUrl = (): string => getSiteMetadata().url;

const rootId = (slice: string): string => routes.home().id(siteUrl(), slice);

const ref = (id: string): JsonLdNode => ({ "@id": id });

const personNode = (): JsonLdNode => {
  const { author } = getSiteMetadata();
  const id = rootId(SLICE.person);

  return {
    "@type": "Person",
    "@id": id,
    "url": id,
    "name": author.title,
    "description": author.description,
    "sameAs": author.contacts
      .map(({ name, contact }) => getContactHref(name, contact))
      .filter((href) => href.startsWith("http")),
  };
};

const websiteNode = (): JsonLdNode => {
  const { title, description } = getSiteMetadata();
  const id = rootId(SLICE.web);

  return {
    "@type": "WebSite",
    "@id": id,
    "url": id,
    "name": title,
    "description": description,
    "inLanguage": IN_LANGUAGE,
    "publisher": ref(rootId(SLICE.person)),
  };
};

const breadcrumbNode = (
  route: Route,
  items: BreadcrumbItem[]
): JsonLdNode => {
  const id = route.id(siteUrl(), SLICE.breadcrumb);

  return {
    "@type": "BreadcrumbList",
    "@id": id,
    "url": id,
    "itemListElement": items.map((item, index) => {
      const itemId = route.id(
        siteUrl(),
        `breadcrumb-item-${toKebabCase(item.name)}`
      );

      return {
        "@type": "ListItem",
        "@id": itemId,
        "url": itemId,
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "@id": item.url,
          "url": item.url,
          "name": item.name,
        },
      };
    }),
  };
};

const itemListNode = (
  route: Route,
  fragment: string,
  name: string,
  items: ListItemEntry[]
): JsonLdNode => {
  const id = route.id(siteUrl(), fragment);

  return {
    "@type": "ItemList",
    "@id": id,
    "url": id,
    "name": name,
    "numberOfItems": items.length,
    "itemListElement": items.map((item, index) => {
      const itemId = item.fragment
        ? route.id(siteUrl(), item.fragment)
        : item.url;

      return {
        "@type": "ListItem",
        "@id": itemId,
        "url": itemId,
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "@id": item.url,
          "url": item.url,
          "name": item.name,
        },
      };
    }),
  };
};

const webPageNode = (
  route: Route,
  extra: {
    mainEntity?: JsonLdNode;
    breadcrumb?: JsonLdNode;
    datePublished?: string;
    description: string;
    hasPart?: JsonLdNode[];
    name: string;
    types?: string[];
  }
): JsonLdNode => {
  const id = route.id(siteUrl(), SLICE.page);

  return {
    "@type": extra.types ?? ["WebPage"],
    "@id": id,
    "url": id,
    "name": extra.name,
    "description": extra.description,
    "inLanguage": IN_LANGUAGE,
    "isPartOf": ref(rootId(SLICE.web)),
    ...(extra.breadcrumb ? { "breadcrumb": extra.breadcrumb } : {}),
    ...(extra.mainEntity ? { "mainEntity": extra.mainEntity } : {}),
    ...(extra.hasPart ? { "hasPart": extra.hasPart } : {}),
    ...(extra.datePublished ? { "datePublished": extra.datePublished } : {}),
  };
};

const blogPostingNode = (
  route: Route,
  extra: {
    datePublished: string;
    description: string;
    headline: string;
    keywords?: string[];
  }
): JsonLdNode => {
  const id = route.id(siteUrl(), SLICE.article);
  const pageRef = ref(route.id(siteUrl(), SLICE.page));

  return {
    "@type": "BlogPosting",
    "@id": id,
    "url": id,
    "headline": extra.headline,
    "description": extra.description,
    "inLanguage": IN_LANGUAGE,
    "datePublished": extra.datePublished,
    ...(extra.keywords?.length
      ? { "keywords": extra.keywords.join(", ") }
      : {}),
    "isPartOf": pageRef,
    "mainEntityOfPage": pageRef,
    "author": ref(rootId(SLICE.person)),
    "publisher": ref(rootId(SLICE.person)),
  };
};

export {
  blogPostingNode,
  breadcrumbNode,
  itemListNode,
  personNode,
  webPageNode,
  websiteNode,
};
