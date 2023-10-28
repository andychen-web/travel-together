import React from "react";
import pointerGrey from "../assets/images/icons/pointer-grey.svg";
const Card = ({ id, city, name, type, img }) => {
  return (
    <div>
      <a href={`/${type}/${id}`}>
        <img src={img} className="card-img-general" alt="card-img" />
      </a>
      <div className="description">
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
