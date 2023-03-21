import { btoa } from "abab";

const getContactHref = (name: string, contact: string) => {
  const hrefs: { [key: string]: string } = {
    email: btoa(contact) || "",
    line: `line://ti/p/${contact}`,
    telegram: `https://t.me/${contact}`,
    vkontakte: `https://vk.com/${contact}`,
    medium: `https://medium.com/${contact}`,
    github: `https://github.com/${contact}`,
    weibo: `https://www.weibo.com/${contact}`,
    gitlab: `https://www.gitlab.com/${contact}`,
    codepen: `https://www.codepen.io/${contact}`,
    twitter: `https://www.twitter.com/${contact}`,
    soundcloud: `https://soundcloud.com/${contact}`,
    facebook: `https://www.facebook.com/${contact}`,
    instagram: `https://www.instagram.com/${contact}`,
    linkedin: `https://www.linkedin.com/in/${contact}`,
    youtube: `https://www.youtube.com/channel/${contact}`,
    mastodon: `${contact}`,
    twitch: `https://www.twitch.tv/${contact}`,
  };

  return hrefs[name] ?? contact;
};

export default getContactHref;
