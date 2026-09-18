import React, { type FC } from "react";

import * as styles from "@/assets/styles/modules/post-content.module.scss";

interface PostContentProps {
  title: string;
  body: string;
}

const PostContent: FC<PostContentProps> = ({ body, title }) => (
  <div className={styles.postContent}>
    <h1 className={styles.title}>{title}</h1>
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export { PostContent };
