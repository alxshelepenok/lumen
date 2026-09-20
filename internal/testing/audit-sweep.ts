import { readdir, readFile } from "node:fs/promises";
import { join } from "node:path";

import { parseHTML } from "linkedom";

import { collectSchemaIssues } from "@/utils/audit/schema-audit";

const TARGET_DIR = "target";

const walkHtmlFiles = async (dir: string): Promise<string[]> => {
  const entries = await readdir(dir, { withFileTypes: true });
  const files: string[] = [];

  for (const entry of entries) {
    const full = join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...(await walkHtmlFiles(full)));
    } else if (entry.name === "index.html" || entry.name === "404.html") {
      files.push(full);
    }
  }

  return files;
};

const pathnameOf = (file: string): string => {
  const relative = file
    .slice(file.indexOf(TARGET_DIR) + TARGET_DIR.length)
    .replaceAll("\\", "/");

  return relative.replace(/\/(index|404)\.html$/, "") || "/";
};

const main = async (): Promise<void> => {
  const files = await walkHtmlFiles(TARGET_DIR);
  let issues = 0;

  for (const file of files) {
    const html = await readFile(file, "utf8");
    const { document } = parseHTML(html);
    const pathname = pathnameOf(file);
    const pageIssues = collectSchemaIssues(document, pathname);

    for (const issue of pageIssues) {
      issues += 1;
      console.error(
        `[audit-sweep] ${pathname} ${issue.id ? `${issue.id}: ` : ""}${issue.message}`
      );
    }
  }

  console.log(`[audit-sweep] ${files.length} pages checked, ${issues} issues`);

  if (issues > 0) {
    process.exitCode = 1;
  }
};

await main();
