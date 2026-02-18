import { graphql, useStaticQuery } from "gatsby";

interface YearsQueryResult {
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
}

const useYearsList = () => {
  const { allMarkdownRemark } = useStaticQuery<YearsQueryResult>(graphql`
    query YearsListQuery {
      allMarkdownRemark(
        filter: {
          frontmatter: { template: { eq: "post" }, draft: { ne: true } }
        }
      ) {
        group(field: { frontmatter: { date: SELECT } }) {
          fieldValue
          totalCount
        }
      }
    }
  `);

  const yearCounts: { [year: string]: number } = {};

  allMarkdownRemark.group.forEach((item) => {
    const year = new Date(item.fieldValue).getFullYear().toString();
    yearCounts[year] = (yearCounts[year] || 0) + item.totalCount;
  });

  return Object.entries(yearCounts)
    .map(([year, count]) => ({
      fieldValue: year,
      totalCount: count,
    }))
    .sort(
      (a, b) => Number.parseInt(b.fieldValue) - Number.parseInt(a.fieldValue)
    );
};

export { useYearsList };
