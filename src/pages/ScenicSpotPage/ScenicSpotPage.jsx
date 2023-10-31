import React, { useEffect, useState } from "react";
import { getScenicSpots } from "../../api/apis";
import topic1 from "../../assets/images/category/spot/01.svg";
import topic2 from "../../assets/images/category/spot/02.svg";
import topic3 from "../../assets/images/category/spot/03.svg";
import topic4 from "../../assets/images/category/spot/04.svg";
import topic5 from "../../assets/images/category/spot/05.svg";
import topic6 from "../../assets/images/category/spot/06.svg";
import topic7 from "../../assets/images/category/spot/07.svg";
import noSearchResult from "../../assets/images/icons/no-search-result.svg";

import CategoryList from "../../components/Category/CategoryList.jsx";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import Search from "../../components/Search.jsx";
import useQueryParams from "../../hooks/useQueryParams";
import ScenicSpotList from "../HomePage/ScenicSpot/ScenicSpotList.jsx";
const ScenicSpotPage = () => {
  const TOPICS = [
    { bg: topic1, label: "自然風景類" },
    { bg: topic2, label: "觀光工廠類" },
    { bg: topic3, label: "遊憩類" },
    { bg: topic4, label: "休閒農業類" },
    { bg: topic5, label: "生態類" },
    { bg: topic6, label: "溫泉類" },
    { bg: topic7, label: "古蹟類" },
  ];
  const [scenicSpots, setScenicSpots] = useState([]);

  const {
    query,
    pathname,
    category,
    city,
    setCity,
    searchInput,
    setSearchInput,
  } = useQueryParams();

  useEffect(() => {
    // search by city and keyword
    if (searchInput !== "none") {
      getScenicSpots({ city, searchInput })
        .then((data) => {
          setScenicSpots(data);
        })
        .catch((err) => console.log(err));
    } else {
      getScenicSpots({ city })
        .then((data) => {
          setScenicSpots(data);
        })
        .catch((err) => console.log(err));
    }
    // search by category
    if (category) {
      getScenicSpots({ category })
        .then((data) => {
          setScenicSpots(data);
          setCity("");
          setSearchInput("");
        })
        .catch((err) => console.log(err));
    }
  }, [query]);
  return (
    <main className="container">
      <MyBreadCrumb />
      <Search
        city={city}
        setCity={setCity}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        placeholder={"你想去哪?"}
        pathname={pathname}
      />
      <CategoryList topics={TOPICS} />
      <div className="search-result">
        <div className="d-flex">
          <h1> 搜尋結果</h1>
          <div className="mt-3 ms-3">
            共有<span className="text-info">{scenicSpots.length}</span>筆
          </div>
        </div>
        {scenicSpots.length ? (
          <ScenicSpotList spots={scenicSpots} />
        ) : (
          <div className="text-primary h-3 fw-bold w-25 m-auto my-5">
            <img src={noSearchResult} alt="no-result" />
            <div>目前查無資料</div>
            <div>請重新搜尋</div>
          </div>
        )}
      </div>
    </main>
  );
};

export default ScenicSpotPage;
