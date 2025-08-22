export interface ListResponse<T> {
  data: T[];
  size: number;
  // fetch next page
  total?: number;
}
