const EXTERNAL_HREF = /^https?:\/\//;

const anchorIcon = {
  type: "element",
  tagName: "svg",
  properties: {
    ariaHidden: "true",
    focusable: "false",
    height: 16,
    version: "1.1",
    viewBox: "0 0 16 16",
    width: 16,
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: {
        fillRule: "evenodd",
        d: "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z",
      },
      children: [],
    },
  ],
};

const textOf = (node) =>
  node.children
    .map((child) => (child.type === "text" ? child.value : textOf(child)))
    .join("");

const createSlugifier = () => {
  const seen = new Map();

  return (text) => {
    const base =
      text
        .toLowerCase()
        .trim()
        .replace(/[^\p{L}\p{N}\s-]/gu, "")
        .replace(/\s+/g, "-") || "heading";
    const count = seen.get(base) ?? 0;

    seen.set(base, count + 1);

    return count === 0 ? base : `${base}-${count}`;
  };
};

const rehypeHtml = () => (tree) => {
  const slugify = createSlugifier();

  const visit = (node) => {
    if (node.type !== "element") {
      return;
    }

    if (node.tagName === "a") {
      const href = node.properties?.href;

      if (typeof href === "string" && EXTERNAL_HREF.test(href)) {
        node.properties.target = "_blank";
        node.properties.rel = "noopener";
      }
    }

    if (/^h[1-6]$/.test(node.tagName)) {
      const id = slugify(textOf(node));

      node.properties.id = id;
      node.properties.style = "position: relative;";
      node.children.unshift({
        type: "element",
        tagName: "a",
        properties: {
          ariaLabel: `${id.replace(/-/g, " ")} permalink`,
          className: ["anchor", "before"],
          href: `#${id}`,
        },
        children: [anchorIcon],
      });
    }

    node.children?.forEach((child, childIndex) => {
      visit(child, node, childIndex);
    });
  };

  tree.children.forEach((child, index) => {
    visit(child, tree, index);
  });
};

export { rehypeHtml };
