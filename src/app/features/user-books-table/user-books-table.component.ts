import { DatePipe } from '@angular/common';
import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { UserBook } from '../../shared/interfaces/user-book.interface';
import { BooksService } from '../../shared/services/books.service';
import { StarRatingComponent } from './star-rating/star-rating.component';

@Component({
  selector: 'app-user-books-table',
  standalone: true,
  imports: [StarRatingComponent, MatTableModule, MatPaginatorModule, DatePipe],
  templateUrl: './user-books-table.component.html',
  styleUrl: './user-books-table.component.scss',
})
export class UserBooksTableComponent implements AfterViewInit, OnInit {
  private booksService = inject(BooksService);

  displayedColumns: string[] = [
    'cover_url',
    'title',
    'author',
    'rating',
    'shelves',
    'created_at',
  ];
  dataSource = new MatTableDataSource<UserBook>();

  ngOnInit(): void {
    this.booksService.userBook$.subscribe((books) => {
      console.log(books);

      this.dataSource.data = books;
      console.log(this.dataSource);
    });
  }
  // @ViewChild(MatPaginator) paginator: MatPaginator;

  ngAfterViewInit() {
    // this.dataSource.paginator = this.paginator;
  }

  navigate() {
    console.log('Navigating to specific book page');
  }
}
