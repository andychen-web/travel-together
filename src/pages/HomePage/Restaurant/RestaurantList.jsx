import React from "react";
import Card from "../../../components/Card.jsx";
const RestaurantList = ({ restaurants }) => {
  return (
    <ul className="row">
      {restaurants?.map((item, index) => (
        <li key={index} className="col-md-3 col-6">
          <Card
            id={item.RestaurantID}
            city={item.City}
            name={item.RestaurantName}
            category={"restaurant"}
            img={item.Picture.PictureUrl1}
          />
        </li>
      ))}
    </ul>
  );
};

export default RestaurantList;
