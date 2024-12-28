import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-star-rating',
  standalone: true,
  imports: [NgClass, MatIcon],
  templateUrl: './star-rating.component.html',
  styleUrl: './star-rating.component.scss',
})
export class StarRatingComponent {
  @Input() rating: number = 0; //Initial rating
  @Input() maxStars: number = 5; //Total stars to display
  @Input() readOnly: boolean = false; //Toggle between view-only and interactive

  // @Input() book!: UserBook;
  @Output() ratingChange = new EventEmitter<number>();

  hoveredStar = 0;

  //Emit new rating when a star is clicked
  onStarClick(newRating: number) {
    if (!this.readOnly) {
      this.rating = newRating;
      this.ratingChange.emit(this.rating);
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
