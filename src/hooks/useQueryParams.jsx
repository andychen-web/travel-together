import { useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import qs from "query-string";

const useQueryParams = () => {
  const location = useLocation();

  const { query, pathname, category } = useMemo(() => {
    const query = qs.parse(location.search);
    const category = query.category;
    const pathname = location.pathname;

    return { query, pathname, category };
  }, [location.search]);
  const [city, setCity] = useState(query.city);
  const [searchInput, setSearchInput] = useState(
    query.searchInput === "none" ? "" : query.searchInput
  );

  return {
    query,
    pathname,
    category,
    city,
    setCity,
    searchInput,
    setSearchInput,
  };
};

export default useQueryParams;
