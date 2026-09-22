import { Route, routes } from "@/utils/routes";

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
): PaginationInfo => {
  const base = new Route(basePath);
  const prev = page <= 1 ? base : routes.paginated(base, page - 1);
  const next = routes.paginated(base, page + 1);

  return {
    currentPage: page,
    prevPagePath: prev.href(),
    nextPagePath: next.href(),
    hasNextPage: page !== total - 1,
    hasPrevPage: page !== 0,
  };
};

export { getPaginationInfo };
export type { PaginationInfo };
