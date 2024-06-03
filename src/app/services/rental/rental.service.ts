import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RentalService {

    private readonly RENTAL_API_URL = '/api/rent-store/rentals/'

    constructor(private http: HttpClient) { }

    getUserRentals(page: number, pageSize: number): Observable<UserRentalResponse> {
        return this.http.get<UserRentalResponse>(`${this.RENTAL_API_URL}?page=${page}&page_size=${pageSize}`);
    }

    returnRental(rental: Rental): Observable<any> {
        return this.http.patch<any>(`${this.RENTAL_API_URL}/${rental.uuid}`, {});
    }

}

export interface UserRentalResponse {
    count: number;
    next: string;
    previous: string;
    results: Rental[];
}

export interface Rental {
    uuid: string;
    rental_date: string;
    return_date: string;
    is_paid: boolean;
    charge: number;
    user: string;
    movie: string;
}
