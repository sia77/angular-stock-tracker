import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AssetDetailsService } from '../../services/asset-details.service';
import { ApiResponse, AssetDetail } from '../../interface/assetInterfaces';
import { Observable } from 'rxjs';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-asset-detail',
  imports: [CommonModule],
  templateUrl: './asset-detail.component.html',
  styleUrl: './asset-detail.component.css'
})

export class AssetDetailComponent implements OnInit {
  //assetDetail!: AssetDetail; // Store API response

  assetDetail$!: Observable<ApiResponse<AssetDetail>>;



  constructor(
    @Inject(MAT_DIALOG_DATA) public ticker: string,
    private assetDetailsService: AssetDetailsService,
    private dialogRef: MatDialogRef<AssetDetailComponent> // Needed for closing dialog
  ) {
    console.log("Received Ticker:", this.ticker);
  }
  
  ngOnInit(): void {

    this.assetDetail$ = this.assetDetailsService.getAssetDetail(this.ticker.toUpperCase());
    // this.assetDetail$.subscribe({
    //   next:(data)=>{
    //     console.log("Dialogbox data: ", data);
    //   }
    // })

  }
  
  // Optional: Close the dialog after loading data
  closeDialog() {
    this.dialogRef.close();
  }
}
