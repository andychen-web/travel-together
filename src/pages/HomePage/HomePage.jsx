import React, { useEffect, useState } from "react";
import pointer from "../../assets/images/icons/pointer-yellow.svg";
import Carousel from "./Carousel/Carousel.jsx";
import { getScenicSpots } from "../../api/api";
import Header from "./Header/Header.jsx";
import ActivityList from "./RecentActivity/ActivityList.jsx";
import ScenicSpotList from "./ScenicSpot/ScenicSpotList.jsx";
import RestaurantList from "./Restaurant/RestaurantList.jsx";
import Search from "../../components/Search.jsx";

const HomePage = () => {
  const [scenicSpots, setScenicSpots] = useState([]);
  const [carouselItems, setCarouselItems] = useState([]);
  useEffect(() => {
    getScenicSpots()
      .then((data) => {
        setScenicSpots(data.slice(6, 10));
        setCarouselItems(data.slice(0, 6));
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <main className="container">
      <div className="p-5">
        <div className="row">
          <div className="col-md-8">
            <h1 className="d-none d-md-block">
              探索台灣之美
              <br />
              讓我們更親近這片土地
            </h1>
            <h4 className="py-1 d-block d-md-none">
              探索台灣之美
              <br />
              讓我們更親近這片土地
            </h4>

            <div className=" pb-3">
              <div>
                <img src={pointer} alt="pointer" />
                台灣旅遊景點導覽
              </div>
              <div className="ps-4">Taiwan Travel Guide</div>
            </div>
          </div>
          <div className="col-md-4 col-10 ">
            <Search />
          </div>
        </div>
      </div>
      <Carousel items={carouselItems} />

      <div>
        <Header title={"近期活動"} link={"/activities"} linkType={"活動"} />
        <ActivityList />
      </div>
      <div>
        <Header
          title={"熱門打卡景點"}
          link={"/scenic-spots"}
          linkType={"景點"}
        />
        <ScenicSpotList spots={scenicSpots} />
      </div>
      <div>
        <Header
          title={"一再回訪美食"}
          link={"/restaurants"}
          linkType={"美食"}
        />
        <RestaurantList />
      </div>
    </main>
  );
};

export default HomePage;
