import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {
  private showNavbar = new BehaviorSubject<boolean>(true);
  navbarVisibility$ = this.showNavbar.asObservable();

  constructor() { }

  toggleNavbarVisibility(show: boolean): void {
    this.showNavbar.next(show);
  }
}
