import { mkdir, readFile, writeFile } from "node:fs/promises";

import { dirname } from "node:path";

import satori from "satori";
import sharp from "sharp";

const WIDTH = 1200;
const HEIGHT = 630;

const PADDING_X = 104;
const TITLE_FONT_SIZE = 64;
const TITLE_LINE_HEIGHT = 78;
const DESCRIPTION_FONT_SIZE = 30;
const DESCRIPTION_LINE_HEIGHT = 44;
const SITE_FONT_SIZE = 28;

const COLOR_BACKGROUND = "#1a1a1e";
const COLOR_FOREGROUND = "#fafafa";
const COLOR_MUTED = "#a5a5ac";
const COLOR_PRIMARY = "#ff7aa2";

const TITLE_BUDGET = 96;
const DESCRIPTION_BUDGET = 160;

interface OgCardInput {
  description?: string;
  siteLine: string;
  title: string;
}

const clampText = (text: string, budget: number): string => {
  const value = text.trim();

  if (value.length <= budget) {
    return value;
  }

  const cut = value.slice(0, budget);
  const boundary = cut.lastIndexOf(" ");

  return `${(boundary > budget * 0.6 ? cut.slice(0, boundary) : cut).trim()}…`;
};

const readFont = (weight: 400 | 600): Promise<Buffer> =>
  readFile(
    `internal/og/fonts/Inter-${weight === 400 ? "Regular" : "SemiBold"}.ttf`
  );

const cardElement = (input: OgCardInput) => ({
  type: "div",
  props: {
    style: {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      padding: `${PADDING_X}px`,
      backgroundColor: COLOR_BACKGROUND,
      color: COLOR_FOREGROUND,
      fontFamily: "Inter",
    },
    children: [
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            fontSize: TITLE_FONT_SIZE,
            fontWeight: 600,
            lineHeight: `${TITLE_LINE_HEIGHT}px`,
          },
          children: clampText(input.title, TITLE_BUDGET),
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            marginTop: 24,
            fontSize: DESCRIPTION_FONT_SIZE,
            lineHeight: `${DESCRIPTION_LINE_HEIGHT}px`,
            color: COLOR_MUTED,
          },
          children: clampText(input.description ?? "", DESCRIPTION_BUDGET),
        },
      },
      {
        type: "div",
        props: {
          style: {
            display: "flex",
            marginTop: "auto",
            fontSize: SITE_FONT_SIZE,
            color: COLOR_PRIMARY,
          },
          children: input.siteLine,
        },
      },
    ],
  },
});

const renderOgCardPng = async (input: OgCardInput): Promise<Buffer> => {
  const [regular, semibold] = await Promise.all([readFont(400), readFont(600)]);

  const svg = await satori(
    cardElement(input) as unknown as Parameters<typeof satori>[0],
    {
    width: WIDTH,
    height: HEIGHT,
    fonts: [
      { name: "Inter", data: regular, weight: 400, style: "normal" },
      { name: "Inter", data: semibold, weight: 600, style: "normal" },
    ],
  });

  return sharp(Buffer.from(svg)).png().toBuffer();
};

const writeOgCard = async (
  input: OgCardInput,
  outPath: string
): Promise<{ height: number; path: string; width: number }> => {
  const png = await renderOgCardPng(input);

  await mkdir(dirname(outPath), { recursive: true });
  await writeFile(outPath, png);

  return { height: HEIGHT, path: outPath, width: WIDTH };
};

const CARD_WIDTH = WIDTH;
const CARD_HEIGHT = HEIGHT;

export {
  CARD_HEIGHT as OG_CARD_HEIGHT,
  CARD_WIDTH as OG_CARD_WIDTH,
  clampText,
  renderOgCardPng,
  writeOgCard,
};
