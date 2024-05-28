import { Component } from '@angular/core';
import { Movie, MovieResponse, MoviesServiceService } from '../../services/movies/movies-service.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

    movies: Movie[] = [];

    constructor(private movieService: MoviesServiceService) {}

    ngOnInit(): void {
        this.movieService.getMovies().subscribe(
            (data: MovieResponse) => {
                this.movies = data.results;
                console.log(this.movies);
            }
        ),
        (error: any) => {
            console.log('Error fetching movies', error)
        }
    }

}
