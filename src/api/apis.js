import axios from "axios";
import Cookies from "universal-cookie";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  authorization: `Bearer ${token}`,
};
const baseUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism";
let initialFilterParams =
  "$top=30&$filter=City ne null and Picture/PictureUrl1 ne null";
let filterParams = initialFilterParams;
export const getScenicSpots = async ({ city, searchInput, category, id }) => {
  filterParams += category ? ` and Class1 eq '${category}'` : "";
  filterParams += searchInput
    ? ` and contains(DescriptionDetail,'${searchInput}')`
    : "";
  filterParams += id ? ` and ScenicSpotID ne '${id}'` : "";

  return axios
    .get(
      `${baseUrl}/ScenicSpot/${city ? city : ""}?${filterParams}&$format=JSON`,
      { headers }
    )
    .then((res) => {
      filterParams = initialFilterParams;
      return res.data;
    })
    .catch((err) => Promise.reject(err));
};

// ? more strict query, try contains Keyword, not DescriptionDetail
export const getActivities = async ({
  city,
  searchInput,
  category,
  date,
  id,
}) => {
  filterParams += category
    ? ` and Class1 eq '${category}' or Class2 eq '${category}'`
    : "";
  filterParams += date
    ? ` and StartTime le ${date} and EndTime ge ${date}`
    : "";
  filterParams += searchInput
    ? ` and (indexOf(ActivityName, '${searchInput}') gt -1 or indexOf(Description, '${searchInput}') gt -1)`
    : "";
  filterParams += id ? ` and ScenicSpotID ne '${id}'` : "";
  filterParams += ` and Picture/PictureUrl1 ne null`;
  return axios
    .get(
      `${baseUrl}/Activity/${city ? city : ""}?${filterParams}&$format=JSON`,
      { headers }
    )
    .then((res) => {
      filterParams = initialFilterParams;
      return res.data;
    })
    .catch((err) => Promise.reject(err));
};

export const getRestaurants = async ({ city, searchInput, category, id }) => {
  filterParams += category
    ? ` and Class1 eq '${category}' or Class2 eq '${category}'`
    : "";
  filterParams += searchInput
    ? ` and contains(DescriptionDetail,'${searchInput}')`
    : "";
  filterParams += id ? ` and ScenicSpotID ne '${id}'` : "";

  filterParams += ` and Picture/PictureUrl1 ne null`;

  return axios
    .get(
      `${baseUrl}/Restaurant/${city ? city : ""}?${filterParams}&$format=JSON`,
      { headers }
    )
    .then((res) => {
      filterParams = initialFilterParams;
      // return filterValidImgUrls(res.data);
      return res.data;
    })
    .catch((err) => Promise.reject(err));
};
