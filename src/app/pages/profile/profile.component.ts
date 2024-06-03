import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { User, UserService } from '../../services/user/user.service';
import { RentalTableComponent } from '../../components/rental-table/rental-table.component';
import { Rental, RentalService } from '../../services/rental/rental.service';
import { MatRippleModule } from '@angular/material/core';
import { MatDialog } from '@angular/material/dialog';
import { TopUpModalComponent } from '../../components/top-up-modal/top-up-modal.component';

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

    constructor(private userService: UserService, public dialog: MatDialog) {}

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

                            this.performingTopUp = false;
                        },
                        error => console.log('Error during popup', error)
                    )
                }
            }
        );

    }

}
