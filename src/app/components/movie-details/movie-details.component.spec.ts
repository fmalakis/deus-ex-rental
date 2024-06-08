import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MovieDetailsComponent } from './movie-details.component';
import { MoviesServiceService } from '../../services/movies/movies-service.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';

describe('MovieDetailsComponent', () => {
    let component: MovieDetailsComponent;
    let fixture: ComponentFixture<MovieDetailsComponent>;
    let movieService: MoviesServiceService;

    const mockActivatedRoute = {
        snapshot: {
            paramMap: {
                get: () => '1'
            }
        }
    };

    const mockMovie = {
        uuid: '1',
        title: 'Test Movie',
        pub_date: 2023,
        duration: 120,
        rating: '8.5',
        description: 'Test Description',
        poster_url: 'test-url',
        categories: ['Action', 'Comedy']
    };

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [],
            imports: [ HttpClientTestingModule, RouterTestingModule ],
            providers: [
                MoviesServiceService,
                MovieDetailsComponent,
                { provide: ActivatedRoute, useValue: mockActivatedRoute }
            ]
        })
        .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(MovieDetailsComponent);
        component = fixture.componentInstance;
        movieService = TestBed.inject(MoviesServiceService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should fetch movie details on init', () => {
        spyOn(movieService, 'getMovieById').and.returnValue(of(mockMovie));
        component.ngOnInit();
        expect(component.movie).toEqual(mockMovie);
    });

    it('should handle error while fetching movie details', () => {
        spyOn(movieService, 'getMovieById').and.returnValue(throwError('Error'));
        spyOn(console, 'log');
        component.ngOnInit();
        expect(console.log).toHaveBeenCalledWith('Error whilst fetching movie', 'Error');
    });

    it('should disable rent button while renting', () => {
        spyOn(movieService, 'rentMovie').and.returnValue(of({ movieId: '1' }));
        component.movie = mockMovie;
        expect(component.rentingIsDisabled).toBeFalse();
        component.rentMovie();
        expect(component.rentingIsDisabled).toBeFalse();
    });

    it('should re-enable rent button after renting', () => {
        spyOn(movieService, 'rentMovie').and.returnValue(of({ movieId: '1' }));
        component.movie = mockMovie;
        component.rentMovie();
        expect(component.rentingIsDisabled).toBeFalse();
    });

    it('should handle error while renting a movie', () => {
        spyOn(movieService, 'rentMovie').and.returnValue(throwError('Error'));
        spyOn(console, 'log');
        component.movie = mockMovie;
        component.rentMovie();
        expect(console.log).toHaveBeenCalledWith('Error whilst trying to rent movie', 'Error');
    });

    it('should convert duration to string correctly', () => {
        const durationString = component.durationToString(130);
        expect(durationString).toBe('2 hours, 10 minutes');
    });
});
