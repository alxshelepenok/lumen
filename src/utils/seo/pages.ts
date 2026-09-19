import type { FeedItem } from "@/utils/get-feed-items";
import { getSiteMetadata } from "@/utils/get-site-metadata";
import { SLICE, routes, toKebabCase } from "@/utils/routes";
import { mergeGraphs } from "@/utils/seo/graph";
import {
  itemListNode,
  personNode,
  webPageNode,
  websiteNode,
} from "@/utils/seo/nodes";
import type { JsonLdGraph } from "@/utils/seo/types";

const feedEntries = (site: string, items: FeedItem[]) =>
  items.map((item) => ({
    fragment: `article-${toKebabCase(item.title)}`,
    name: item.title,
    url: `${site}${item.slug}#page`,
  }));

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
    [personNode(), websiteNode(), list],
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

export { homeFeedGraph };
