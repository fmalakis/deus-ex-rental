import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NavbarComponent } from './navbar.component';
import { NavbarService } from '../../services/navbar/navbar.service';
import { AuthService } from '../../services/auth/auth.service';
import { RouterTestingModule } from '@angular/router/testing';
import { BehaviorSubject } from 'rxjs';
import { By } from '@angular/platform-browser';

class MockNavbarService {
    navbarVisibility$ = new BehaviorSubject(true);
    isAdmin$ = new BehaviorSubject(false);
}

describe('NavbarComponent', () => {
    let component: NavbarComponent;
    let fixture: ComponentFixture<NavbarComponent>;
    let navbarService: MockNavbarService;
    let authService: jasmine.SpyObj<AuthService>;

    beforeEach(async () => {
        const authServiceSpy = jasmine.createSpyObj('AuthService', ['logout']);

        await TestBed.configureTestingModule({
            imports: [RouterTestingModule, NavbarComponent], // Import the standalone component here
            providers: [
                { provide: NavbarService, useClass: MockNavbarService },
                { provide: AuthService, useValue: authServiceSpy }
            ]
        }).compileComponents();

        fixture = TestBed.createComponent(NavbarComponent);
        component = fixture.componentInstance;
        navbarService = TestBed.inject(NavbarService) as unknown as MockNavbarService;
        authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should show the navbar based on service observable', () => {
        expect(component.showNavbar).toBeTrue();
    });

    it('should show the admin link if the user is an admin', () => {
        navbarService.isAdmin$.next(true); // Simulate observable emit
        fixture.detectChanges();

        const adminLink = fixture.debugElement.query(By.css('a[routerLink="/admin"]'));
        expect(adminLink).toBeTruthy();
    });

    it('should toggle menu visibility', () => {
        component.toggleMenu();
        expect(component.menuIsShowing).toBeTrue();
        component.toggleMenu();
        expect(component.menuIsShowing).toBeFalse();
    });

    it('should close the menu', () => {
        component.menuIsShowing = true;
        component.closeMenu();
        expect(component.menuIsShowing).toBeFalse();
    });

    it('should logout and close the menu', () => {
        component.menuIsShowing = true;
        component.performLogout();
        expect(component.menuIsShowing).toBeFalse();
        expect(authService.logout).toHaveBeenCalled();
    });
});
