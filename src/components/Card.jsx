import React, { useState } from "react";
import pointerGrey from "../assets/images/icons/pointer-grey.svg";
import { useNavigate } from "react-router-dom";
import noImage from "../assets/images/no_picture_activity.jpg";
const Card = ({ id, city, name, currentPath, img }) => {
  const navigate = useNavigate();
  const [shownImg, setShownImg] = useState("");
  const testImageLoad = (imgUrl) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.src = imgUrl;
      img.onload = () => resolve(true);
      img.onerror = () => reject(false);
    });
  };

  testImageLoad(img)
    .then(() => {
      setShownImg(img);
    })
    .catch(() => {
      setShownImg(noImage);
    });

  if (!name) return;
  let words = name.split("");
  if (words.length >= 14) {
    name = words.slice(0, 14).join("") + "...";
  }
  const handleCardClick = () => {
    console.log(`${currentPath}/${id}`);
    navigate(`${currentPath}/${id}`);
  };
  return (
    <div className="my-2">
      <div
        className="description cursor-pointer"
        onClick={() => handleCardClick()}
      >
        <div className="wrap overflow-hidden rounded">
          <img
            src={shownImg ? shownImg : noImage}
            className="card-img-general"
            alt="card-img"
          />
        </div>
        <div className="fw-bold h5 mt-2">{name}</div>
        <div className="text-secondary">
          <img src={pointerGrey} alt="pointer-icon" />
          <span>{city}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
