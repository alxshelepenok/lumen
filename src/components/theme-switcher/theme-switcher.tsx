import React, { type FC, useEffect, useState } from "react";

import cn from "classnames";

import { useTheme } from "@/hooks/use-theme";

import * as styles from "@/assets/styles/modules/theme-switcher.module.scss";

const ThemeSwitcher: FC = () => {
  const [{ mode }, toggleTheme] = useTheme();
  const [isClient, setIsClient] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(typeof window !== "undefined");
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div
      className={cn(styles.themeSwitcher, {
        [styles.dark]: mode === "dark",
      })}
    >
      <button className={styles.button} onClick={toggleTheme}>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <title>{mode}</title>
          <path
            pathLength="1"
            className={styles.moon}
            d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          />
          <circle pathLength="1" className={styles.sun} cx="12" cy="12" r="5" />
          <line
            pathLength="1"
            className={styles.sun}
            x1="12"
            y1="1"
            x2="12"
            y2="3"
          />
          <line
            pathLength="1"
            className={styles.sun}
            x1="12"
            y1="21"
            x2="12"
            y2="23"
          ></line>
          <line
            pathLength="1"
            className={styles.sun}
            x1="4.22"
            y1="4.22"
            x2="5.64"
            y2="5.64"
          />
          <line
            pathLength="1"
            className={styles.sun}
            x1="18.36"
            y1="18.36"
            x2="19.78"
            y2="19.78"
          />
          <line
            pathLength="1"
            className={styles.sun}
            x1="1"
            y1="12"
            x2="3"
            y2="12"
          />
          <line
            pathLength="1"
            className={styles.sun}
            x1="21"
            y1="12"
            x2="23"
            y2="12"
          />
          <line
            pathLength="1"
            className={styles.sun}
            x1="4.22"
            y1="19.78"
            x2="5.64"
            y2="18.36"
          />
          <line
            pathLength="1"
            className={styles.sun}
            x1="18.36"
            y1="5.64"
            x2="19.78"
            y2="4.22"
          />
        </svg>
      </button>
    </div>
  );
};

export { ThemeSwitcher };
