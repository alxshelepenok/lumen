const toKebabCase = (str: string = "") =>
  str
    .match(/[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g)
    ?.map((word) => word.toLowerCase())
    .join("-") || "";

const SLICE = {
  page: "page",
  article: "article",
  breadcrumb: "breadcrumb",
  articles: "articles",
  web: "web",
  person: "person",
} as const;

type Slice = string;

class Route {
  constructor(readonly path: string) {}

  get clean(): string {
    return this.path === "/" ? "" : this.path.replace(/\/$/, "");
  }

  href(): string {
    return this.path === "/" ? "/" : `${this.clean}/`;
  }

  anchor(slice: Slice): string {
    return `${this.href()}#${slice}`;
  }

  url(site?: string): string {
    return `${site ?? ""}${this.clean}`;
  }

  canonical(site: string): string {
    return `${site}${this.href()}`;
  }

  id(site: string, slice: Slice): string {
    return `${this.canonical(site)}#${slice}`;
  }
}

const routes = {
  category: (name: string) => new Route(`/category/${toKebabCase(name)}`),
  home: () => new Route("/"),
  page: (slug: string) => new Route(`/pages/${slug}`),
  paginated: (route: Route, page: number) =>
    new Route(page === 0 ? route.path : `${route.clean}/page/${page}`),
  post: (slug: string) => new Route(`/posts/${slug}`),
  tag: (name: string) => new Route(`/tag/${toKebabCase(name)}`),
  year: (year: string) => new Route(`/year/${year}`),
};

export { Route, SLICE, routes, toKebabCase };
export type { Slice };
