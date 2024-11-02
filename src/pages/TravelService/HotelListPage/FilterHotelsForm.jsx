import React, { useEffect, useState } from "react";
import { apiGetHotels, apiHotelParams } from "@/api";
import { updateLoadingArrayState } from "@/utilities/global_util";
const FilterHotelsForm = ({ setHotels, setIsLoadingArray }) => {
  const [hotelsFilter, setHotelsFilter] = useState(
    apiHotelParams().hotelsFilter
  );

  const fetchData = async () => {
    const data = await apiGetHotels(hotelsFilter);
    setHotels(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // 處理多個loading中其中一個的狀態
    updateLoadingArrayState(setIsLoadingArray, 0, true);
    await fetchData();
    updateLoadingArrayState(setIsLoadingArray, 0, false);
  };

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cityCode">城市</label>
          <input
            type="text"
            className="form-control"
            id="cityCode"
            value={hotelsFilter.cityCode}
            onChange={(e) =>
              setHotelsFilter({ ...hotelsFilter, cityCode: e.target.value })
            }
            placeholder="Enter city code (e.g., PAR)"
          />
        </div>
        <button className="btn-custom-primary" type="submit">
          查詢
        </button>
      </form>
    </div>
  );
};

export default FilterHotelsForm;
