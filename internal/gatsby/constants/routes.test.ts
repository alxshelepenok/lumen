import { routes } from "./routes";

describe("routes", () => {
  test("should contain correct route paths", () => {
    expect(routes.indexRoute).toBe("/");
    expect(routes.notFoundRoute).toBe("/404");
    expect(routes.categoriesListRoute).toBe("/categories");
    expect(routes.categoryRoute).toBe("/category");
    expect(routes.tagsListRoute).toBe("/tags");
    expect(routes.tagRoute).toBe("/tag");
    expect(routes.yearsListRoute).toBe("/years");
    expect(routes.yearRoute).toBe("/year");
  });

  test("should be frozen object", () => {
    expect(Object.isFrozen(routes)).toBe(true);
  });

  test("should not allow modification of routes", () => {
    expect(() => {
      // @ts-expect-error Testing immutability
      routes.indexRoute = "/modified";
    }).toThrow();
  });

  test("should have all required routes defined", () => {
    const expectedRoutes = [
      "indexRoute",
      "notFoundRoute",
      "categoriesListRoute",
      "categoryRoute",
      "tagsListRoute",
      "tagRoute",
      "yearsListRoute",
      "yearRoute",
    ];

    expectedRoutes.forEach((route) => {
      expect(routes).toHaveProperty(route);
      expect(typeof routes[route as keyof typeof routes]).toBe("string");
    });
  });
});
