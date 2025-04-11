import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, map, Observable, of, tap } from 'rxjs';
import { ApiResponse, AssetDetail, BarsResponse } from '../interface/assetInterfaces';
import { initialValAPIResp } from '../shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AssetDetailsService {

  private apiUrl = environment.POLYGON_BASE_URL;
  private apiUrlAplaca = environment.ALPACA_BASE_URL;
  
  private assetDetailSource = new BehaviorSubject<ApiResponse<AssetDetail>>(initialValAPIResp);
  assetDetail$ = this.assetDetailSource.asObservable();

  private cache = new Map<string, any>();
  private latestBar = new Map<string, any>();
  private historicalBars = new Map<string, any>();

  private headers_alpaca = new HttpHeaders({
    'apca-api-key-id': environment.ALPACA_API_KEY,
    'apca-api-secret-key': environment.ALPACA_API_SECRET
  });

  constructor( private http: HttpClient ) {
    this.apiUrl += 'tickers';
    
  }

  //Hybride implementation.
  getAssetDetail(ticker:string):Observable<any>{
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${environment.POLYGON_API_KEY}`, 
    });

    if (!ticker.trim()) {
      this.assetDetailSource.next(initialValAPIResp);
      return of({});
    }

    if(this.cache.has(ticker)){
      this.assetDetailSource.next(this.cache.get(ticker)!);
      return of(this.cache.get(ticker)!);
    }
    return this.http.get<any>(`${this.apiUrl}/${ticker}`, {headers}).pipe(
      tap(data => {
        this.cache.set(ticker, data);
        this.assetDetailSource.next(data);
      })
    );

  }

  getLatestBarInfo(ticker:string):Observable<BarsResponse>{

    const params = new HttpParams()
      .set('symbols',ticker);      
      
    return this.http.get<BarsResponse>(`${this.apiUrlAplaca}stocks/bars/latest`, {headers:this.headers_alpaca, params}).pipe(
      tap(data =>{
        this.latestBar.set(ticker, data);
      })  
    )

  }

  getDailyHistoricalBar(ticker:string):Observable<number>{

    const today = new Date();
    today.setDate(today.getDate() - 1);
    const datePart = today.toISOString().split('T')[0];

    const start = `${datePart}T13:00:00Z`;
    const end = `${datePart}T20:00:00Z`;

    const params = new HttpParams()
      .set('symbols',ticker)
      .set('timeframe','1T')
      .set('start', start)
      .set('end',end)
      .set('limit',1000)
      .set('adjustment','raw')
      .set('feed', 'sip')
      .set('sort', 'asc'); 

      return this.http.get<any>(`${this.apiUrlAplaca}stocks/bars`, {headers:this.headers_alpaca, params}).pipe(
        tap(data => {
          this.historicalBars.set(ticker, data);
        }),
        map((data)=>{
          const barsData = data.bars[ticker];
          const total = barsData.reduce((sum:number, bar:any)=> sum += bar.vw ,0);
          return total/barsData.length;

        })
      )
  }
}
