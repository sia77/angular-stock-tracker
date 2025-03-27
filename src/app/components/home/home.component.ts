import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { StockService } from '../../services/stock.service';


@Component({
  selector: 'app-home',
  imports: [BaseChartDirective, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  stockData: any = [];

  constructor(private stockService:StockService) {
    // Register Chart.js components
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.stockService.getStockData().subscribe(
      (data) => {
        this.stockData = data;
        console.log('Stock Data:', this.stockData);
      },
      (error) => {
        console.error('Error fetching stock data:', error);
      }
    );
  }


  chartData: ChartData<'line'> = {
    labels: ['January', 'February', 'March', 'April', 'May'],
    datasets: [
      {
        label: 'Stock Price',
        data: [65, 59, 80, 81, 56],
        borderColor: 'blue',
        backgroundColor: 'rgba(0, 0, 255, 0.1)',
        fill: true,
      },
    ],
  };

  chartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Price',
        },
      },
    },
  };

  chartLegend = true;

}
