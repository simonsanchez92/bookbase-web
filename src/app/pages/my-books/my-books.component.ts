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

  onRateBook(bookId: number, newRating: number): void {
    this.booksService.rateBook(bookId, newRating).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }

  onChangeReadingStatus(bookId: number, statusId: number): void {
    this.booksService.updateReadingStatus(bookId, statusId).subscribe({
      next: (value) => {
        console.log(value);
      },
    });
  }
}
