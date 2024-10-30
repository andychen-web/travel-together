import React from "react";
import Card from "@/components/Card.jsx";
const ScenicSpotList = ({ spots }) => {
  return (
    <ul className="row">
      {spots.map((item, index) => (
        <li key={index} className="col-md-3 col-6">
          <Card
            item={item}
            id={item.ScenicSpotID}
            city={item.City}
            name={item.ScenicSpotName}
            currentPath={window.location.pathname}
            img={item.Picture.PictureUrl1}
          />
        </li>
      ))}
    </ul>
  );
};

export default ScenicSpotList;
