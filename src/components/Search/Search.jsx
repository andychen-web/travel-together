import React from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { CITIES } from "../../utilities/const";

const Search = ({
  city,
  setCity,
  setSearchInput,
  placeholder,
  searchInput,
  pathname,
  // props unique to activity page
  date,
  setDate,
}) => {
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    const dateParam = date ? `&date=${date}` : "";
    e.preventDefault();
    (city || searchInput || date) &&
      navigate(
        `${pathname}?searchInput=${searchInput ? searchInput : ""}&city=${
          city ? city : ""
        }${dateParam ? dateParam : ""}`
      );
  };
  const today = new Intl.DateTimeFormat("en-CA").format(new Date());
  let newDate = new Date();
  newDate.setFullYear(newDate.getFullYear() + 1);
  const oneYearFromNow = new Intl.DateTimeFormat("en-CA").format(newDate);
  return (
    <form
      autoComplete="on"
      onSubmit={(e) => handleSubmit(e)}
      className="d-flex mb-3"
    >
      <select
        className="form-select h-100 w-50 form-select-md border border-secondary"
        aria-label="form-select"
        value={city || ""}
        onChange={(e) => setCity(e.target.value)}
      >
        {CITIES.map((city, index) => (
          <option key={index} value={city.value}>
            {city.label}
          </option>
        ))}
      </select>
      {setDate ? (
        <>
          <label htmlFor="datePicker" className="d-none"></label>
          <input
            type="date"
            value={date ? date : ''}
            min={today}
            max={oneYearFromNow}
            onChange={(e) => setDate(e.target.value)}
            className="mx-2 px-2 w-50 border border-secondary rounded"
            id="datePicker"
          />
        </>
      ) : (
        <></>
      )}

      <label htmlFor="keywordInput" className="d-none"></label>
      <input
        type="text"
        placeholder={`${placeholder}輸入關鍵字`}
        className="mx-2 w-75 bg-light form-control border border-secondary"
        id="keywordInput"
        value={searchInput || ""}
        onChange={(e) => setSearchInput(e.target.value)}
      />

      <button type="submit" className="w-50 h-100 btn text-white btn-primary">
        <MdSearch size={24} /> 搜尋
      </button>
    </form>
  );
};

export default Search;
