import commonAxiosInstance from "@/api/common/commonAxiosInstance";

export const hotelsParameters = () => {
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

export async function getHotels(city) {
  const url = `/hotels`;
  return commonAxiosInstance.get(url);
}
export async function getHotelById(id) {
  const url = `/hotels/${id}`;
  return commonAxiosInstance.get(url);
}
