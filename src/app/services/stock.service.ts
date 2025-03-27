import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StockService {
  private apiUrl = environment.apiUrl;
  
  
  
  private headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.apiKey}`, // Some APIs use 'Authorization' with Bearer tokens
    //'x-api-key': environment.apiKey,  // Some APIs use custom headers like 'x-api-key'
  });

  constructor(private http: HttpClient) {}

  getStockData(): Observable<any> {

    console.log("flag: ", environment.production);

    if(environment.production){
      this.apiUrl += 'tickers?market=stocks&active=true&order=asc&limit=1000&sort=ticker';
    }else{
      this.apiUrl += `ticker.json`;
    }


    return this.http.get<any>(this.apiUrl, {headers:this.headers});
  }
}
