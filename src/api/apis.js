import axios from "axios";
import Cookies from "universal-cookie";
import { filterImgFormat } from "../utilities/function";
const cookies = new Cookies();
const token = cookies.get("token");
const headers = {
  authorization: `Bearer ${token}`,
};
const baseUrl = "https://tdx.transportdata.tw/api/basic/v2/Tourism";
let initialFilterParams =
  "$top=70&$filter=City ne null and Picture/PictureUrl1 ne null";
let filterParams = initialFilterParams;
let suggestionsFilterParams = initialFilterParams;

export const getScenicSpots = async ({ city, searchInput, category, id }) => {
  filterParams += category ? ` and Class1 eq '${category}'` : "";
  filterParams += searchInput
    ? ` and (indexOf(ScenicSpotName, '${searchInput}') gt -1 or indexOf(Description, '${searchInput}') gt -1)`
    : "";
  filterParams += id ? ` and ScenicSpotID eq '${id}'` : "";

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
  filterParams += id ? ` and ActivityID eq '${id}'` : "";
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
  filterParams += category ? ` and Class eq '${category}'` : "";
  filterParams += searchInput
    ? ` and (indexOf(RestaurantName, '${searchInput}') gt -1 or indexOf(Description, '${searchInput}') gt -1)`
    : "";
  filterParams += id ? ` and RestaurantID eq '${id}'` : "";
  filterParams += ` and Picture/PictureUrl1 ne null`;

  return axios
    .get(
      `${baseUrl}/Restaurant/${city ? city : ""}?${filterParams}&$format=JSON`,
      { headers }
    )
    .then((res) => {
      filterParams = initialFilterParams;
      return filterImgFormat(res.data);
    })
    .catch((err) => Promise.reject(err));
};

export const getSuggestions = async ({ id, dataType, city }) => {
  if (city) {
    suggestionsFilterParams += id ? ` and ${dataType}ID ne '${id}'` : "";
    return axios
      .get(
        `${baseUrl}/${dataType}/${
          city ? city : ""
        }?${suggestionsFilterParams}&$format=JSON`,
        {
          headers,
        }
      )
      .then((res) => {
        suggestionsFilterParams = initialFilterParams;
        return res.data;
      })
      .catch((err) => Promise.reject(err));
  }
};
