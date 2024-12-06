import travelAxiosInstance from "@/api/common/travelAxiosInstance";

export const authParams = () => {
  // 查詢條件
  const authFilter = {};

  const authAddModel = {};
  return {
    authFilter,
    authAddModel,
  };
};

export async function login(model) {
  const url = `/auth/login`;
  return travelAxiosInstance.post(url, model, {
    withCredentials: true,
    showToast: false, // 添加自訂屬性
  });
}
export async function validateToken() {
  const url = `/auth/validate-token`;
  return travelAxiosInstance.get(url, { withCredentials: true });
}
export async function logout() {
  const url = `/auth/logout`;
  return travelAxiosInstance.post(url, { withCredentials: true });
}
export async function refreshToken() {
  const url = `/auth/refresh-token`;
  return travelAxiosInstance.post(url, null, { withCredentials: true });
}
