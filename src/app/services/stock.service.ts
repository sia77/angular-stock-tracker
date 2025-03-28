import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;
  
  private headers = new HttpHeaders({
    ...(environment.production
      ? { Authorization: `Bearer ${environment.apiKey}` }
      : { 'x-api-key': environment.apiKey })
  });

  private cache = new Map<string, any>(); // Cache to store search results

  constructor(private http: HttpClient) {}

  getStockData(ticker: string): Observable<any> {

    // If we already searched for this term, return cached results
    if (this.cache.has(ticker)) {
      return of(this.cache.get(ticker));
    }

    if(environment.production){
      this.apiUrl += 'tickers?market=stocks&active=true&order=asc&limit=500&sort=ticker';
    }else{
      this.apiUrl += `ticker.json`;
    }

    // Perform API request
    return this.http.get<any>(`${this.apiUrl}&ticker=${ticker}`).pipe(
      tap(data => this.cache.set(ticker, data)) // Store in cache
    );

    //return this.http.get<any>(this.apiUrl, {headers:this.headers});
  }
}
