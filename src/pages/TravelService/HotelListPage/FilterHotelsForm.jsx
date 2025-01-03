import React, { useEffect, useState } from "react";
import {
  apiGetHotels,
  apiHotelParams,
  apiGetAllTWCities,
} from "@/api-client";
import { updateLoadingState } from "@/utilities/globalUtil";
// MUI
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import GuestDropdown from "@/components/Dropdown/GuestDropdown.jsx";
const FilterHotelsForm = ({ setHotels, setIsLoadingArray }) => {
  const [hotelsFilter, setHotelsFilter] = useState(
    apiHotelParams().hotelsFilter
  );
  const [cities, setCities] = useState([]);
  const [checkIn, setCheckIn] = useState(hotelsFilter.checkIn);
  const [checkOut, setCheckOut] = useState(hotelsFilter.checkOut);
  const minDate = new Date();
  let maxDate = new Date(minDate);
  maxDate = new Date(maxDate.setFullYear(minDate.getFullYear() + 1));

  const fetchData = async () => {
    const data = await apiGetHotels(hotelsFilter);
    setHotels(data);
  };
  const fetchFilterOptions = async () => {
    const data = await apiGetAllTWCities();
    setCities(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateLoadingState(setIsLoadingArray, 0, true);
    await fetchData();
    updateLoadingState(setIsLoadingArray, 0, false);
  };

  useEffect(() => {
    fetchData();
    fetchFilterOptions();
  }, []);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="cityCode">地點</label>
          {/* // TODO */}
          <select
            className="form-select"
            id="cityCode"
            value={hotelsFilter.cityCode}
            onChange={(e) =>
              setHotelsFilter({ ...hotelsFilter, cityCode: e.target.value })
            }
          ></select>
          <DatePicker
            label="入住日"
            value={checkIn}
            onChange={(date) => setCheckIn(date)}
            format="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} />}
            minDate={minDate}
            maxDate={maxDate}
          />
          <DatePicker
            label="退房日"
            value={checkOut}
            onChange={(date) => setCheckOut(date)}
            format="yyyy-MM-dd"
            renderInput={(params) => <TextField {...params} />}
            minDate={minDate}
            maxDate={maxDate}
          />

          {/* <DatePicker
            minDate={minDate}
            maxDate={maxDate}
          /> */}

          <GuestDropdown></GuestDropdown>
        </div>
        <button className="btn-custom-primary" type="submit">
          查詢
        </button>
      </form>
    </div>
  );
};

export default FilterHotelsForm;
