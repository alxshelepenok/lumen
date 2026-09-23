import { describe, expect, it } from "bun:test";

import config from "./astro.config";

describe("astro config", () => {
  it("wires no Sentry integration when no credential is set", () => {
    const names = (config.integrations ?? []).flatMap((integration) => {
      if (Array.isArray(integration)) {
        return integration.map((entry) => (entry ? entry.name : ""));
      }

      return integration ? [integration.name] : [];
    });

    expect(names.some((name) => name.includes("sentry"))).toBe(false);
  });
});
