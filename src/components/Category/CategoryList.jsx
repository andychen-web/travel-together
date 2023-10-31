import React from "react";
import CategoryCard from "./CategoryCard.jsx";
const CategoryList = ({ topics }) => {
  return (
    <>
      <h1> 熱門主題</h1>
      <ul className="row">
        {topics.map((topic, index) => (
          <li key={index} className="col-md-3 col-6 category-col rounded mb-2">
            <CategoryCard topic={topic} />
          </li>
        ))}
      </ul>
    </>
  );
};

export default CategoryList;
