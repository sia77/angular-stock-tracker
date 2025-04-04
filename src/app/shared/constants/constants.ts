import { ApiResponse, ApiResponseArr } from "../../interface/assetInterfaces";

export const initialValAPIRespArr:ApiResponseArr<any> = { results: [], next_url: '', count: 0, status:'OK', request_id:'12345' };  
export const initialValAPIResp:ApiResponse<any> = { results: [], status:'OK', request_id:'1111111' };