import React, { useEffect, useState, useCallback } from "react";
import { apiGetTdxActivities } from "@/api-client";
import topic1 from "@/assets/images/category/activity/01.svg";
import topic2 from "@/assets/images/category/activity/02.svg";
import topic3 from "@/assets/images/category/activity/03.svg";
import topic4 from "@/assets/images/category/activity/04.svg";
import topic5 from "@/assets/images/category/activity/05.svg";
import topic6 from "@/assets/images/category/activity/06.svg";

import CategoryList from "@/components/Category/CategoryList.jsx";
import MyBreadCrumb from "@/components/MyBreadCrumb.jsx";
import Search from "@/components/Search/Search.jsx";
import useQueryParams from "@/hooks/useQueryParams";
import ActivityList from "../HomePage/RecentActivity/ActivityList.jsx";
import NoSearchResult from "@/components/Search/NoSearchResult";
import SearchResultTitle from "@/components/Search/SearchResultTitle.jsx";

const FestivalPage = () => {
  const TOPICS = [
    { bg: topic1, label: "節慶活動" },
    { bg: topic2, label: "自行車活動" },
    { bg: topic3, label: "遊憩活動" },
    { bg: topic4, label: "產業文化活動" },
    { bg: topic5, label: "年度活動" },
    { bg: topic6, label: "四季活動" },
  ];

  const [searchActivities, setSearchActivities] = useState([]);

  const {
    pathname,
    category,
    city,
    setCity,
    searchInput,
    setSearchInput,
    date,
    setDate,
  } = useQueryParams();

  const fetchActivities = async (params) => {
    const data = await apiGetTdxActivities(params);
    setSearchActivities(data);
  };
  const resetSearchFilter = useCallback(() => {
    setCity("");
    setSearchInput("");
  }, [setCity, setSearchInput]);

  useEffect(() => {
    // 以搜尋條件查詢
    if (searchInput || city || date) {
      fetchActivities({ city, searchInput, date });
    } else if (category) {
      fetchActivities({ category, date });
      resetSearchFilter();
    }
  }, [searchInput, city, date, category, resetSearchFilter]);

  return (
    <main className="container">
      <MyBreadCrumb routes={["節慶活動"]} />
      <Search
        city={city}
        setCity={setCity}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        placeholder={"想找有趣的?"}
        pathname={pathname}
        // props unique to activity page
        setDate={setDate}
        date={date}
      />
      <CategoryList topics={TOPICS} />
      <div className="search-result">
        <SearchResultTitle length={searchActivities.length} />
        {searchActivities.length ? (
          <ActivityList
            pathname={pathname}
            searchActivities={searchActivities}
          />
        ) : (
          <NoSearchResult />
        )}
      </div>
    </main>
  );
};

export default FestivalPage;
