import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { StarRatingComponent } from '../../user-books-table/star-rating/star-rating.component';
@Component({
  selector: 'app-review',
  standalone: true,
  imports: [MatIconModule, StarRatingComponent],
  templateUrl: './review.component.html',
  styleUrl: './review.component.scss',
})
export class ReviewComponent {}
