import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of, throwError } from 'rxjs';
import { RentalTableComponent } from './rental-table.component';
import { RentalService } from '../../services/rental/rental.service';
import { Rental, UserRentalResponse } from '../../services/rental/rental.service';
import { formatDate } from '@angular/common';

describe('RentalTableComponent', () => {
  let component: RentalTableComponent;
  let fixture: ComponentFixture<RentalTableComponent>;
  let rentalServiceMock: jasmine.SpyObj<RentalService>;

  const mockRentals: Rental[] = [
    { uuid: '1', movie: 'Movie A', rental_date: '2023-01-01', return_date: '2023-01-10', is_paid: false, charge: 10, user: 'User1' },
    { uuid: '2', movie: 'Movie B', rental_date: '2023-02-01', return_date: '2023-02-10', is_paid: false, charge: 15, user: 'User2' },
  ];

  const mockUserRentalResponse: UserRentalResponse = {
    count: 2,
    next: '',
    previous: '',
    results: mockRentals,
  };

  beforeEach(async () => {
    rentalServiceMock = jasmine.createSpyObj('RentalService', ['getUserRentals', 'returnRental']);

    await TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RentalTableComponent,  // Importing the standalone component
      ],
      providers: [
        { provide: RentalService, useValue: rentalServiceMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(RentalTableComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize rentals on init', () => {
    rentalServiceMock.getUserRentals.and.returnValue(of(mockUserRentalResponse));

    component.ngOnInit();

    expect(rentalServiceMock.getUserRentals).toHaveBeenCalledWith(1, 5);
    expect(component.rentals).toEqual(mockRentals);
    expect(component.hasNext).toBe(false);
  });

  it('should sort movies correctly', () => {
    component.rentals = mockRentals;
    component.sortColumn = 'movie';
    component.sortDirection = 'asc';

    component.sortMovies();

    expect(component.rentals).toEqual([
      { uuid: '1', movie: 'Movie A', rental_date: '2023-01-01', return_date: '2023-01-10', is_paid: false, charge: 10, user: 'User1' },
      { uuid: '2', movie: 'Movie B', rental_date: '2023-02-01', return_date: '2023-02-10', is_paid: false, charge: 15, user: 'User2' },
    ]);

    component.sortDirection = 'desc';
    component.sortMovies();

    expect(component.rentals).toEqual([
      { uuid: '2', movie: 'Movie B', rental_date: '2023-02-01', return_date: '2023-02-10', is_paid: false, charge: 15, user: 'User2' },
      { uuid: '1', movie: 'Movie A', rental_date: '2023-01-01', return_date: '2023-01-10', is_paid: false, charge: 10, user: 'User1' },
    ]);
  });

  it('should change page and update rentals', () => {
    rentalServiceMock.getUserRentals.and.returnValue(of(mockUserRentalResponse));

    component.changePage(2);

    expect(component.page).toBe(2);
    expect(rentalServiceMock.getUserRentals).toHaveBeenCalledWith(2, 5);
    expect(component.rentals).toEqual(mockRentals);
    expect(component.hasNext).toBe(false);
  });

  it('should change sort column and direction', () => {
    component.sortColumn = 'movie';
    component.sortDirection = 'asc';

    component.changeSort('rental_date');

    expect(component.sortColumn).toBe('rental_date');
    expect(component.sortDirection).toBe('asc');

    component.changeSort('rental_date');

    expect(component.sortDirection).toBe('desc');
  });

  it('should handle return movie', () => {
    const rental: Rental = { uuid: '1', movie: 'Movie A', rental_date: '2023-01-01', return_date: '2023-01-10', is_paid: false, charge: 10, user: 'User1' };
    rentalServiceMock.returnRental.and.returnValue(of({}));

    component.returnMovie(rental);

    expect(rentalServiceMock.returnRental).toHaveBeenCalledWith(rental);
    expect(rental.is_paid).toBe(true);
    expect(rental.return_date).toEqual(formatDate(new Date(), "yyyy-MM-dd", "en-US")); // Check if the return_date is set to the current date
  });

  it('should handle errors on init', () => {
    rentalServiceMock.getUserRentals.and.returnValue(throwError('error'));

    component.ngOnInit();

    expect(rentalServiceMock.getUserRentals).toHaveBeenCalledWith(1, 5);
    expect(component.rentals).toEqual([]);
  });

  it('should handle errors on return movie', () => {
    const rental: Rental = { uuid: '1', movie: 'Movie A', rental_date: '2023-01-01', return_date: '2023-01-10', is_paid: false, charge: 10, user: 'User1' };
    rentalServiceMock.returnRental.and.returnValue(throwError('error'));

    component.returnMovie(rental);

    expect(rentalServiceMock.returnRental).toHaveBeenCalledWith(rental);
    expect(rental.is_paid).toBe(false);
  });
});
