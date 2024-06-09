import { Component } from '@angular/core';
import { Movie, MoviesServiceService } from '../../services/movies/movies-service.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss'
})
export class MovieDetailsComponent {

    movie: Movie | undefined;
    rentingIsDisabled: boolean = false;
    isLoadingMovie: boolean = true;

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
                this.isLoadingMovie = false;
                console.log(this.movie)
            },
            error => {
                console.log('Error whilst fetching movie', error)
                this.isLoadingMovie = false;
            }
        )
        }
    }

    rentMovie() {

        if (!this.movie) return;

        this.rentingIsDisabled = true;
        this.movieService.rentMovie(this.movie.uuid).subscribe(rentalResponse => {
                alert(`You've succesfully rented "${this.movie?.title}"`);
                this.rentingIsDisabled = false;
            },
            error => console.log('Error whilst trying to rent movie', error)
        );
    }

    durationToString(duration: number) {
        return `${Math.floor(duration/60)} hours, ${Math.ceil(duration - Math.floor(duration/60)* 60)} minutes`;
    }

}
