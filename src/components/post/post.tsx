import React, { type FC } from "react";
import {MathJaxContext} from "better-react-mathjax";
import {MathJax} from "better-react-mathjax";

import type { Node } from "@/types/node";
import { Button } from "@/components/button";
import { PostTags } from "@/components/post-tags";
import { PostAuthor } from "@/components/post-author";
import { PostFooter } from "@/components/post-footer";
import { PostContent } from "@/components/post-content";
import { ThemeSwitcher } from "@/components/theme-switcher";

import * as styles from "./post.module.scss";

interface PostProps {
  post: Node;
}

const Post: FC<PostProps> = ({ post }) => {
  const { html } = post;
  const { tagSlugs } = post.fields;
  const { tags, title, date } = post.frontmatter;

  return (
    <div className={styles.post}>
      <MathJaxContext>
      <div className={styles.buttons}>
        <Button className={styles.buttonArticles} title="All Articles" to="/" />
        <ThemeSwitcher />
      </div>
      <div className={styles.content}>
          <MathJax>
            <PostContent body={html} title={title} />
          </MathJax>
      </div>
      <div className={styles.footer}>
        <PostFooter date={date} />
        {tags && tagSlugs && <PostTags tags={tags} tagSlugs={tagSlugs} />}
        <PostAuthor />
      </div>
      </MathJaxContext>
    </div>
  );
};

export { Post };
