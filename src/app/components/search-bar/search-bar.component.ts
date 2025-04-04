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
  //stockData$!: Observable<any>;
  private searchTerms = new Subject<string>();

  constructor(private stockService:  StockService, private router: Router) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),      
    ).subscribe(data => {
      this.stockService.getStockData(data.toUpperCase());
      this.router.navigate(['/search-result']);
    });
  }

  search(ticker: string): void {    
    this.searchTerms.next(ticker);
  }

  clearSearchBar(){
    this.ticker='';
  }

  ngOnDestroy(): void {
    if (this.searchTerms) {
      this.searchTerms.unsubscribe();
    }
  }

}

