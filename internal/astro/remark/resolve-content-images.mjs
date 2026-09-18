import path from "node:path";
import fs from "node:fs";

const isImage = (node) =>
  Boolean(node) && node.type === "image" && typeof node.url === "string";

// gatsby-remark-images resolved root-absolute urls like /image.jpg against the
// markdown file directory; mirror that so the astro content pipeline picks the
// sibling file up and processes it
const remarkResolveContentImages = () => (tree, file) => {
  const directory = file?.dirname ?? file?.history?.[0]
    ? path.dirname(file.history[0])
    : null;

  if (!directory) {
    return;
  }

  const visit = (node) => {
    if (isImage(node) && node.url.startsWith("/") && !node.url.startsWith("//")) {
      const relative = node.url.slice(1);
      const candidate = path.join(directory, relative);

      if (fs.existsSync(candidate)) {
        node.url = `./${relative}`;
      }
    }

    node.children?.forEach(visit);
  };

  tree.children.forEach(visit);
};

export { remarkResolveContentImages };
