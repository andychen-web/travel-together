import React, { useCallback, useEffect, useState } from "react";
import { apiGetTdxScenicSpots } from "@/api";
import topic1 from "@/assets/images/category/spot/01.svg";
import topic2 from "@/assets/images/category/spot/02.svg";
import topic3 from "@/assets/images/category/spot/03.svg";
import topic4 from "@/assets/images/category/spot/04.svg";
import topic5 from "@/assets/images/category/spot/05.svg";
import topic6 from "@/assets/images/category/spot/06.svg";
import topic7 from "@/assets/images/category/spot/07.svg";

import CategoryList from "@/components/Category/CategoryList.jsx";
import MyBreadCrumb from "@/components/MyBreadCrumb.jsx";
import Search from "@/components/Search/Search.jsx";
import useQueryParams from "@/hooks/useQueryParams";
import ScenicSpotList from "../HomePage/ScenicSpot/ScenicSpotList.jsx";
import NoSearchResult from "@/components/Search/NoSearchResult";
import SearchResultTitle from "@/components/Search/SearchResultTitle";
import Loader from "@/components/Loader";
import Pagination from "@/components/Pagination/Pagination.jsx";
const ScenicSpotPage = () => {
  const [isLoading, setIsLoading] = useState(false);
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

  const [paginationDetails, setPaginationDetails] = useState({});

  const resetSearchFilter = useCallback(() => {
    setCity("");
    setSearchInput("");
  }, [setCity, setSearchInput]);

  useEffect(() => {
    // 查詢
    const fetchScenicSpots = async (params) => {
      if (query.$top) {
        params.top = query.$top;
      }
      setIsLoading(true);
      const data = await apiGetTdxScenicSpots(params);
      setScenicSpots(data);
      setPaginationDetails(params);
      setIsLoading(false);
    };
    // 以搜尋條件查詢
    if (searchInput || city) {
      fetchScenicSpots({ searchInput, city });
    } else if (category) {
      fetchScenicSpots({ category });
      resetSearchFilter();
    }
  }, [query, category, city, searchInput, resetSearchFilter]); // url params改變時會查詢
  return (
    <main className="container">
      <MyBreadCrumb routes={["探索景點"]} />
      <Search
        city={city}
        setCity={setCity}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        placeholder={"你想去哪?"}
        pathname={pathname}
      />
      <CategoryList topics={TOPICS} />
      {/* 搜尋結果 */}
      <div className="search-result">
        <Loader isLoading={isLoading} />

        <div className="d-flex justify-content-between">
          <SearchResultTitle length={scenicSpots?.length} />
          <Pagination
            paginationDetails={paginationDetails}
            paginationStyle={"tdxCount"}
          />
        </div>
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
