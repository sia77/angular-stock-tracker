import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { AssetSymbolsService } from '../../services/asset-symbols.service';
import { PeformanceCardComponent } from '../peformance-card/peformance-card.component';


@Component({
  selector: 'app-home',
  imports: [CommonModule, MatButtonModule, MatCardModule, PeformanceCardComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {

  MAX_NEW_ITEM:number = 6;
  constructor( private assetSymbols:AssetSymbolsService ) { }
  performance$!:Observable<any>;

  ngOnInit(){
    this.performance$ = this.assetSymbols.getAssetsPerformance();   
  }
}
