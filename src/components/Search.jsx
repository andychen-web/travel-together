import React from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Search = ({
  city,
  cities,
  setCity,
  setSearchInput,
  placeholder,
  searchInput,
  pathname,
}) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();

    (city || searchInput) &&
      navigate(
        `${pathname}?searchInput=${searchInput ? searchInput : "none"}&city=${
          city ? city : "none"
        }`
      );
  };
  return (
    <form
      autoComplete="on"
      onSubmit={(e) => handleSubmit(e)}
      className="d-flex"
    >
      <select
        className="form-select h-100 w-50 form-select-md border border-secondary"
        aria-label="form-select"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      >
        {cities.map((city, index) => (
          <option key={index} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      <label htmlFor="keywordInput" className="d-none"></label>
      <input
        type="text"
        placeholder={`${placeholder}輸入關鍵字`}
        className="mx-2 bg-light form-control border border-secondary"
        id="keywordInput"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button type="submit" className="w-50 h-100 btn text-white btn-primary">
        <MdSearch size={24} /> 搜尋
      </button>
    </form>
  );
};

export default Search;
