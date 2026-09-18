import React, { type FC, type ReactNode, useEffect } from "react";

import { useTheme } from "@/hooks/use-theme";

import * as styles from "@/assets/styles/modules/layout.module.scss";

interface LayoutProps {
  children: ReactNode;
}

const Layout: FC<LayoutProps> = ({ children }) => {
  const [{ mode }] = useTheme();

  useEffect(() => {
    document.documentElement.className = mode;
  }, [mode]);

  return <div className={styles.layout}>{children}</div>;
};

export { Layout };
