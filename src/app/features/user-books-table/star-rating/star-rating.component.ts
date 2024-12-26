import { NgClass } from '@angular/common';
import { Component, EventEmitter, inject, Input } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { UserBook } from '../../../shared/interfaces/user-book.interface';
import { BooksService } from '../../../shared/services/books.service';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgClass, MatIcon],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  private booksService = inject(BooksService);

  @Input() rating: number = 0; //Initial rating
  @Input() maxStars: number = 5; //Total stars to display
  @Input() readOnly: boolean = false; //Toggle between view-only and interactive

  @Input() book!: UserBook;
  @Input() ratingChange = new EventEmitter<number>();

  hoveredStar = 0;

  //Emit new rating when a star is clicked
  onStarClick(newRating: number) {
    if (!this.readOnly) {
      this.rating = newRating;
      this.ratingChange.emit(newRating);

      this.booksService.rateBook(this.book.book.id, newRating);
    }
  }

  //Return an array to iterate stars
  get stars(): number[] {
    return Array(this.maxStars)
      .fill(0)
      .map((_, i) => i + 1);
  }

  onHover(star: number) {
    if (!this.readOnly) {
      this.hoveredStar = star;
    }
  }
}
