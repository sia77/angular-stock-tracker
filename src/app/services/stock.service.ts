import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;
  
  // private headers = new HttpHeaders({
  //   ...(environment.production
  //     ? { Authorization: `Bearer ${environment.apiKey}` ,'x-api-key': environment.apiKey  }
  //     : { 'x-api-key': environment.apiKey })
      
  // });

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.apiKey}`, // Some APIs use 'Authorization' with Bearer tokens
  });

  private cache = new Map<string, any>(); // Cache to store search results

  constructor(private http: HttpClient) {}

  getStockData(ticker: string): Observable<any> {

    // If we already searched for this term, return cached results
    if (this.cache.has(ticker)) {
      return of(this.cache.get(ticker));
    }

    if(environment.production){
      this.apiUrl += 'tickers?market=stocks&active=true&order=asc&limit=100&sort=ticker';
    }else{
      this.apiUrl += `ticker.json`;
    }

    console.log("service");

    // Perform API request
    return this.http.get<any>(`${this.apiUrl}&ticker=${ticker}`, {headers:this.headers}).pipe(
      tap(data => this.cache.set(ticker, data)) // Store in cache
    );

    //return this.http.get<any>(this.apiUrl, {headers:this.headers});
  }
}
