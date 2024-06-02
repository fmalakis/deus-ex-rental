import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

    private readonly API_URL = '/api/rent-store/movies/';
    private readonly API_URL_RENTALS = '/api/rent-store/rentals/';

    constructor(private http: HttpClient) { }

    getMovies(page: number, pageSize: number): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.API_URL}?page=${page}&page_size=${pageSize}`);
    }

    getMovieById(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.API_URL}/${id}`);
    }

    rentMovie(id: string): Observable<RentalCreationResponse> {
        return this.http.post<RentalCreationResponse>(this.API_URL_RENTALS, {movie: id});
    }
}

export type MovieResponse = {
    count: number,
    next: string,
    previous: string,
    results: Movie[]
}

export type RentalCreationResponse = {
    movieId: string;
}

export type Movie = {
    uuid: string,
    title: string,
    pub_date: number,
    duration: number,
    rating: string,
    description: string,
    poster_url: string,
    categories: string[]
}
