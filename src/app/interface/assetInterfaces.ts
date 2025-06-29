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

export interface AssetInfo {
  id: string;
  symbol: string;
  name: string;
  type: string;
  exchange: string;
  currency: string;
  logo: string;
  weburl: string;
  ipo: string;
  open: number;
  high: number;
  low: number;
  close: number;
  prevC: number;
  change: string;
  volume: number;
  marketCap: number;
  shareOutstanding: number;
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

export interface BarResponse {
  bar: BarData;
  symbol:string;
}

export interface HistoricalBarsResponse {
  bars: BarData[];
  symbol:string;
  next_page_token:string;
}

export interface AssetMetrics {
  metric: {
    '52WeekHigh': number;
    '52WeekLow': number;
    'epsTTM': number;
    'currentDividendYieldTTM':number;
  };
}

// export interface SearchResultItem {
//   description: string;
//   displaySymbol: string;
//   symbol: string;
//   type: string; 
// }

export interface SearchResponse {
  //count: number;
  result: AssetInfo[];
}

export interface assetDelta{
  ticker: string; 
  delta: number;
}

export interface assetPerformance {
  gainers:assetDelta[];
  losers:assetDelta[];
  mostActive:assetDelta[];
}

export interface SymbolDetails {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string | null;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

