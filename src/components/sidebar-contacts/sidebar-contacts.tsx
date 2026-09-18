import React, { type FC } from "react";

import { Icon } from "@/components/icon";
import { icons } from "@/constants/icons";
import { getIcon } from "@/utils/get-icon";
import { getContactHref } from "@/utils/get-contact-href";

import * as styles from "@/assets/styles/modules/sidebar-contacts.module.scss";

type SidebarContactsProps = {
  contacts: {
    name: keyof typeof icons;
    contact: string;
  }[];
};

const SidebarContacts: FC<SidebarContactsProps> = ({ contacts }) => {
  return (
    contacts.length > 0 && (
      <div className={styles.sidebarContacts}>
        <ul className={styles.list}>
          {contacts.map(
            ({ name, contact }) => (
              <li className={styles.item} key={name}>
                {name === "email" ? (
                  <span
                    className={styles.link}
                    onClick={() => {
                      window.location.href = "mailto:" + atob(getContactHref(name, contact));
                    }}
                  >
                    <Icon name={name} icon={getIcon(name)} />
                  </span>
                ) : (
                  <a
                    target="_blank"
                    className={styles.link}
                    href={getContactHref(name, contact)}
                    rel={`noopener noreferrer${name === "mastodon" ? " me" : ""}`}
                  >
                    <Icon name={name} icon={getIcon(name)} />
                  </a>
                )}
              </li>
            ),
          )}
        </ul>
      </div>
    )
  );
};

export { SidebarContacts };
