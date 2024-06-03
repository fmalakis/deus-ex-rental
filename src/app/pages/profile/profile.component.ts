import { Component } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { User, UserService } from '../../services/user/user.service';
import { RentalTableComponent } from '../../components/rental-table/rental-table.component';
import { Rental, RentalService } from '../../services/rental/rental.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [RentalTableComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

    user: User | undefined;
    performingTopUp: boolean = false;

    constructor(private userService: UserService) {}

    ngOnInit() {
        this.userService.getUserProfile().subscribe(
            user => {
                this.user = user;
            },
            error => console.log('Error getting user profile', error)
        );
    }

    topUpWallet() {

        this.performingTopUp = true;

        this.userService.topUpWallet(25).subscribe(
            walletResponse => {
                if (this.user) this.user.wallet += walletResponse.deposit;

                this.performingTopUp = false;
            },
            error => console.log('Error during popup', error)
        )
    }

}
