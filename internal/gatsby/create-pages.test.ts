import { createPages } from "./create-pages";
import { routes } from "./constants/routes";
import { templates } from "./constants/templates";

// Mock the query modules
jest.mock("./queries/pages-query", () => ({
  pagesQuery: jest.fn(),
}));

jest.mock("./queries/metadata-query", () => ({
  metadataQuery: jest.fn(),
}));

jest.mock("./queries/categories-query", () => ({
  categoriesQuery: jest.fn(),
}));

jest.mock("./queries/tags-query", () => ({
  tagsQuery: jest.fn(),
}));

jest.mock("./queries/years-query", () => ({
  yearsQuery: jest.fn(),
}));

jest.mock("./queries/posts-query", () => ({
  postsQuery: jest.fn(),
}));

jest.mock("../../src/utils/concat", () => ({
  concat: jest.fn((...args) => args.join("")),
}));

import { pagesQuery } from "./queries/pages-query";
import { metadataQuery } from "./queries/metadata-query";
import { categoriesQuery } from "./queries/categories-query";
import { tagsQuery } from "./queries/tags-query";
import { yearsQuery } from "./queries/years-query";
import { postsQuery } from "./queries/posts-query";

const mockPagesQuery = pagesQuery as jest.MockedFunction<typeof pagesQuery>;
const mockMetadataQuery = metadataQuery as jest.MockedFunction<
  typeof metadataQuery
>;
const mockCategoriesQuery = categoriesQuery as jest.MockedFunction<
  typeof categoriesQuery
>;
const mockTagsQuery = tagsQuery as jest.MockedFunction<typeof tagsQuery>;
const mockYearsQuery = yearsQuery as jest.MockedFunction<typeof yearsQuery>;
const mockPostsQuery = postsQuery as jest.MockedFunction<typeof postsQuery>;

describe("createPages", () => {
  const mockCreatePage = jest.fn();
  const mockGraphql = jest.fn();
  const mockActions = { createPage: mockCreatePage };

  beforeEach(() => {
    jest.clearAllMocks();

    // Setup default mock returns
    mockPagesQuery.mockResolvedValue([
      {
        node: {
          frontmatter: { template: "page", slug: "/test-page" },
          fields: { slug: "/test-page" },
        },
      },
      {
        node: {
          frontmatter: { template: "post", slug: "/test-post" },
          fields: { slug: "/test-post" },
        },
      },
    ]);

    mockMetadataQuery.mockResolvedValue({ feedLimit: 10 });
    mockCategoriesQuery.mockResolvedValue([
      { fieldValue: "Category One", totalCount: 5 },
      { fieldValue: "Category Two", totalCount: 15 },
    ]);

    mockTagsQuery.mockResolvedValue([
      { fieldValue: "Tag One", totalCount: 3 },
      { fieldValue: "Tag Two", totalCount: 7 },
    ]);

    mockYearsQuery.mockResolvedValue([
      { fieldValue: "2023", totalCount: 12 },
      { fieldValue: "2022", totalCount: 8 },
    ]);

    mockPostsQuery.mockResolvedValue({
      edges: new Array(25)
        .fill(null)
        .map((_, i) => ({ node: { id: `post-${i}` } })),
    });
  });

  test("should create static pages", async () => {
    await createPages({ graphql: mockGraphql, actions: mockActions } as any);

    // Check that static pages are created
    expect(mockCreatePage).toHaveBeenCalledWith({
      path: routes.notFoundRoute,
      component: templates.notFoundTemplate,
      context: {},
    });

    expect(mockCreatePage).toHaveBeenCalledWith({
      path: routes.categoriesListRoute,
      component: templates.categoriesTemplate,
      context: {},
    });

    expect(mockCreatePage).toHaveBeenCalledWith({
      path: routes.tagsListRoute,
      component: templates.tagsTemplate,
      context: {},
    });

    expect(mockCreatePage).toHaveBeenCalledWith({
      path: routes.yearsListRoute,
      component: templates.yearsTemplate,
      context: {},
    });
  });

  test("should create pages from markdown files", async () => {
    await createPages({ graphql: mockGraphql, actions: mockActions } as any);

    // Check that page template is used for pages
    expect(mockCreatePage).toHaveBeenCalledWith({
      path: "/test-page",
      component: templates.pageTemplate,
      context: { slug: "/test-page" },
    });

    // Check that post template is used for posts
    expect(mockCreatePage).toHaveBeenCalledWith({
      path: "/test-post",
      component: templates.postTemplate,
      context: { slug: "/test-post" },
    });
  });

  test("should create category pages with pagination", async () => {
    await createPages({ graphql: mockGraphql, actions: mockActions } as any);

    // Should create category pages based on mocked data
    // Category One: 5 posts with limit 10 = 1 page
    // Category Two: 15 posts with limit 10 = 2 pages
    const categoryPageCalls = mockCreatePage.mock.calls.filter(
      (call) => call[0].component === templates.categoryTemplate
    );

    expect(categoryPageCalls.length).toBeGreaterThan(0);

    // Check if pagination context is properly set
    categoryPageCalls.forEach((call) => {
      const context = call[0].context;
      expect(context).toHaveProperty("group");
      expect(context).toHaveProperty("limit");
      expect(context).toHaveProperty("offset");
      expect(context).toHaveProperty("pagination");
      expect(context.pagination).toHaveProperty("currentPage");
      expect(context.pagination).toHaveProperty("hasNextPage");
      expect(context.pagination).toHaveProperty("hasPrevPage");
    });
  });

  test("should create tag pages with pagination", async () => {
    await createPages({ graphql: mockGraphql, actions: mockActions } as any);

    const tagPageCalls = mockCreatePage.mock.calls.filter(
      (call) => call[0].component === templates.tagTemplate
    );

    expect(tagPageCalls.length).toBeGreaterThan(0);

    tagPageCalls.forEach((call) => {
      const context = call[0].context;
      expect(context).toHaveProperty("group");
      expect(context).toHaveProperty("pagination");
    });
  });

  test("should create year pages with date range context", async () => {
    await createPages({ graphql: mockGraphql, actions: mockActions } as any);

    const yearPageCalls = mockCreatePage.mock.calls.filter(
      (call) => call[0].component === templates.yearTemplate
    );

    expect(yearPageCalls.length).toBeGreaterThan(0);

    yearPageCalls.forEach((call) => {
      const context = call[0].context;
      expect(context).toHaveProperty("yearStart");
      expect(context).toHaveProperty("yearEnd");
      expect(context.yearStart).toMatch(/^\d{4}-01-01$/);
      expect(context.yearEnd).toMatch(/^\d{4}-01-01$/);
    });
  });

  test("should create index pages with pagination", async () => {
    await createPages({ graphql: mockGraphql, actions: mockActions } as any);

    const indexPageCalls = mockCreatePage.mock.calls.filter(
      (call) => call[0].component === templates.indexTemplate
    );

    // With 25 posts and limit 10, should create 3 pages
    expect(indexPageCalls.length).toBe(3);

    // First page should be at root path
    expect(indexPageCalls[0][0].path).toBe("/");

    indexPageCalls.forEach((call) => {
      const context = call[0].context;
      expect(context).toHaveProperty("limit");
      expect(context).toHaveProperty("offset");
      expect(context).toHaveProperty("pagination");
    });
  });
});
