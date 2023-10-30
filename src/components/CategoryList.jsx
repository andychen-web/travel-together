import React from "react";
import CategoryCard from "./CategoryCard.jsx";
const CategoryList = () => {
  return (
    <ul>
      <h1> 熱門主題</h1>
      <li className="">
        <CategoryCard />
      </li>
    </ul>
  );
};

export default CategoryList;
