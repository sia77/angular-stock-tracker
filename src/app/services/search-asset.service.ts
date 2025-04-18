import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject, tap } from 'rxjs';
import { environment } from '../../environments/environment';
import { SearchResponse } from '../interface/assetInterfaces';
import { initialValAPIHubRes } from '../shared/constants/constants';

@Injectable({
  providedIn: 'root'
})
export class SearchAssetService {

  constructor(private http:HttpClient) { }
  private apiUrl = environment.FINNHUB_BASE_URL;
  private cache = new Map<string, SearchResponse>();
  private searchResultsSource = new BehaviorSubject<SearchResponse>(initialValAPIHubRes);
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
      .set('q', query)
      .set('exchange', 'US')
      .set('token', environment.FINNHUB_API_KEY);

    this.http.get<any>(`${this.apiUrl}search`,{params}).pipe(
      tap((data) => this.cache.set(query, data) )
    ).subscribe(data => {
      this.searchResultsSource.next(data); // Send results to subscribers
    });

  }
}
