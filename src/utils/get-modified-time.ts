import { statSync } from "node:fs";

const getModifiedTime = (filePath: string): string => {
  try {
    return statSync(filePath).mtime.toISOString();
  } catch {
    return "";
  }
};

export { getModifiedTime };
