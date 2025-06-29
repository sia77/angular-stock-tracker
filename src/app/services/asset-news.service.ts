import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, ReplaySubject, tap } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { TopNewsItem } from '../interface/news';

@Injectable({
  providedIn: 'root'
})
export class AssetNewsService {

  private apiUrl = environment.FINNHUB_BASE_URL;
  private netlifyAPIUrl = environment.NETLIFY_BASE_URL;
  private headers = new HttpHeaders({'X-Finnhub-Token':environment.FINNHUB_API_KEY})
  private cache = new Map<string, any>();
  //private generalNewsCache = new Map<string, any>();

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

  private newsItems: TopNewsItem[] = [];
  private topNewsSubject = new ReplaySubject<TopNewsItem[]>(1);
  private allNewsItemsLoaded = new BehaviorSubject<boolean>(false);
  allNewsItemsLoaded$ = this.allNewsItemsLoaded.asObservable();

  private currentPage = 0;
  private pageSize = 10;
  private dataFetched = false;


  getTopNewsPage(): Observable<TopNewsItem[]> {

      if (this.dataFetched) {
    
        this.currentPage++;
        const accumulatedResultSet = this.newsItems.slice(0, this.currentPage * this.pageSize);
        this.topNewsSubject.next(accumulatedResultSet);

        if(accumulatedResultSet.length === this.newsItems.length){
          this.allNewsItemsLoaded.next(true);
        }
        
        return of(accumulatedResultSet); 
      }

    return this.http.get<TopNewsItem[]>(`${this.netlifyAPIUrl}topNews`).pipe(
      tap(fetched => {
        // slice and append only the next chunk
        this.newsItems = fetched;
        const nextItems = this.newsItems.slice(
          this.currentPage * this.pageSize,
          (this.currentPage + 1) * this.pageSize
        );

        this.currentPage++;
        this.topNewsSubject.next( nextItems);
        this.dataFetched = true;

        if (nextItems.length === this.newsItems.length) {
          this.allNewsItemsLoaded.next(true);
        }
      })
    );
  }

  news$(): Observable<TopNewsItem[]> {
    return this.topNewsSubject.asObservable();
  }

  resetNews(): void {
    let emptyList: TopNewsItem[] = [];
    this.newsItems = [];
    this.currentPage = 0;
    this.dataFetched = false;
    this.allNewsItemsLoaded.next(false);
    this.topNewsSubject.next(emptyList);
  }


}
