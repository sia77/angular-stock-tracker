import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {

  ticker:string = 'a';
  stockData: any = [];

  constructor(private stockService:StockService){
    
  }
  
  ngOnInit() {
    this.stockService.getStockData(this.ticker.toUpperCase()).subscribe(
      (data) => {
        this.stockData = data;
        console.log('Stock Data:', this.stockData);
      },
      (error) => {
        console.error('Error fetching stock data:', error);
      }
    );
  }
}
