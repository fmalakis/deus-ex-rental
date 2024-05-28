import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { NavbarService } from '../services/navbar/navbar.service';

export const authGuard: CanActivateFn = (route, state) => {

    const navbar = inject(NavbarService);
    const router = inject(Router);
    const token = localStorage.getItem('authToken') ?? sessionStorage.getItem('authToken');

    if (!token) {
        navbar.toggleNavbarVisibility(true);
        router.navigate(['/login']);
        return false;
    }

    navbar.toggleNavbarVisibility(true);
    return true;
};
