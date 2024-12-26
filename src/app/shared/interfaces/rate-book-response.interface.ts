export interface UserBookActionResponse {
  status: {
    id: number;
    name: string;
  };
  rating: number;
  createdAt: string;
  updatedAt: string;
}
