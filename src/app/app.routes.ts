import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full' 
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },
    {
        path: 'movies', component: MoviesComponent, pathMatch: 'full', canActivate: [authGuard]
    }
];
