import * as tempTestApi from "@/api/tempTest";

import * as tdxTourismApi from "@/api/tdx/tdxTourism_api";

import * as hotelsApi from "@/api/hotels/hotels_api";

//**********
// TDX 服務 API
//**********
export const apiGetTdxActivities = tdxTourismApi.getActivities;
export const apiGetTdxRestaurants = tdxTourismApi.getRestaurants;
export const apiGetTdxSuggestions = tdxTourismApi.getSuggestions;
export const apiGetTdxScenicSpots = tdxTourismApi.getScenicSpots;

//********************
// 飯店
//********************
export const apiHotelParams = hotelsApi.hotelsParameters;
export const apiGetHotels = hotelsApi.getHotels;
export const apiGetHotelById = hotelsApi.getHotelById;
