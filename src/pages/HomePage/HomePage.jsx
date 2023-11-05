import React, { useEffect, useState } from "react";
import Carousel from "./Carousel/Carousel.jsx";
import { getScenicSpots } from "../../api/apis";
import { getRestaurants } from "../../api/apis";
import Header from "./Header/Header.jsx";
import ActivityList from "./RecentActivity/ActivityList.jsx";
import ScenicSpotList from "./ScenicSpot/ScenicSpotList.jsx";
import RestaurantList from "./Restaurant/RestaurantList.jsx";
import SearchTitle from "./SearchTitle/SearchTitle.jsx";
import Cookies from "universal-cookie";
import { getAccessToken } from "../../api/auth";
import Loader from "../../components/Loader.jsx";
const HomePage = () => {
  const [scenicSpots, setScenicSpots] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  const [restaurants, setRestaurants] = useState([]);
  const [token, setToken] = useState("");
  const cookies = new Cookies();
  const accessToken = cookies.get("token");
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
      setIsLoading(false);
      getRestaurants({})
        .then((data) => {
          // randomly choose 4 times
          const shownRestaurants = data
            .sort(() => Math.random() - 0.5)
            .slice(0, 4);
          setRestaurants(shownRestaurants);
        })
        .catch((err) => console.log(err));
      getScenicSpots({ city: "Taipei" })
        .then((data) => {
          setScenicSpots(data.sort(() => Math.random() - 0.5).slice(6, 10));
          setCarouselItems(data.sort(() => Math.random() - 0.5).slice(6, 10));
        })
        .catch((err) => console.log(err));
    } else {
      getAccessToken();
      setIsLoading(true);
    }
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
