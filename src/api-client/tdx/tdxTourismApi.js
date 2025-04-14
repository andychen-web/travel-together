import tdxAxiosInstance from "@/api-client/tdx/tdxAxiosInstance";  

export const tdxParams = () => {
  // 查詢條件
  /**
   * @param {Object} options - 過濾器選項。
   * @param {number} [options.top] - 查詢筆數上限。
   * @param {boolean} [options.cityNotNull=true] - 是否過濾掉城市資料空的記錄（預設為 true）。
   * @param {boolean} [options.pictureUrlNotNull=true] - 是否過濾掉圖片地址為空的記錄（預設為 true）。
   * @returns {string} - 過濾條件字串
   */
  function tdxFilterCreator(top, cityNotNull = true, pictureUrlNotNull = true) {
    let filterParams = {
      $top: top,
      $filter: [],
    };

    if (cityNotNull) {
      filterParams.$filter.push("City ne null");
    }

    if (pictureUrlNotNull) {
      filterParams.$filter.push("Picture/PictureUrl1 ne null");
    }

    filterParams.$filter = filterParams.$filter.join(" and ");

    return filterParams;
  }
  // 增刪改model (optional)
  return {
    tdxFilterCreator,
  };
};
export const getScenicSpots = async ({
  city,
  searchInput,
  category,
  id,
  top = 70,
}) => {
  let filterParams = tdxParams().tdxFilterCreator();
  if (category) {
    filterParams.$filter += ` and Class1 eq '${category}'`;
  }
  if (searchInput) {
    filterParams.$filter += ` and (indexOf(ScenicSpotName, '${searchInput}') gt -1 or indexOf(Description, '${searchInput}') gt -1)`;
  }
  if (id) {
    filterParams.$filter += ` and ScenicSpotID eq '${id}'`;
  }
  if (top) {
    filterParams.$top = top;
  }

  return tdxAxiosInstance.get(`/ScenicSpot/${city ? city : ""}`, {
    params: filterParams,
  });
};

export const getActivities = async ({
  city,
  searchInput,
  category,
  date,
  id,
  top = 70,
}) => {
  let filterParams = tdxParams().tdxFilterCreator();
  filterParams.$filter += category
    ? ` and (Class1 eq '${category}' or Class2 eq '${category}')`
    : "";
  filterParams.$filter += date
    ? ` and StartTime le ${date} and EndTime ge ${date}`
    : "";
  filterParams.$filter += searchInput
    ? ` and (indexOf(ActivityName, '${searchInput}') gt -1 or indexOf(Description, '${searchInput}') gt -1)`
    : "";
  filterParams.$filter += id ? ` and ActivityID eq '${id}'` : "";
  filterParams.$top = top;

  return tdxAxiosInstance.get(`/Activity/${city ? city : ""}`, {
    params: filterParams,
  });
};

export const getRestaurants = async ({
  city,
  searchInput,
  category,
  id,
  top = 70,
}) => {
  let filterParams = tdxParams().tdxFilterCreator();
  filterParams.$filter += category ? ` and Class eq '${category}'` : "";
  filterParams.$filter += searchInput
    ? ` and (indexOf(RestaurantName, '${searchInput}') gt -1 or indexOf(Description, '${searchInput}') gt -1)`
    : "";
  filterParams.$filter += id ? ` and RestaurantID eq '${id}'` : "";
  filterParams.$top = top;

  return tdxAxiosInstance.get(`/Restaurant/${city ? city : ""}`, {
    params: filterParams,
  });
};
// 取得推薦清單
export const getSuggestions = async ({ id, dataType, city, top = 70 }) => {
  let filterParams = tdxParams().tdxFilterCreator();
  filterParams.$filter += city ? ` and ${dataType}ID ne '${id}'` : "";
  filterParams.$top = top;
  return tdxAxiosInstance.get(`/${dataType}/${city ? city : ""}`, {
    params: filterParams,
  });
};
