import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMovieModalComponent } from './new-movie-modal.component';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Category } from '../../services/movies/movies-service.service';

describe('NewMovieModalComponent', () => {
  let component: NewMovieModalComponent;
  let fixture: ComponentFixture<NewMovieModalComponent>;
  let mockDialogData: {categories: Category[]} = {
    categories: [
        {
            name: 'Test1'
        },
        {
            name: 'Test2'
        }
    ]
  }

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewMovieModalComponent],
      providers: [
        {provide: MatDialogRef, useValue: {}},
        {provide: MAT_DIALOG_DATA, useValue: mockDialogData}
      ]
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
