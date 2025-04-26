import { Injectable } from '@angular/core';
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

  getAssetsPerformance():Observable<string[]>{

    if (!this.hasLoadedAssetSymbols){
      this.http.get<any>(`${environment.NETLIFY_BASE_URL}marketPerformance`)      
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
