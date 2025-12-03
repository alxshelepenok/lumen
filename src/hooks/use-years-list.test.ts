import { describe, expect, test, beforeEach, mock } from "bun:test";
import { renderHook } from "@testing-library/react";
import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { useYearsList } from "@/hooks/use-years-list";

const mockedUseStaticQuery = useStaticQuery as ReturnType<typeof mock>;
const mockedStaticQuery = StaticQuery as unknown as ReturnType<typeof mock>;

describe("useYearsList", () => {
  beforeEach(() => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: {
        group: [
          { fieldValue: "2023-05-15", totalCount: 2 },
          { fieldValue: "2023-08-20", totalCount: 1 },
          { fieldValue: "2022-12-01", totalCount: 3 },
          { fieldValue: "2024-01-10", totalCount: 1 },
        ],
      },
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);
  });

  test("should return an array of years with aggregated counts sorted in descending order", () => {
    const { result } = renderHook(() => useYearsList());

    expect(result.current).toEqual([
      { fieldValue: "2024", totalCount: 1 },
      { fieldValue: "2023", totalCount: 3 }, // 2 + 1 from same year
      { fieldValue: "2022", totalCount: 3 },
    ]);
  });

  test("should return an empty array if no posts are found", () => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: {
        group: [],
      },
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);

    const { result } = renderHook(() => useYearsList());
    expect(result.current).toEqual([]);
  });

  test("should aggregate posts from the same year correctly", () => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: {
        group: [
          { fieldValue: "2023-01-15", totalCount: 2 },
          { fieldValue: "2023-06-20", totalCount: 3 },
          { fieldValue: "2023-12-30", totalCount: 1 },
        ],
      },
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);

    const { result } = renderHook(() => useYearsList());

    expect(result.current).toEqual([
      { fieldValue: "2023", totalCount: 6 }, // 2 + 3 + 1
    ]);
  });

  test("should handle single year with single post", () => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: {
        group: [{ fieldValue: "2023-07-15", totalCount: 1 }],
      },
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);

    const { result } = renderHook(() => useYearsList());

    expect(result.current).toEqual([{ fieldValue: "2023", totalCount: 1 }]);
  });

  test("should sort years in descending order", () => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: {
        group: [
          { fieldValue: "2020-01-01", totalCount: 1 },
          { fieldValue: "2024-01-01", totalCount: 2 },
          { fieldValue: "2021-01-01", totalCount: 3 },
          { fieldValue: "2023-01-01", totalCount: 4 },
        ],
      },
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);

    const { result } = renderHook(() => useYearsList());

    expect(result.current).toEqual([
      { fieldValue: "2024", totalCount: 2 },
      { fieldValue: "2023", totalCount: 4 },
      { fieldValue: "2021", totalCount: 3 },
      { fieldValue: "2020", totalCount: 1 },
    ]);
  });

  test("should handle different date formats correctly", () => {
    const props = {
      ...mocks.siteMetadata,
      allMarkdownRemark: {
        group: [
          { fieldValue: "2023-12-31T23:59:59.999Z", totalCount: 1 },
          { fieldValue: "2022-01-01T00:00:00.000Z", totalCount: 2 },
        ],
      },
    };

    mockedStaticQuery.mockImplementationOnce(({ render }) => render(props));
    mockedUseStaticQuery.mockReturnValue(props);

    const { result } = renderHook(() => useYearsList());

    expect(result.current).toEqual([
      { fieldValue: "2023", totalCount: 1 },
      { fieldValue: "2022", totalCount: 2 },
    ]);
  });
});
