import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthResponse, AuthService } from '../../services/auth/auth.service';
import { NavbarService } from '../../services/navbar/navbar.service';
import { StorageKeyValuePairs, StorageService } from '../../services/storage/storage.service';
import { ImageMarqueeComponent } from '../../components/image-marquee/image-marquee.component';
import { NgClass } from '@angular/common';
import { SnackbarService, SnackbarType } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, ImageMarqueeComponent, NgClass],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

    username: string = '';
    password: string = '';
    willRemember: boolean = false;
    isLoggingIn: boolean = false;

    words = ['DVDs', 'Blue-Rays', 'Blockbuster releases', 'Cult classics'];
    currentWordIndex = 0;
    currentWord = '';
    isErasing = false;
    animationClass = 'animate-typewriter';

    constructor(
        private http: HttpClient, 
        private router: Router, 
        private authService: AuthService, 
        private navbarService: NavbarService, 
        private storage: StorageService,
        private snackbarService: SnackbarService
    ) {}

    ngOnInit() {
        this.navbarService.toggleNavbarVisibility(false);
        this.setCurrentWord();
    }

    onLogin() {

        this.isLoggingIn = true;

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
                console.log('Error logging in: ', error);
                this.snackbarService.showSnackbar(SnackbarType.LOGIN_ERROR ,error.error.detail)
                this.isLoggingIn = false;
            }
        )
    }

    setCurrentWord(): void {

        this.isErasing = false;
        this.animationClass = 'animate-typewriter';

        this.currentWord = this.words[this.currentWordIndex];
        this.currentWordIndex = (this.currentWordIndex + 1) % this.words.length;

        setTimeout(() => {
            this.isErasing = true;
            this.animationClass = 'animate-erase';
            setTimeout(() => {
              this.setCurrentWord();
            }, 3000); // Duration of erase animation
          }, 5000); // Duration to show the word before erasing
    }

}
