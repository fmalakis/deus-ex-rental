import { TestBed } from '@angular/core/testing';
import { MoviesServiceService } from './movies-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Movie, RentalCreationResponse, MovieResponse } from './movies-service.service';

describe('MoviesServiceService', () => {
    let service: MoviesServiceService;
    let httpMock: HttpTestingController;

    const mockMovie: Movie = {
        uuid: '1',
        title: 'Test Movie',
        pub_date: 2023,
        duration: 120,
        rating: '8.5',
        description: 'Test Description',
        poster_url: 'test-url',
        categories: ['Action', 'Comedy']
    };

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ HttpClientTestingModule ],
            providers: [ MoviesServiceService ]
        });
        service = TestBed.inject(MoviesServiceService);
        httpMock = TestBed.inject(HttpTestingController);
    });

    afterEach(() => {
        httpMock.verify();
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should fetch movie by id', () => {
        service.getMovieById('1').subscribe((movie) => {
            expect(movie).toEqual(mockMovie);
        });

        const req = httpMock.expectOne('/api/rent-store/movies//1');
        expect(req.request.method).toBe('GET');
        req.flush(mockMovie);
    });

    it('should rent a movie', () => {
        const mockResponse: RentalCreationResponse = { movieId: '1' };

        service.rentMovie('1').subscribe((response) => {
            expect(response).toEqual(mockResponse);
        });

        const req = httpMock.expectOne('/api/rent-store/rentals/');
        expect(req.request.method).toBe('POST');
        req.flush(mockResponse);
    });
});
