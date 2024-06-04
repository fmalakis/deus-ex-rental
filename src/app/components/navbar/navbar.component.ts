import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar/navbar.service';
import { NgClass, NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf, RouterModule, NgClass],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    showNavbar: boolean = true;
    isAdmin: boolean = false;
    menuIsShowing: boolean = false;
  
    constructor(private navbarService: NavbarService, private auth: AuthService) { }
  
    ngOnInit(): void {

        this.navbarService.navbarVisibility$.subscribe((show: boolean) => {
            this.showNavbar = show;
        });

        this.navbarService.isAdmin$.subscribe((show: boolean) => {
            this.isAdmin = show;
        });
    }

    toggleMenu() {
        if (!this.showNavbar) return;

        this.menuIsShowing = !this.menuIsShowing;
    }

    closeMenu() {
        this.menuIsShowing = false;
    }

    performLogout() {
        this.closeMenu();
        this.auth.logout();
    }
  }
