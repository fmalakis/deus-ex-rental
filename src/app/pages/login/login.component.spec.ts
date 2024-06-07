import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '../../services/auth/auth.service';
import { StorageService } from '../../services/storage/storage.service';
import { NavbarService } from '../../services/navbar/navbar.service';
import { SnackbarService, SnackbarType } from '../../services/snackbar/snackbar.service';
import { of, throwError } from 'rxjs';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;
  let storageService: StorageService;
  let snackbarService: SnackbarService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [],
      imports: [FormsModule, HttpClientTestingModule, RouterTestingModule, LoginComponent],
      providers: [AuthService, StorageService, NavbarService, SnackbarService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    storageService = TestBed.inject(StorageService);
    snackbarService = TestBed.inject(SnackbarService);
    spyOn(component, 'onLogin').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call onLogin method', () => {
    spyOn(authService, 'login').and.returnValue(of({ access: 'access_token', refresh: 'refresh_token' }));
    spyOn(storageService, 'setLocalStorage');
    spyOn(component, 'setCurrentWord');
    component.username = 'testuser';
    component.password = 'testpassword';
    component.willRemember = true;

    component.onLogin();
    expect(component.onLogin).toHaveBeenCalled();
    expect(authService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    expect(storageService.setLocalStorage).toHaveBeenCalled();
  });

  it('should handle login error', () => {
    spyOn(authService, 'login').and.returnValue(throwError({ error: { detail: 'Login failed' } }));
    spyOn(snackbarService, 'showSnackbar');
    component.username = 'testuser';
    component.password = 'testpassword';
    component.onLogin();
    expect(authService.login).toHaveBeenCalledWith({ username: 'testuser', password: 'testpassword' });
    expect(snackbarService.showSnackbar).toHaveBeenCalledWith(SnackbarType.LOGIN_ERROR, 'Login failed');
    expect(component.isLoggingIn).toBeFalse();
  });
});
