import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { LargeNumberFormatPipe } from '../../pipes/large-number-format.pipe';

@Component({
  selector: 'app-app-stock-card',
  imports: [CommonModule, LargeNumberFormatPipe],
  templateUrl: './app-stock-card.component.html',
  styleUrl: './app-stock-card.component.css'
})
export class AppStockCardComponent {

  @Input() symbol!: string;
  @Input() companyName!: string;
  @Input() closePrice!: number;
  @Input() priceChange!: number; // negative for down, positive for up
  @Input() marketCap!: number;
  @Input() volume!: number;
  @Input() low!:number;
  @Input() high!:number;
  @Input() moreLink!: string;
  @Input() onOpenDetail!: (symbol: string, name:string) => void;

  get isNegativeChange(): boolean {
    return this.priceChange < 0;
  }

  get formattedPriceChange(): string {
    return `${this.priceChange > 0 ? '+' : '-'} $${Math.abs(this.closePrice).toFixed(2)}`;
  }

  open() {
    if (this.onOpenDetail) {
      this.onOpenDetail(this.symbol, this.companyName);
    }
  }

}
