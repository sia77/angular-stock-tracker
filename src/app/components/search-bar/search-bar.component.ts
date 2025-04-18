import { Component } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon'
import { FormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged, Subject, Subscription } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';
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
  private searchTerms = new Subject<string>();

  constructor(private searchAssetService: SearchAssetService,
              private router: Router) { }

  private routerSub!: Subscription;

  ngOnInit(): void {
    this.searchTerms.pipe(
      debounceTime(400),
      distinctUntilChanged(),      
    ).subscribe(data => {
      this.searchAssetService.assetSearch(data);
      this.router.navigate(['/search-result']);
    });

    // this.routerSub = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     const isOnSearchPage = event.urlAfterRedirects.includes('/search-result');
    //     if (!isOnSearchPage) {
    //       this.clearSearchBar() // Reset if not on search page
    //     }
    //   }
    // });
  }

  search(ticker: string): void {    
    this.searchTerms.next(ticker);
  }

  clearSearchBar(){
    this.ticker='';
    this.searchTerms.next("");
  }

  ngOnDestroy(): void {
    this.searchTerms?.unsubscribe();
    this.routerSub?.unsubscribe();

  }

}

