import { Component, inject, OnInit, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute } from '@angular/router';
import { ReviewComponent } from '../../features/book-detail/review/review.component';
import { StarRatingComponent } from '../../features/user-books-table/star-rating/star-rating.component';
import { UserBook } from '../../shared/interfaces/user-book.interface';
import { BooksService } from '../../shared/services/books.service';

@Component({
  selector: 'app-book-detail',
  standalone: true,
  imports: [ReviewComponent, StarRatingComponent, MatButtonModule],
  templateUrl: './book-detail.component.html',
  styleUrl: './book-detail.component.scss',
})
export class BookDetailComponent implements OnInit {
  private activatedRoute = inject(ActivatedRoute);
  private bookService = inject(BooksService);

  bookId = signal<string>('');
  book: UserBook | undefined = undefined;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (paramMap) => {
        const id = paramMap.get('id');
        if (id) {
          this.bookId.set(id);
        }
      },
    });

    this.bookService.getOne(+this.bookId()).subscribe({
      next: (res) => {
        this.book = res;
      },
    });
  }
}
