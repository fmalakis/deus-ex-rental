import { Component } from '@angular/core';
import { Movie, MoviesServiceService } from '../../services/movies/movies-service.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {

    movie: Movie | undefined;

    constructor(
        private route: ActivatedRoute,
        private movieService: MoviesServiceService
    ) {}

    ngOnInit(): void {
        const movieId = this.route.snapshot.paramMap.get('id');
        if (movieId) {
            this.movieService.getMovieById(movieId).subscribe(movie => 
            {
                this.movie = movie;
            },
            error => console.log('Error whilst fetching movie', error)
        )
        }
    }

}
