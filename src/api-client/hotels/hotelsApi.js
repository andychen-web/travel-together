import travelAxiosInstance from "@/api-client/axios/travelAxiosInstance";

export const hotelsParams = () => {
  // 查詢條件
  const hotelsFilter = {};

  const hotelsAddModel = {};
  const hotelsEditModel = {};
  //   TODO
  const hotelsRules = {};
  return {
    hotelsFilter,
    hotelsAddModel,
    hotelsEditModel,
  };
};

export async function getHotels(filter) {
  const url = `/hotels`;
  return travelAxiosInstance.get(url);
}
export async function getHotelById(id) {
  const url = `/hotels/${id}`;
  return travelAxiosInstance.get(url);
}
