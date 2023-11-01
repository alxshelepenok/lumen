import React from "react";

import * as styles from "./Content.module.scss";

interface Props {
  title: string;
  body: string;
}

function readingTime(text) {
  const words = text.trim().split(/\s+/).length;
  return Math.ceil(words / 225);
}

const Content: React.FC<Props> = ({ body, title }: Props) => (
  <div className={styles.content}>
    <h1 className={styles.title}>{title}</h1>
    <i>{readingTime(body) + " minutes"}</i>
    <div className={styles.body} dangerouslySetInnerHTML={{ __html: body }} />
  </div>
);

export default Content;
