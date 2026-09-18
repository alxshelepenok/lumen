import React from "react";
import { test, describe, expect, beforeEach, mock } from "bun:test";

import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { getMeta } from "@/utils/get-meta";
import { createSnapshotsRenderer, renderWithCoilProvider } from "@/utils/render-with-coil-provider";

import YearTemplate, { Head as GatsbyHead } from "./year-template";

const mockedUseStaticQuery = useStaticQuery as ReturnType<typeof mock>;
const mockedStaticQuery = StaticQuery as unknown as ReturnType<typeof mock>;

describe("YearTemplate", () => {
  const props = {
    data: {
      allMarkdownRemark: mocks.allMarkdownRemark,
    },
    pageContext: {
      ...mocks.pageContext,
      group: "2023", // Override group to be a year
    },
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders correctly", () => {
    const tree = createSnapshotsRenderer(<YearTemplate {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("displays year in page title", () => {
    const { container } = renderWithCoilProvider(<YearTemplate {...props} />);

    // Check if the year is displayed as the page title
    const pageTitle = container.querySelector('[data-testid="page-title"]') ||
      container.querySelector('h1');
    expect(pageTitle?.textContent).toContain("2023");
  });

  test("renders feed and pagination components", () => {
    const tree = createSnapshotsRenderer(<YearTemplate {...props} />).toJSON();

    // The snapshot should include Feed and Pagination components
    expect(tree).toMatchSnapshot();
  });

  test("head renders correctly with year in title", () => {
    const yearProps = {
      ...props,
      pageContext: {
        ...props.pageContext,
        group: "2023",
        pagination: {
          currentPage: 0,
        }
      }
    };

    const { container } = renderWithCoilProvider(<GatsbyHead {...yearProps} />);

    expect(getMeta(container, "twitter:card")).toEqual("summary_large_image");
    expect(getMeta(container, "og:title")).toContain("Year 2023");
    expect(getMeta(container, "twitter:title")).toContain("Year 2023");
    expect(getMeta(container, "description")).toContain("Pellentesque");
    expect(getMeta(container, "og:description")).toContain("Pellentesque");
    expect(getMeta(container, "twitter:description")).toContain("Pellentesque");
  });

  test("head renders correctly with pagination", () => {
    const paginatedProps = {
      ...props,
      pageContext: {
        ...props.pageContext,
        group: "2023",
        pagination: {
          currentPage: 2,
        }
      }
    };

    const { container } = renderWithCoilProvider(<GatsbyHead {...paginatedProps} />);

    expect(getMeta(container, "og:title")).toContain("Year 2023 - Page 2");
    expect(getMeta(container, "twitter:title")).toContain("Year 2023 - Page 2");
  });

  test("handles different year values", () => {
    const props2022 = {
      ...props,
      pageContext: {
        ...props.pageContext,
        group: "2022",
      },
    };

    const tree = createSnapshotsRenderer(<YearTemplate {...props2022} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("pagination is passed correctly to Pagination component", () => {
    const paginationProps = {
      ...props,
      pageContext: {
        ...props.pageContext,
        group: "2023",
        pagination: {
          prevPagePath: "/year/2023/page/1",
          nextPagePath: "/year/2023/page/3",
          hasPrevPage: true,
          hasNextPage: true,
          currentPage: 2,
        }
      }
    };

    const tree = createSnapshotsRenderer(<YearTemplate {...paginationProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders with empty data", () => {
    const emptyProps = {
      ...props,
      data: {
        allMarkdownRemark: {
          edges: []
        }
      }
    };

    const tree = createSnapshotsRenderer(<YearTemplate {...emptyProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
