import { UserBook } from './user-book.interface';

export interface FetchUserBooks {
  total: number;
  page: number;
  length: number;
  data: UserBook[];
}
