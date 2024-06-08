import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService, AuthResponse } from './auth.service';
import { StorageService } from '../storage/storage.service';
import { Router } from '@angular/router';

describe('AuthService', () => {
  let authService: AuthService;
  let httpTestingController: HttpTestingController;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService, StorageService]
    });
    authService = TestBed.inject(AuthService);
    httpTestingController = TestBed.inject(HttpTestingController);
    router = TestBed.inject(Router);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(authService).toBeTruthy();
  });

  it('should send login request', () => {
    const loginData = { username: 'testuser', password: 'testpassword' };
    const mockAuthResponse: AuthResponse = { access: 'access_token', refresh: 'refresh_token' };

    authService.login(loginData).subscribe(response => {
      expect(response).toEqual(mockAuthResponse);
    });

    const req = httpTestingController.expectOne('/api/auth/login/');
    expect(req.request.method).toBe('POST');
    req.flush(mockAuthResponse);
  });

  it('should clear storage and navigate to login page on logout', () => {
    const storageService = TestBed.inject(StorageService);
    spyOn(storageService, 'clearStorage');
    spyOn(router, 'navigate');

    authService.logout();

    expect(storageService.clearStorage).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['/login']);
  });
});
