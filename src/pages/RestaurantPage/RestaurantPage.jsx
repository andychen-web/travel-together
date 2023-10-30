import React, { useState, useEffect } from "react";
import MyBreadCrumb from "../../components/MyBreadCrumb.jsx";
import { getRestaurants } from "../../api/api.js";
const Restaurant = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants().then((data) => setRestaurants(data));
  }, []);
  if (restaurants === 3)
    return (
      <main className="container">
        <MyBreadCrumb />
      </main>
    );
};

export default Restaurant;
