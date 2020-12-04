// @flow strict
import React from 'react';
import Helmet from 'react-helmet';
import { withPrefix } from 'gatsby';
import type { Node as ReactNode } from 'react';
import { useSiteMetadata } from '../../hooks';
import styles from './Layout.module.scss';
import SOCIAL_MEDIA_IMAGES from '../../map-slug-to-social-image';

type Props = {
  children: ReactNode,
  title: string,
  description?: string,
  slug? :string,
  socialImage ?: string,
  canonical ?: string,
};

const Layout = ({
  children,
  title,
  description,
  slug = '',
  socialImage,
  canonical,
}: Props) => {
  const metaData = useSiteMetadata();
  const { url } = metaData;
  const slugWithoutPrefix = slug.replace('/posts/', '');
  const pathToSocialImg = SOCIAL_MEDIA_IMAGES[slugWithoutPrefix] || SOCIAL_MEDIA_IMAGES.default;
  const absolutePathToSocialImage = `${url}${withPrefix(pathToSocialImg)}`;

  return (
    <div className={styles.layout}>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <meta property="og:site_name" content={title} />
        <meta property="og:image" content={socialImage || absolutePathToSocialImage} />
        <meta name="twitter:card" content="summary" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta name="twitter:image" content={socialImage || absolutePathToSocialImage} />
        {canonical && (
          <link rel="canonical" href={canonical} />
        )}
      </Helmet>
      {children}
    </div>
  );
};

export default Layout;
