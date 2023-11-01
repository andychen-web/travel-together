import React from "react";

const SearchResultTitle = ({ length }) => {
  return (
    <div className="d-flex">
      <h1> 搜尋結果</h1>
      <div className="mt-3 ms-2">
        共有<span className="text-info">{length}</span>筆
      </div>
    </div>
  );
};

export default SearchResultTitle;
