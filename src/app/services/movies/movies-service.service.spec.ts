import { TestBed } from '@angular/core/testing';

import { MoviesServiceService } from './movies-service.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('MoviesServiceService', () => {
  let service: MoviesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(MoviesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
