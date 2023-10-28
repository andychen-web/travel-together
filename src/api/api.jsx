import axios from "axios";
const headers = {
  authorization: `Bearer ${process.env.REACT_APP_TEST_TOKEN}`,
};
// ? ? token, num of top, city, ne, spots from diff cities
// ? get popular 打卡景點
export const getScenicSpots = async (city) => {
  return axios
    .get(
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot?$top=20&$filter=Picture/PictureUrl1%20ne%20null%20and%20City%20ne%20null
      `,
      { headers }
      // `https://tdx.transportdata.tw/api/basic/v2/Tourism/ScenicSpot/${
      //   city ? city : ""
      // }?%24top=3&%24format=JSON`
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
// ? need upcoming activity
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
      `https://tdx.transportdata.tw/api/basic/v2/Tourism/getRestaurants/${city}?%24top=3&%24format=JSON`,
      { headers }
    )
    .then((res) => console.log(res.data))
    .catch((err) => Promise.reject(err));
};
