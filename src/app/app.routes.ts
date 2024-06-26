import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { MoviesComponent } from './pages/movies/movies.component';
import { authGuard } from './guards/auth/auth.guard';
import { MovieDetailsComponent } from './components/movie-details/movie-details.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { AdminComponent } from './pages/admin/admin.component';
import { adminGuard } from './guards/admin/admin.guard';

export const routes: Routes = [
    {
        path: '', redirectTo: '/login', pathMatch: 'full' 
    },
    {
        path: 'login', component: LoginComponent, pathMatch: 'full'
    },
    {
        path: 'movies', component: MoviesComponent, pathMatch: 'full', canActivate: [authGuard]
    },
    {
        path: 'movies/:id', component: MovieDetailsComponent, canActivate: [authGuard]
    },
    {
        path: 'profile', component: ProfileComponent, pathMatch: 'full' , canActivate: [authGuard]
    },
    {
        path: 'admin', component: AdminComponent, pathMatch: 'full', canActivate: [authGuard, adminGuard]
    }
];
