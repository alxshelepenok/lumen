const getPaginationPath = (basePath: string, page: number): string =>
  [basePath === "/" ? "" : basePath, "page", page].join("/");

interface PaginationInfo {
  currentPage: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
  nextPagePath: string;
  prevPagePath: string;
}

const getPaginationInfo = (
  basePath: string,
  page: number,
  total: number
): PaginationInfo => ({
  currentPage: page,
  prevPagePath: page <= 1 ? basePath : getPaginationPath(basePath, page - 1),
  nextPagePath: getPaginationPath(basePath, page + 1),
  hasNextPage: page !== total - 1,
  hasPrevPage: page !== 0,
});

export { getPaginationInfo, getPaginationPath };
export type { PaginationInfo };
