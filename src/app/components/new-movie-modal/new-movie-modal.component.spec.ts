import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovieModalComponent } from './new-movie-modal.component';

describe('NewMovieModalComponent', () => {
  let component: NewMovieModalComponent;
  let fixture: ComponentFixture<NewMovieModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovieModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NewMovieModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
