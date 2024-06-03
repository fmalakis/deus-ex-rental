import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentalTableComponent } from './rental-table.component';

describe('RentalTableComponent', () => {
  let component: RentalTableComponent;
  let fixture: ComponentFixture<RentalTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RentalTableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RentalTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
