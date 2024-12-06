import React, { useEffect, useState } from "react";
import "@/assets/stylesheets/all.scss";
import useGetTdxToken from "@/hooks/token/useGetTdxToken";
// import { useGetUserToken } from "@/hooks/token/useGetUserToken";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { NavProvider } from "@/context/NavContext";

import { ToastContainer } from "react-toastify";
import { AuthProvider } from "@/context/AuthContext";

function App() {
  const [isSignedIn, setIsSignedIn] = useState(false); // 管理登入狀態
  // token
  useGetTdxToken();
  useEffect(() => {
    const checkSignedIn = async () => {
      // await useGetUserToken();
      // setIsSignedIn(true);
    };
    checkSignedIn();
  }, []);
  return (
    <AuthProvider isSignedIn={false}>
      <NavProvider>
        <ToastContainer />
        <RouterProvider router={router} />
      </NavProvider>
    </AuthProvider>
  );
}
export default App;
