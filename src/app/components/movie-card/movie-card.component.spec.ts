import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieCardComponent } from './movie-card.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Movie } from '../../services/movies/movies-service.service';

describe('MovieCardComponent', () => {
  let component: MovieCardComponent;
  let fixture: ComponentFixture<MovieCardComponent>;
  let mockMovie: Movie = { 
    uuid: '1', 
    title: 'Movie A',
    pub_date: 20220101,
    duration: 120,
    rating: '8',
    description: 'Description of Movie A',
    poster_url: 'poster_url_a.jpg',
    categories: ['Action', 'Adventure']
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MovieCardComponent],
      providers: [HttpClient, HttpHandler,
        { provide: ActivatedRoute, useValue: { queryParamMap: of({ get: () => null }) } }
      ]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MovieCardComponent);
    component = fixture.componentInstance;
    component.movie = mockMovie;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
