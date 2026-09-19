import type { FeedItem } from "@/utils/get-feed-items";
import { getSiteMetadata } from "@/utils/get-site-metadata";
import { SLICE, Route, routes, toKebabCase } from "@/utils/routes";
import { mergeGraphs } from "@/utils/seo/graph";
import {
  blogPostingNode,
  breadcrumbNode,
  itemListNode,
  personNode,
  webPageNode,
  websiteNode,
} from "@/utils/seo/nodes";
import type { JsonLdGraph, ListItemEntry } from "@/utils/seo/types";

const feedEntries = (site: string, items: FeedItem[]) =>
  items.map((item) => ({
    fragment: `article-${toKebabCase(item.title)}`,
    name: item.title,
    url: `${site}${item.slug}#page`,
  }));

const blogNode = (site: string, items: FeedItem[]) => {
  const { title, description } = getSiteMetadata();
  const id = routes.home().id(site, "blog");

  return {
    "@type": "Blog",
    "@id": id,
    "url": id,
    "name": title,
    "description": description,
    "publisher": { "@id": routes.home().id(site, SLICE.person) },
    "isPartOf": { "@id": routes.home().id(site, SLICE.web) },
    "blogPost": items.map((item) => ({ "@id": `${site}${item.slug}#page` })),
  };
};

const homeFeedGraph = (page: number, items: FeedItem[]): JsonLdGraph => {
  const { url: site, title, description } = getSiteMetadata();
  const route =
    page === 0 ? routes.home() : routes.paginated(routes.home(), page);
  const listId = route.id(site, SLICE.articles);
  const list = itemListNode(
    route,
    SLICE.articles,
    "Articles",
    feedEntries(site, items)
  );

  return mergeGraphs(
    [personNode(), websiteNode(), list, blogNode(site, items)],
    [
      webPageNode(route, {
        name: page === 0 ? title : `Posts - Page ${page}`,
        description,
        types: page === 0 ? ["ProfilePage"] : ["CollectionPage", "WebPage"],
        mainEntity:
          page === 0
            ? { "@id": routes.home().id(site, SLICE.person) }
            : { "@id": listId },
        ...(page === 0 ? { hasPart: [{ "@id": listId }] } : {}),
      }),
    ]
  );
};

interface PostGraphInput {
  date: Date;
  description?: string;
  tags?: string[];
  title: string;
}

const postGraph = (slug: string, post: PostGraphInput): JsonLdGraph => {
  const { url: site, title: siteTitle, description: siteDescription } =
    getSiteMetadata();
  const route = routes.post(slug);
  const description = post.description || siteDescription;
  const datePublished = post.date.toISOString();
  const breadcrumb = breadcrumbNode(route, [
    { name: siteTitle, url: routes.home().canonical(site) },
    { name: post.title, url: route.id(site, SLICE.article) },
  ]);

  return mergeGraphs(
    [personNode(), websiteNode(), breadcrumb],
    [
      webPageNode(route, {
        name: post.title,
        description,
        datePublished,
        mainEntity: { "@id": route.id(site, SLICE.article) },
        breadcrumb: { "@id": route.id(site, SLICE.breadcrumb) },
      }),
      blogPostingNode(route, {
        headline: post.title,
        description,
        datePublished,
        keywords: post.tags,
      }),
    ]
  );
};

interface TermGraphInput {
  hubName: string;
  hubPath: string;
  items: FeedItem[];
  name: string;
  route: Route;
}

const termGraph = (term: TermGraphInput): JsonLdGraph => {
  const { url: site, title: siteTitle, description } = getSiteMetadata();
  const listId = term.route.id(site, SLICE.articles);
  const list = itemListNode(
    term.route,
    SLICE.articles,
    `${term.name} articles`,
    feedEntries(site, term.items)
  );
  const breadcrumb = breadcrumbNode(term.route, [
    { name: siteTitle, url: `${site}/` },
    { name: term.hubName, url: `${site}${term.hubPath}` },
    { name: term.name, url: listId },
  ]);

  return mergeGraphs(
    [personNode(), websiteNode(), list, breadcrumb],
    [
      webPageNode(term.route, {
        name: term.name,
        description,
        types: ["CollectionPage", "WebPage"],
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": term.route.id(site, SLICE.breadcrumb) },
      }),
    ]
  );
};

interface HubGraphInput {
  entries: ListItemEntry[];
  fragment: string;
  hubLabel: string;
  route: Route;
}

const hubGraph = (hub: HubGraphInput): JsonLdGraph => {
  const { url: site, title: siteTitle, description } = getSiteMetadata();
  const listId = hub.route.id(site, hub.fragment);
  const list = itemListNode(hub.route, hub.fragment, hub.hubLabel, hub.entries);
  const breadcrumb = breadcrumbNode(hub.route, [
    { name: siteTitle, url: `${site}/` },
    { name: hub.hubLabel, url: listId },
  ]);

  return mergeGraphs(
    [personNode(), websiteNode(), list, breadcrumb],
    [
      webPageNode(hub.route, {
        name: hub.hubLabel,
        description,
        types: ["CollectionPage", "WebPage"],
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": hub.route.id(site, SLICE.breadcrumb) },
      }),
    ]
  );
};

const staticPageGraph = (
  slug: string,
  page: { description?: string; title: string }
): JsonLdGraph => {
  const { url: site, title: siteTitle, description: siteDescription } =
    getSiteMetadata();
  const route = routes.page(slug);
  const description = page.description || siteDescription;
  const breadcrumb = breadcrumbNode(route, [
    { name: siteTitle, url: `${site}/` },
    { name: page.title, url: route.id(site, SLICE.page) },
  ]);

  return mergeGraphs(
    [personNode(), websiteNode(), breadcrumb],
    [
      webPageNode(route, {
        name: page.title,
        description,
        breadcrumb: { "@id": route.id(site, SLICE.breadcrumb) },
      }),
    ]
  );
};

export { homeFeedGraph, hubGraph, postGraph, staticPageGraph, termGraph };
