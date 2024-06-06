import { Component } from '@angular/core';
import { StorageService } from '../../services/storage/storage.service';
import { User, UserService } from '../../services/user/user.service';
import { RentalTableComponent } from '../../components/rental-table/rental-table.component';
import { Rental, RentalService } from '../../services/rental/rental.service';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TopUpModalComponent } from '../../components/top-up-modal/top-up-modal.component';
import { SnackbarService, SnackbarType } from '../../services/snackbar/snackbar.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RentalTableComponent, MatRippleModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

    user: User | undefined;
    performingTopUp: boolean = false;

    constructor(private userService: UserService, public dialog: MatDialog, private snackbarService: SnackbarService) {}

    ngOnInit() {
        this.userService.getUserProfile().subscribe(
            user => {
                this.user = user;
            },
            error => console.log('Error getting user profile', error)
        );
    }

    topUpWallet() {

        const topUpModalRef = this.dialog.open(TopUpModalComponent);

        topUpModalRef.afterClosed().subscribe(
            result => {
                if (result) {
                    this.performingTopUp = true;

                    this.userService.topUpWallet(result).subscribe(
                        walletResponse => {
                            if (this.user) this.user.wallet += walletResponse.deposit;

                            this.snackbarService.showSnackbar(SnackbarType.TOP_UP, `${walletResponse.deposit}€ have been succesfully added to your wallet`)
                            this.performingTopUp = false;
                        },
                        error => this.snackbarService.showSnackbar(SnackbarType.LOGIN_ERROR, 'Oops, could not complete the top up')
                    )
                }
            }
        );

    }

}
