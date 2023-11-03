import React, { useEffect, useState } from "react";
import { getRestaurants } from "../../api/apis.js";
import topic1 from "../../assets/images/category/restaurant/01.svg";
import topic2 from "../../assets/images/category/restaurant/02.svg";
import topic3 from "../../assets/images/category/restaurant/03.svg";
import topic4 from "../../assets/images/category/restaurant/04.svg";
import topic5 from "../../assets/images/category/restaurant/05.svg";
import topic6 from "../../assets/images/category/restaurant/06.svg";

import CategoryList from "../../components/Category/CategoryList.jsx";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import Search from "../../components/Search/Search.jsx";
import useQueryParams from "../../hooks/useQueryParams";
import NoSearchResult from "../../components/Search/NoSearchResult";
import SearchResultTitle from "../../components/Search/SearchResultTitle";
import RestaurantList from "../HomePage/Restaurant/RestaurantList.jsx";
const Restaurant = () => {
  const TOPICS = [
    { bg: topic1, label: "地方特產" },
    { bg: topic2, label: "中式美食" },
    { bg: topic3, label: "甜點冰品" },
    { bg: topic4, label: "異國料理" },
    { bg: topic5, label: "伴手禮" },
    { bg: topic6, label: "素食" },
  ];
  const [restaurants, setRestaurants] = useState([]);

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
      getRestaurants({ city, searchInput })
        .then((data) => {
          setRestaurants(data);
        })
        .catch((err) => console.log(err));
    }
    // search by category
    if (category) {
      getRestaurants({ category })
        .then((data) => {
          setRestaurants(data);
          setCity("");
          setSearchInput("");
        })
        .catch((err) => console.log(err));
    }
  }, [query]);
  return (
    <main className="container">
      <MyBreadCrumb routes={["品嚐美食"]} />
      <Search
        city={city}
        setCity={setCity}
        setSearchInput={setSearchInput}
        searchInput={searchInput}
        placeholder={"你想吃什麼?"}
        pathname={pathname}
      />
      <CategoryList topics={TOPICS} />
      <div className="search-result">
        <SearchResultTitle length={restaurants?.length} />
        {restaurants?.length ? (
          <RestaurantList restaurants={restaurants} />
        ) : (
          <NoSearchResult />
        )}
      </div>
    </main>
  );
};

export default Restaurant;
