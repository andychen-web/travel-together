import React, { useEffect, useState } from "react";
import { apiGetHotels, apiHotelParams } from "@/api-client";
import { updateLoadingState } from "@/utilities/globalUtil";
// MUI
import { TextField } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";

import GuestDropdown from "@/components/Dropdown/GuestDropdown.jsx";
const FilterHotelsForm = ({ setHotels, setIsLoadingArray }) => {
  const [hotelsFilter, setHotelsFilter] = useState(
    apiHotelParams().hotelsFilter
  );
  const [selectedDate, setSelectedDate] = useState(null);
  const [checkIn, setCheckIn] = useState(hotelsFilter.checkIn);
  const [checkOut, setCheckOut] = useState(hotelsFilter.checkOut);
  const minDate = new Date();
  const maxDate = new Date();

  const fetchData = async () => {
    const data = await apiGetHotels(hotelsFilter);
    setHotels(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    updateLoadingState(setIsLoadingArray, 0, true);
    await fetchData();
    updateLoadingState(setIsLoadingArray, 0, false);
  };

  useEffect(() => {
    fetchData();
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
            value={selectedDate}
            onChange={(date) => setCheckIn(date)}
            renderInput={(params) => <TextField {...params} />}
          />
          <DatePicker
            label="退房日"
            value={selectedDate}
            onChange={(date) => setCheckOut(date)}
            renderInput={(params) => <TextField {...params} />}
          />

          {/* <DatePicker
            placeholderText="入住"
            locale="zh-TW"
            selected={checkIn}
            selectsStart
            onChange={(date) => setCheckIn(date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
          />
          <DatePicker
            placeholderText="退房"
            locale="zh-TW"
            selected={checkOut}
            selectsStart
            onChange={(date) => setCheckOut(date)}
            startDate={checkIn}
            endDate={checkOut}
            minDate={minDate}
            maxDate={maxDate}
            className="min-w-full bg-white p-2 focus:outline-none"
            wrapperClassName="min-w-full"
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
