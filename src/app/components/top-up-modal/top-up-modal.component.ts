import { NgClass } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatRippleModule } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-top-up-modal',
  standalone: true,
  imports: [FormsModule, MatRippleModule, NgClass],
  templateUrl: './top-up-modal.component.html',
  styleUrl: './top-up-modal.component.scss'
})
export class TopUpModalComponent {

    amount: number = 0;

    constructor(public dialogRef: MatDialogRef<TopUpModalComponent>) {}

    changeAmount(additionalValue: number) {
        if (this.amount + additionalValue <= 0) return;

        this.amount += additionalValue;
    }

    onNoClick(): void {
        this.dialogRef.close();
    }

    topUp(): void {
        // Implement the top-up logic here
        console.log(`Topping up with amount: ${this.amount}`);
        this.dialogRef.close(this.amount);
    }
}
