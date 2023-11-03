import React from "react";
import noSearchResult from "../../assets/images/icons/no-search-result.svg";

const NoSearchResult = () => {
  return (
    <div className="text-primary h-3 fw-bold d-flex flex-column align-items-center justify-content-center my-5">
      <img src={noSearchResult} alt="no-result" />
      <div>目前查無資料</div>
      <div>請重新搜尋</div>
    </div>
  );
};

export default NoSearchResult;
