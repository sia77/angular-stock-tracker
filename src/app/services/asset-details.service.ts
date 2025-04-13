import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { AssetMetrics, AssetProfile, BarsResponse } from '../interface/assetInterfaces';
import { initialValAPIResp } from '../shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AssetDetailsService {

  private apiUrl = environment.POLYGON_BASE_URL;
  private apiUrlAplaca = environment.ALPACA_BASE_URL;
  private apiUrlFinnhub = environment.FINNHUB_BASE_URL;
  
  private assetDetailSource = new BehaviorSubject<AssetProfile>(initialValAPIResp);
  assetDetail$ = this.assetDetailSource.asObservable();

  private cache = new Map<string, any>();
  private latestBar = new Map<string, any>();
  private historicalBars = new Map<string, any>();
  private metrics = new Map<string, any>();

  private headers_alpaca = new HttpHeaders({
    'apca-api-key-id': environment.ALPACA_API_KEY,
    'apca-api-secret-key': environment.ALPACA_API_SECRET
  });

  constructor( private http: HttpClient ) {
    this.apiUrl += 'tickers';
  }

  //Hybride implementation.
  getAssetDetail(ticker:string):Observable<any>{

    if (!ticker.trim()) {
      return of({});
    }

    if(this.cache.has(ticker)){
      return of(this.cache.get(ticker)!);
    }

    const params = new HttpParams()
      .set('symbol', ticker)
      .set('token', environment.FINNHUB_API_KEY)


    return this.http.get<any>(`${this.apiUrlFinnhub}stock/profile2`, {params}).pipe(
      tap(data => {
        this.cache.set(ticker, data);
      })
    );

  }

  getLatestBarInfo(ticker:string):Observable<BarsResponse>{

    if(this.latestBar.has(ticker)){
      return of(this.latestBar.get(ticker)!);
    }

    return this.http.get<BarsResponse>(`${this.apiUrlAplaca}stocks/${ticker}/bars/latest`, {headers:this.headers_alpaca}).pipe(
      tap(data =>{
        this.latestBar.set(ticker, data);
      }),
       catchError(error => {
        return of({
          bar: undefined,
          errorMessage: error.message || 'Unknown error'
        } as any); 
      }) 
    )

  }

  // getDailyHistoricalBar(ticker:string):Observable<number>{

  //   const today = new Date();
  //   today.setDate(today.getDate() - 1);
  //   const datePart = today.toISOString().split('T')[0];

  //   const start = `${datePart}T13:00:00Z`;
  //   const end = `${datePart}T20:00:00Z`;

  //   const params = new HttpParams()
  //     .set('symbols',ticker)
  //     .set('timeframe','1T')
  //     .set('start', start)
  //     .set('end',end)
  //     .set('limit',1000)
  //     .set('adjustment','raw')
  //     .set('feed', 'sip')
  //     .set('sort', 'asc'); 

  //     return this.http.get<any>(`${this.apiUrlAplaca}stocks/bars`, {headers:this.headers_alpaca, params}).pipe(
  //       tap(data => {
  //         this.historicalBars.set(ticker, data);
  //       }),
  //       map((data)=>{
  //         const barsData = data.bars[ticker];
  //         const total = barsData.reduce((sum:number, bar:any)=> sum += bar.vw ,0);
  //         return total/barsData.length;

  //       })
  //     )
  // }


  getAdditionalAssetMetrics(ticker:string):Observable<AssetMetrics>{

    if(this.metrics.has(ticker)){      
      return of(this.metrics.get(ticker)!);
    }
    
    const headers = new HttpHeaders({'X-Finnhub-Token':environment.FINNHUB_API_KEY});

    const params = new HttpParams()
      .set('symbol', ticker)
      .set('metric', 'all')
      .set('token', environment.FINNHUB_API_KEY);

    return this.http.get<any>(`${this.apiUrlFinnhub}stock/metric`,{params}).pipe(
      tap((data)=> this.metrics.set(ticker, data))
    );
  }
  



}



