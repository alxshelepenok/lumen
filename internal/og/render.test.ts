import { describe, expect, it } from "bun:test";

import sharp from "sharp";

import {
  OG_CARD_HEIGHT,
  OG_CARD_WIDTH,
  clampText,
  renderOgCardPng,
} from "./render";

const input = {
  description:
    "Before anyone, human or agent, touches a line of code, you can compute exactly what must exist first.",
  siteLine: "lumen.alxshelepenok.com",
  title: "Exploring the Depths of Innovation",
};

describe("og card clamp", () => {
  it("keeps short text as is", () => {
    expect(clampText("Short title", 96)).toBe("Short title");
  });

  it("cuts long text on a word boundary with an ellipsis", () => {
    const long =
      "Your project has a light cone and it deserves a budget check before anyone touches code";
    const clamped = clampText(long, 40);

    expect(clamped.length).toBeLessThanOrEqual(41);
    expect(clamped.endsWith("…")).toBe(true);
    expect(clamped.slice(0, -1).endsWith(" ")).toBe(false);
  });
});

describe("og card render", () => {
  it("renders a 1200x630 png", async () => {
    const png = await renderOgCardPng(input);
    const meta = await sharp(png).metadata();

    expect(meta.width).toBe(OG_CARD_WIDTH);
    expect(meta.height).toBe(OG_CARD_HEIGHT);
    expect(meta.format).toBe("png");
  });

  it("renders identical bytes for identical input", async () => {
    const [first, second] = await Promise.all([
      renderOgCardPng(input),
      renderOgCardPng(input),
    ]);

    expect(Buffer.compare(first, second)).toBe(0);
  });

  it("renders without a description", async () => {
    const png = await renderOgCardPng({ ...input, description: undefined });
    const meta = await sharp(png).metadata();

    expect(meta.width).toBe(OG_CARD_WIDTH);
  });
});
