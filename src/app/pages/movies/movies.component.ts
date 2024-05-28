import { Component } from '@angular/core';
import { Movie, MovieResponse, MoviesServiceService } from '../../services/movies/movies-service.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { IntersectionListenerDirective } from '../../intersection-listener.directive';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieCardComponent, IntersectionListenerDirective],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

    movies: Movie[] = [];

    currentPage: number = 1;
    perPage: number = 25;
    initiatedLoading: boolean = false;

    constructor(private movieService: MoviesServiceService) {}

    ngOnInit(): void {
        this.loadMovies();
    }

    loadMovies(): void {

        if (this.initiatedLoading) return;

        this.initiatedLoading = true;

        console.log(`Loading movies ${this.currentPage}...`);
        this.movieService.getMovies(this.currentPage, this.perPage).subscribe(
            (data: MovieResponse) => {
                this.movies.push(...new Set(data.results));
                console.log(this.movies);
                this.currentPage++;
                this.initiatedLoading = false;
            }
        ),
        (error: any) => {
            console.log('Error fetching movies', error)
        }
    }

}
