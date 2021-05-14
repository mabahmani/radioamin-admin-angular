export interface Pageable<T>{
  content: Array<T>;
  last: boolean;
  totalPages: number;
  totalElements: number;
  first: boolean;
  size: number;
  number: number;
}
