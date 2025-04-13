export interface AssetProfile {
  country: string;
  currency: string;
  estimateCurrency: string;
  exchange: string;
  finnhubIndustry: string;
  ipo: string; // ISO date string (e.g., "1980-12-12")
  logo: string; // URL string
  marketCapitalization: number;
  name: string;
  phone: string;
  shareOutstanding: number;
  ticker: string;
  weburl: string; // URL string
}

//Asset Details

export interface Address {
  address1: string;
  city: string;
  state: string;
  postal_code: string;
}

export interface Branding {
  icon_url: string;
}

// export interface AssetDetail {
//   active: boolean;
//   address: Address;
//   branding: Branding;
//   cik: string;
//   composite_figi: string;
//   currency_name: string;
//   description: string;
//   homepage_url: string;
//   list_date: string; 
//   locale: string;
//   market: string;
//   market_cap: number;
//   name: string;
//   phone_number: string;
//   primary_exchange: string;
//   round_lot: number;
//   share_class_figi: string;
//   share_class_shares_outstanding: number;
//   sic_code: string;
//   sic_description: string;
//   ticker: string;
//   ticker_root: string;
//   total_employees: number;
//   type: string;
//   weighted_shares_outstanding: number;
// }

export interface BarData {
  c: number;        // Close price
  h: number;        // High price
  l: number;        // Low price
  n: number;        // Number of trades
  o: number;        // Open price
  t: string;        // Timestamp (ISO string)
  v: number;        // Volume
  vw: number;       // Volume weighted average price
}

export interface BarsResponse {
  bar: BarData;
  symbol:string;
}

export interface AssetMetrics {
  metric: {
    '52WeekHigh': number;
    '52WeekLow': number;
    'epsTTM': number;
    'currentDividendYieldTTM':number;
  };
}


export interface SearchResultItem {
  description: string;
  displaySymbol: string;
  symbol: string;
  type: string; 
}

export interface SearchResponse {
  count: number;
  result: SearchResultItem[];
}

