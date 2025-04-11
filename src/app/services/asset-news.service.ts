import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssetNewsService {

  private apiUrl = environment.FINNHUB_BASE_URL;
  private headers = new HttpHeaders({'X-Finnhub-Token':environment.FINNHUB_API_KEY})
  private cache = new Map<string, any>();

  constructor(private http: HttpClient) { }


  getNewsService(ticker:string, start:string,end:string):Observable<any>{

    const params = new HttpParams()
      .set('symbol', ticker)
      .set('from', start)
      .set('to', end)
      .set('token', environment.FINNHUB_API_KEY);

      if(this.cache.has(ticker)){
        return of(this.cache.get(ticker)!);
      }
    return this.http.get<any>(`${this.apiUrl}company-news`, { params}).pipe(
      tap((data)=> {
        this.cache.set(ticker, data)
      })
    );
    
  }
}
