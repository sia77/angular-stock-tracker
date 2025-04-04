import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable, of, tap } from 'rxjs';
import { ApiResponse, AssetDetail } from '../interface/assetInterfaces';
import { initialValAPIResp } from '../shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AssetDetailsService {

  private headers = new HttpHeaders({
    'Authorization': `Bearer ${environment.apiKey}`, 
  });

  private apiUrl = environment.apiUrl;
  private assetDetailSource = new BehaviorSubject<ApiResponse<AssetDetail>>(initialValAPIResp);
  assetDetail$ = this.assetDetailSource.asObservable();

  private cache = new Map<string, any>();

  constructor( private http: HttpClient ) {
    this.apiUrl += 'tickers';
  }

  //Hybride implementation.
  getAssetDetail(ticker:string):Observable<any>{

    if (!ticker.trim()) {
      this.assetDetailSource.next(initialValAPIResp);
      return of({});
    }

    if(this.cache.has(ticker)){
      this.assetDetailSource.next(this.cache.get(ticker)!);
      return of(this.cache.get(ticker)!);
    }
    return this.http.get<any>(`${this.apiUrl}/${ticker}`, {headers:this.headers}).pipe(
      tap(data => {
        this.cache.set(ticker, data);
        this.assetDetailSource.next(data);
      })
    );

  }

}
