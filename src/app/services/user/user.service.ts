import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private readonly USER_API_URL = '/api/rent-store/profile/'

    constructor(private http: HttpClient) { }

    getUserProfile(): Observable<User> {
        return this.http.get<User>(this.USER_API_URL);
    }

    topUpWallet(amount: number): Observable<DepositResponse> {
        return this.http.patch<DepositResponse>(this.USER_API_URL, {
            deposit: amount
        });
    }
}

export type DepositResponse = {
    deposit: number;
}

export type User = {
    email: string;
    first_name: string;
    last_name: string;
    wallet: number;
}
