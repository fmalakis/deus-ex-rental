import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService, User, DepositResponse } from './user.service';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get user profile', () => {
    const mockUser: User = {
      email: 'test@example.com',
      first_name: 'John',
      last_name: 'Doe',
      wallet: 100
    };

    service.getUserProfile().subscribe((user) => {
      expect(user).toEqual(mockUser);
    });

    const req = httpMock.expectOne(service['USER_API_URL']);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should top up wallet', () => {
    const mockResponse: DepositResponse = {
      deposit: 50
    };

    const amount = 50;

    service.topUpWallet(amount).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['USER_API_URL']);
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ deposit: amount });
    req.flush(mockResponse);
  });
});
