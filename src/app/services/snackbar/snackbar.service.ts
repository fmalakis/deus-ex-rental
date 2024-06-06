import { Injectable } from '@angular/core';
import {
    MatSnackBar
} from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';

@Injectable({
  providedIn: 'root'
})
export class SnackbarService {

    private readonly DURATION = 3000;

    constructor(private snackbar: MatSnackBar) { }


    showSnackbar(type: SnackbarType, message: string, action?: string, duration?: number) {
        this.snackbar.openFromComponent(SnackbarComponent, {
            duration: duration ?? this.DURATION,
            data: {
                message: message,
                type: type,
                action: action
            }
        });
    }

}

export enum SnackbarType {
    LOGIN_ERROR,
    RENT,
    TOP_UP
}
