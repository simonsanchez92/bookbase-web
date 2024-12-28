import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { ReadingStatus } from '../enums/reading-status.enum';
import { FetchUserBooks } from '../interfaces/fetch-user-books-response.interface';
import { UserBookActionResponse } from '../interfaces/rate-book-response.interface';
import { SearchResult } from '../interfaces/search-result.interface';
import { UserBook } from '../interfaces/user-book.interface';

@Injectable({
  providedIn: 'root',
})
export class BooksService {
  private httpClient: HttpClient = inject(HttpClient);

  private userBooksSubject = new BehaviorSubject<UserBook[]>([]); //Global state
  userBook$ = this.userBooksSubject.asObservable();

  private searchResultsSubject = new BehaviorSubject<UserBook[]>([]); //Global state
  searchResults$ = this.searchResultsSubject.asObservable();

  setUserBooks(books: UserBook[]) {
    this.userBooksSubject.next(books);
  }

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
  rateBook(
    bookId: number,
    newRating: number
  ): Observable<UserBookActionResponse> {
    return this.httpClient
      .put<UserBookActionResponse>(
        `https://localhost:7274/api/userbooks/${bookId}/rate`,
        { rating: newRating }
      )
      .pipe(
        tap((response) => {
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
        })
      );
  }

  updateReadingStatus(
    bookId: number,
    statusId: number
  ): Observable<UserBookActionResponse> {
    return this.httpClient
      .put<UserBookActionResponse>(
        `https://localhost:7274/api/userbooks/${bookId}/update-status`,
        { status: statusId }
      )
      .pipe(
        tap((response) => {
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
        })
      );
  }

  setSearchBooks(books: UserBook[]) {
    this.searchResultsSubject.next(books);
  }

  SearchBooks(query: string): Observable<SearchResult> {
    return this.httpClient.get<SearchResult>(
      `https://localhost:7274/api/books?pageSize=5&page=1&query=${query}`
    );
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
