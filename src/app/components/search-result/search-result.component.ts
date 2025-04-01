import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { StockSearchResult } from '../../interface/StockSearchResult.ts';

@Component({
  selector: 'app-search-result',
  imports: [],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {  
    tickerList:any[] = [];
    limit:number = 20;
    status!:string;
    errorMessage!:string;
    nextUrl!:string;
    tickerCount:number = 0;

  constructor(private stockService: StockService) {}

  ngOnInit(): void {
    this.stockService.searchResults$.subscribe(
      {
        next: (data:StockSearchResult)=>{ 
          console.log("data: ", data);         
          this.tickerList = data.results;
          this.nextUrl = data.next_url;
          this.tickerCount = data.count;
          this.status = data.status; 
          this.errorMessage = data.error; 
        },
        error: (err) => console.error("Error occurred:", err),
      }

    );
  }

}
