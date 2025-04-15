import { AssetProfile, SearchResponse } from "../../interface/assetInterfaces";


export const initialValAPIResp:AssetProfile = { 
    country: '', 
    currency: '', 
    estimateCurrency: '', 
    exchange: '', 
    finnhubIndustry: '', 
    ipo: '', 
    logo: '', 
    marketCapitalization: 0,
    name: '',
    phone: '',
    shareOutstanding: 0,
    ticker: '',
    weburl: ''
};
export const initialValAPIHubRes:SearchResponse = { count : -1, result:[]};