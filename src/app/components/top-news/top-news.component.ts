import { Component, OnInit } from '@angular/core';
import { AssetNewsService } from '../../services/asset-news.service';
import { TopNewsItem } from '../../interface/news';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-top-news',
  imports: [CommonModule],
  templateUrl: './top-news.component.html',
  styleUrl: './top-news.component.css'
})
export class TopNewsComponent implements OnInit {

  constructor( private generalNews:AssetNewsService ) { }
  topNews$!:Observable<TopNewsItem[]>;

  
  ngOnInit(){
    this.topNews$ = this.generalNews.getTopNews();    
    
  }

}
