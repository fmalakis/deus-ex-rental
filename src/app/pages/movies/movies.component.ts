import { Component } from '@angular/core';
import { Category, Movie, MovieResponse, MoviesServiceService } from '../../services/movies/movies-service.service';
import { MovieCardComponent } from '../../components/movie-card/movie-card.component';
import { IntersectionListenerDirective } from '../../intersection-listener.directive';
import { ActivatedRoute } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { SkeletonCardComponent } from '../../components/skeleton-card/skeleton-card.component';

@Component({
  selector: 'app-movies',
  standalone: true,
  imports: [MovieCardComponent, IntersectionListenerDirective, FormsModule, MatRippleModule, NgClass, SkeletonCardComponent],
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss'
})
export class MoviesComponent {

    movies: Movie[] = [];
    categories: Category[] = [];

    currentPage: number = 1;
    perPage: number = 25;
    initiatedLoading: boolean = false;
    changeInFilters: boolean = false;

    filterCategory: string = '';
    ratingHigherThan: string = '';
    ratingLowerThan: string = '';
    yearAfter: string = '';
    yearBefore: string = '';

    noMoreMovies: boolean = false;

    constructor(private movieService: MoviesServiceService, private route: ActivatedRoute) {}

    ngOnInit(): void {
        this.route.queryParamMap.subscribe(
            params => {
                this.filterCategory = params.get('category') ?? '';
                this.loadMovies();
                this.loadCategories();
            }
        )
    }

    loadCategories(): void {
        
        this.movieService.getCategories().subscribe(
            categoryResponse => {
                this.categories = categoryResponse;
                console.log(categoryResponse);
            },
            error => console.log('error fetching categories', error)
        )
    }

    loadMovies(reset?: boolean): void {

        if (this.initiatedLoading) return;

        if (this.noMoreMovies && !reset) return;

        this.initiatedLoading = true;

        if (reset) {
            this.changeInFilters = false;
            this.currentPage = 1;
            this.movies = [];
        }

        console.log(`Loading movies ${this.currentPage}...`);
        this.movieService.getMovies(this.currentPage, this.perPage, this.filterCategory, this.ratingHigherThan, this.ratingLowerThan, this.yearAfter, this.yearBefore).subscribe(
            (data: MovieResponse) => {
                console.log(data)
                this.movies.push(...new Set(data.results));
                console.log(this.movies);
                this.currentPage++;
                this.initiatedLoading = false;
                if (!data.next) this.noMoreMovies = true;
            }
        ),
        (error: any) => {
            console.log('Error fetching movies', error)
        }
    }

    onSelect(event: Event): void {
        this.filterCategory = (event.target as HTMLSelectElement).value;
        this.changeInFilters = true;
        console.log(`Selected movie type: ${this.filterCategory}`);
    }

    initiateSearch() {
        this.loadMovies(true);
    }

    clearFilters() {
        this.filterCategory = '';
        this.yearAfter = '';
        this.yearBefore = '';
        this.ratingHigherThan = '';
        this.ratingLowerThan = '';
        this.noMoreMovies = false;
        this.loadMovies(true);
    }
}
