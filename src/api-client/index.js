// import * as tempTestApi from "@/api-client/tempTest";

import * as tdxTourismApi from "@/api-client/tdx/tdxTourismApi";

import * as hotelsApi from "@/api-client/hotels/hotelsApi";
import * as myBookingApi from "@/api-client/my-bookings/myBookingApi";
import * as usersApi from "@/api-client/users/usersApi";
// ---------Auth---------
import * as authApi from "@/api-client/auth/authApi";

//****************
// TDX 服務 API
//****************
export const apiGetTdxActivities = tdxTourismApi.getActivities;
export const apiGetTdxRestaurants = tdxTourismApi.getRestaurants;
export const apiGetTdxSuggestions = tdxTourismApi.getSuggestions;
export const apiGetTdxScenicSpots = tdxTourismApi.getScenicSpots;

//****************
// 飯店
//****************
export const apiHotelParams = hotelsApi.hotelsParams;
export const apiGetHotels = hotelsApi.getHotels;
export const apiGetHotelById = hotelsApi.getHotelById;
//****************
// 使用者的旅館預訂
//****************
export const apiMyBookingParams = myBookingApi.myBookingParams;
export const apiGetUserBookings = myBookingApi.getUserBookings;

//****************
// 使用者
//****************
export const apiGetUsers = usersApi.getUsers;
export const apiGetUserById = usersApi.getUserById;
export const apiBlockUserById = usersApi.blockUserById;
export const apiUnblockUserById = usersApi.unblockUserById;

//****************
// 權限
//****************
export const apiLogin = authApi.login;
export const apiValidateToken = authApi.validateToken;
export const apiLogout = authApi.logout;
export const apiRefreshToken = authApi.refreshToken;
//****************
// section2
//****************


function test() {
  apiGetUserBookings(apiMyBookingParams().myBookingFilter);
}
// test();
