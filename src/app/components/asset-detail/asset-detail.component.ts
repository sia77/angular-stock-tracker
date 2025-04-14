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
import { Chart, ChartData, ChartOptions, registerables } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';



@Component({
  selector: 'app-asset-detail',
  imports: [CommonModule, MatDialogModule, MatIconModule, LargeNumberFormatPipe, ShortExchangeNamePipe, BaseChartDirective],
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

  chartData!: ChartData<'line'>;
  chartOptions!: ChartOptions;
  chartLegend:boolean = false;

  constructor(
    @Inject(MAT_DIALOG_DATA) public dialogBoxData: any,
    private assetDetailsService: AssetDetailsService,
    private assetNewsService: AssetNewsService,
    private dialogRef: MatDialogRef<AssetDetailComponent> // Needed for closing dialog
  ) {
          // Register Chart.js components
          Chart.register(...registerables);
  }

  
  ngOnInit(): void {

    const today = new Date();
    //const yesterday = new Date();
    //yesterday.setDate(yesterday.getDate()-1);
    const formattedDate = today.toLocaleDateString('en-CA');
    
    //const formattedYesterday = yesterday.toISOString().split('T')[0];
    
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
      .getDailyHistoricalBar(this.dialogBoxData.ticker.toUpperCase(), formattedDate5Year, formattedDate)
      .subscribe({
        next: (data)=>{
          console.log("hello: ", data);
          this.alpaca_historical_bar = data.bars;
          this. drawChart( this.dialogBoxData.ticker.toUpperCase(), this.alpaca_historical_bar /*formattedDate5Year, formattedDate*/);
        }
      });


    this.additonalMetrics = this.assetDetailsService
      .getAdditionalAssetMetrics(this.dialogBoxData.ticker.toUpperCase())
      .subscribe({
        next: (data) => {          
          this.merticAssets = data;
        }
      });

    this.assetNews = this.assetNewsService
      .getNewsService(this.dialogBoxData.ticker.toUpperCase(), formattedDate, formattedDate)
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

  drawChart(ticker:string, barData:BarData[]){

    if(!barData) return;
    
    const lineCharLabels = barData.map(item => item.t.split('T')[0]);
    const lineChartData = barData.map(item => item.c);
    const volumeData = barData.map(item => item.v);

    this.chartData = {
      labels: lineCharLabels,
      datasets: [
        {
          label: 'Closing',
          data: lineChartData,
          borderColor: '#1382aa',
          backgroundColor: 'rgba(0, 0, 255, 0.1)',
          fill: false,
        },
        
      ],
    };
    
    this.chartOptions = {
      responsive: true,
      scales: {
        x: {
          title: {
            display: false,
            text: 'Year',
          },
        },
        y: {
          title: {
            display: false,
            text: 'Price',
          },
        },
      },
    };    
      
  }

  ngOnDestroy(): void {
    this.assetDetailSub?.unsubscribe();
    this.assetBarSub?.unsubscribe();
    this.dailyHistoricalBars?.unsubscribe();
    this.assetNews?.unsubscribe();
    this.additonalMetrics?.unsubscribe();
    //myLineChart.destroy();
  }
}

