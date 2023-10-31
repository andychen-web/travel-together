import React, { useEffect, useState } from "react";
import Carousel from "./Carousel/Carousel.jsx";
import { getScenicSpots } from "../../api/apis";
import Header from "./Header/Header.jsx";
import ActivityList from "./RecentActivity/ActivityList.jsx";
import ScenicSpotList from "./ScenicSpot/ScenicSpotList.jsx";
import RestaurantList from "./Restaurant/RestaurantList.jsx";
import SearchTitle from "./SearchTitle/SearchTitle.jsx";

const HomePage = () => {
  const [scenicSpots, setScenicSpots] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    getScenicSpots({ city: "Taipei" })
      .then((data) => {
        setScenicSpots(data.slice(6, 10));
        setCarouselItems(data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="container">
      <SearchTitle />
      <Carousel items={carouselItems} />
      <Header title={"近期活動"} link={"/Activity"} linkType={"活動"} />
      <ActivityList />
      <Header title={"熱門打卡景點"} link={"/ScenicSpot"} linkType={"景點"} />
      <ScenicSpotList spots={scenicSpots} />
      <Header title={"一再回訪美食"} link={"/Restaurant"} linkType={"美食"} />
      <RestaurantList />
    </main>
  );
};

export default HomePage;