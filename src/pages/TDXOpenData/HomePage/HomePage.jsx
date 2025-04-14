import React, { useEffect, useState } from "react";
import Carousel from "./Carousel/Carousel.jsx";
import { apiGetTdxRestaurants, apiGetTdxScenicSpots } from "@/api-client";
import Header from "./Header/Header.jsx";
import ActivityList from "./RecentActivity/ActivityList.jsx";
import ScenicSpotList from "./ScenicSpot/ScenicSpotList.jsx";
import RestaurantList from "./Restaurant/RestaurantList.jsx";
import SearchTitle from "./SearchTitle/SearchTitle.jsx";
import Cookies from "universal-cookie";
import { getAccessToken } from "@/api-client/tdx/auth";
import Loader from "@/components/Loader.jsx";
import { useNavigate } from "react-router-dom";
const HomePage = () => {
  const [scenicSpots, setScenicSpots] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [token, setToken] = useState("");
  const cookies = new Cookies();
  const [accessToken, setAccessToken] = useState(cookies.get("tdx_token"));
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
      setIsLoading(false);
      apiGetTdxScenicSpots({ city: "Taipei" }).then((data) => {
        // 隨機選六筆
        setScenicSpots(data.sort(() => Math.random() - 0.5).slice(6, 10));
        setCarouselItems(data.sort(() => Math.random() - 0.5).slice(6, 10));
      });
      apiGetTdxRestaurants({ city: "" }).then((data) => {
        // 隨機選四筆
        const shownRestaurants = data
          .sort(() => Math.random() - 0.5)
          .slice(0, 4);
        setRestaurants(shownRestaurants);
      });
    } else {
      getAccessToken().then((res) => setAccessToken(res));
      setIsLoading(true);
    }
    navigate('/');
  }, [accessToken]);
  return (
    <main className="container">
      <Loader isLoading={isLoading} />
      <SearchTitle />
      {token && <Carousel items={carouselItems} />}
      <Header title={"近期活動"} link={"/Activity"} linkType={"活動"} />
      {token && <ActivityList />}
      <Header title={"熱門打卡景點"} link={"/ScenicSpot"} linkType={"景點"} />
      {token && <ScenicSpotList spots={scenicSpots} />}
      <Header title={"一再回訪美食"} link={"/Restaurant"} linkType={"美食"} />
      {token && <RestaurantList restaurants={restaurants} />}
    </main>
  );
};

export default HomePage;
