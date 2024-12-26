import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ReadingStatus } from '../enums/reading-status.enum';
import { FetchUserBooks } from '../interfaces/fetch-user-books-response.interface';
import { UserBookActionResponse } from '../interfaces/rate-book-response.interface';
import { UserBook } from '../interfaces/user-book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private httpClient: HttpClient = inject(HttpClient);

  private userBooksSubject = new BehaviorSubject<UserBook[]>([]); //Global state
  userBook$ = this.userBooksSubject.asObservable();

  fetchUserBooks(): Observable<FetchUserBooks> {
    const token = this.getAuthToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.httpClient.get<FetchUserBooks>(
      `https://localhost:7274/api/userbooks/review/list?page=1&pageSize=10`,
      { headers }
    );
  }

  private getAuthToken(): string | null {
    return localStorage.getItem('bookbase-token');
  }

  // Update book rating
  rateBook(bookId: number, newRating: number): void {
    this.httpClient
      .put<UserBookActionResponse>(
        `https://localhost:7274/api/userbooks/${bookId}/rate`,
        { rating: newRating }
      )
      .subscribe((response) => {
        const updatedBooks = this.userBooksSubject.value.map((book) => {
          if (book.book.id === bookId) {
            return {
              ...book,
              userBook: {
                ...book.userBook,
                rating: response.rating,
                updatedAt: response.updatedAt,
                status: {
                  id: ReadingStatus.read,
                  name: 'Read',
                },
              },
            };
          }
          return book;
        });
        //Emit updated list
        this.userBooksSubject.next(updatedBooks);
      });
  }

  updateReadingStatus(bookId: number, statusId: number): void {
    this.httpClient
      .put<UserBookActionResponse>(
        `https://localhost:7274/api/userbooks/${bookId}/update-status`,
        { status: statusId }
      )
      .subscribe((response) => {
        const updatedBooks = this.userBooksSubject.value.map((book) => {
          if (book.book.id === bookId) {
            return {
              ...book,
              userBook: {
                ...book.userBook,
                updatedAt: response.updatedAt,
                status: {
                  id: response.status.id,
                  name: response.status.name,
                },
              },
            };
          }
          return book;
        });
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
