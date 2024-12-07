import axios from "axios";
import Cookies from "universal-cookie";
import { notifyError, showToast } from "@/utilities/globalUtil";
import { apiRefreshToken } from "@/api";
import router from "@/router";
// 自家後端的api
const travelAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 添加請求攔截器
travelAxiosInstance.interceptors.request.use(
  async (config) => {
    // console.log(config);
    // const cookies = new Cookies();
    // const token = cookies.get("jwt");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    throw error;
  }
);

const defaultToastTextMap = {
  get: "查詢",
  post: "新增",
  put: "修改",
  delete: "刪除",
};
// 添加回應攔截器
travelAxiosInstance.interceptors.response.use(
  (response) => {
    // 處理通知訊息
    const {config} = response;
    if (config.showToast === false) return response.data;
    if (config.method === "get") return response.data;
    // 除GET以外的操作都顯示toast
    showToast({
      type: "OK",
      msg: config.toastText
        ? config.toastText + "成功"
        : defaultToastTextMap[config.method] + "成功",
    });
    return response.data;
  },
  (error) => {
    if (error.response) {
      handleGetApiError(error.response);
    } else {
      console.warn(error);
      // 其他錯誤情況
      notifyError("出現錯誤，請稍後再試");
    }
    throw error;
  }
);

let apiRetryCount = 0;
// 處理 API 錯誤的函數
async function handleGetApiError(errResponse) {
  try {
    const status = errResponse.status;
    const data = errResponse.data;
    switch (status) {
      case 400:
        notifyError(`無效請求，請確認欄位正確後再試： ${data.message}`);
        break;
      case 401:
        if (apiRetryCount > 0) {
          // 重取失敗
          // router.navigate( "/login");
          return;
        }
        apiRetryCount += 1;

        try {
          let res = await apiRefreshToken();
          if (!res) {
            apiRetryCount = 0;
          } else {
            // refresh token 一次 若重取成功 重新打原先api
          }
          notifyError(`權限不足： ${data.message}`);
        } catch (error) {
          console.log(error);
        }
        // 若重取失敗
        notifyError(`權限不足： ${data.message}`);
        break;
      case 403:
        notifyError(`尚未開通此服務，詳情請洽網站管理員`);
        break;
      case 404:
        notifyError(`沒有資料： ${data.message}`);
        break;
      case 500:
        notifyError(`異常錯誤，請通知網站管理員`);
        break;
      default:
        notifyError(`錯誤：${status}`);
    }
  } catch (error) {
    notifyError(`錯誤：後台無回應：` + error);
  }
}

export default travelAxiosInstance;
