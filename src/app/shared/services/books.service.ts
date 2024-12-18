import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { FetchUserBooks } from '../interfaces/fetch-user-books-response.interface';
import { RateBookResponse } from '../interfaces/rate-book-response.interface';
import { UserBook } from '../interfaces/user-book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private httpClient: HttpClient = inject(HttpClient);

  private userBooksSubject = new BehaviorSubject<UserBook[]>([]); //Global state
  userBook$ = this.userBooksSubject.asObservable();

  fetchUserBooks(): void {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    this.httpClient
      .get<FetchUserBooks>(
        `https://localhost:7274/api/userbooks/review/list?page=1&pageSize=10`,
        { headers }
      )
      .subscribe((books) => this.userBooksSubject.next(books.data));
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('bookbase-token');
  }

  // Update book rating
  rateBook(bookId: number, newRating: number): void {
    console.log({ bookId, newRating });

    this.httpClient
      .put<RateBookResponse>(
        `https://localhost:7274/api/userbooks/${bookId}/rate`,
        { rating: newRating }
      )
      .subscribe((response) => {
        console.log(response);

        const updatedBooks = this.userBooksSubject.value.map((book) =>
          // book.book.id === bookId ? updatedBook : book
          {
            if (book.book.id === bookId) {
              return {
                ...book,
                userBook: {
                  ...book.userBook,
                  rating: response.rating,
                  updatedAt: response.updatedAt,
                },
              };
            }
            return book;
          }
        );
        //Emit updated list
        this.userBooksSubject.next(updatedBooks);
      });
  }
  // Add a new book
  // addBook(newBook: UserBook): void {
  //   this.http.post<UserBook>(`${this.apiUrl}/add`, newBook).subscribe((book) => {
  //     const updatedBooks = [...this.userBooksSubject.value, book];
  //     this.userBooksSubject.next(updatedBooks);
  //   });
  // }

  // Remove a book
  // removeBook(bookId: number): void {
  //   this.http.delete(`${this.apiUrl}/delete/${bookId}`).subscribe(() => {
  //     const updatedBooks = this.userBooksSubject.value.filter(
  //       (book) => book.id !== bookId
  //     );
  //     this.userBooksSubject.next(updatedBooks);
  //   });
  // }
}
