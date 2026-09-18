import type { Plugin } from "unified";
import type { Root } from "mdast";

declare const remarkResolveContentImages: Plugin<any[], Root, Root>;

export { remarkResolveContentImages };
