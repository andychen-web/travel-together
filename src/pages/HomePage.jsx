import React, { useEffect, useState } from "react";
import pointer from "../assets/images/icons/pointer-yellow.svg";
import { MdSearch } from "react-icons/md";
import Carousel from "../component/Home/Carousel.jsx";
import { getScenicSpots } from "../api/api.jsx";
import Header from "../component/Home/Header";
import ActivityList from "../component/Home/ActivityList";
import { getAccessToken } from "../api/auth";
import ScenicSpotList from "../component/Home/ScenicSpotList.jsx";

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
    // getAccessToken().then((data) => console.log(data));
  }, []);
  return (
    <main className="container">
      <div className="p-5">
        <div className="row">
          <div className="col-md-8">
            <p className="px-3 py-2">
              探索台灣之美
              <br />
              讓我們更親近這片土地
            </p>

            <span className="px-3 py-2">
              <img src={pointer} alt="pointer" />
              <span>台灣旅遊景點導覽 Taiwan Travel Guide</span>
            </span>
          </div>
          <div className="col-md-4">
            <div className="dropdown">
              <button
                className="btn btn-white w-100 border border-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton1"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                探索景點
              </button>
              <ul
                className="dropdown-menu w-100"
                aria-labelledby="dropdownMenuButton1"
              >
                <li className="border-bottom ">
                  <a className="dropdown-item" href="/">
                    探索景點
                  </a>
                </li>
                <li className="border-bottom ">
                  <a className="dropdown-item" href="/">
                    節慶活動
                  </a>
                </li>
                <li>
                  <a className="dropdown-item" href="/">
                    品嘗美食
                  </a>
                </li>
              </ul>
            </div>

            <input
              type="text"
              placeholder="你想去哪?請輸入關鍵字"
              className="bg-light form-control border border-secondary mt-2"
              id="keywordInput"
            />

            <button
              type="button"
              className="mt-2 w-100 btn text-white btn-primary"
            >
              <MdSearch size={24} /> 搜尋
            </button>
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
      </div>
    </main>
  );
};

export default HomePage;
