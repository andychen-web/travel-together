import * as tempTestApi from "@/api/tempTest";

import * as tdxTourismApi from "@/api/tdx/tdxTourism_api";

import * as hotelsApi from "@/api/hotels/hotels_api";
import * as usersApi from "@/api/users/users_api";

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

//********************
// 使用者
//********************
export const apiGetUsers = usersApi.getUsers;
export const apiGetUserById = usersApi.getUserById;
export const apiBlockUserById = usersApi.blockUserById;
export const apiUnblockUserById = usersApi.unblockUserById;