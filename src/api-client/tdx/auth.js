import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";
import Swal from "sweetalert2";
const saveToken = (token) => {
  const decoded = jwtDecode(token);
  const cookies = new Cookies();
  cookies.set("tdx_token", token, { expires: new Date(decoded.exp * 1000) });
};
export const getAccessToken = async () => {
  const url =
    "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  const params = new URLSearchParams({
    grant_type: "client_credentials",
    client_id: import.meta.env.VITE_TDX_CLIENT_ID,
    client_secret: import.meta.env.VITE_TDX_CLIENT_SECRET,
  });
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return axios
    .post(url, params, { headers })
    .then((res) => {
      saveToken(res.data.access_token);
      return res.data.access_token;
    })
    .catch((err) => {
      console.warn(err)
      Swal(`取得TDX 運輸資料流通服務token 失敗: ${err}`)
    });
};
