import React, { type FC } from "react";

import { Link } from "gatsby";

import { Meta } from "@/components/meta";
import { Page } from "@/components/page";
import { Layout } from "@/components/layout";
import { Sidebar } from "@/components/sidebar";
import { useYearsList } from "@/hooks/use-years-list";
import { useSiteMetadata } from "@/hooks/use-site-metadata";

const YearsTemplate: FC = () => {
  const years = useYearsList();

  return (
    <Layout>
      <Sidebar />
      <Page title="Years">
        <ul>
          {years.map((year) => (
            <li key={year.fieldValue}>
              <Link to={`/year/${year.fieldValue}/`}>
                {year.fieldValue} ({year.totalCount})
              </Link>
            </li>
          ))}
        </ul>
      </Page>
    </Layout>
  );
};

export const Head: FC = () => {
  const { title, description } = useSiteMetadata();
  const pageTitle = `Years - ${title}`;

  return <Meta title={pageTitle} description={description} />;
};

export default YearsTemplate;
