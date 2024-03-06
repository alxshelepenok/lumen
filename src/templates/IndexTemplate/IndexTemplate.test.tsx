import React from "react";

import { render as reactTestingLibraryRender } from "@testing-library/react";
import { StaticQuery, useStaticQuery } from "gatsby";

import * as mocks from "@/mocks";
import { testUtils } from "@/utils";

import IndexTemplate, { Head as GatsbyHead } from "./IndexTemplate";

const mockedStaticQuery = StaticQuery as jest.Mock;
const mockedUseStaticQuery = useStaticQuery as jest.Mock;

describe("IndexTemplate", () => {
  const props = {
    data: {
      allMarkdownRemark: mocks.allMarkdownRemark,
    },
    pageContext: mocks.pageContext,
  };

  beforeEach(() => {
    mockedStaticQuery.mockImplementationOnce(({ render }) =>
      render(mocks.siteMetadata),
    );
    mockedUseStaticQuery.mockReturnValue(mocks.siteMetadata);
  });

  test("renders correctly", () => {
    const tree = testUtils
      .createSnapshotsRenderer(<IndexTemplate {...props} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  test("head renders correctly", () => {
    reactTestingLibraryRender(<GatsbyHead {...props} />);

    expect(testUtils.getMeta("twitter:card")).toEqual("summary_large_image");
    expect(testUtils.getMeta("twitter:title")).toEqual(
      "Posts - Page 2 - Murali Allada",
    );
    expect(testUtils.getMeta("og:title")).toEqual(
      "Posts - Page 2 - Murali Allada",
    );
    expect(testUtils.getMeta("description")).toEqual(
      "I help companies build reliable cloud infrastructure. Previously, I built platforms/products at @microsoft, @rackspace and @verizon.",
    );
    expect(testUtils.getMeta("twitter:description")).toEqual(
      "I help companies build reliable cloud infrastructure. Previously, I built platforms/products at @microsoft, @rackspace and @verizon.",
    );
    expect(testUtils.getMeta("og:description")).toEqual(
      "I help companies build reliable cloud infrastructure. Previously, I built platforms/products at @microsoft, @rackspace and @verizon.",
    );
  });
});
