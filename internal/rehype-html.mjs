import { createHash } from "node:crypto";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const EXTERNAL_HREF = /^https?:\/\//;
const WIDTHS = [320, 480, 640, 750, 828, 960];
const GENERATED_DIR = "public/generated";

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

const writeVariant = async (sourcePath, target, width, height, format) => {
  const pipeline = sharp(sourcePath).resize(width, height);

  if (format === "webp") {
    pipeline.webp({ quality: 80 });
  } else {
    pipeline.toFormat(format, { quality: 80 });
  }

  await pipeline.toFile(target);
};

const generateVariants = async (sourcePath, sourceDir) => {
  const { width = WIDTHS[0], height = WIDTHS[0], format = "jpeg" } =
    await sharp(sourcePath).metadata();

  const dirHash = createHash("md5")
    .update(sourceDir.replaceAll("\\", "/"))
    .digest("hex")
    .slice(0, 8);
  const base = path.basename(sourcePath, path.extname(sourcePath));
  const outDir = path.join(GENERATED_DIR, `${base}-${dirHash}`);

  await mkdir(outDir, { recursive: true });

  const widths = [...new Set([...WIDTHS, width])].filter(
    (candidate) => candidate <= width
  );

  const variants = await Promise.all(
    widths.map(async (variantWidth) => {
      const variantHeight = Math.round((variantWidth * height) / width);
      const [src, srcWebp] = await Promise.all(
        [format, "webp"].map(async (variantFormat) => {
          const name = `${variantWidth}.${variantFormat}`;
          const target = path.join(outDir, name);

          await writeVariant(
            sourcePath,
            target,
            variantWidth,
            variantHeight,
            variantFormat
          );

          return `/${path.join(outDir, name).replaceAll("\\", "/")}`.replace(/^\/public\//, "/");
        })
      );

      return { src, srcWebp, width: variantWidth, height: variantHeight };
    })
  );

  return { variants };
};

const pictureNode = (node, variants) => {
  const largest = variants.reduce((best, variant) =>
    variant.width > best.width ? variant : best
  );
  const sizes = `(min-width: ${largest.width}px) ${largest.width}px, 100vw`;
  const srcset = variants
    .map((variant) => `${variant.src} ${variant.width}w`)
    .join(", ");
  const srcsetWebp = variants
    .map((variant) => `${variant.srcWebp} ${variant.width}w`)
    .join(", ");

  return {
    type: "element",
    tagName: "picture",
    properties: {},
    children: [
      {
        type: "element",
        tagName: "source",
        properties: { srcset: srcsetWebp, sizes, type: "image/webp" },
        children: [],
      },
      {
        type: "element",
        tagName: "img",
        properties: {
          alt: node.properties?.alt ?? "",
          src: largest.src,
          srcset,
          sizes,
          width: largest.width,
          height: largest.height,
          loading: "lazy",
          decoding: "async",
        },
        children: [],
      },
    ],
  };
};

const rehypeHtml = () => async (tree, file) => {
  const slugify = createSlugifier();
  const sourceDir = file?.history?.[0]
    ? path.dirname(file.history[0])
    : null;

  const visit = async (node, parent, index) => {
    if (node.type !== "element") {
      return;
    }

    if (node.tagName === "img" && parent && sourceDir) {
      const src = node.properties?.src;

      if (
        typeof src === "string" &&
        (src.startsWith("/") || src.startsWith("./")) &&
        !src.startsWith("//")
      ) {
        const relative = src.startsWith("/") ? src.slice(1) : src;
        const sourcePath = path.resolve(sourceDir, relative);

        try {
          const { variants } = await generateVariants(sourcePath, sourceDir);

          parent.children[index] = pictureNode(node, variants);
        } catch {
          return;
        }
      }
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

    for (const [childIndex, child] of (node.children ?? []).entries()) {
      await visit(child, node, childIndex);
    }
  };

  for (const [index, child] of tree.children.entries()) {
    await visit(child, tree, index);
  }
};

export { rehypeHtml };
