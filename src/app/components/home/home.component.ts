import { Component, OnInit , ChangeDetectionStrategy} from '@angular/core';
import { Observable, of, switchMap } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { assetPerformance } from '../../interface/assetInterfaces';
import { AssetSymbolsService } from '../../services/asset-symbols.service';
import { AssetDetailsService } from '../../services/asset-details.service';


@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  MAX_NEW_ITEM:number = 6;
  constructor( private assetDetailsService:AssetDetailsService, private assetSymbols:AssetSymbolsService ) { }
  performance$!:Observable<assetPerformance>;

  ngOnInit(){
    const tickerList1 = ['AAPL', 'NVDA', "F", "TSLA", "GOOG", "MSFT", "META", "APD", "ABNB", "ALL", "AIG"];

    this.performance$ = this.assetSymbols.getListOfAssetSymbols().pipe(
      switchMap((tickerList2:any) => {     
        return this.assetDetailsService.getAssetsSnapshot([...tickerList1, ...tickerList2.slice(0, 100)]);
      })
    );


   
  }
}
