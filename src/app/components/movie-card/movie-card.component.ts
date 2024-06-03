import { Component, Input } from '@angular/core';
import { Movie, MoviesServiceService } from '../../services/movies/movies-service.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-movie-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './movie-card.component.html',
  styleUrl: './movie-card.component.scss'
})
export class MovieCardComponent {

    isRenting: boolean = false;

    constructor(private movieService: MoviesServiceService) {}

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
                alert(`You have sucessfully rented "${this.movie.title}".`);
                this.isRenting = false;
            },
            error => {
                console.log('Error whilst trying to rent', error);
                this.isRenting = false;
            }
        )
    }

}
