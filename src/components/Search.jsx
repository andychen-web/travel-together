import React, { useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Search = ({ cities }) => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");
  const [searchType, setSearchType] = useState("");
  const handleSearch = () => {
    // ? if input is null, search all?
    navigate(`/${searchType}?keyword=${searchInput}`);
  };
  if (cities?.length) {
    return (
      <div className="d-flex">
        <select
          className="form-select h-100 w-50 form-select-md border border-secondary"
          aria-label=".form-select-lg"
          onChange={(e) => setSearchType(e.target.value)}
        >
          {cities.map((city, index) => (
            <option key={index} value={city.value}>
              {city.label}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="您想去哪?輸入關鍵字"
          className="mx-2 bg-light form-control border border-secondary"
          id="keywordInput"
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <button
          type="button"
          onClick={() => handleSearch()}
          className="w-50 h-100 btn text-white btn-primary"
        >
          <MdSearch size={24} /> 搜尋
        </button>
      </div>
    );
  }
  return (
    <div>
      <select
        className="form-select form-select-md border border-secondary"
        aria-label=".form-select-lg"
        onChange={(e) => setSearchType(e.target.value)}
      >
        <option value="scenic-spots">探索景點</option>
        <option value="activity">節慶活動</option>
        <option value="restaurant">品嘗美食</option>
      </select>

      <input
        type="text"
        placeholder="您想去哪?輸入關鍵字"
        className="h6 bg-light form-control border border-secondary mt-2"
        id="keywordInput"
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button
        type="button"
        onClick={() => handleSearch()}
        className="mt-1 w-100 btn text-white btn-primary"
      >
        <MdSearch size={24} /> 搜尋
      </button>
    </div>
  );
};

export default Search;
