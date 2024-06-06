import { Component, Inject, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MAT_SNACK_BAR_DATA, MatSnackBarAction, MatSnackBarActions, MatSnackBarLabel, MatSnackBarRef } from '@angular/material/snack-bar';
import { SnackbarType } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
    snackBarRef = inject(MatSnackBarRef);

    SnackbarTypes = SnackbarType;

    constructor(@Inject(MAT_SNACK_BAR_DATA) public data: {message: string, type: SnackbarType ,action?: string}) {}

    close() {
        this.snackBarRef.dismiss();
    }

}
