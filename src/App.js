import React, { useEffect } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/stylesheets/all.scss";
import Navigation from "./component/Navigation";
import ActivityPage from "./pages/ActivityPage";
import HomePage from "./pages/HomePage";
import RestaurantPage from "./pages/RestaurantPage";
import ScenicSpotPage from "./pages/ScenicSpotPage.jsx";
import { getAccessToken } from "./api/auth.js";
import Cookies from "universal-cookie";
function App() {
  const cookies = new Cookies();
  const token = cookies.get("token");

  useEffect(() => {
    if (!token) {
      getAccessToken();
    }
  }, [token]);

  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/scenic-spots" element={<ScenicSpotPage />} />
        <Route path="/activities" element={<ActivityPage />} />
        <Route path="/restaurants" element={<RestaurantPage />} />
      </Routes>
    </Router>
  );
}
export default App;
