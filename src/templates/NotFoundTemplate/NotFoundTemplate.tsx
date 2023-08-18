import React from "react";

import { Layout } from "@/components/Layout";
import { Meta } from "@/components/Meta";
import { Page } from "@/components/Page";
import { Sidebar } from "@/components/Sidebar";
import { useSiteMetadata } from "@/hooks";

const NotFoundTemplate: React.FC = () => (
  <Layout>
    <Sidebar />
    <Page title="NOT FOUND">
      <p>Dang! Looks like the paperclip maximizer made it here before you did📎</p>
    </Page>
  </Layout>
);

export const Head: React.FC = () => {
  const { title, subtitle } = useSiteMetadata();
  const pageTitle = `Not Found - ${title}`;

  return <Meta title={pageTitle} description={subtitle} />;
};

export default NotFoundTemplate;
