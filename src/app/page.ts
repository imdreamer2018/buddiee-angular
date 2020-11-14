export interface Page<T> {
  currentPage: number;
  totalPage: number;
  data: T;
}
