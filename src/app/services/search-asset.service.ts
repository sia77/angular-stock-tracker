import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
//import { environment } from '../../environments/environment';
import { SearchResponse } from '../interface/assetInterfaces';
//import { initialValAPIHubRes } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SearchAssetService {

  constructor(private http:HttpClient) { }
  private netlifyAPIUrl = environment.NETLIFY_BASE_URL;
  private cache = new Map<string, SearchResponse>();
  private searchResultsSource = new BehaviorSubject<SearchResponse>({result:[]});
  searchResults$ = this.searchResultsSource.asObservable();

  private resetSearchSource = new Subject<string>();
  resetSearch$ = this.resetSearchSource.asObservable();


  assetSearch(query:string):void{

    // If we already searched for this term, return cached results
    if (this.cache.has(query)) {
      this.searchResultsSource.next(this.cache.get(query)!);
      return;
    }

    const params = new HttpParams()
      .set('search', query);

    this.http.get<any>(`${this.netlifyAPIUrl}searchAssets`, {params}).pipe(
      tap((data) => this.cache.set(query, data) )
    ).subscribe(data => {      
      this.searchResultsSource.next(data); // Send results to subscribers
    });

  }
}
