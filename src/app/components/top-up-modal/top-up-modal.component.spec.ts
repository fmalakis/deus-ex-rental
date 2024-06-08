import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatRippleModule } from '@angular/material/core';
import { TopUpModalComponent } from './top-up-modal.component';

describe('TopUpModalComponent', () => {
  let component: TopUpModalComponent;
  let fixture: ComponentFixture<TopUpModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormsModule, MatDialogModule, MatRippleModule, TopUpModalComponent],
      providers: [{ provide: MatDialogRef, useValue: { close: () => {} } }]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopUpModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should change the amount correctly when adding', () => {
    component.changeAmount(10);
    expect(component.amount).toEqual(10);
  });

  it('should change the amount correctly when subtracting', () => {
    component.amount = 20;
    component.changeAmount(-10);
    expect(component.amount).toEqual(10);
  });

  it('should not allow the amount to go below zero', () => {
    component.amount = 5;
    component.changeAmount(-10);
    expect(component.amount).toEqual(5);
  });

  it('should close the dialog with the amount when topping up', () => {
    spyOn(component.dialogRef, 'close');
    component.amount = 15;
    component.topUp();
    expect(component.dialogRef.close).toHaveBeenCalledWith(15);
  });
  
  it('should not close the dialog if the amount is zero', () => {
    spyOn(component.dialogRef, 'close');
    component.topUp();
    expect(component.dialogRef.close).not.toHaveBeenCalled();
  });
  
});
