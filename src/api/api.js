import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  authorization: `Bearer ${token}`,
};
// ? ? num of top, random city
// ? get popular 打卡景點
export const getScenicSpots = async (city) => {
  return axios
    .get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$top=20&$filter=Picture/PictureUrl1%20ne%20null%20and%20City%20ne%20null
      `,
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
// ? need upcoming activity, eq startTime > new data
export const getActivity = async (city) => {
  return axios
    .get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/Activity/${
        city ? city : ""
      }?%24top=10&$filter=Picture/PictureUrl1%20ne%20null&%24format=JSON`,
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
export const getRestaurants = async (city) => {
  return axios
    .get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/Restaurant/${
        city ? city : ""
      }?%24filter=Picture/PictureUrl1%20ne%20null%20and%20City%20ne%20null&%24top=10&%24format=JSON`,
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
