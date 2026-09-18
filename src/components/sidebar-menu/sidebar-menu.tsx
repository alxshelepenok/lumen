import React, { type FC } from "react";

import { Link } from "gatsby";

import * as styles from "@/assets/styles/modules/sidebar-menu.module.scss";

type SidebarMenuProps = {
  menu: Array<{
    title: string;
    url: string;
  }>;
};

const SidebarMenu: FC<SidebarMenuProps> = ({ menu }) => (
  <nav className={styles.sidebarMenu}>
    <ul className={styles.list}>
      {menu.map((item) => (
        <li className={styles.item} key={item.url}>
          <Link
            to={item.url}
            className={styles.link}
            activeClassName={styles.active}
          >
            {item.title}
          </Link>
        </li>
      ))}
    </ul>
  </nav>
);

export { SidebarMenu };
