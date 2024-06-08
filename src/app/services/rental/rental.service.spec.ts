import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Rental, RentalService } from './rental.service';

describe('RentalService', () => {
  let service: RentalService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RentalService]
    });
    service = TestBed.inject(RentalService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch user rentals from the API', () => {
    const dummyRentals = [
      { uuid: '1', rental_date: '2024-06-10', return_date: '2024-06-12', is_paid: true, charge: 5, user: 'user1', movie: 'movie1' },
      { uuid: '2', rental_date: '2024-06-11', return_date: '2024-06-13', is_paid: true, charge: 6, user: 'user2', movie: 'movie2' }
    ];

    service.getUserRentals(1, 10).subscribe(rentals => {
      expect(rentals.results.length).toBe(2);
      expect(rentals.results).toEqual(dummyRentals);
    });

    const request = httpMock.expectOne('/api/rent-store/rentals/?page=1&page_size=10');
    expect(request.request.method).toBe('GET');
    request.flush({ results: dummyRentals } as any);
  });

  it('should return a rental', () => {
    const rental: Rental = { uuid: '1', rental_date: '2024-06-10', return_date: '2024-06-12', is_paid: true, charge: 5, user: 'user1', movie: 'movie1' };
  
    service.returnRental(rental).subscribe(response => {
      expect(response).toBeTruthy();
    });
  
    const request = httpMock.expectOne(`/api/rent-store/rentals//${rental.uuid}`);
    expect(request.request.method).toBe('PATCH');
    request.flush({});
  });
  
});
