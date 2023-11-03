import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
const CategoryCard = ({ topic }) => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleSubmit = (category) => {
    navigate(`${location.pathname}?category=${category}`);
  };
  return (
    <div
      onClick={() => handleSubmit(topic.label)}
      className="cursor-pointer d-flex justify-content-center align-items-center category-card"
      style={{
        backgroundImage: `url(${topic.bg})`,
      }}
    >
      {topic.label}
    </div>
  );
};

export default CategoryCard;
