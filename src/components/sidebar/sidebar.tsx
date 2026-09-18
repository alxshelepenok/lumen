import React, { type FC } from "react";

import { useSiteMetadata } from "@/hooks/use-site-metadata";

import { SidebarMenu } from "@/components/sidebar-menu";
import { SidebarAuthor } from "@/components/sidebar-author";
import { SidebarContacts } from "@/components/sidebar-contacts";
import { SidebarCopyright } from "@/components/sidebar-copyright";

import * as styles from "@/assets/styles/modules/sidebar.module.scss";

type SidebarProps = {
  isHome?: boolean;
};

const Sidebar: FC<SidebarProps> = ({ isHome }) => {
  const { author, copyright, menu } = useSiteMetadata();

  return (
    <div className={styles.sidebar}>
      <div className={styles.inner}>
        <SidebarAuthor author={author} isHome={isHome} />
        <SidebarMenu menu={menu} />
        <SidebarContacts contacts={author.contacts} />
        <SidebarCopyright copyright={copyright} />
      </div>
    </div>
  );
};

export { Sidebar };
