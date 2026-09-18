import { type GatsbyNode } from "gatsby";

import { routes } from "./constants/routes";
import { templates } from "./constants/templates";
import { pagesQuery } from "./queries/pages-query";
import { metadataQuery } from "./queries/metadata-query";
import { categoriesQuery } from "./queries/categories-query";
import { tagsQuery } from "./queries/tags-query";
import { yearsQuery } from "./queries/years-query";
import { postsQuery } from "./queries/posts-query";
import { toKebabCase } from "../../src/utils/to-kebab-case";
import { concat } from "../../src/utils/concat";

type CreateWithPagination = (parameters: {
  limit: number;
  group?: string;
  template: string;
  total: number;
  page: number;
  path: string;
  yearStart?: string;
  yearEnd?: string;
}) => void;

const getPaginationPath = (basePath: string, page: number): string =>
  [basePath === "/" ? "" : basePath, "page", page].join("/");

const createPages: GatsbyNode["createPages"] = async ({ graphql, actions }) => {
  const { createPage } = actions;

  createPage({
    path: routes.notFoundRoute,
    component: templates.notFoundTemplate,
    context: {},
  });

  createPage({
    path: routes.categoriesListRoute,
    component: templates.categoriesTemplate,
    context: {},
  });

  createPage({
    path: routes.tagsListRoute,
    component: templates.tagsTemplate,
    context: {},
  });

  createPage({
    path: routes.yearsListRoute,
    component: templates.yearsTemplate,
    context: {},
  });

  const pages = await pagesQuery(graphql);

  for (const edge of pages) {
    const { node } = edge;

    if (node?.frontmatter?.template === "page" && node?.fields?.slug) {
      createPage({
        path: node?.frontmatter?.slug || node.fields.slug,
        component: templates.pageTemplate,
        context: { slug: node.fields.slug },
      });
    } else if (node?.frontmatter?.template === "post" && node?.fields?.slug) {
      createPage({
        path: node?.frontmatter?.slug || node.fields.slug,
        component: templates.postTemplate,
        context: { slug: node.fields.slug },
      });
    }
  }

  const createWithPagination: CreateWithPagination = ({
    group,
    template,
    page,
    path,
    total,
    limit,
    yearStart,
    yearEnd,
  }) => {
    createPage({
      component: template,
      path: page === 0 ? path : getPaginationPath(path, page),
      context: {
        group,
        limit,
        offset: page * limit,
        ...(yearStart && yearEnd && { yearStart, yearEnd }),
        pagination: {
          currentPage: page,
          prevPagePath: page <= 1 ? path : getPaginationPath(path, page - 1),
          nextPagePath: getPaginationPath(path, page + 1),
          hasNextPage: page !== total - 1,
          hasPrevPage: page !== 0,
        },
      },
    });
  };

  const metadata = await metadataQuery(graphql);
  const postsLimit = metadata?.feedLimit ?? 1;
  const categories = await categoriesQuery(graphql);

  for (const category of categories) {
    const path = concat(
      routes.categoryRoute,
      "/",
      toKebabCase(category.fieldValue)
    );
    const total = Math.ceil(category.totalCount / postsLimit);

    for (let page = 0; page < total; page += 1) {
      createWithPagination({
        limit: postsLimit,
        group: category.fieldValue,
        template: templates.categoryTemplate,
        total,
        page,
        path,
      });
    }
  }

  const tags = await tagsQuery(graphql);

  for (const tag of tags) {
    const path = concat(routes.tagRoute, "/", toKebabCase(tag.fieldValue));
    const total = Math.ceil(tag.totalCount / postsLimit);

    for (let page = 0; page < total; page += 1) {
      createWithPagination({
        limit: postsLimit,
        group: tag.fieldValue,
        template: templates.tagTemplate,
        total,
        page,
        path,
      });
    }
  }

  const years = await yearsQuery(graphql);

  for (const year of years) {
    const path = concat(routes.yearRoute, "/", year.fieldValue);
    const total = Math.ceil(year.totalCount / postsLimit);

    for (let page = 0; page < total; page += 1) {
      const yearValue = Number.parseInt(year.fieldValue);
      createWithPagination({
        limit: postsLimit,
        group: year.fieldValue,
        template: templates.yearTemplate,
        total,
        page,
        path,
        yearStart: `${yearValue}-01-01`,
        yearEnd: `${yearValue + 1}-01-01`,
      });
    }
  }

  const path = routes.indexRoute;
  const template = templates.indexTemplate;
  const posts = await postsQuery(graphql);
  const total = Math.ceil((posts?.edges?.length ?? 0) / postsLimit);

  for (let page = 0; page < total; page += 1) {
    createWithPagination({
      limit: postsLimit,
      template,
      total,
      page,
      path,
    });
  }
};

export { createPages };
