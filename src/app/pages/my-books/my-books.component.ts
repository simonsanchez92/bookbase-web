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
    // this.booksService.fetchUserBooks();

    // this.booksService.userBook$.subscribe({
    //   next: (val) => console.log(val),
    // });
    this.booksService.fetchUserBooks().subscribe({
      next: (val) => {
        this.userBooks.set(val.data);
      },
    });
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }
}
