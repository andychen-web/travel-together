import axios from "axios";
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
  return axios.post(url, model, {
    withCredentials: true,
    showToast: false, // 添加自訂屬性
  });
}
export async function validateToken() {
  const url = `/auth/validate-token`;
  return axios.get(url, {
    withCredentials: true,
    showToast: false,
  });
}

export async function logout() {
  const url = `/auth/logout`;
  return axios.post(url, { withCredentials: true });
}

export async function refreshToken() {
  const url = `/auth/refresh-token`;
  return axios.post(url, null, {
    withCredentials: true,
    showToast: false,
  });
}
