import { TestBed } from '@angular/core/testing';

import { RentalService } from './rental.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('RentalService', () => {
  let service: RentalService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [HttpClient, HttpHandler]
    });
    service = TestBed.inject(RentalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
