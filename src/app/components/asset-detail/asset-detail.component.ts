import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AssetDetailsService } from '../../services/asset-details.service';
import { AssetProfile, AssetMetrics, BarData } from '../../interface/assetInterfaces';
import { Observable, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon'
import { LargeNumberFormatPipe } from "../../pipes/large-number-format.pipe";
import { AssetNewsService } from '../../services/asset-news.service';
import { NewsItem } from '../../interface/news';
import { ShortExchangeNamePipe } from "../../pipes/short-exchange-name.pipe";
import { ChartComponent } from "../chart/chart.component";


@Component({
  selector: 'app-asset-detail',
  imports: [CommonModule, MatDialogModule, MatIconModule, LargeNumberFormatPipe, ShortExchangeNamePipe, ChartComponent],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})

export class AssetDetailComponent implements OnInit {

  assetDetail$!: Observable<any>;
  hub_data!:AssetProfile;
  alpaca_bar!:BarData;
  newsList!:NewsItem[];
  merticAssets!:AssetMetrics;

  MAX_NEW_ITEM:number = 5;

  alpaca_historical_bar!:BarData[];
  private assetDetailSub!:Subscription; 
  private assetBarSub!:Subscription;
  private dailyHistoricalBars!:Subscription;
  private assetNews!:Subscription;
  private additonalMetrics!:Subscription;


  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogBoxData: any,
    private assetDetailsService: AssetDetailsService,
    private assetNewsService: AssetNewsService,
    private dialogRef: MatDialogRef<AssetDetailComponent> // Needed for closing dialog
  ) { }

  
  ngOnInit(): void {

    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate()-1);
    
    //Due to the type of subscription, recent SIP data is not available so we alway look at yester as the ending date
    const formattedDateYesterday = yesterday.toLocaleDateString('en-CA'); 
    const fomattedDateToday = today.toLocaleDateString('en-CA');
    
    const _5years = new Date();
    _5years.setFullYear(_5years.getFullYear() - 5);
    const formattedDate5Year = _5years.toLocaleDateString('en-CA');

    this.assetDetailSub = this.assetDetailsService.getAssetDetail(this.dialogBoxData.ticker.toUpperCase()).subscribe({
      next: (data)=>{
        this.hub_data = data;
      }
    })

    this.assetBarSub = this.assetDetailsService
      .getLatestBarInfo(this.dialogBoxData.ticker.toUpperCase())
      .subscribe({
        next: (data)=>{
          this.alpaca_bar = data.bar;   
        }
      });

    this.dailyHistoricalBars = this.assetDetailsService
      .getDailyHistoricalBar(this.dialogBoxData.ticker.toUpperCase(), formattedDate5Year, formattedDateYesterday)
      .subscribe({
        next: (data)=>{
          this.alpaca_historical_bar = data.bars;
        }
      });

    this.additonalMetrics = this.assetDetailsService
      .getAdditionalAssetMetrics(this.dialogBoxData.ticker.toUpperCase())
      .subscribe({
        next: (data) => {          
          this.merticAssets = data;
        }
      });

    this.getAssetNews(fomattedDateToday);
  } 
  
  getAssetNews(today:string){
    this.assetNews = this.assetNewsService
      .getNewsService(this.dialogBoxData.ticker.toUpperCase(), today, today)
      .subscribe({
        next: (data)=>{
          this.newsList = data;          
        }
      });
  }

  closeDialog() {
    this.dialogRef.close();
  }

  isEmptyObject(obj: any): boolean {
    return obj && Object.keys(obj).length === 0 && obj.constructor === Object;
  }

  ngOnDestroy(): void {
    this.assetDetailSub?.unsubscribe();
    this.assetBarSub?.unsubscribe();
    this.dailyHistoricalBars?.unsubscribe();
    this.assetNews?.unsubscribe();
    this.additonalMetrics?.unsubscribe();
  }
}

