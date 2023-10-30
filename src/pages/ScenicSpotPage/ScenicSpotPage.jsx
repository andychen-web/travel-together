import React, { useState, useEffect } from "react";
import { getScenicSpots } from "../../api/api";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import Search from "../../components/Search.jsx";
import { CITIES } from "../../utilities/const";
import CategoryList from "../../components/CategoryList.jsx";
const ScenicSpotPage = () => {
  const [city, setCity] = useState("");
  const [scenicSpots, setScenicSpots] = useState([]);
  // useEffect(() => {
  //   setCity("Taipei");
  //   if (city) {
  //     getScenicSpots(city);
  //   }
  // }, [city]);
  useEffect(() => {
    getScenicSpots().then((data) => console.log(data));
  }, []);
  return (
    <main className="container">
      <MyBreadCrumb />
      <Search cities={CITIES} />
      <CategoryList />
    </main>
  );
};

export default ScenicSpotPage;
