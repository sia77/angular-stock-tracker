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
  performance$!:Observable<any>;

  ngOnInit(){
    this.performance$ = this.assetSymbols.getAssetsPerformance();   
  }
}
