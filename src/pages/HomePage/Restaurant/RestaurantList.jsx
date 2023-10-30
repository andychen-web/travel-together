import React, { useEffect, useState } from "react";
import { getRestaurants } from "../../../api/api";
import Card from "../../../components/Card.jsx";
const RestaurantList = () => {
  const [restaurants, setRestaurants] = useState([]);
  useEffect(() => {
    getRestaurants()
      .then((data) => {
        const shownRestaurants = data.slice(0, 4);
        console.log(shownRestaurants);
        setRestaurants(shownRestaurants);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <ul className="row">
      {restaurants.map((item, index) => (
        <li key={index} className="col-md-3 col-6">
          <Card
            id={item.RestaurantID}
            city={item.City}
            name={item.RestaurantName}
            type={"restaurant"}
            img={item.Picture.PictureUrl1}
          />
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
