import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  ticker!: string;
  stockData$!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    console.log("ngOnInit running...");

    this.stockData$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((ticker: string) => {
        console.log("Making API call for:", ticker);
        return this.stockService.getStockData(ticker.toUpperCase());
      })
    );

    // Subscribe to make sure it runs
    this.stockData$.subscribe(data => {
      console.log("Received stock data:", data);
    });
  }

  search(ticker: string): void {
    console.log("User typed:", ticker);
    this.searchTerms.next(ticker);
  }
}

