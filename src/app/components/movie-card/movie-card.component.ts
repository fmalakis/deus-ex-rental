import { Component, Input } from '@angular/core';
import { Movie, MoviesServiceService } from '../../services/movies/movies-service.service';
import { RouterLink } from '@angular/router';
import { SnackbarService, SnackbarType } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

    isRenting: boolean = false;

    constructor(private movieService: MoviesServiceService, private snackbarService: SnackbarService) {}

    noImg: boolean = false;

    @Input({ required: true })
    movie!: Movie;

    onImgError() {
        this.noImg = true;
    }

    rentMovie() {
        
        if (!this.movie) return;

        this.isRenting = true;

        this.movieService.rentMovie(this.movie.uuid).subscribe(rentResponse => {
                // alert(`You have sucessfully rented "${this.movie.title}".`);
                this.snackbarService.showSnackbar(SnackbarType.RENT, `You have succesfully rented "${this.movie.title}"`);
                this.isRenting = false;
            },
            error => {
                console.log('Error whilst trying to rent', error);
                this.snackbarService.showSnackbar(SnackbarType.LOGIN_ERROR, "You already own this movie. Please, return it first.");
                this.isRenting = false;
            }
        )
    }

}
