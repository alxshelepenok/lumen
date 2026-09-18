import { describe, expect, it } from "bun:test";

import { withTrailingSlash } from "@/utils/with-trailing-slash";

describe("withTrailingSlash", () => {
  it("keeps the root as is", () => {
    expect(withTrailingSlash("/")).toBe("/");
  });

  it("appends a slash to internal paths", () => {
    expect(withTrailingSlash("/posts/a-brief-history")).toBe(
      "/posts/a-brief-history/"
    );
  });

  it("does not double a slash", () => {
    expect(withTrailingSlash("/tag/linotype/")).toBe("/tag/linotype/");
  });
});
