import { icons } from "@/constants/icons";

import config from "../../content/config.json";

type SiteMetadataAuthor = {
  title: string;
  photo: string;
  description: string;
  contacts: {
    name: keyof typeof icons;
    contact: string;
  }[];
};

type SiteMetadataMenu = {
  title: string;
  url: string;
}[];

interface SiteMetadata {
  author: SiteMetadataAuthor;
  menu: SiteMetadataMenu;
  description: string;
  copyright: string;
  title: string;
  url: string;
  feedLimit: number;
  googleAnalyticsId: string;
  pathPrefix: string;
}

const getSiteMetadata = (): SiteMetadata => config as SiteMetadata;

export { getSiteMetadata };
export type { SiteMetadata, SiteMetadataAuthor, SiteMetadataMenu };
