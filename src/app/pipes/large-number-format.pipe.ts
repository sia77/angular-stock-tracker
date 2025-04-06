import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'largeNumberFormat'
})
export class LargeNumberFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (value >= 1_000_000_000_000) {
      return (value / 1_000_000_000_000).toFixed(2) + ' T';
    } else if (value >= 1_000_000_000) {
      return (value / 1_000_000_000).toFixed(2) + ' B';
    } else if (value >= 1_000_000) {
      return (value / 1_000_000).toFixed(2) + ' M';
    } else if (value >= 1_000) {
      return (value / 1_000).toFixed(2) + ' K';
    } else {
      return value.toString();
    }
  }

}
