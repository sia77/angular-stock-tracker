import { Component, OnInit } from '@angular/core';
import { AssetNewsService } from '../../services/asset-news.service';
import { TopNewsItem } from '../../interface/news';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-news',
  imports: [CommonModule],
  templateUrl: './top-news.component.html',
  styleUrl: './top-news.component.css'
})
export class TopNewsComponent implements OnInit {

  constructor( private topNews:AssetNewsService ) { }
  topNews$!:Observable<TopNewsItem[]>;
  newsItemsLoaded=false;
  private allNews!:Subscription;

  ngOnInit() {
    this.topNews.getTopNewsPage().subscribe(); // fetch page 1
    this.topNews$ = this.topNews.news$();
    this.allNews = this.topNews.allNewsItemsLoaded$.subscribe({
      next: (flag:boolean) => {
        this.newsItemsLoaded = flag;
      }
    });
  }
  
  getMore() {

    if(!this.newsItemsLoaded){
      this.topNews.getTopNewsPage().subscribe(); 
    }
    

  }

  ngOnDestroy(){
    this.allNews?.unsubscribe();
  }
}
