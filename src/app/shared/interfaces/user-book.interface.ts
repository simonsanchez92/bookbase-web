import { ReadingStatus } from '../enums/reading-status.enum';

export interface UserBook {
  book: {
    id: number;
    title: string;
    publishYear: number;
    description: string;
    coverUrl: string;
    pageCount: number;
    genres: { id: number; name: string }[];
  };

  userBook: {
    status: ReadingStatus;
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
}
