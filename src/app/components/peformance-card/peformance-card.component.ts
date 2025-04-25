import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { assetDelta } from '../../interface/assetInterfaces';



@Component({
  selector: 'app-peformance-card',
  imports: [CommonModule, MatButtonModule, MatCardModule],
  templateUrl: './peformance-card.component.html',  
  styleUrl: './peformance-card.component.css'
})
export class PeformanceCardComponent {

  @Input() title: string ='';
  @Input() alignment:string = '';
  @Input() maxNum:number = 6;
  @Input() data!:assetDelta[];

}
