import path from "node:path";

const templates = Object.freeze({
  indexTemplate: path.resolve("./src/templates/index-template.tsx"),
  notFoundTemplate: path.resolve("./src/templates/not-found-template.tsx"),
  categoriesTemplate: path.resolve("./src/templates/categories-template.tsx"),
  categoryTemplate: path.resolve("./src/templates/category-template.tsx"),
  tagsTemplate: path.resolve("./src/templates/tags-template.tsx"),
  tagTemplate: path.resolve("./src/templates/tag-template.tsx"),
  yearsTemplate: path.resolve("./src/templates/years-template.tsx"),
  yearTemplate: path.resolve("./src/templates/year-template.tsx"),
  pageTemplate: path.resolve("./src/templates/page-template.tsx"),
  postTemplate: path.resolve("./src/templates/post-template.tsx"),
});

export { templates };
