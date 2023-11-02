import React, { useState } from "react";
import pointerGrey from "../assets/images/icons/pointer-grey.svg";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/images/no_picture_activity.jpg";
const Card = ({ item, id, city, name, category, img }) => {
  const [imgIsLoading, setImgIsLoading] = useState(true);
  let shownImg;
  if (img?.endsWith("jpg") || img?.endsWith(".png") || img?.endsWith(".gif")) {
    shownImg = img;
  } else {
    shownImg = noImage;
  }
  let words = name.split("");
  if (words.length > 10) {
    name = words.slice(0, 15).join("") + "...";
  }
  const navigate = useNavigate();
  const handleCardClick = () => {
    console.log(id, JSON.stringify(item));
    localStorage.setItem(id, JSON.stringify(item));
    navigate(`/${category}/${id}`);
  };
  return (
    <div className="my-2">
      <div
        className="description cursor-pointer"
        onClick={() => handleCardClick()}
      >
        <div className="wrap overflow-hidden rounded">
          <img
            src={imgIsLoading ? noImage : shownImg}
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
