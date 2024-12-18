import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { UserBooksTableComponent } from '../../features/user-books-table/user-books-table.component';
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

  ngOnInit(): void {
    this.booksService.fetchUserBooks();

    // this.booksService.userBook$.subscribe({
    //   next: (val) => console.log(val),
    // });
  }

  ngOnDestroy(): void {
    console.log('Component destroyed');
  }
}
