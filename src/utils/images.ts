interface ImageVariant {
  src: string;
  srcWebp: string;
  width: number;
  height: number;
}

const srcSetFrom = (variants: readonly ImageVariant[]): string =>
  variants.map((variant) => `${variant.src} ${variant.width}w`).join(", ");

const srcSetWebpFrom = (variants: readonly ImageVariant[]): string =>
  variants.map((variant) => `${variant.srcWebp} ${variant.width}w`).join(", ");

const largestVariant = (
  variants: readonly ImageVariant[]
): ImageVariant =>
  variants.reduce((best, variant) =>
    variant.width > best.width ? variant : best
  );

export { largestVariant, srcSetFrom, srcSetWebpFrom };
export type { ImageVariant };
