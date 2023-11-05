import React, { useEffect, useState } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./assets/stylesheets/all.scss";
import Navigation from "./components/Navigation.jsx";
import ActivityPage from "./pages/ActivityPage/ActivityPage";
import HomePage from "./pages/HomePage/HomePage";
import RestaurantPage from "./pages/RestaurantPage/RestaurantPage.jsx";
import ScenicSpotPage from "./pages/ScenicSpotPage/ScenicSpotPage.jsx";
import { getAccessToken } from "./api/auth.js";
import Cookies from "universal-cookie";
import OverviewDetailsPage from "./pages/OverviewDetailsPage/OverviewDetailsPage.jsx";
import Footer from "./components/Footer";
function App() {
  const cookies = new Cookies();
  const accessToken = cookies.get("token");
  const [token, setToken] = useState("");
  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      getAccessToken();
    }
  }, [accessToken]);

  return (
    <Router>
      <Navigation />
      {token && (
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
          <Route path="/ScenicSpot" element={<ScenicSpotPage />} />
          <Route path="/ScenicSpot/:id" element={<OverviewDetailsPage />} />
          <Route path="/Activity" element={<ActivityPage />} />
          <Route path="/Activity/:id" element={<OverviewDetailsPage />} />
          <Route path="/Restaurant" element={<RestaurantPage />} />
          <Route path="/Restaurant/:id" element={<OverviewDetailsPage />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}
export default App;
