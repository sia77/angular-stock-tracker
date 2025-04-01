import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { StockService } from '../../services/stock.service';
import { debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-bar',
  imports: [MatFormFieldModule, MatInputModule, MatIconModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css'
})
export class SearchBarComponent {
  ticker!: string;
  limit:number = 20;
  stockData$!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private stockService: StockService, 
              private router: Router
  ) {
    this.searchTerms.pipe(
      debounceTime(300), // Wait 300ms after typing stops
      distinctUntilChanged() // Ignore if the input is the same as the last
    ).subscribe(
      (ticker) =>{
        this.stockService.getStockData(ticker.toUpperCase());
        this.router.navigate(['/search-result']);
      }); 
  }

  // ngOnInit(): void {

  //   this.stockData$ = this.searchTerms.pipe(
  //     debounceTime(300),
  //     distinctUntilChanged(),
  //     switchMap((ticker: string) => {
  //       console.log("Making API call for:", ticker);
  //       return this.stockService.getStockData(ticker.toUpperCase());
  //     })
  //   );

  //   // Subscribe to make sure it runs
  //   this.stockData$.subscribe({
  //     next: (data) => {
  //       this.tickerList = data.results;
  //       this.nextUrl = data.next_url;
  //       this.tickerCount = data.count;
  //       console.log("Result: ", data.results);

  //     },
  //     error: (err) => console.error("Error occurred:", err),
  //     complete: () => console.log("Observable completed")
  //   });
  // }

  search(ticker: string): void {    
    this.searchTerms.next(ticker);
  }

  clearSearchBar(){
    this.ticker='';
  }
}

