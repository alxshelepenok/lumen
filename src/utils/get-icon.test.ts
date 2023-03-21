import { ICONS } from "@/constants";
import { getIcon } from "@/utils";

describe("getIcon", () => {
  test("successful return icon", () => {
    expect(getIcon("rss")).toEqual(ICONS.rss);
    expect(getIcon("line")).toEqual(ICONS.line);
    expect(getIcon("github")).toBe(ICONS.github);
    expect(getIcon("email")).toEqual(ICONS.email);
    expect(getIcon("weibo")).toEqual(ICONS.weibo);
    expect(getIcon("twitter")).toBe(ICONS.twitter);
    expect(getIcon("gitlab")).toEqual(ICONS.gitlab);
    expect(getIcon("medium")).toEqual(ICONS.medium);
    expect(getIcon("codepen")).toEqual(ICONS.codepen);
    expect(getIcon("youtube")).toEqual(ICONS.youtube);
    expect(getIcon("facebook")).toEqual(ICONS.facebook);
    expect(getIcon("telegram")).toEqual(ICONS.telegram);
    expect(getIcon("linkedin")).toEqual(ICONS.linkedin);
    expect(getIcon("instagram")).toEqual(ICONS.instagram);
    expect(getIcon("soundcloud")).toEqual(ICONS.soundcloud);
    expect(getIcon("mastodon")).toEqual(ICONS.mastodon);
    expect(getIcon("twitch")).toEqual(ICONS.twitch);
  });
});
