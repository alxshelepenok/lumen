import React from "react";
import { test, describe, expect, beforeEach, mock } from "bun:test";

import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { getMeta } from "@/utils/get-meta";
import { createSnapshotsRenderer, renderWithCoilProvider } from "@/utils/render-with-coil-provider";

import YearsTemplate, { Head as GatsbyHead } from "./years-template";

const mockedUseStaticQuery = useStaticQuery as ReturnType<typeof mock>;
const mockedStaticQuery = StaticQuery as unknown as ReturnType<typeof mock>;

// Mock the useYearsList hook
const mockUseYearsList = mock(() => [
  { fieldValue: "2023", totalCount: 15 },
  { fieldValue: "2022", totalCount: 10 },
  { fieldValue: "2021", totalCount: 5 }
]);

mock.module("@/hooks/use-years-list", () => ({
  useYearsList: mockUseYearsList
}));

describe("YearsTemplate", () => {
  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
    mockUseYearsList.mockReturnValue([
      { fieldValue: "2023", totalCount: 15 },
      { fieldValue: "2022", totalCount: 10 },
      { fieldValue: "2021", totalCount: 5 }
    ]);
  });

  test("renders correctly", () => {
    const tree = createSnapshotsRenderer(<YearsTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("displays years as links with post counts", () => {
    const { container } = renderWithCoilProvider(<YearsTemplate />);

    // Check if years are rendered as links
    const yearLinks = container.querySelectorAll('a');

    // Filter links that contain years (assuming the year links have specific href pattern)
    const yearHrefs = Array.from(yearLinks)
      .map(link => link.getAttribute('href'))
      .filter(href => href?.includes('/year/'));

    expect(yearHrefs).toEqual([
      "/year/2023/",
      "/year/2022/",
      "/year/2021/"
    ]);
  });

  test("displays post counts for each year", () => {
    const { container } = renderWithCoilProvider(<YearsTemplate />);

    // Check if the post counts are displayed
    expect(container.textContent).toContain("2023 (15)");
    expect(container.textContent).toContain("2022 (10)");
    expect(container.textContent).toContain("2021 (5)");
  });

  test("displays Years as page title", () => {
    const { container } = renderWithCoilProvider(<YearsTemplate />);

    // Check if "Years" is displayed as the page title
    const pageTitle = container.querySelector('[data-testid="page-title"]') ||
      container.querySelector('h1');
    expect(pageTitle?.textContent).toContain("Years");
  });

  test("head renders correctly", () => {
    const { container } = renderWithCoilProvider(<GatsbyHead />);

    expect(getMeta(container, "twitter:card")).toEqual("summary_large_image");
    expect(getMeta(container, "og:title")).toContain("Years");
    expect(getMeta(container, "twitter:title")).toContain("Years");
    expect(getMeta(container, "description")).toContain("Pellentesque");
    expect(getMeta(container, "og:description")).toContain("Pellentesque");
    expect(getMeta(container, "twitter:description")).toContain("Pellentesque");
  });

  test("renders with empty years list", () => {
    mockUseYearsList.mockReturnValueOnce([]);

    const tree = createSnapshotsRenderer(<YearsTemplate />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("renders with single year", () => {
    mockUseYearsList.mockReturnValueOnce([
      { fieldValue: "2023", totalCount: 1 }
    ]);

    const { container } = renderWithCoilProvider(<YearsTemplate />);

    expect(container.textContent).toContain("2023 (1)");

    const yearLinks = container.querySelectorAll('a');
    const yearHrefs = Array.from(yearLinks)
      .map(link => link.getAttribute('href'))
      .filter(href => href?.includes('/year/'));

    expect(yearHrefs).toEqual(["/year/2023/"]);
  });

  test("handles large post counts", () => {
    mockUseYearsList.mockReturnValueOnce([
      { fieldValue: "2023", totalCount: 999 },
      { fieldValue: "2022", totalCount: 1000 }
    ]);

    const { container } = renderWithCoilProvider(<YearsTemplate />);

    expect(container.textContent).toContain("2023 (999)");
    expect(container.textContent).toContain("2022 (1000)");
  });

  test("years are rendered in list format", () => {
    const { container } = renderWithCoilProvider(<YearsTemplate />);

    // Check if years are rendered in an unordered list in the main page content
    const pageContent = container.querySelector('[data-testid="page-content"]') ||
      container.querySelector('main') ||
      container;

    const list = pageContent.querySelector('ul');
    expect(list).toBeTruthy();

    // Only count list items that contain year links (to avoid counting sidebar menu/contacts items)
    const yearListItems = container.querySelectorAll('a[href*="/year/"]');
    expect(yearListItems.length).toBe(3); // Should have 3 years based on mock data
  });

  test("each year link has correct path format", () => {
    const { container } = renderWithCoilProvider(<YearsTemplate />);

    const yearLinks = container.querySelectorAll('a');
    const yearHrefs = Array.from(yearLinks)
      .map(link => link.getAttribute('href'))
      .filter(href => href?.includes('/year/'));

    yearHrefs.forEach(href => {
      expect(href).toMatch(/^\/year\/\d{4}\/$/);
    });
  });
});
