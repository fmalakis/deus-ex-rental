import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopUpModalComponent } from './top-up-modal.component';
import { MatDialogRef } from '@angular/material/dialog';

describe('TopUpModalComponent', () => {
  let component: TopUpModalComponent;
  let fixture: ComponentFixture<TopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TopUpModalComponent],
      providers: [{provide: MatDialogRef, useValue: {}}]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
