import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AssetDetailsService } from '../../services/asset-details.service';
import { ApiResponse, AssetDetail, BarData, BarsResponse } from '../../interface/assetInterfaces';
import { Observable, Subscription, zip } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon'
import { LargeNumberFormatPipe } from "../../pipes/large-number-format.pipe";
import { AssetNewsService } from '../../services/asset-news.service';
import { NewsItem } from '../../interface/news';



@Component({
  selector: 'app-asset-detail',
  imports: [CommonModule, MatDialogModule, MatIconModule, LargeNumberFormatPipe],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})

export class AssetDetailComponent implements OnInit {

  assetDetail$!: Observable<any>;
  apiKey = environment.POLYGON_API_KEY;
  polygon_data!:AssetDetail;
  alpaca_bar!:BarData;
  newsList!:NewsItem[];

  MAX_NEW_ITEM:number = 5;

  alpaca_historical_bar!:BarData[];
  private assetDetailSub!:Subscription; 
  private assetBarSub!:Subscription;
  private dailyHistoricalBars!:Subscription;
  private assetNews!:Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public ticker: string,
    private assetDetailsService: AssetDetailsService,
    private assetNewsService: AssetNewsService,
    private dialogRef: MatDialogRef<AssetDetailComponent> // Needed for closing dialog
  ) {}
  
  ngOnInit(): void {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    const formattedDate = today.toLocaleDateString('en-CA');
    const formattedYesterday = yesterday.toISOString().split('T')[0];
                                

    this.assetDetailSub = this.assetDetailsService.getAssetDetail(this.ticker.toUpperCase()).subscribe({
      next: (data)=>{
        this.polygon_data = data.results;
        //console.log("Details: ", this.polygon_data);
      }
    })

    this.assetBarSub = this.assetDetailsService
      .getLatestBarInfo(this.ticker.toUpperCase())
      .subscribe({
        next: (data)=>{
          this.alpaca_bar = data.bars[this.ticker.toUpperCase()];
          //console.log("bar data: ", this.alpaca_bar);
        }
      });

    this.dailyHistoricalBars = this.assetDetailsService
      .getDailyHistoricalBar(this.ticker.toUpperCase())
      .subscribe({
        next: (data)=>{
          console.log("data bar: ", data);
          //this.alpaca_historical_bar = data.bars[this.ticker.toUpperCase()];
          console.log("bar data: ", this.alpaca_historical_bar);
        }
      });

    this.assetNews = this.assetNewsService
      .getNewsService(this.ticker.toUpperCase(), formattedDate, formattedDate)
      .subscribe({
        next: (data)=>{
          this.newsList = data;
          console.log("data:", data);
        }
      });

  }  

  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.assetDetailSub?.unsubscribe();
    this.assetBarSub?.unsubscribe();
    this.dailyHistoricalBars?.unsubscribe();
    this.assetNews?.unsubscribe();
  }
}

