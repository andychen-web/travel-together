import React, { useEffect } from "react";
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
import ArticleList from "./pages/ArticlesPage/ArticleList.jsx";
import AdminAuth from "./pages/Backend/AdminAuth.jsx";
import AdminArticles from "./pages/Backend/AdminArticles.jsx";
import ArticlePage from "./pages/ArticlePage/ArticlePage.jsx";
import ScrollTop from "./components/ScrollToTop.jsx";
function App() {
  const cookies = new Cookies();
  const accessToken = cookies.get("token");
  useEffect(() => {
    if (!accessToken) {
      getAccessToken();
    }
  }, [accessToken]);

  return (
    <Router>
      <ScrollTop />
      <Navigation />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<HomePage />} />
        <Route path="/ScenicSpot" element={<ScenicSpotPage />} />
        <Route path="/ScenicSpot/:id" element={<OverviewDetailsPage />} />
        <Route path="/Activity" element={<ActivityPage />} />
        <Route path="/Activity/:id" element={<OverviewDetailsPage />} />
        <Route path="/Restaurant" element={<RestaurantPage />} />
        <Route path="/Restaurant/:id" element={<OverviewDetailsPage />} />
        <Route path="/Articles" element={<ArticleList />} />
        <Route path="/Articles/:id" element={<ArticlePage />} />
        <Route path="/AdminAuth" element={<ArticleList />} />
        <Route path="/Admin">
          <Route path="Articles" element={<AdminArticles />} />
          <Route path="Auth" element={<AdminAuth />} />
        </Route>
      </Routes>
      <Footer />
    </Router>
  );
}
export default App;
