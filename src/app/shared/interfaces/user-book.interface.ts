export interface UserBook {
  book: {
    id: number;
    title: string;
    author: string;
    publishYear: number;
    description: string;
    coverUrl: string;
    pageCount: number;
    genres: { id: number; name: string }[];
  };

  userBook: {
    status: {
      id: number;
      name: string;
    };
    rating: number;
    createdAt: string;
    updatedAt: string;
  };
}
