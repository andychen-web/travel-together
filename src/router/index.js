import Navigation from "@/components/Navigation.jsx";
import ActivityPage from "@/pages/TDXOpenData/ActivityPage/ActivityPage";
import HomePage from "@/pages/TDXOpenData/HomePage/HomePage";
import RestaurantPage from "@/pages/TDXOpenData/RestaurantPage/RestaurantPage.jsx";
import ScenicSpotPage from "@/pages/TDXOpenData/ScenicSpotPage/ScenicSpotPage.jsx";
import OverviewDetailsPage from "@/pages/TDXOpenData/OverviewDetailsPage/OverviewDetailsPage.jsx";
import Footer from "@/components/Footer";
import ArticleList from "@/pages/TDXOpenData/ArticlesPage/ArticleListPage.jsx";
import AdminAuth from "@/pages/TDXOpenData/AdminBasicSettings/AdminAuth.jsx";
import AdminArticles from "@/pages/TDXOpenData/AdminBasicSettings/AdminArticles.jsx";
import ArticlePage from "@/pages/TDXOpenData/ArticlePage/ArticlePage.jsx";
import ScrollTop from "@/components/ScrollToTop.jsx";
// HOTEL
import HotelListPage from "@/pages/TravelService/HotelListPage/HotelListPage.jsx";
import AddHotelPage from "@/pages/TravelService/HotelPage/AddHotelPage";
import HotelDetailPage from "../pages/TravelService/HotelPage/HotelDetailPage.jsx";

// AUTH
import LoginPage from "@/pages/TravelService/Auth/LoginPage";
import Test from "@/pages/Test.jsx"; // TODO
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";
// utils
import { basePath } from "@/utilities/data";

// 前台
const ClientLayoutContainer = () => {
  return (
    <>
      <ScrollTop />
      <Navigation />
      <Outlet /> {/* 渲染子路由 */}
      <Footer />
    </>
  );
};
// TODO 後台

const router = createBrowserRouter([
  {
    path: "/", //首頁
    element: <Navigate to={basePath} replace />, //自動跳轉
    name: "",
  },
  {
    path: "/test",
    element: <Test></Test>,
    name: "test",
  },
  {
    path: basePath,
    element: <ClientLayoutContainer />,
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "hotels",
        name: "旅館",
        element: <HotelListPage />,
        isVisibleOnNav: true,
      },
      {
        path: "rooms/:id",
        name: "住宿詳情",
        element: <HotelDetailPage />,
      },
      {
        path: "add-hotel",
        name: "新增旅館",
        element: <AddHotelPage />,
        isVisibleOnNav: true,
      },
      {
        path: "login",
        name: "登入",
        element: <LoginPage />,
        isVisibleOnNav: true,
      },
    ],
    name: "優質旅館",
  },

  {
    path: "/TDX", //台灣旅遊公開資料
    element: <ClientLayoutContainer />,
    isVisibleOnNav: true,
    children: [
      {
        path: "ScenicSpot",
        name: "探索景點",
        element: <ScenicSpotPage />,
        isVisibleOnNav: true,
      },
      {
        path: "ScenicSpot/:id",
        element: <OverviewDetailsPage />,
      },
      {
        path: "Activity",
        name: "節慶活動",
        element: <ActivityPage />,
        isVisibleOnNav: true,
      },
      {
        path: "Activity/:id",
        element: <OverviewDetailsPage />,
      },
      {
        path: "Restaurant",
        name: "品嚐美食",
        element: <RestaurantPage />,
        isVisibleOnNav: true,
      },
      {
        path: "Restaurant/:id",
        element: <OverviewDetailsPage />,
      },
      {
        path: "Articles",
        name: "文章列表",
        element: <ArticleList />,
        isVisibleOnNav: true,
      },
      {
        path: "Articles/:id",
        element: <ArticlePage />,
      },
      {
        path: "Admin/Auth",
        name: "後臺管理",
        element: <AdminAuth />,
      },
      {
        path: "Admin/Articles",
        element: <AdminArticles />,
      },
    ],
    name: "台灣旅遊公開資料",
  },
  // 若找無頁面(必放最後)
  {
    path: "/",
    element: <ClientLayoutContainer />,
    children: [
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
    name: "",
  },
]);
export default router;
