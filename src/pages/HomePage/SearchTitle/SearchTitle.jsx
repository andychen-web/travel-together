import React from "react";
import HomePageSearch from "./HomePageSearch.jsx";
import Title from "./Title.jsx";

const SearchTitle = () => {
  return (
    <div className="row p-5">
      <div className="col-md-8">
        <Title />
      </div>
      <div className="col-md-4 col-10 ">
        <HomePageSearch />
      </div>
    </div>
  );
};

export default SearchTitle;
