import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MoviesServiceService {

    private API_URL = '/api/rent-store/movies/';

    constructor(private http: HttpClient) { }

    getMovies(page: number, pageSize: number): Observable<MovieResponse> {
        return this.http.get<MovieResponse>(`${this.API_URL}?page=${page}&page_size=${pageSize}`);
    }

    getMovieById(id: string): Observable<Movie> {
        return this.http.get<Movie>(`${this.API_URL}/${id}`);
      }
}

export type MovieResponse = {
    count: number,
    next: string,
    previous: string,
    results: Movie[]
}

export type Movie = {
    uuid: string,
    title: string,
    pub_date: number,
    duration: number,
    rating: string,
    description: string,
    poster_url: string
}
