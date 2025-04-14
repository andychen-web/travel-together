import React, { useContext, useState } from "react";
import { MdSearch } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { NavContext } from "@/context/NavContext";

const HomePageSearch = () => {
  const navigate = useNavigate();
  const [homeSearchInput, setHomeSearchInput] = useState("");
  const { navLinks } = useContext(NavContext);
  
  // Filter routes that should be searchable
  const searchableRoutes = navLinks?.filter((item) => {
    return item && item.path && (
      item.path.includes("/scenicSpot") ||
      item.path.includes("/restaurant") ||
      item.path.includes("/activity")
    );
  }) || [];

  // Set default route or first available route
  const [searchRoute, setSearchRoute] = useState(
    searchableRoutes.length > 0 ? searchableRoutes[0].path : "/scenicSpot"
  );

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(
      `${searchRoute}?searchInput=${homeSearchInput ? homeSearchInput : ""}`
    );
  };

  return (
    <>
      <select
        className="form-select form-select-md border border-secondary"
        aria-label="form-select"
        onChange={(e) => setSearchRoute(e.target.value)}
        value={searchRoute}
      >
        {searchableRoutes.map((route, index) => (
          <option key={index} value={route.path}>
            {route.name}
          </option>
        ))}
      </select>

      <form autoComplete="on" onSubmit={(e) => handleSearch(e)}>
        <label htmlFor="keywordInput" className="d-none"></label>
        <input
          type="text"
          name="keywordInput"
          placeholder="您想去哪?輸入關鍵字"
          className="h6 bg-light form-control border border-secondary mt-2"
          id="keywordInput"
          onChange={(e) => setHomeSearchInput(e.target.value)}
        />

        <button type="submit" className="mt-1 w-100 btn text-white btn-primary">
          <MdSearch size={24} /> 搜尋
        </button>
      </form>
    </>
  );
};

export default HomePageSearch;
