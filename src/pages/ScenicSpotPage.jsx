import React, { useState, useEffect } from "react";
import { getScenicSpots } from "../api/api";
import MyBreadCrumb from "../component/MyBreadCrumb.jsx";
import Search from "../component/Search.jsx";
import { CITIES } from "../utilities/const";
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
      
    </main>
  );
};

export default ScenicSpotPage;
