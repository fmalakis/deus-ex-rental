import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MoviesComponent } from './movies.component'; // Importing component for testing
import { MoviesServiceService, Movie, Category, MovieResponse } from '../../services/movies/movies-service.service';
import { ActivatedRoute } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('MoviesComponent', () => {
  let component: MoviesComponent;
  let fixture: ComponentFixture<MoviesComponent>;
  let moviesServiceMock: jasmine.SpyObj<MoviesServiceService>;

  const mockCategories: Category[] = [
    { name: 'Action' },
    { name: 'Comedy' },
  ];

  const mockMovieResponse: MovieResponse = {
    count: 2,
    next: '',
    previous: '',
    results: [
      { 
        uuid: '1', 
        title: 'Movie A',
        pub_date: 20220101,
        duration: 120,
        rating: '8',
        description: 'Description of Movie A',
        poster_url: 'poster_url_a.jpg',
        categories: ['Action', 'Adventure']
      },
      { 
        uuid: '2', 
        title: 'Movie B',
        pub_date: 20220102,
        duration: 110,
        rating: '6',
        description: 'Description of Movie B',
        poster_url: 'poster_url_b.jpg',
        categories: ['Comedy']
      },
    ],
  };

  beforeEach(async () => {
    moviesServiceMock = jasmine.createSpyObj('MoviesServiceService', ['getCategories', 'getMovies']);

    await TestBed.configureTestingModule({
      imports: [MoviesComponent], // Importing component for testing
      providers: [
        { provide: MoviesServiceService, useValue: moviesServiceMock },
        { provide: ActivatedRoute, useValue: { queryParamMap: of({ get: () => null }) } }
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(MoviesComponent);
    component = fixture.componentInstance;
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should load categories and movies on init', () => {
    moviesServiceMock.getCategories.and.returnValue(of(mockCategories));
    moviesServiceMock.getMovies.and.returnValue(of(mockMovieResponse));

    component.ngOnInit();

    expect(moviesServiceMock.getCategories).toHaveBeenCalled();
    expect(component.categories).toEqual(mockCategories);
    expect(moviesServiceMock.getMovies).toHaveBeenCalledWith(1, 25, '', '', '', '', '');
    expect(component.movies).toEqual(mockMovieResponse.results);
  });

  it('should clear filters and load movies when clearFilters is called', () => {
    moviesServiceMock.getMovies.and.returnValue(of(mockMovieResponse));
    component.filterCategory = 'Action';

    component.clearFilters();

    expect(component.filterCategory).toEqual('');
    expect(component.movies).toEqual(mockMovieResponse.results);
    expect(moviesServiceMock.getMovies).toHaveBeenCalledWith(1, 25, '', '', '', '', '');
  });

  it('should initiate search and load movies when initiateSearch is called', () => {
    moviesServiceMock.getMovies.and.returnValue(of(mockMovieResponse));

    component.initiateSearch();

    expect(moviesServiceMock.getMovies).toHaveBeenCalledWith(1, 25, '', '', '', '', '');
  });

  it('should handle errors while loading categories', () => {
    moviesServiceMock.getCategories.and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(component.categories).toEqual([]);
  });

  it('should handle errors while loading movies', () => {
    moviesServiceMock.getMovies.and.returnValue(throwError('Error'));

    component.ngOnInit();

    expect(component.movies).toEqual([]);
  });
});
