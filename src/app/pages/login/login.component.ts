import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../services/auth/auth.service';
import { NavbarService } from '../../services/navbar/navbar.service';
import { StorageKeyValuePairs, StorageService } from '../../services/storage/storage.service';
import { ImageMarqueeComponent } from '../../components/image-marquee/image-marquee.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ImageMarqueeComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    willRemember: boolean = false;

    constructor(private http: HttpClient, private router: Router, private authService: AuthService, private navbarService: NavbarService, private storage: StorageService) {}

    ngOnInit() {
        this.navbarService.toggleNavbarVisibility(false);
    }

    onLogin() {
        const loginData = {
            username: this.username.trim(),
            password: this.password.trim()
        };

        this.authService.login(loginData).subscribe(
            (data: AuthResponse) => {

                const kvps: StorageKeyValuePairs[] = [
                    {
                        key: 'authToken',
                        value: data.access
                    },
                    {
                        key: 'refreshToken',
                        value: data.refresh
                    },
                    {
                        key: 'username',
                        value: this.username
                    }
                ];

                console.log(kvps)

                console.log(this.willRemember)

                if (this.willRemember) {
                    this.storage.setLocalStorage(kvps);
                } else {
                    this.storage.setSessionStorage(kvps);
                }

                const username = localStorage.getItem('username') ?? sessionStorage.getItem('username');
                this.navbarService.setIsAdmin(username ? username.includes('admin') : false);

                this.router.navigate(['/movies']);
            },
            (error: any) => {
                console.log('Error logging in: ', error.error);
            }
        )
    }

}
