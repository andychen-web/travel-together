import React, { useState } from "react";
import pointerGrey from "../assets/images/icons/pointer-grey.svg";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/images/no_picture_activity.jpg";
const Card = ({ id, city, name, dataType, img }) => {
  const [imgIsLoading, setImgIsLoading] = useState(true);
  let shownImg;
  const imageFormats = [".jpg", ".png", ".gif", ".JPG"];
  if (img && imageFormats.some((format) => img.endsWith(format))) {
    shownImg = img;
  } else {
    shownImg = noImage;
  }
  let words = name.split("");
  if (words.length >= 14) {
    name = words.slice(0, 14).join("") + "...";
  }
  const navigate = useNavigate();
  const handleCardClick = () => {
    navigate(`/${dataType}/${id}`);
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
