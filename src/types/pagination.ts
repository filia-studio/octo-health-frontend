export interface PaginationParams {
  page: number;
  limit: number;
}

export interface PaginationMeta {
  currentPage: number;
  totalItems: number;
  totalPages: number;
  itemsPerPage: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}
