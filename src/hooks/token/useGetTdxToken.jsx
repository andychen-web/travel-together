import { useEffect } from "react";
import { getAccessToken } from "@/api/tdx/auth";
import Cookies from "universal-cookie";

const useGetTdxToken = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get("tdx_token");

  useEffect(() => {
    if (!accessToken) {
      getAccessToken();
    }
  }, [accessToken]);

  return accessToken;
};

export default useGetTdxToken;
