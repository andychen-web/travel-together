import axios from "axios";
import Cookies from "universal-cookie";
import { notifyError } from "@/utilities/global_util";

// 非交通部，屬於自家後端的api
const commonAxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
});

// 添加請求攔截器
commonAxiosInstance.interceptors.request.use(
  async (config) => {
    const cookies = new Cookies();
    // const token = cookies.get("tdx_token");
    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    throw error;
  }
);

// 添加回應攔截器
commonAxiosInstance.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => {
    if (error.response) {
      // TODO action str
      handleGetApiError(error.response);
    } else {
      console.warn(error);
      // 其他錯誤情況
      notifyError("出現錯誤，請稍後再試");
    }
    throw error;
  }
);

// 處理 API 錯誤的函數
function handleGetApiError(response, action) {
  try {
    const status = response.status;
    const data = response.data;
    switch (status) {
      case 400:
        notifyError(`參數錯誤： ${data.message}`);
        break;
      case 401:
        notifyError(`權限不足： ${data.message}`);
        // 若有refresh token則再次重取access token、若重取成功 重新打該api
        // 若重取失敗已過期，則導至重新登入
        break;
      case 403:
        notifyError("尚未開通此服務，詳情請洽網站管理員");
        break;
      case 404:
        notifyError(`沒有資料： ${data.message}`);
        break;
      case 500:
        notifyError("異常錯誤，請通知網站管理員");
        break;
      default:
        notifyError(`錯誤：${status}`);
    }
  } catch (error) {
    notifyError(`${action}錯誤：後台無回應：` + error);
  }
}

export default commonAxiosInstance;
