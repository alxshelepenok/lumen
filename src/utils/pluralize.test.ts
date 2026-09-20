import { describe, expect, it } from "bun:test";

import { articleCount } from "@/utils/pluralize";

describe("articleCount", () => {
  it("uses the singular for exactly one", () => {
    expect(articleCount(1)).toBe("1 article");
  });

  it("uses the plural otherwise", () => {
    expect(articleCount(0)).toBe("0 articles");
    expect(articleCount(2)).toBe("2 articles");
    expect(articleCount(11)).toBe("11 articles");
  });
});
