import React from "react";
import ScenicSpotCard from "./ScenicSpotCard.jsx";
const ScenicSpotList = ({ spots }) => {
  return (
    <ul>
      {spots.map((spot, index) => (
        <li key={index} className="col-md-6">
          <ScenicSpotCard spot={spot} />
        </li>
      ))}
    </ul>
  );
};

export default ScenicSpotList;
