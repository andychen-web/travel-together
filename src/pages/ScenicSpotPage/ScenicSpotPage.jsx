import React, { useEffect, useState } from "react";
import { getScenicSpots } from "../../api/apis";
import topic1 from "../../assets/images/category/spot/01.svg";
import topic2 from "../../assets/images/category/spot/02.svg";
import topic3 from "../../assets/images/category/spot/03.svg";
import topic4 from "../../assets/images/category/spot/04.svg";
import topic5 from "../../assets/images/category/spot/05.svg";
import topic6 from "../../assets/images/category/spot/06.svg";
import topic7 from "../../assets/images/category/spot/07.svg";

import CategoryList from "../../components/Category/CategoryList.jsx";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import Search from "../../components/Search/Search.jsx";
import useQueryParams from "../../hooks/useQueryParams";
import ScenicSpotList from "../HomePage/ScenicSpot/ScenicSpotList.jsx";
import NoSearchResult from "../../components/Search/NoSearchResult";
import SearchResultTitle from "../../components/Search/SearchResultTitle";
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
    // search by city or keyword
    if (searchInput || city) {
      getScenicSpots({ city, searchInput })
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
        <SearchResultTitle length={scenicSpots?.length} />
        {scenicSpots?.length ? (
          <ScenicSpotList spots={scenicSpots} />
        ) : (
          <NoSearchResult />
        )}
      </div>
    </main>
  );
};

export default ScenicSpotPage;
