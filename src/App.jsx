import React, { useEffect, useState } from "react";
import "@/assets/stylesheets/all.scss";
import useGetTdxToken from "@/hooks/token/useGetTdxToken";
// import { useGetUserToken } from "@/hooks/token/useGetUserToken";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { NavProvider } from "@/context/NavContext";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";


import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { zhTW } from "date-fns/locale";
function App() {
  let locale = zhTW;
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 管理登入狀態
  // token
  useGetTdxToken();
  useEffect(() => {
    const checkSignedIn = async () => {
      // await useGetUserToken();
      // setIsLoggedIn(true);
    };
    checkSignedIn();
  }, []);
  return (
    <AuthProvider isLoggedIn={false}>
      <NavProvider>
        <ToastContainer />
        <LocalizationProvider
          dateAdapter={AdapterDateFns}
          adapterLocale={locale}
        >
          <RouterProvider router={router} />
        </LocalizationProvider>
      </NavProvider>
    </AuthProvider>
  );
}
export default App;
