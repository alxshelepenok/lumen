import { describe, expect, it } from "bun:test";

import { getReadingTime } from "@/utils/get-reading-time";

describe("getReadingTime", () => {
  it("returns at least one minute for any non-empty body", () => {
    expect(getReadingTime("one")).toBe(1);
  });

  it("rounds the word count over 200 words per minute", () => {
    expect(getReadingTime("word ".repeat(1000).trim())).toBe(5);
    expect(getReadingTime("word ".repeat(250).trim())).toBe(1);
    expect(getReadingTime("word ".repeat(350).trim())).toBe(2);
  });

  it("returns nothing without a body", () => {
    expect(getReadingTime(undefined)).toBeUndefined();
    expect(getReadingTime("")).toBeUndefined();
  });
});
