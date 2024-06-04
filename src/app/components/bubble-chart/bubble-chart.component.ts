import { Component } from '@angular/core';
import { Movie, MoviesServiceService } from '../../services/movies/movies-service.service';
import { NgxEchartsDirective, provideEcharts } from 'ngx-echarts';
import { number } from 'echarts';


@Component({
  selector: 'app-bubble-chart',
  standalone: true,
  imports: [NgxEchartsDirective],
  providers: [
    provideEcharts()
  ],
  templateUrl: './bubble-chart.component.html',
  styleUrl: './bubble-chart.component.scss'
})
export class BubbleChartComponent {

    bubbleChartOptions: any;
    movies: Movie[] = [];
    chartLoaded: boolean = false;

    constructor(private movieService: MoviesServiceService) {}

    ngOnInit() {
        this.movieService.getAllMovies().subscribe(
            moviesResponse => {
                this.movies = moviesResponse.results;
                console.log(moviesResponse);
                this.loadBubbleChartOptions();
                this.chartLoaded = true;
            },
            error => console.log(error)
        )
    }

    loadBubbleChartOptions() {

        const movieCountByYear = this.movies.reduce((acc: any, movie) => {
            acc[movie.pub_date] = (acc[movie.pub_date] || 0) + 1;
            return acc;
        }, {});

        const bubbleData = Object.keys(movieCountByYear).map(year => ({
            year: +year,
            count: movieCountByYear[year]
        })).filter(data => data.year >= 1950 && data.year <= new Date().getFullYear());

        console.log('Bubble Data:', bubbleData); // Add this line to check data


        this.bubbleChartOptions = {
        xAxis: {
            type: 'value',
            name: 'Year of Release',
            nameLocation: 'middle', // Place the name in the middle
            nameGap: 30, // Adjust gap as needed
            nameTextStyle: {
                color: 'white' // Set y-axis name color to white
            },
            axisLabel: {
                formatter: function (value: number) {
                    return `{yearLabel|${value}}`
                },
                rich: {
                    yearLabel: {
                        color: 'white'
                    }
                }
            },
            min: Math.min(...bubbleData.map(data => data.year)),
            max: Math.max(...bubbleData.map(data => data.year))
        },
        yAxis: {
            type: 'value',
            name: 'Number of Movies',
            nameLocation: 'middle',
            nameRotate: 90, // Rotate the name to be parallel to the y-axis
            nameGap: 25, // Adjust gap as needed
            nameTextStyle: {
                color: 'white' // Set y-axis name color to white
            },
            axisLabel: {
                formatter: function (value: number) {
                    return `{countLabel|${value}}`
                },
                rich: {
                    countLabel: {
                        color: 'white'
                    }
                }
            },
        },
        series: [{
            type: 'scatter',
            symbolSize: function (data: any) {
                return data[2] * 6.5;
            },
            data: bubbleData.map(item => [item.year, item.count, item.count]),
            animationDelay: function (idx: any) {
                return idx * 50;
            }
        }],
        tooltip: {
            formatter: function (param: any) {
                const year = param.data[0];
                const count = param.data[1];
                return `Year: ${year}<br>Number of Movies: ${count}`;
              }
        }
        };
        console.log('Chart Options:', this.bubbleChartOptions); // Add this line to check options

    }
}
