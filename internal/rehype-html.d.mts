import type { Root } from "hast";
import type { Plugin } from "unified";

declare const rehypeHtml: Plugin<any[], Root, Root>;

export { rehypeHtml };
