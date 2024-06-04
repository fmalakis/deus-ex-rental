import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

    private readonly API_URL = '/api/rent-store/movies/';
    private readonly API_URL_RENTALS = '/api/rent-store/rentals/';
    private readonly API_URL_CATEGORIES = '/api/rent-store/categories/';

    constructor(private http: HttpClient) { }

    getMovies(page: number, pageSize: number, catogory: string = '', higherThan: string = '', lowerThan: string = '', yearAfter: string = '', yearBefore: string = ''): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.API_URL}?page=${page}&page_size=${pageSize}${catogory? `&category=${catogory}` : ''}${higherThan? `&from-rating=${higherThan}` : ''}${higherThan? `&to-rating=${lowerThan}` : ''}${yearAfter? `&from-year=${yearAfter}` : ''}${yearBefore? `&to-year=${yearBefore}` : ''}`);
    }

    getAllMovies(): Observable<MovieResponse> {
        const max = Number.MAX_SAFE_INTEGER;
        return this.http.get<MovieResponse>(`${this.API_URL}?page_size=${max}`);
    }

    getMovieById(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.API_URL}/${id}`);
    }

    rentMovie(id: string): Observable<RentalCreationResponse> {
        return this.http.post<RentalCreationResponse>(this.API_URL_RENTALS, {movie: id});
    }

    getCategories(): Observable<Category[]> {
        return this.http.get<Category[]>(this.API_URL_CATEGORIES);
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

export type Category = {
    name: string
}
