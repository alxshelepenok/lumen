import React from "react";

import { Button } from "@/components/Button";
import { ThemeSwitcher } from "@/components/ThemeSwitcher";
import type { Node } from "@/types";

import { Author } from "./Author";
import { Comments } from "./Comments";
import { Content } from "./Content";
import { Meta } from "./Meta";
import { Tags } from "./Tags";

import * as styles from "./Post.module.scss";

interface Props {
  post: Node;
}

const Post: React.FC<Props> = ({ post }: Props) => {
  const { html } = post;
  const { tagSlugs, slug } = post.fields;
  const { tags, title, date } = post.frontmatter;
  const [data, setData] = useState(''); // State to store the XHR data

  useEffect(() => {
    // Make an XHR request on page load
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'https://api.countapi.xyz/get/unaligned.world/:PATHNAME:', true);
    xhr.onload = () => {
      if (xhr.status === 200) {
        // Parse the response data (assuming it's JSON)
        const responseData = JSON.parse(xhr.responseText);
        setData(responseData.value); // Update the state with the data
      }
    };
    xhr.send();
  }, []);
  
  return (
    <div className={styles.post}>
      <div className={styles.buttons}>
        <Button className={styles.buttonArticles} title="All Articles" to="/" />
        <ThemeSwitcher />
        <p>{data}</p> {/* Display the XHR data here */}
      </div>

      <div className={styles.content}>
        <Content body={html} title={title} />
      </div>

      <div className={styles.footer}>
        <Meta date={date} />
        {tags && tagSlugs && <Tags tags={tags} tagSlugs={tagSlugs} />}
        <Author />
      </div>

      <div className={styles.comments}>
        <Comments postSlug={slug} postTitle={post.frontmatter.title} />
      </div>
    </div>
  );
};

export default Post;
