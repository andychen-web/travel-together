import axios from "axios";
import Cookies from "universal-cookie";
import { notifyError, showToast } from "@/utilities/globalUtil";
import { apiRefreshToken } from "@/api-client";
import router from "@/router";
// 自家後端的api
const travelAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  withCredentials: true,
});
let globalController = new AbortController();

// 添加請求攔截器
travelAxiosInstance.interceptors.request.use(
  async (config) => {
    config.signal = globalController.signal;
    return config;
  },
  (err) => {
    throw err;
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
    const {  config  } = response;
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
  (err) => {
    if (err.response) {
      handleGetApiError(err.response, err.config);
    } else if (err.code === "ERR_CANCELED") {
      return;
    } else {
      console.warn(err);
      // 其他錯誤情況
      notifyError("出現錯誤，請稍後再試");
    }
    throw err;
  }
);

async function handleUnauthorized({ config, errData }) {
  try {
    let res = await apiRefreshToken();
    if (res) {
      return travelAxiosInstance(config); // 重新呼叫API
    }
  } catch (err) {
    // 如果refresh失敗，取消所有正在進行的請求
    globalController.abort();
    // globalController = new AbortController(); // 重新創建控制器
    // notifyError(`權限不足： ${errData.message}`);
    // router.navigate("/user/login");
  }
}

// 處理 API 錯誤的函數
async function handleGetApiError(errResponse, config) {
  try {
    const status = errResponse.status;
    const errData = errResponse.data;
    if (errResponse.code === "ERR_NETWORK") {
      notifyError(`後台無回應，請稍後再試`);
      return false;
    }
    switch (status) {
      case 400:
        notifyError(`無效請求，請確認欄位正確後再試： ${errData.message}`);
        break;
      case 401:
        handleUnauthorized({ config, errData });
        break;
      case 403:
        notifyError(`尚未開通此服務，詳情請洽網站管理員`);
        break;
      case 404:
        notifyError(`沒有資料： ${errData.message}`);
        break;
      case 500:
        notifyError(`異常錯誤，請通知網站管理員`);
        break;
      default:
        notifyError(`錯誤：${status}`);
    }
  } catch (err) {
    notifyError(`錯誤：後台無回應：` + err);
  }
}

export default travelAxiosInstance;
