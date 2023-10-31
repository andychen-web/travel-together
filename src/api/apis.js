import axios from "axios";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  authorization: `Bearer ${token}`,
};
const baseUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism";
// ? more strict query, try contains Keyword, not DescriptionDetail
export const getScenicSpots = async ({ city, searchInput, category }) => {
  return axios
    .get(
      `${baseUrl}/ScenicSpot/${
        city ? city : ""
      }?$top=20&$filter=Picture/PictureUrl1 ne null and City ne null 
      ${category ? `and Class1 eq '${category}'` : ""}
      ${searchInput ? `and contains(DescriptionDetail,'${searchInput}')` : ""}`,
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
// ? need upcoming activity, eq startTime > new data
export const getActivities = async (city, startTime, endTime) => {
  return axios
    .get(
      `${baseUrl}/Activity/${
        city ? city : ""
      }?$top=10&$filter=Picture/PictureUrl1 ne null&$format=JSON`,
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
export const getRestaurants = async (city) => {
  return axios
    .get(
      `${baseUrl}/Restaurant/${
        city ? city : ""
      }?$filter=Picture/PictureUrl1 ne null and City ne null&$top=10&$format=JSON`,
      { headers }
    )
    .then((res) => res.data)
    .catch((err) => Promise.reject(err));
};
