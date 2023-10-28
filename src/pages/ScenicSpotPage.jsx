import React, { useState, useEffect } from "react";
import { getScenicSpots } from "../api/api.jsx";

const ScenicSpotPage = () => {
  const [city, setCity] = useState("");
  const [scenicSpots, setScenicSpots] = useState([]);
  useEffect(() => {
    setCity("Taipei");
    if (city) {
      getScenicSpots(city);
    }
  }, [city]);

  return <div></div>;
};

export default ScenicSpotPage;
