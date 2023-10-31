import React from "react";
import { Link } from "gatsby";
import { Edge } from "@/types";
import * as styles from "./Feed.module.scss";
import likebtn from "./likebtn";

type Props = {
  edges: Array<Edge>;
};

const Feed: React.FC<Props> = ({ edges }: Props) => (
  <div className={styles.feed}>
    {edges.map((edge) => (
      <div className={styles.item} key={edge.node.fields.slug}>
        <div className={styles.meta}>
          <time
            className={styles.time}
            dateTime={new Date(edge.node.frontmatter.date).toLocaleDateString(
              "en-US",
              { year: "numeric", month: "long", day: "numeric" },
            )}
          >
            {new Date(edge.node.frontmatter.date).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
            })}
          </time>
          <span className={styles.divider} />
          <span className={styles.category}>
            <Link to={edge.node.fields.categorySlug} className={styles.link}>
              {edge.node.frontmatter.category}
            </Link>
          </span>
        </div>

        {/* Insert the provided HTML code here, right before the <h2> element */}
        <span class="likebtn-wrapper" data-theme="custom" data-btn_size="31" data-f_size="13" data-icon_size="48" data-icon_d="hrt6-o" data-icon_d_url="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='-24 -24 560 560'%3E%3C!-- Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3E%3Cpath d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5' fill='%23ffffff' stroke='%23FF3399' stroke-width='40'/%3E%3C/svg%3E" data-icon_d_url_v="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' height='1em' viewBox='-24 -24 560 560'%3E%3C!-- Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --%3E%3Cpath d='M47.6 300.4L228.3 469.1c7.5 7 17.4 10.9 27.7 10.9s20.2-3.9 27.7-10.9L464.4 300.4c30.4-28.3 47.6-68 47.6-109.5v-5.8c0-69.9-50.5-129.5-119.4-141C347 36.5 300.6 51.4 268 84L256 96 244 84c-32.6-32.6-79-47.5-124.6-39.9C50.5 55.6 0 115.2 0 185.1v5.8c0 41.5 17.2 81.2 47.6 109.5' fill='%23FF99CC' stroke='%23FF3399' stroke-width='40'/%3E%3C/svg%3E" data-icon_d_c="#e43f5e" data-icon_d_c_v="#e43f5e" data-bg_c="rgba(250,250,250,0)" data-bg_c_v="rgba(250,250,250,0)" data-brdr_c="rgba(198,198,198,0)" data-ef_voting="grow" data-identifier="likebutton" data-show_like_label="false" data-like_enabled="false" data-icon_like_show="false" data-item_url="https://unaligned.world/posts/archive/nothing-you-do" data-tooltip_enabled="false"></span>
        <likebtn />
        <h2 className={styles.title}>
          <Link
            className={styles.link}
            to={edge.node.frontmatter?.slug || edge.node.fields.slug}
          >
            {edge.node.frontmatter.title}
          </Link>
        </h2>
        <p
          className={styles.description}
          dangerouslySetInnerHTML={{ __html: edge.node.frontmatter.description }}
        ></p>
        <Link
          className={styles.more}
          to={edge.node.frontmatter?.slug || edge.node.fields.slug}
        >
          Read
        </Link>
      </div>
    ))}
  </div>
);

export default Feed;
