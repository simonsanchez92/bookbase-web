import { Component, input, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { UserBook } from '../../../shared/interfaces/user-book.interface';
import { StarRatingComponent } from '../../user-books-table/star-rating/star-rating.component';

@Component({
  selector: 'app-search-results',
  standalone: true,
  imports: [MatButtonModule, MatMenuModule, StarRatingComponent],
  templateUrl: './search-results.component.html',
  styleUrl: './search-results.component.scss',
})
export class SearchResultsComponent implements OnInit {
  searchResults = input.required<UserBook[]>();

  ngOnInit(): void {
    console.log(this.searchResults());
  }

  onRateBook(book: UserBook, newRating: number) {
    console.log({ book, newRating });
  }
}
