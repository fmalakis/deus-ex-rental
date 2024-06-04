import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavbar = new BehaviorSubject<boolean>(true);
  private isAdmin = new BehaviorSubject<boolean>(false);
  navbarVisibility$ = this.showNavbar.asObservable();
  isAdmin$ = this.isAdmin.asObservable();

  constructor() { 
        const username = localStorage.getItem('username') ?? sessionStorage.getItem('username');
        this.setIsAdmin(username ? username.includes('admin') : false);
  }

  toggleNavbarVisibility(show: boolean): void {
    this.showNavbar.next(show);
  }

  setIsAdmin(show: boolean): void {
    this.isAdmin.next(show);
  }
}
