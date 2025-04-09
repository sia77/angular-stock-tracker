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
  alpaca_historical_bar!:BarData[];
  private assetDetailSub!:Subscription; 
  private assetBarSub!:Subscription;
  private dailyHistoricalBars!:Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public ticker: string,
    private assetDetailsService: AssetDetailsService,
    private dialogRef: MatDialogRef<AssetDetailComponent> // Needed for closing dialog
  ) {
    console.log("Received Ticker:", this.ticker);
  }
  
  ngOnInit(): void {

    this.assetDetailSub = this.assetDetailsService.getAssetDetail(this.ticker.toUpperCase()).subscribe({
      next: (data)=>{
        this.polygon_data = data.results;
        //console.log("Details: ", this.polygon_data);
      }
    })

    this.assetBarSub = this.assetDetailsService.getLatestBarInfo(this.ticker.toUpperCase()).subscribe({
      next: (data)=>{
        this.alpaca_bar = data.bars[this.ticker.toUpperCase()];
        //console.log("bar data: ", this.alpaca_bar);
      }
    });

    this.dailyHistoricalBars = this.assetDetailsService.getDailyHistoricalBar(this.ticker.toUpperCase()).subscribe({
      next: (data)=>{
        this.alpaca_historical_bar = data.bars[this.ticker.toUpperCase()];
        console.log("bar data: ", this.alpaca_historical_bar);
      }
    })

  }
  
  // Optional: Close the dialog after loading data
  closeDialog() {
    this.dialogRef.close();
  }

  ngOnDestroy(): void {
    this.assetDetailSub?.unsubscribe();
    this.assetBarSub?.unsubscribe();
    this.dailyHistoricalBars?.unsubscribe();
  }
}

