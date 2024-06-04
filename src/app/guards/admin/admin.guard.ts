import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {

    const router = inject(Router)

    const username = localStorage.getItem('username') ?? sessionStorage.getItem('username');

    if (!username) {
        router.navigate(['/login']);
        return false;
    }

    if (!username.includes('admin')) {
        router.navigate(['/movies']);
        return false;
    }

    return true;
};
