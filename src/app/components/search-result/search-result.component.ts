import { Component } from '@angular/core';
import { StockService } from '../../services/stock.service';
import { ApiResponseArr, Asset } from '../../interface/assetInterfaces';
import { MatButtonModule } from '@angular/material/button';
import { AssetDetailComponent } from '../asset-detail/asset-detail.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';


@Component({
  selector: 'app-search-result',
  imports: [MatButtonModule,MatDialogModule],
  templateUrl: './search-result.component.html',
  styleUrl: './search-result.component.css'
})
export class SearchResultComponent {  
    tickerList:Asset[] = [];
    limit:number = 20;
    status!:string;
    errorMessage!:string;
    nextUrl!:string | undefined;
    tickerCount:number = 0;

  constructor(  private stockService: StockService, 
                private dialog: MatDialog) {}

  ngOnInit(): void {
    this.stockService.searchResults$.subscribe(
      {
        next: (data:ApiResponseArr<Asset>)=>{ 
          console.log("data: ", data);         
          this.tickerList = data.results;
          this.nextUrl = data.next_url;
          this.tickerCount = data.count;
          this.status = data.status;          
        },
        error: (err) => console.error("Error occurred:", err),
      }
    );
  }

  openAssetDetail(ticker: string) {
    this.dialog.open(AssetDetailComponent, {
      data: ticker,  
      width: '600px', 
      height: '700px'
    });
  }

}
