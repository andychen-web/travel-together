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

export const getHotels = async (city) => {
  const url = `/hotels`;
  return commonAxiosInstance.get(url);
};