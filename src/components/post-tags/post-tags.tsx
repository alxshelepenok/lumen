import React, { type FC } from "react";

import { Button } from "@/components/button";

import * as styles from "@/assets/styles/modules/post-tags.module.scss";

interface PostTagsProps {
  tags: string[];
  tagSlugs: string[];
};

const PostTags: FC<PostTagsProps> = ({ tags, tagSlugs }) => (
  <ul className={styles.postTags}>
    {tagSlugs.map((slug, i) => (
      <li className={styles.item} key={slug}>
        <Button title={tags[i]} key={slug} to={slug} />
      </li>
    ))}
  </ul>
);

export { PostTags };
