import { Component } from '@angular/core';
import { BubbleChartComponent } from '../../components/bubble-chart/bubble-chart.component';
import { RentalTableComponent } from '../../components/rental-table/rental-table.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [BubbleChartComponent, RentalTableComponent],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.scss'
})
export class AdminComponent {

}
