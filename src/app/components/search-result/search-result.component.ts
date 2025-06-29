import { Component } from '@angular/core';
import { AssetInfo, SearchResponse } from '../../interface/assetInterfaces';
import { MatButtonModule } from '@angular/material/button';
import { AssetDetailComponent } from '../asset-detail/asset-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SearchAssetService } from '../../services/search-asset.service';
import { AppStockCardComponent } from "../app-stock-card/app-stock-card.component";


@Component({
  selector: 'app-search-result',
  imports: [MatButtonModule, MatDialogModule, AppStockCardComponent],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {  
    tickerList:AssetInfo[] = [];
    limit:number = 100;
    status!:string;
    errorMessage!:string;
    nextUrl!:string | undefined;
    tickerCount:number = -1;

  constructor(  private searchAssetService: SearchAssetService,
                private dialog: MatDialog) {}

  ngOnInit(): void {

    this.searchAssetService.searchResults$.subscribe({
      next: (data:SearchResponse)=>{
        this.tickerList = data.result;
        //this.tickerCount = data.count;
      }
    })
  }

  openAssetDetail(ticker: string, name:string) {
    this.dialog.open(AssetDetailComponent, {
      data: {ticker:ticker,name:name},  
      width: '600px', 
      height: 'auto'
    });
  }

}
