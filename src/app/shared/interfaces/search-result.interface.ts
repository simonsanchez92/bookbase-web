import { UserBook } from './user-book.interface';

export interface SearchResult {
  total: number;
  page: number;
  length: number;
  data: UserBook[];
}
