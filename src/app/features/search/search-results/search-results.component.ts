import {
  Component,
  EventEmitter,
  inject,
  input,
  OnInit,
  Output,
} from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { Router, RouterLink } from '@angular/router';
import { UserBook } from '../../../shared/interfaces/user-book.interface';
import { StarRatingComponent } from '../../user-books-table/star-rating/star-rating.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, StarRatingComponent, RouterLink],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  private router = inject(Router);
  searchResults = input.required<UserBook[]>();

  @Output() rateBook = new EventEmitter<{ bookId: number; rating: number }>();

  ngOnInit(): void {
    console.log(this.searchResults());
  }

  onRateBook(book: UserBook, newRating: number) {
    this.rateBook.emit({ bookId: book.book.id, rating: newRating });
  }

  onNavigate(id: number) {
    console.log('Hey guys, book n°: ' + id);
    this.router.navigate(['book/show', id]);
  }
}
