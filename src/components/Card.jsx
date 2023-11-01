import React, { useState } from "react";
import pointerGrey from "../assets/images/icons/pointer-grey.svg";
import { useNavigate } from "react-router-dom";
import NoImage from "../assets/images/NoImage-255x200.png";
const Card = ({ id, city, name, type, img }) => {
  const [imgIsLoading, setImgIsLoading] = useState(true);
  let words = name.split("");
  if (words.length > 10) {
    name = words.slice(0, 15).join("") + "...";
  }
  const navigate = useNavigate();
  return (
    <div className="my-2">
      <div
        className="description cursor-pointer"
        onClick={() => navigate(`/${type}/${id}`)}
      >
        <div className="wrap overflow-hidden rounded">
          <img
            src={imgIsLoading ? NoImage : img}
            onLoad={() => setImgIsLoading(false)}
            className="card-img-general"
            alt="card-img"
          />
        </div>
        <div className="fw-bold h5">{name}</div>
        <div className="text-secondary">
          <img src={pointerGrey} alt="pointer-icon" />
          <span>{city}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
