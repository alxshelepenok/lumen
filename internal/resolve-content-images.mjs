import path from "node:path";
import fs from "node:fs";

const isImage = (node) =>
  Boolean(node) && node.type === "image" && typeof node.url === "string";

const remarkResolveContentImages = () => (tree, file) => {
  const directory = file?.history?.[0] ? path.dirname(file.history[0]) : null;

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
