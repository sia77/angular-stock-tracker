
export interface ApiResponse<T> {
  results: T;
  request_id: string;
  status: string;
}

export interface ApiResponseArr<T> {
  results: T[];
  next_url?: string; 
  count: number;
  status: string;
  request_id:string;
}

//Search ticker
export interface Asset {
  active: boolean;
  cik: string;
  composite_figi: string;
  currency_name: string;
  last_updated_utc: string; // You might want to use Date, but keeping it as string for now.
  locale: string;
  market: string;
  name: string;
  primary_exchange: string;
  share_class_figi: string;
  ticker: string;
  type: string;
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

export interface AssetDetail {
  active: boolean;
  address: Address;
  branding: Branding;
  cik: string;
  composite_figi: string;
  currency_name: string;
  description: string;
  homepage_url: string;
  list_date: string; // You may want to use Date here as well, depending on your needs
  locale: string;
  market: string;
  market_cap: number;
  name: string;
  phone_number: string;
  primary_exchange: string;
  round_lot: number;
  share_class_figi: string;
  share_class_shares_outstanding: number;
  sic_code: string;
  sic_description: string;
  ticker: string;
  ticker_root: string;
  total_employees: number;
  type: string;
  weighted_shares_outstanding: number;
}

