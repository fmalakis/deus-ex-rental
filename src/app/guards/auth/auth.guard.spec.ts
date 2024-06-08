import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';
import { authGuard } from './auth.guard';

describe('authGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => authGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should allow navigation when user is authenticated', () => {
    // Mock authenticated user
    spyOn(localStorage, 'getItem').and.returnValue('fakeToken');
    spyOn(sessionStorage, 'getItem').and.returnValue('fakeToken');

    // Mock dependencies
    const mockNavbarService = jasmine.createSpyObj('NavbarService', ['toggleNavbarVisibility']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);

    // Execute guard
    const canActivate = executeGuard(
      { queryParams: {} } as any, // Mock ActivatedRouteSnapshot
      {} as any // Mock RouterStateSnapshot
    );

    expect(canActivate).toBeTrue();
  });

  it('should navigate to login page when user is not authenticated', () => {
    // Mock unauthenticated user
    spyOn(localStorage, 'getItem').and.returnValue(null);

    // Mock dependencies
    const mockNavbarService = jasmine.createSpyObj('NavbarService', ['toggleNavbarVisibility']);
    const mockRouter = jasmine.createSpyObj('Router', ['navigate']);
    
    // Execute guard
    const canActivate = executeGuard(
      { queryParams: {} } as any, // Mock ActivatedRouteSnapshot
      {} as any // Mock RouterStateSnapshot
    );

    expect(canActivate).toBeFalse();
  });
});
