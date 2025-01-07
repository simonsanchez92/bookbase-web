import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchResultsComponent } from '../../features/search/search-results/search-results.component';
import { UserBook } from '../../shared/interfaces/user-book.interface';
import { BooksService } from '../../shared/services/books.service';
import { LoadingService } from '../../shared/services/loading.service';

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
  private loadingService = inject(LoadingService);
  query = signal<string>('');

  books = signal<UserBook[]>([]);

  page: number = 0;
  total: number = 0;

  isLoading: boolean = false;

  ngOnInit(): void {
    this.isLoading = true;
    this.loadingService.startLoading();

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
        this.booksService.setSearchBooks(res.data);
        this.page = res.page;
        this.total = res.total;
        this.loadingService.stopLoading();
        this.isLoading = false;
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
