import React, { useEffect } from "react";
import "@/assets/stylesheets/all.scss";
import useGetTdxToken from "@/hooks/token/useGetTdxToken";
import { useGetUserToken } from "@/hooks/token/useGetUserToken";
import { RouterProvider } from "react-router-dom";
import router from "@/router";
import { NavProvider } from "@/context/NavContext";

import { ToastContainer } from "react-toastify";

function App() {
  // token
  useGetTdxToken();
  useGetUserToken();
  return (
    <NavProvider>
      <ToastContainer />
      <RouterProvider router={router} />
    </NavProvider>
  );
}
export default App;
