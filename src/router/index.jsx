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
import ProtectedRoute from "../components/RouteGuard/ProtectedRoute.jsx";
import { createBrowserRouter, Navigate, Outlet } from "react-router-dom";
import PageNotFound from "@/pages/PageNotFound/PageNotFound";

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
export const userRoutes = [
  {
    path: "/user",
    element: <ClientLayoutContainer />,
    name: "會員中心",
    isVisibleOnNav: true,
    hasDynamicRoutes: true,
    children: [
      {
        path: "login",
        name: "登入",
        element: <LoginPage />,
        isVisibleOnNav: true,
        isVisibleOnLoggedIn: false,
      },
      {
        path: "profile",
        name: "個人資料",
        element: <LoginPage />,
        isVisibleOnNav: true,
        isVisibleOnLoggedIn: true,
      },
    ],
  },
];

const routes = [
  {
    path: "/",
    element: <ClientLayoutContainer />,
    name: "首頁",
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <HomePage />,
        name: "首頁",
        isVisibleOnNav: false,
      },
      {
        path: "test",
        element: <Test />,
        name: "測試頁面",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "/scenicSpot",
    element: <ClientLayoutContainer />,
    name: "景點",
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <ScenicSpotPage />,
        name: "景點列表",
        isVisibleOnNav: true,
      },
      {
        path: ":id",
        element: <OverviewDetailsPage />,
        name: "景點詳情",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "/activity",
    element: <ClientLayoutContainer />,
    name: "活動",
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <ActivityPage />,
        name: "活動列表",
        isVisibleOnNav: true,
      },
      {
        path: ":id",
        element: <OverviewDetailsPage />,
        name: "活動詳情",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "/restaurant",
    element: <ClientLayoutContainer />,
    name: "餐廳",
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <RestaurantPage />,
        name: "餐廳列表",
        isVisibleOnNav: true,
      },
      {
        path: ":id",
        element: <OverviewDetailsPage />,
        name: "餐廳詳情",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "/articles",
    element: <ClientLayoutContainer />,
    name: "旅遊文章",
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <ArticleList />,
        name: "文章列表",
        isVisibleOnNav: true,
      },
      {
        path: ":id",
        element: <ArticlePage />,
        name: "文章詳情",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "/hotels",
    element: <ClientLayoutContainer />,
    name: "住宿",
    isVisibleOnNav: true,
    children: [
      {
        path: "",
        element: <HotelListPage />,
        name: "住宿列表",
        isVisibleOnNav: true,
      },
      {
        path: "add",
        element: (
          <ProtectedRoute>
            <AddHotelPage />
          </ProtectedRoute>
        ),
        name: "新增住宿",
        isVisibleOnNav: false,
      },
      {
        path: ":id",
        element: <HotelDetailPage />,
        name: "住宿詳情",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "/admin",
    element: <ClientLayoutContainer />,
    name: "管理後台",
    isVisibleOnNav: false,
    children: [
      {
        path: "articles",
        element: (
          <ProtectedRoute>
            <AdminArticles />
          </ProtectedRoute>
        ),
        name: "文章管理",
        isVisibleOnNav: false,
      },
      {
        path: "auth",
        element: (
          <ProtectedRoute>
            <AdminAuth />
          </ProtectedRoute>
        ),
        name: "權限管理",
        isVisibleOnNav: false,
      },
    ],
  },
  {
    path: "*",
    element: <PageNotFound />,
    name: "找不到頁面",
    isVisibleOnNav: false,
  },
];

const router = createBrowserRouter(routes);

export default router; 