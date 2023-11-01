import axios from "axios";
import Cookies from "universal-cookie";
import { jwtDecode } from "jwt-decode";

const saveToken = (token) => {
  const decoded = jwtDecode(token);
  const cookies = new Cookies();
  cookies.set("token", token, { expires: new Date(decoded.exp * 1000) });
};
export const getAccessToken = async () => {
  const url =
    "https://tdx.transportdata.tw/auth/realms/TDXConnect/protocol/openid-connect/token";
  const data = {
    grant_type: "client_credentials",
    client_id: process.env.REACT_APP_CLIENT_ID,
    client_secret: process.env.REACT_APP_CLIENT_SECRET,
  };
  const headers = {
    "Content-Type": "application/x-www-form-urlencoded",
  };

  return axios
    .post(url, data, { headers })
    .then((res) => saveToken(res.data.access_token))
    .catch((err) => Promise.reject(`Error in getAccessToken: ${err}`));
};
