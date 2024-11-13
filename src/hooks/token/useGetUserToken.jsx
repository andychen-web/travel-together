import { apiGetAccessToken } from "@/api";
import Cookies from "universal-cookie";
import { notifyError } from "@/utilities/globalUtil";
export const useGetUserToken = async () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("jwt");
  if (accessToken) return accessToken;

  try {
    const data = await apiGetAccessToken();
    cookies.set("jwt", data);
  } catch (error) {
    notifyError(error);
  }
};
