import { Component, inject, OnDestroy, OnInit, signal } from '@angular/core';
import { UserBooksTableComponent } from '../../features/user-books-table/user-books-table.component';
import { UserBook } from '../../shared/interfaces/user-book.interface';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-my-books',
  standalone: true,
  imports: [UserBooksTableComponent],
  templateUrl: './my-books.component.html',
  styleUrl: './my-books.component.scss',
})
export class MyBooksComponent implements OnInit, OnDestroy {
  private booksService = inject(BooksService);

  userBooks = signal<UserBook[]>([]);

  ngOnInit(): void {
    this.booksService.userBook$.subscribe({
      next: (books) => {
        this.userBooks.set(books);
      },
    });

    this.booksService.fetchUserBooks().subscribe({
      next: (res) => {
        this.booksService.setUserBooks(res.data);
      },
    });
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }

  // .subscribe((response) => {
  //   const updatedBooks = this.userBooksSubject.value.map((book) => {
  //     if (book.book.id === bookId) {
  //       return {
  //         ...book,
  //         userBook: {
  //           ...book.userBook,
  //           rating: response.rating,
  //           updatedAt: response.updatedAt,
  //           status: {
  //             id: ReadingStatus.read,
  //             name: 'Read',
  //           },
  //         },
  //       };
  //     }
  //     return book;
  //   });
  //   //Emit updated list
  //   this.userBooksSubject.next(updatedBooks);
  // });

  onRateBook(bookId: number, newRating: number): void {
    this.booksService.rateBook(bookId, newRating);
    // .subscribe({
    //   next: (value) => {
    //     console.log(value);
    //   },
    // });
  }

  onUpdateReadingStatus(bookId: number, statusId: number): void {}
}
