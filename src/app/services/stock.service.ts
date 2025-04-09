import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, catchError, Observable, of, retry, tap, throwError } from 'rxjs';
import { ApiResponseArr, Asset } from '../interface/assetInterfaces';
import { initialValAPIRespArr } from '../shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.POLYGON_API_KEY}`, 
  });

  private apiUrl = environment.POLYGON_BASE_URL;
  
  private searchResultsSource = new BehaviorSubject<ApiResponseArr<Asset>>(initialValAPIRespArr);
  searchResults$ = this.searchResultsSource.asObservable();
  private cache = new Map<string, any>(); // Cache to store search results

  constructor(private http: HttpClient) {

    if(environment.production){
      this.apiUrl += 'tickers';
    }else{
      //this.apiUrl += `ticker.json`;
      this.apiUrl += 'tickers';
    }

  }

  getStockData(ticker: string): void {
    let params = new HttpParams()
        .set('search', ticker)
        .set('market', 'stocks')
        .set('active', true)
        .set('order', 'asc')
        .set('limit', 20)
        .set('sort', 'ticker');

    if (!ticker.trim()) {
      this.searchResultsSource.next(initialValAPIRespArr); // Clear results if input is empty
      return;
    }

    // If we already searched for this term, return cached results
    if (this.cache.has(ticker)) {
      this.searchResultsSource.next(this.cache.get(ticker)!);
      return;
    }

    // Make API call
    this.http.get<any[]>(this.apiUrl, {headers:this.headers, params }).pipe(
      tap(data => this.cache.set(ticker, data)), // Cache the result
      //retry(2), // Retries API call up to 2 times before failing
      catchError(this.handleError) //  Handle error centrally
    )
    .subscribe(data => {
      this.searchResultsSource.next(data); // Send results to subscribers
    });

  }

  private handleError(error: HttpErrorResponse): Observable<any> {
    console.error("API call failed:", error);
  
    if (error.status === 404) {
      return throwError(() => new Error("Ticker not found"));
    } else if (error.status === 500) {
      return throwError(() => new Error("Server error. Try again later."));
    } else if (error.status === 429){
      return throwError(() => new Error("You've exceeded the maximum of 5 requests per minute, please wait and try again."));
    }
  
    return throwError(() => new Error("Something went wrong. Please try again."));
  }
}
