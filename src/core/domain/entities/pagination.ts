export interface PaginationMeta {
  currentPage: number;
  perPage: number;
  lastPage: number;
  total: number;
}

export interface PaginatedList<T> {
  data: T[];
  meta: PaginationMeta;
}
