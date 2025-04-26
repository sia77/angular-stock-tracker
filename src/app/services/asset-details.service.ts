import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { BehaviorSubject, catchError, map, Observable, of, tap } from 'rxjs';
import { assetDelta, AssetMetrics, assetPerformance, AssetProfile, BarResponse, HistoricalBarsResponse } from '../interface/assetInterfaces';
import { initialValAPIResp } from '../shared/constants/constants'

@Injectable({
  providedIn: 'root'
})
export class AssetDetailsService {
  
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

  getLatestBarInfo(ticker:string):Observable<BarResponse>{

    if(this.latestBar.has(ticker)){
      return of(this.latestBar.get(ticker)!);
    }

    return this.http.get<BarResponse>(`${this.apiUrlAplaca}stocks/${ticker}/bars/latest`, {headers:this.headers_alpaca}).pipe(
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

  getDailyHistoricalBar(ticker:string, start:string, end:string):Observable<HistoricalBarsResponse>{

    const params = new HttpParams()
      .set('timeframe','1Month')
      .set('start', start)
      .set('end',end)
      .set('limit',1000)
      .set('adjustment','split')
      .set('feed', 'sip')
      .set('sort', 'asc'); 

      return this.http.get<any>(`${this.apiUrlAplaca}stocks/${ticker}/bars`, {headers:this.headers_alpaca, params}).pipe(
        tap(data => {
          this.historicalBars.set(ticker, data);
        })
      )
  }


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

  getAssetsSnapshot(tickers:string[]):Observable<assetPerformance>{

    const params = new HttpParams()
      .set("symbols", tickers.join(','));

      return this.http.get<any>(`${this.apiUrlAplaca}stocks/snapshots`, {
        headers: this.headers_alpaca,
        params
      }).pipe(
        map(snapshot => {
          const gainers: assetDelta[] = [];
          const losers: assetDelta[] = [];
          const mostActive: assetDelta[] = [];
      
          for (const ticker in snapshot) {
            const data = snapshot[ticker];
      
            const prevClose = data.prevDailyBar?.c;
            const todayClose = data.dailyBar?.c;
      
            if (prevClose && todayClose) {
              const percentChange = ((todayClose - prevClose) / prevClose) * 100;
      
              const entry = { ticker, delta: +percentChange.toFixed(2) }; // convert to number for sorting
              percentChange > 0 ? gainers.push(entry) : losers.push(entry);
              mostActive.push(entry);

            }
          }
      
          // Sort both lists
          gainers.sort((a, b) => b.delta - a.delta); // descending
          losers.sort((a, b) => a.delta - b.delta);  // ascending (most negative first)
          mostActive.sort((a, b) => Math.abs(b.delta) - Math.abs(a.delta) )
      
          return { gainers, losers, mostActive };
        })
      );
  }  
}



