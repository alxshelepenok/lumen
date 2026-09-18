import type { Root } from "mdast";
import type { Plugin } from "unified";

declare const remarkResolveContentImages: Plugin<any[], Root, Root>;

export { remarkResolveContentImages };
