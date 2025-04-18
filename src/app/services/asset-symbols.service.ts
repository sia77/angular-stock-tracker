import { Injectable } from '@angular/core';
import { assetDelta, assetPerformance, SymbolDetails } from '../interface/assetInterfaces';
import { map, Observable, ReplaySubject, tap } from 'rxjs';
import { HttpClient,  HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AssetSymbolsService {

  constructor(private http:HttpClient) { }

  private apiUrlFinnhub = environment.FINNHUB_BASE_URL;
  private assetSymbols$ = new ReplaySubject<string[]>(1);

  private hasLoadedAssetSymbols = false;

  getListOfAssetSymbols(): Observable<string[]> {
    if (!this.hasLoadedAssetSymbols) {
      const params = new HttpParams()
        .set('exchange', 'US')
        .set('token', environment.FINNHUB_API_KEY);
  
      this.http.get<any[]>(`${this.apiUrlFinnhub}stock/symbol`, { params }).pipe(
        map((list)=>{
          return list
                .filter(item => item.symbol)
                .map(item => item.symbol);
        })
      )
      .subscribe((data:any) => {
        this.assetSymbols$.next(data);      //this.assetSymbols$; -- short hand
        this.hasLoadedAssetSymbols = true;
      });
    }
  
    return this.assetSymbols$.asObservable();
  }

  // Optional: a way to force reset the cache
  clearAssetSymbolsCache(): void {
    this.assetSymbols$ = new ReplaySubject<string[]>(1);
  }
  
}
