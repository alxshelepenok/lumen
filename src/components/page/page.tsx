import React, { type FC, type ReactNode } from "react";

import * as styles from "@/assets/styles/modules/page.module.scss";

interface PageProps {
  title?: string;
  children: ReactNode;
}

const Page: FC<PageProps> = ({ title, children }) => {
  return (
    <div className={styles.page}>
      <div className={styles.inner}>
        {title && <h1 className={styles.title}>{title}</h1>}
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  );
};

export { Page };
