import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  effect,
  EventEmitter,
  input,
  Output,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatRadioModule } from '@angular/material/radio';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserBook } from '../../shared/interfaces/user-book.interface';
import { StarRatingComponent } from './star-rating/star-rating.component';

@Component({
  selector: 'app-user-books-table',
  standalone: true,
  imports: [
    FormsModule,
    StarRatingComponent,
    MatTableModule,
    MatPaginatorModule,
    MatButtonModule,
    MatMenuModule,
    MatRadioModule,
    DatePipe,
  ],
  templateUrl: './user-books-table.component.html',
  styleUrl: './user-books-table.component.scss',
})
export class UserBooksTableComponent implements AfterViewInit {
  userBooks = input<UserBook[]>([]);
  // private booksService = inject(BooksService);
  @Output() rateBook = new EventEmitter<{ bookId: number; rating: number }>();

  displayedColumns: string[] = [
    'cover_url',
    'title',
    'author',
    'rating',
    'shelves',
    'created_at',
  ];
  dataSource = new MatTableDataSource<UserBook>();

  // Reading status options
  readingStatusOptions = [
    { id: 1, name: 'To Read' },
    { id: 2, name: 'Currently Reading' },
    { id: 3, name: 'Read' },
  ];

  constructor() {
    effect(() => {
      this.dataSource.data = this.userBooks();
    });
  }

  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
    console.log(this.userBooks());
  }

  navigate() {
    console.log('Navigating to specific book page');
  }

  updateReadingStatus(element: UserBook, newStatusId: number): void {
    // this.booksService.updateReadingStatus(element.book.id, newStatusId);
  }

  onRateBook(book: UserBook, newRating: number): void {
    this.rateBook.emit({ bookId: book.book.id, rating: newRating });
  }
}
