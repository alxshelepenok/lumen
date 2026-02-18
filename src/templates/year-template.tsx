import React, { type FC } from "react";
import { graphql } from "gatsby";

import { Feed } from "@/components/feed";
import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { Pagination } from "@/components/pagination";
import { useSiteMetadata } from "@/hooks/use-site-metadata";
import { type PageContext } from "@/types/page-context";
import { type AllMarkdownRemark } from "@/types/all-markdown-remark";

interface YearTemplateProps {
  data: {
    allMarkdownRemark: AllMarkdownRemark;
  };
  pageContext: PageContext;
}

const YearTemplate: FC<YearTemplateProps> = ({ data, pageContext }) => {
  const { group, pagination } = pageContext;
  const { prevPagePath, nextPagePath, hasPrevPage, hasNextPage } = pagination;
  const { edges } = data.allMarkdownRemark;

  return (
    <Layout>
      <Sidebar />
      <Page title={group}>
        <Feed edges={edges} />
        <Pagination
          prevPagePath={prevPagePath}
          nextPagePath={nextPagePath}
          hasPrevPage={hasPrevPage}
          hasNextPage={hasNextPage}
        />
      </Page>
    </Layout>
  );
};

export const query = graphql`
  query YearTemplate($yearStart: Date, $yearEnd: Date, $limit: Int!, $offset: Int!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      limit: $limit
      skip: $offset
      filter: {
        frontmatter: {
          template: { eq: "post" }
          draft: { ne: true }
          date: { gte: $yearStart, lt: $yearEnd }
        }
      }
      sort: { frontmatter: { date: DESC } }
    ) {
      edges {
        node {
          fields {
            slug
            categorySlug
          }
          frontmatter {
            title
            date
            category
            description
            slug
          }
        }
      }
    }
  }
`;

export const Head: FC<YearTemplateProps> = ({ pageContext }) => {
  const { title, description } = useSiteMetadata();

  const {
    group,
    pagination: { currentPage: page },
  } = pageContext;

  const pageTitle =
    page > 0 ? `Year ${group} - Page ${page} - ${title}` : `Year ${group} - ${title}`;

  return <Meta title={pageTitle} description={description} />;
};

export default YearTemplate;
