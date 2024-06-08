import { TestBed } from '@angular/core/testing';
import { CanActivateFn, Router } from '@angular/router';

import { adminGuard } from './admin.guard';

describe('adminGuard', () => {
    let router: Router;
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });

  it('should return true if user is an admin', () => {
    spyOn(router, 'navigate'); // Spy on router.navigate method

    localStorage.setItem('username', 'admin_user'); // Set a mock username

    const result = executeGuard(
        { queryParams: {} } as any, // Mock ActivatedRouteSnapshot
        {} as any // Mock RouterStateSnapshot
      ); // Call the guard

    expect(result).toBeTrue(); // Expect guard to return true
    expect(router.navigate).not.toHaveBeenCalled(); // Expect router.navigate not to have been called
  });

  it('should redirect to login page if user is not authenticated', () => {
    spyOn(router, 'navigate'); // Spy on router.navigate method

    localStorage.removeItem('username'); // Remove username to simulate unauthenticated user

    const result = executeGuard(
        { queryParams: {} } as any, // Mock ActivatedRouteSnapshot
        {} as any // Mock RouterStateSnapshot
      ); // Call the guard

    expect(result).toBeFalse(); // Expect guard to return false
    expect(router.navigate).toHaveBeenCalledWith(['/login']); // Expect router.navigate to have been called with ['/login']
  });

  it('should redirect to movies page if user is not an admin', () => {
    spyOn(router, 'navigate'); // Spy on router.navigate method

    localStorage.setItem('username', 'regular_user'); // Set a mock username without 'admin' role

    const result = executeGuard(
        { queryParams: {} } as any, // Mock ActivatedRouteSnapshot
        {} as any // Mock RouterStateSnapshot
      ); // Call the guard

    expect(result).toBeFalse(); // Expect guard to return false
    expect(router.navigate).toHaveBeenCalledWith(['/movies']); // Expect router.navigate to have been called with ['/movies']
  });
});
