import type { FeedItem } from "@/utils/get-feed-items";
import { getSiteMetadata } from "@/utils/get-site-metadata";
import { SLICE, Route, routes, toKebabCase } from "@/utils/routes";
import { labels } from "@/constants/labels";
import { mergeGraphs } from "@/utils/seo/graph";
import {
  blogPostingNode,
  breadcrumbNode,
  itemListNode,
  linksNodes,
  personNode,
  regionNode,
  siteNavigationNodes,
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

const blogNode = (site: string) => {
  const id = routes.home().id(site, "blog");

  return {
    "@type": "Blog",
    "@id": id,
    "url": id,
    "name": labels.blog,
    "isPartOf": { "@id": routes.home().id(site, SLICE.web) },
    "publisher": { "@id": routes.home().id(site, SLICE.person) },
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
    labels.articles,
    feedEntries(site, items)
  );

  return mergeGraphs(
    [
      personNode(),
      websiteNode(),
      list,
      ...(page === 0
        ? [regionNode(routes.home(), "blog", labels.blog, SLICE.articles)]
        : []),
      ...siteNavigationNodes(),
      ...linksNodes(route),
    ],
    [
      webPageNode(route, {
        name: page === 0 ? title : `Articles`,
        description,
        types: page === 0 ? ["ProfilePage"] : ["CollectionPage", "WebPage"],
        mainEntity:
          page === 0
            ? { "@id": routes.home().id(site, SLICE.person) }
            : { "@id": listId },
        publisher: page !== 0,
        ...(page === 0
          ? {
              hasPart: [
                { "@id": routes.home().id(site, "blog") },
                { "@id": routes.home().id(site, "links") },
              ],
            }
          : {}),
      }),
    ]
  );
};

interface PostGraphInput {
  date: Date;
  dateModified?: string;
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
    { name: siteTitle, url: routes.home().id(site, SLICE.page) },
    { name: post.title, url: route.id(site, SLICE.article) },
  ]);

  return mergeGraphs(
    [
      personNode(),
      websiteNode(),
      blogNode(site),
      breadcrumb,
    ],
    [
      webPageNode(route, {
        name: post.title,
        description,
        dateModified: post.dateModified,
        datePublished,
        mainEntity: { "@id": route.id(site, SLICE.article) },
        breadcrumb: { "@id": route.id(site, SLICE.breadcrumb) },
      }),
      blogPostingNode(route, {
        headline: post.title,
        description,
        dateModified: post.dateModified,
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
    term.name,
    feedEntries(site, term.items)
  );
  const breadcrumb = breadcrumbNode(term.route, [
    { name: siteTitle, url: routes.home().id(site, SLICE.page) },
    { name: term.hubName, url: new Route(term.hubPath).id(site, SLICE.page) },
    { name: term.name, url: listId },
  ]);

  return mergeGraphs(
    [
      personNode(),
      websiteNode(),
      list,
      breadcrumb,
      ...siteNavigationNodes(),
      ...linksNodes(term.route),
    ],
    [
      webPageNode(term.route, {
        name: term.name,
        description,
        types: ["CollectionPage", "WebPage"],
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": term.route.id(site, SLICE.breadcrumb) },
        publisher: true,
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
    { name: siteTitle, url: routes.home().id(site, SLICE.page) },
    { name: hub.hubLabel, url: listId },
  ]);

  return mergeGraphs(
    [
      personNode(),
      websiteNode(),
      list,
      breadcrumb,
      ...siteNavigationNodes(),
      ...linksNodes(hub.route),
    ],
    [
      webPageNode(hub.route, {
        name: hub.hubLabel,
        description,
        types: ["CollectionPage", "WebPage"],
        mainEntity: { "@id": listId },
        breadcrumb: { "@id": hub.route.id(site, SLICE.breadcrumb) },
        publisher: true,
      }),
    ]
  );
};

const staticPageGraph = (
  slug: string,
  page: {
    date?: Date;
    dateModified?: string;
    description?: string;
    title: string;
  }
): JsonLdGraph => {
  const { url: site, title: siteTitle, description: siteDescription } =
    getSiteMetadata();
  const route = routes.page(slug);
  const description = page.description || siteDescription;
  const breadcrumb = breadcrumbNode(route, [
    { name: siteTitle, url: routes.home().id(site, SLICE.page) },
    { name: page.title, url: route.id(site, SLICE.page) },
  ]);

  return mergeGraphs(
    [
      personNode(),
      websiteNode(),
      breadcrumb,
      ...siteNavigationNodes(),
      ...linksNodes(route),
    ],
    [
      webPageNode(route, {
        name: page.title,
        description,
        dateModified: page.dateModified,
        ...(page.date ? { datePublished: page.date.toISOString() } : {}),
        breadcrumb: { "@id": route.id(site, SLICE.breadcrumb) },
      }),
    ]
  );
};

export { homeFeedGraph, hubGraph, postGraph, staticPageGraph, termGraph };
