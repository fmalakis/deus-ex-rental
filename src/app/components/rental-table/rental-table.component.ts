import { Component, Input } from '@angular/core';
import { Rental, RentalService } from '../../services/rental/rental.service';
import { NgClass, formatDate } from '@angular/common';
import { MatRippleModule } from '@angular/material/core';
import { ActivatedRoute } from '@angular/router';

type SortableColumns = 'movie' | 'rental_date' | 'return_date';


@Component({
  selector: 'app-rental-table',
  standalone: true,
  imports: [NgClass, MatRippleModule],
  templateUrl: './rental-table.component.html',
  styleUrl: './rental-table.component.scss'
})
export class RentalTableComponent {

    @Input()
    tableHeader: string = '';

    rentals: Rental[] = [];
    totalCount: number = 0;
    sortColumn: SortableColumns = 'movie';
    sortDirection: string = 'asc';
    page: number = 1;
    pageSize: number = 5;
    hasNext: boolean = false;
    isAdminTable: boolean = false;


    constructor(private rentalService: RentalService, private route: ActivatedRoute) {}

    ngOnInit() {
        this.setIsAdminTable();
        this.rentalService.getUserRentals(this.page, this.pageSize).subscribe(
            rentalResponse => {
                console.log(rentalResponse);
                this.rentals = rentalResponse.results;
                this.totalCount = Math.ceil(rentalResponse.count / this.pageSize);
                this.hasNext = rentalResponse.next !== '' && rentalResponse.next !== null;
            },
            error => console.log('Error whilst getting user rentals', error)
        )
    }

    setIsAdminTable() {
        this.route.url.subscribe(([url]) => {
            const { path } = url
            console.log(path)
            this.isAdminTable = (path === 'admin');
        });
    }

    sortMovies() {
        const { sortColumn, sortDirection } = this;
        this.rentals.sort((a, b) => {
          let comparison = 0;
          if (a[sortColumn] > b[sortColumn]) {
            comparison = 1;
          } else if (a[sortColumn] < b[sortColumn]) {
            comparison = -1;
          }
          return sortDirection === 'asc' ? comparison : -comparison;
        });
      }

      changePage(page: number) {
        this.page = page;
        this.rentalService.getUserRentals(this.page, this.pageSize).subscribe(
            rentalResponse => {
                this.rentals = rentalResponse.results;
                this.hasNext = rentalResponse.next !== '' && rentalResponse.next !== null;
                this.sortMovies();
            },
            error => console.log('Error getting new rentals', error)
        )
      }
    
      changeSort(column: SortableColumns) {
        if (this.sortColumn === column) {
          this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
        } else {
          this.sortColumn = column;
          this.sortDirection = 'asc';
        }
        this.sortMovies();
      }
    
      returnMovie(rental: Rental) {
        this.rentalService.returnRental(rental).subscribe(
            rentalReturnResponse => {
                rental.is_paid = true;
                rental.return_date = formatDate(new Date(), "yyyy-MM-dd", "en-US");

                this.sortMovies()
                console.log(rentalReturnResponse);
            },
            error => console.log(error)
        )
      }


}
