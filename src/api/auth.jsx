// official https://github.com/tdxmotc/SampleCode
// old way https://github.com/TSinChen/2021thef2e-week1-2/blob/master/src/api/axios.ts#L15
import axios from "axios";

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
    .then((res) => res.data.access_token)
    .catch((err) => Promise.reject(`Error in getAccessToken: ${err}`));
};
