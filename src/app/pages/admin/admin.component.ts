import { Component } from '@angular/core';
import { BubbleChartComponent } from '../../components/bubble-chart/bubble-chart.component';
import { RentalTableComponent } from '../../components/rental-table/rental-table.component';
import { MatRipple } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { NewMovieModalComponent } from '../../components/new-movie-modal/new-movie-modal.component';
import { MoviesServiceService } from '../../services/movies/movies-service.service';
import { SnackbarService, SnackbarType } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [BubbleChartComponent, RentalTableComponent, MatRipple],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

    movieCategories: string[] = [];
    categoriesAvailable: boolean = false;

    constructor(private dialog: MatDialog, private movieService: MoviesServiceService, private snackbarService: SnackbarService) {}

    ngOnInit() {
        this.movieService.getCategories().subscribe(
            categories => {
                this.movieCategories = categories.map(category => category.name);
                this.categoriesAvailable = true;
            },
            error => console.log(error)
        )
    }
    
    openNewMovieModal() {

        if (!this.categoriesAvailable) return;

        const newMovieDialogRef = this.dialog.open(NewMovieModalComponent, {
            data: {
                categories: this.movieCategories
            }
        });

        newMovieDialogRef.afterClosed().subscribe(
            result => {
                if (result) {
                    console.log(result);
                    this.createNewMovie(result);
                }
            }
        )
    }

    createNewMovie(newMovie: any) {
        this.movieService.createNewMovie(newMovie).subscribe(
            result => {
                console.log('Created new movie', result);
                this.snackbarService.showSnackbar(SnackbarType.RENT, `"${newMovie.title}" was succesfully added to the database.`);
            },
            error => this.snackbarService.showSnackbar(SnackbarType.LOGIN_ERROR, 'Could not add new movie. Please try again later.')
        )
    }

}
