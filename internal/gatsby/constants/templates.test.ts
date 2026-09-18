import path from "node:path";
import { templates } from "./templates";

describe("templates", () => {
  test("should contain correct template paths", () => {
    expect(templates.indexTemplate).toBe(
      path.resolve("./src/templates/index-template.tsx")
    );
    expect(templates.notFoundTemplate).toBe(
      path.resolve("./src/templates/not-found-template.tsx")
    );
    expect(templates.categoriesTemplate).toBe(
      path.resolve("./src/templates/categories-template.tsx")
    );
    expect(templates.categoryTemplate).toBe(
      path.resolve("./src/templates/category-template.tsx")
    );
    expect(templates.tagsTemplate).toBe(
      path.resolve("./src/templates/tags-template.tsx")
    );
    expect(templates.tagTemplate).toBe(
      path.resolve("./src/templates/tag-template.tsx")
    );
    expect(templates.yearsTemplate).toBe(
      path.resolve("./src/templates/years-template.tsx")
    );
    expect(templates.yearTemplate).toBe(
      path.resolve("./src/templates/year-template.tsx")
    );
    expect(templates.pageTemplate).toBe(
      path.resolve("./src/templates/page-template.tsx")
    );
    expect(templates.postTemplate).toBe(
      path.resolve("./src/templates/post-template.tsx")
    );
  });

  test("should be frozen object", () => {
    expect(Object.isFrozen(templates)).toBe(true);
  });

  test("should not allow modification of templates", () => {
    expect(() => {
      // @ts-expect-error Testing immutability
      templates.indexTemplate = "/modified";
    }).toThrow();
  });

  test("should have all required templates defined", () => {
    const expectedTemplates = [
      "indexTemplate",
      "notFoundTemplate",
      "categoriesTemplate",
      "categoryTemplate",
      "tagsTemplate",
      "tagTemplate",
      "yearsTemplate",
      "yearTemplate",
      "pageTemplate",
      "postTemplate",
    ];

    for (const template of expectedTemplates) {
      expect(templates).toHaveProperty(template);
      expect(typeof templates[template as keyof typeof templates]).toBe(
        "string"
      );
    }
  });

  test("all templates should point to .tsx files in src/templates directory", () => {
    for (const templatePath of Object.values(templates)) {
      expect(templatePath).toMatch(/src\/templates\/.*\.tsx$/);
      expect(path.isAbsolute(templatePath)).toBe(true);
    }
  });
});
