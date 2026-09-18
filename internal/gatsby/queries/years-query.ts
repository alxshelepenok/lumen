import { type CreatePagesArgs } from "gatsby";

interface YearsQueryResult {
  allMarkdownRemark: {
    group: Array<{
      fieldValue: string;
      totalCount: number;
    }>;
  };
}

const yearsQuery = async (graphql: CreatePagesArgs["graphql"]) => {
  const result = await graphql<YearsQueryResult>(`
    {
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

  const yearGroups = result?.data?.allMarkdownRemark?.group ?? [];
  const yearCounts: { [year: string]: number } = {};

  for (const item of yearGroups) {
    const year = new Date(item.fieldValue).getFullYear().toString();
    yearCounts[year] = (yearCounts[year] || 0) + item.totalCount;
  }

  return Array.from(
    Object.entries(yearCounts)
      .map(([year, count]) => ({
        fieldValue: year,
        totalCount: count,
      }))
      .sort(
        (a, b) => Number.parseInt(b.fieldValue) - Number.parseInt(a.fieldValue)
      )
  );
};

export { yearsQuery };
