// import { apiGetADSAccessToken } from "@/api";
import Cookies from "universal-cookie";
import { notifyError } from "@/utilities/globalUtil";
export const useGetUserToken = async () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("ADS_token");
  if (accessToken) return accessToken;
  
  try {
    // const data = await apiGetADSAccessToken();
    const data = 'api'
    cookies.set("ADS_token", data);
  } catch (error) {
    notifyError(error);
  }
};
