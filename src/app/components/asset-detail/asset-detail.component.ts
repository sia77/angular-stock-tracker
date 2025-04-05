import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { AssetDetailsService } from '../../services/asset-details.service';
import { ApiResponse, AssetDetail } from '../../interface/assetInterfaces';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';
import { environment } from '../../../environments/environment';
import { MatIconModule } from '@angular/material/icon'



@Component({
  selector: 'app-asset-detail',
  imports: [CommonModule, MatDialogModule, MatIconModule],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})

export class AssetDetailComponent implements OnInit {

  assetDetail$!: Observable<ApiResponse<AssetDetail>>;
  apiKey = environment.apiKey;

  constructor(
    @Inject(MAT_DIALOG_DATA) public ticker: string,
    private assetDetailsService: AssetDetailsService,
    private dialogRef: MatDialogRef<AssetDetailComponent> // Needed for closing dialog
  ) {
    console.log("Received Ticker:", this.ticker);
  }
  
  ngOnInit(): void {
    this.assetDetail$ = this.assetDetailsService.getAssetDetail(this.ticker.toUpperCase());
  }
  
  // Optional: Close the dialog after loading data
  closeDialog() {
    this.dialogRef.close();
  }
}
