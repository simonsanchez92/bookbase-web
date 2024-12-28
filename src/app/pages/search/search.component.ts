import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResultsComponent } from '../../features/search/search-results/search-results.component';
import { UserBook } from '../../shared/interfaces/user-book.interface';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [SearchResultsComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent implements OnInit {
  private booksService = inject(BooksService);
  private activatedRoute = inject(ActivatedRoute);
  query = signal<string>('');

  books = signal<UserBook[]>([]);

  ngOnInit(): void {
    this.activatedRoute.queryParamMap.subscribe({
      next: (paramMap) => {
        paramMap.get('query')
          ? this.query.set(paramMap.get('query')!)
          : this.query.set('');
      },
    });

    this.booksService.searchResults$.subscribe({
      next: (books) => {
        this.books.set(books);
      },
    });

    this.booksService.SearchBooks(this.query()).subscribe({
      next: (res) => {
        console.log('this is the res', res);
        this.booksService.setSearchBooks(res.data);
        console.log(this.books());
      },
    });
  }

  onRateBook(bookId: number, rating: number) {
    this.booksService.rateBook(bookId, rating).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
