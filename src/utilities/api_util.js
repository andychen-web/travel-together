import { notifyError } from "@/utilities/global_util";
import { Cookie } from "@/utilities/cookie";
import axios from "axios";
// 處理 API 錯誤的函數
export async function handleADSGetApiError(response, action) {
  try {
    const status = response.status;
    const data = response.data;

    switch (status) {
      case 400:
        notifyError(`參數錯誤： ${data.message}`);
        break;
      case 401:
        // 若有refresh token則再次重取access token、若重取成功 重新打該api
        const token = 'api'
        if (token) {
          Cookie.set("ADS_token", token);
          const originalRequest = response.config;
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return await axios(originalRequest);
        } else {
          notifyError(`權限不足： ${data.message}`);
        }
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
