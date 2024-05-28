import { Component, Input } from '@angular/core';
import { Movie } from '../../services/movies/movies-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

    @Input({ required: true })
    movie!: Movie;

}
