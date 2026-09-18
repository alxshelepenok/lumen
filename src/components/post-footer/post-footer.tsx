import React, { type FC } from "react";

import * as styles from "@/assets/styles/modules/post-footer.module.scss";

interface PostFooterProps {
  date: string;
}

const PostFooter: FC<PostFooterProps> = ({ date }) => (
  <div className={styles.postFooter}>
    <p className={styles.date}>
      Published{" "}
      {new Date(date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      })}
    </p>
  </div>
);

export { PostFooter };
