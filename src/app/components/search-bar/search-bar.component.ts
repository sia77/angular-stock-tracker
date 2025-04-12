import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject } from 'rxjs';
import { Router } from '@angular/router';
import { SearchAssetService } from '../../services/search-asset.service';

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

  constructor(private searchAssetService: SearchAssetService,
              private router: Router) { }

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),      
    ).subscribe(data => {
      this.searchAssetService.assetSearch(data);
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

