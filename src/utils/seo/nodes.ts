import { getContactHref } from "@/utils/get-contact-href";
import { getSiteMetadata } from "@/utils/get-site-metadata";
import { Route, SLICE, routes, toKebabCase } from "@/utils/routes";
import { labels } from "@/constants/labels";

import type { BreadcrumbItem, JsonLdNode, ListItemEntry } from "@/utils/seo/types";

const siteLang = (): string => getSiteMetadata().lang;

const siteUrl = (): string => getSiteMetadata().url;

const rootId = (slice: string): string => routes.home().id(siteUrl(), slice);

const ref = (id: string): JsonLdNode => ({ "@id": id });

const personNode = (): JsonLdNode => {
  const { author } = getSiteMetadata();
  const id = rootId(SLICE.person);
  const [givenName, familyName] = author.title.split(/\s+/);
  const hasNameParts = Boolean(givenName && familyName);

  return {
    "@type": "Person",
    "@id": id,
    "url": id,
    "name": author.title,
    ...(hasNameParts ? { givenName, familyName } : {}),
    "description": author.description,
    "sameAs": author.contacts
      .map(({ name, contact }) => getContactHref(name, contact))
      .filter((href) => href.startsWith("http")),
  };
};

const websiteNode = (): JsonLdNode => {
  const { url, title, description } = getSiteMetadata();
  const id = rootId(SLICE.web);

  return {
    "@type": "WebSite",
    "@id": id,
    "url": url,
    "name": title,
    "description": description,
    "inLanguage": siteLang(),
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
    dateModified?: string;
    datePublished?: string;
    description: string;
    hasPart?: JsonLdNode[];
    name: string;
    publisher?: boolean;
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
    "inLanguage": siteLang(),
    "isPartOf": ref(rootId(SLICE.web)),
    ...(extra.breadcrumb ? { "breadcrumb": extra.breadcrumb } : {}),
    ...(extra.mainEntity ? { "mainEntity": extra.mainEntity } : {}),
    ...(extra.hasPart ? { "hasPart": extra.hasPart } : {}),
    ...(extra.publisher ? { "publisher": ref(rootId(SLICE.person)) } : {}),
    ...(extra.datePublished ? { "datePublished": extra.datePublished } : {}),
    ...(extra.dateModified ? { "dateModified": extra.dateModified } : {}),
  };
};

const blogPostingNode = (
  route: Route,
  extra: {
    dateModified?: string;
    datePublished: string;
    description: string;
    headline: string;
    keywords?: string[];
  }
): JsonLdNode => {
  const id = route.id(siteUrl(), SLICE.article);
  const pageRef = ref(route.id(siteUrl(), SLICE.page));
  const blogRef = ref(rootId("blog"));

  return {
    "@type": "BlogPosting",
    "@id": id,
    "url": id,
    "headline": extra.headline,
    "description": extra.description,
    "inLanguage": siteLang(),
    "datePublished": extra.datePublished,
    ...(extra.dateModified ? { "dateModified": extra.dateModified } : {}),
    ...(extra.keywords?.length
      ? { "keywords": extra.keywords.join(", ") }
      : {}),
    "isPartOf": blogRef,
    "mainEntityOfPage": pageRef,
    "author": ref(rootId(SLICE.person)),
    "publisher": ref(rootId(SLICE.person)),
  };
};

const regionNode = (
  route: Route,
  fragment: string,
  name: string,
  mainEntityFragment: string
): JsonLdNode => {
  const site = siteUrl();
  const id = route.id(site, fragment);

  return {
    "@type": "WebPageElement",
    "@id": id,
    "url": id,
    "name": name,
    "isPartOf": ref(route.id(site, SLICE.page)),
    "mainEntity": ref(route.id(site, mainEntityFragment)),
  };
};

const linksNodes = (): JsonLdNode[] => {
  const { author } = getSiteMetadata();
  const elementId = rootId("links");
  const listId = rootId("links-list");

  const list: JsonLdNode = {
    "@type": "ItemList",
    "@id": listId,
    "url": listId,
    "name": labels.contacts,
    "numberOfItems": author.contacts.length,
    "itemListElement": author.contacts.map(({ name, contact }, index) => {
      const href = getContactHref(name, contact);

      return {
        "@type": "ListItem",
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "@id": href,
          "url": href,
          "name": name.charAt(0).toUpperCase() + name.slice(1),
        },
      };
    }),
  };

  const element: JsonLdNode = {
    "@type": "WebPageElement",
    "@id": elementId,
    "url": elementId,
    "name": labels.contacts,
    "isPartOf": ref(rootId(SLICE.web)),
    "mainEntity": ref(listId),
  };

  return [element, list];
};

const siteNavigationNodes = (): JsonLdNode[] => {
  const site = siteUrl();
  const { menu } = getSiteMetadata();
  const navId = rootId("sidebar-menu");
  const listId = rootId("sidebar-menu-list");

  const list: JsonLdNode = {
    "@type": "ItemList",
    "@id": listId,
    "url": listId,
    "name": labels.pages,
    "numberOfItems": menu.length,
    "itemListElement": menu.map((item, index) => {
      const itemId = rootId(`sidebar-menu-item-${toKebabCase(item.title)}`);

      return {
        "@type": "ListItem",
        "@id": itemId,
        "url": itemId,
        "position": index + 1,
        "item": {
          "@type": "WebPage",
          "@id": new Route(item.url).id(site, SLICE.page),
          "url": new Route(item.url).id(site, SLICE.page),
          "name": item.title,
        },
      };
    }),
  };

  const navigation: JsonLdNode = {
    "@type": ["SiteNavigationElement", "WebPageElement"],
    "@id": navId,
    "url": navId,
    "name": labels.pages,
    "isPartOf": ref(rootId(SLICE.web)),
    "mainEntity": ref(listId),
  };

  return [navigation, list];
};

export {
  blogPostingNode,
  breadcrumbNode,
  itemListNode,
  linksNodes,
  personNode,
  regionNode,
  siteNavigationNodes,
  webPageNode,
  websiteNode,
};
