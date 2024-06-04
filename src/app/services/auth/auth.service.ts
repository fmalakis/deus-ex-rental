import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { StorageService } from '../storage/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

    private API_URL = '/api/auth/login/';

    constructor(private http: HttpClient, private router: Router, private storage: StorageService) { }

    login(loginData: {username: string, password: string}): Observable<AuthResponse> {
        return this.http.post<AuthResponse>(this.API_URL, loginData);
    }

    logout(): void {
        this.storage.clearStorage();
        this.router.navigate(['/login']);
    }
}

export type AuthResponse = {
    access: string,
    refresh: string 
}
