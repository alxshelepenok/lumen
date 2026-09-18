const withTrailingSlash = (href: string): string =>
  href === "/" || href.endsWith("/") ? href : `${href}/`;

export { withTrailingSlash };
