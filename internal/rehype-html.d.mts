import type { Plugin } from "unified";
import type { Root } from "hast";

declare const rehypeHtml: Plugin<any[], Root, Root>;

export { rehypeHtml };
