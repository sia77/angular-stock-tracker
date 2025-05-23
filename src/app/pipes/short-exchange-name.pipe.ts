import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortExchangeName'
})
export class ShortExchangeNamePipe implements PipeTransform {

  transform(value: string): string {
    const map: { [key: string]: string } = {
      'IRISH STOCK EXCHANGE - ALL MARKET': 'Irish SE',
      'LONDON STOCK EXCHANGE': 'London SE',
      'JOHANNESBURG STOCK EXCHANGE': 'Johannesburg SE',
      'NASDAQ OMX HELSINKI LTD.': 'Nasdaq Helsinki',
      'OTC MARKETS': 'OTC',
      'NASDAQ NMS - GLOBAL MARKET': 'Nasdaq',
      'ASX - ALL MARKETS': 'ASX',
      'B3 S.A.': 'B3',
      'NEW YORK STOCK EXCHANGE, INC.': 'NYSE',
      'TORONTO STOCK EXCHANGE': 'TSX',
      'OSLO BORS ASA': 'Oslo Børs',
      'TSX VENTURE EXCHANGE - NEX': 'TSX Venture',
      'NYSE EURONEXT - EURONEXT PARIS':'Euronext Paris',
      'NASDAQ OMX NORDIC': 'Nasdaq Nordic',
      'WARSAW STOCK EXCHANGE/EQUITIES/MAIN MARKET': 'Warsaw SE',
      'NYSE EURONEXT - EURONEXT LISBON': 'Euronext Lisbon',
      'NYSE EURONEXT - EURONEXT BRUSSELS': 'Euronext Brussels',
      'NYSE EURONEXT - EURONEXT AMSTERDAM': 'Euronext Amsterdam',
      'PRAGUE STOCK EXCHANGE': 'Prague SE',
      'WIENER BOERSE AG DRITTER MARKT (THIRD MARKET)': 'Vienna SE - Third Market',
    };

    return map[value] || value;
  }

}
