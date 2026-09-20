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
    fill: "none",
    focusable: "false",
    height: 18,
    viewBox: "0 0 24 24",
    width: 18,
  },
  children: [
    {
      type: "element",
      tagName: "path",
      properties: {
        d: "M9.14339 10.691L9.35031 10.4841C11.329 8.50532 14.5372 8.50532 16.5159 10.4841C18.4947 12.4628 18.4947 15.671 16.5159 17.6497L13.6497 20.5159C11.671 22.4947 8.46279 22.4947 6.48405 20.5159C4.50532 18.5372 4.50532 15.329 6.48405 13.3503L6.9484 12.886",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "1.5",
      },
      children: [],
    },
    {
      type: "element",
      tagName: "path",
      properties: {
        d: "M17.0516 11.114L17.5159 10.6497C19.4947 8.67095 19.4947 5.46279 17.5159 3.48405C15.5372 1.50532 12.329 1.50532 10.3503 3.48405L7.48405 6.35031C5.50532 8.32904 5.50532 11.5372 7.48405 13.5159C9.46279 15.4947 12.671 15.4947 14.6497 13.5159L14.8566 13.309",
        stroke: "currentColor",
        strokeLinecap: "round",
        strokeWidth: "1.5",
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
          ariaLabel: `Link to heading "${id.replace(/-/g, " ")}"`,
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
