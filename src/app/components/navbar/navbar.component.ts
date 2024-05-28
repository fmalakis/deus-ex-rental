import { Component, OnInit } from '@angular/core';
import { NavbarService } from '../../services/navbar/navbar.service';
import { NgIf } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [NgIf],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit {
    showNavbar: boolean = true;

  
    constructor(private navbarService: NavbarService, private auth: AuthService) { }
  
    ngOnInit(): void {
      this.navbarService.navbarVisibility$.subscribe((show: boolean) => {
        this.showNavbar = show;
      });
    }

    performLogout() {
        this.auth.logout();
    }
  }
